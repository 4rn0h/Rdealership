// seed.mjs
import "dotenv/config";
import { createClient } from "@supabase/supabase-js";

// ---- Import data files ----
import vehicles from "./src/data/Vehicles_Data.js";
import vehicleSpecs from "./src/data/Vehicle_Specs.js";
import inquiries from "./src/data/Inquiry_Data.js";
import dashboardStats from "./src/data/Dashboard_Data.js";

// Import features categories
import {
  safetyFeatures,
  comfortFeatures,
  techFeatures,
  exteriorFeatures,
  interiorFeatures,
  entertainmentFeatures,
} from "./src/data/Feature_Templates.js";

// ---- Supabase client ----
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
  throw new Error("❌ Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env");
}

// Supabase Storage bucket for vehicle images
const SUPABASE_BUCKET_URL =
  "https://ckozmqltqbumvjnahjgr.supabase.co/storage/v1/object/public/vehicle-image";

// ---------------------------
// Helpers
// ---------------------------

// Map local → Supabase image URLs
function mapImageUrls(images) {
  if (!images) return [];
  return images.map((img) =>
    img.startsWith("http")
      ? img
      : `${SUPABASE_BUCKET_URL}/${img.split("/").pop()}`
  );
}

// Normalize vehicles for Supabase schema (ignoring id from source)
function normalizeVehicle(v, adminId) {
  return {
    make: v.make,
    model: v.model,
    year: v.year,
    price: v.price,
    mileage: v.mileage,
    fuel_type: v.fuelType,
    transmission: v.transmission,
    body_type: v.bodyType,
    color: v.exteriorColor,
    engine_size: v.engineSize,
    description: v.description,
    image_urls: mapImageUrls(v.images),
    status: v.status?.toLowerCase() || "available",
    created_by: adminId,
    is_featured: false,
  };
}

// Normalize vehicle_specs (store interiorColor here)
function normalizeVehicleSpec(v, vehicleId) {
  return {
    vehicle_id: vehicleId,
    key: "interior_color",
    value: v.interiorColor || "Unknown",
  };
}

// ---------------------------
// Seed function
// ---------------------------
async function seed() {
  console.log("🌱 Starting seed process...");

  // STEP 1: Seed Users
  const usersToCreate = [
    { email: "admin@royamotorsuk.com", password: "admin123", role: "admin", name: "Admin User" },
    { email: "agent@royamotorsuk.com", password: "agent123", role: "sales_agent", name: "Sales Agent" },
    { email: "user@royamotorsuk.com", password: "user123", role: "customer", name: "John Doe" },
  ];

  const createdUsers = [];

  for (const u of usersToCreate) {
    const { data, error } = await supabase.auth.admin.createUser({
      email: u.email,
      password: u.password,
      email_confirm: true,
    });

    if (error) {
      console.error(`⚠️ Skipping ${u.email}:`, error.message);
    } else {
      console.log(`✅ Created user: ${u.email}`);
      createdUsers.push({ ...u, id: data.user.id });
    }
  }

  for (const u of createdUsers) {
    const { error } = await supabase.from("users").insert([
      {
        id: u.id,
        email: u.email,
        full_name: u.name,
        role: u.role,
        phone: null,
      },
    ]);
    if (error) {
      console.error(`⚠️ Failed to insert into users for ${u.email}:`, error.message);
    } else {
      console.log(`✅ Inserted into users: ${u.email}`);
    }
  }

  // STEP 2: Seed Vehicles (+ interiorColor to vehicle_specs)
  if (vehicles?.length) {
    let adminUser = createdUsers.find((u) => u.role === "admin");

    if (!adminUser) {
      const { data: existingAdmins, error: adminError } = await supabase
        .from("users")
        .select("id, email, role")
        .eq("role", "admin")
        .limit(1);

      if (adminError || !existingAdmins?.length) {
        throw new Error("❌ No admin user found, cannot seed vehicles");
      }

      adminUser = existingAdmins[0];
      console.log(`ℹ️ Using existing admin: ${adminUser.email}`);
    }

    const vehiclesToInsert = vehicles.map((v) => normalizeVehicle(v, adminUser.id));

    const { data: insertedVehicles, error } = await supabase
      .from("vehicles")
      .upsert(vehiclesToInsert, { onConflict: ["make", "model", "year"] })
      .select("id, make, model, year");

    if (error) {
      console.error("❌ Vehicles upsert error:", error.message);
    } else {
      console.log(`✅ Upserted ${insertedVehicles.length} vehicles`);

      const specsToInsert = vehicles
        .map((v, idx) =>
          normalizeVehicleSpec(v, insertedVehicles[idx]?.id)
        )
        .filter(Boolean);

      if (specsToInsert.length) {
        const { error: specError } = await supabase
          .from("vehicle_specs")
          .upsert(specsToInsert, { onConflict: ["vehicle_id", "key"] });

        if (specError) {
          console.error("❌ Vehicle specs upsert error:", specError.message);
        } else {
          console.log(`✅ Upserted ${specsToInsert.length} interiorColor specs`);
        }
      }
    }
  }

  // STEP 3: Seed Inquiries
  if (inquiries?.length) {
    const { error } = await supabase.from("inquiries").insert(inquiries);
    if (error) {
      console.error("❌ Inquiries insert error:", error.message);
    } else {
      console.log(`✅ Inserted ${inquiries.length} inquiries`);
    }
  }

  // STEP 4: Seed Additional Vehicle Specs
  if (vehicleSpecs?.length) {
    const { error } = await supabase
      .from("vehicle_specs")
      .upsert(vehicleSpecs, { onConflict: ["vehicle_id", "key"] });
    if (error) {
      console.error("❌ Vehicle specs upsert error:", error.message);
    } else {
      console.log(`✅ Upserted ${vehicleSpecs.length} vehicle specs`);
    }
  }

  // STEP 5: Seed Features (grouped by category)
  const allFeatureGroups = [
    ...safetyFeatures.map((f) => ({ category: "Safety", feature: f })),
    ...comfortFeatures.map((f) => ({ category: "Comfort", feature: f })),
    ...techFeatures.map((f) => ({ category: "Technology", feature: f })),
    ...exteriorFeatures.map((f) => ({ category: "Exterior", feature: f })),
    ...interiorFeatures.map((f) => ({ category: "Interior", feature: f })),
    ...entertainmentFeatures.map((f) => ({ category: "Entertainment", feature: f })),
  ];

  if (allFeatureGroups?.length) {
    // Assign to first vehicle as a demo; you can randomize or link properly
    const { data: vehiclesList, error: vErr } = await supabase
      .from("vehicles")
      .select("id")
      .limit(1);

    if (vErr || !vehiclesList?.length) {
      console.error("❌ Could not fetch vehicles for feature linking:", vErr?.message);
    } else {
      const vehicleId = vehiclesList[0].id;
      const featuresToInsert = allFeatureGroups.map((f) => ({
        vehicle_id: vehicleId,
        feature: f.feature,
      }));

      const { error } = await supabase.from("features").insert(featuresToInsert);
      if (error) {
        console.error("❌ Features insert error:", error.message);
      } else {
        console.log(`✅ Inserted ${featuresToInsert.length} features`);
      }
    }
  }

  // STEP 6: Seed Dashboard Stats
  if (dashboardStats?.length) {
    const statsToInsert = dashboardStats.map((s) => ({
      title: s.title,
      value: s.value,
      trend: s.trend,
    }));

    const { error } = await supabase.from("dashboard_stats").insert(statsToInsert);
    if (error) {
      console.error("❌ Dashboard stats insert error:", error.message);
    } else {
      console.log(`✅ Inserted ${statsToInsert.length} dashboard stats`);
    }
  }

  console.log("🌱 Seeding complete!");
}

seed().catch((err) => {
  console.error("❌ Seeding failed:", err.message);
  process.exit(1);
});
