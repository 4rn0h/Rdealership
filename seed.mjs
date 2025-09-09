import "dotenv/config";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
  throw new Error("❌ Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env");
}

async function seed() {
  console.log("🌱 Starting seed process...");

  // --- Step 1: Create users in auth.users ---
  const usersToCreate = [
    { email: "admin@Royamotorsuk.com", password: "admin123", role: "admin", name: "Admin User" },
    { email: "agent@Royamotorsuk.com", password: "agent123", role: "sales_agent", name: "Sales Agent" },
    { email: "user@Royamotorsuk.com", password: "user123", role: "customer", name: "John Doe" }
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

  // --- Step 2: Insert into public.users ---
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
      console.error(`⚠️ Failed to insert into public.users for ${u.email}:`, error.message);
    } else {
      console.log(`✅ Inserted into public.users: ${u.email}`);
    }
  }

  // --- Step 3: Seed vehicles using admin ---
  const adminUser = createdUsers.find((u) => u.role === "admin");
  if (!adminUser) throw new Error("❌ No admin user found, cannot seed vehicles");

  const vehicles = [
  {
    make: "Mercedes-Benz",
    model: "C-Class",
    variant: "C300 AMG Line",
    year: 2023,
    price: 8500000,
    mileage: 15000,
    fuel_type: "Petrol",
    transmission: "Automatic",
    body_type: "Sedan",
    color: "Black",
    description: "Luxury sedan with AMG styling and premium features.",
    features: ["Leather Seats", "Sunroof", "Navigation System", "Backup Camera", "Bluetooth"],
    status: "available",
    location: "Nairobi",
    image_urls: []
  },
  {
    make: "BMW",
    model: "5 Series",
    variant: "530i M Sport",
    year: 2022,
    price: 7800000,
    mileage: 28000,
    fuel_type: "Petrol",
    transmission: "Automatic",
    body_type: "Sedan",
    color: "Blue",
    description: "Sporty executive sedan with advanced features.",
    features: ["Heated Seats", "Premium Sound", "Keyless Entry", "Cruise Control"],
    status: "available",
    location: "Mombasa",
    image_urls: []
  },
  {
    make: "Audi",
    model: "Q5",
    variant: "45 TFSI Quattro",
    year: 2023,
    price: 9200000,
    mileage: 8500,
    fuel_type: "Petrol",
    transmission: "Automatic",
    body_type: "SUV",
    color: "White",
    description: "Premium midsize SUV with Quattro all-wheel drive.",
    features: ["All-Wheel Drive", "Virtual Cockpit", "Matrix LED", "Parking Sensors"],
    status: "reserved",
    location: "Nairobi",
    image_urls: []
  },
  {
    make: "Lexus",
    model: "RX",
    variant: "RX 350 F Sport",
    year: 2022,
    price: 8900000,
    mileage: 22000,
    fuel_type: "Petrol",
    transmission: "Automatic",
    body_type: "SUV",
    color: "Grey",
    description: "Luxury SUV with sporty F-Sport trim and advanced safety features.",
    features: ["Hybrid System", "Mark Levinson Audio", "Safety System+", "Wireless Charging"],
    status: "available",
    location: "Kisumu",
    image_urls: []
  },
  {
    make: "Jaguar",
    model: "F-PACE",
    variant: "P300 R-Dynamic",
    year: 2023,
    price: 10500000,
    mileage: 12000,
    fuel_type: "Petrol",
    transmission: "Automatic",
    body_type: "SUV",
    color: "Red",
    description: "Performance luxury SUV with British design and technology.",
    features: ["Meridian Sound", "Terrain Response", "Activity Key", "Gesture Tailgate"],
    status: "available",
    location: "Nairobi",
    image_urls: []
  },
  {
    make: "Porsche",
    model: "Macan",
    variant: "Macan S",
    year: 2023,
    price: 12800000,
    mileage: 5500,
    fuel_type: "Petrol",
    transmission: "Automatic",
    body_type: "SUV",
    color: "Silver",
    description: "Compact luxury SUV with Porsche DNA and thrilling performance.",
    features: ["Sport Chrono", "PASM", "Bose Audio", "Panoramic Roof"],
    status: "available",
    location: "Nairobi",
    image_urls: []
  },
  {
    make: "Land Rover",
    model: "Range Rover Evoque",
    variant: "P250 R-Dynamic",
    year: 2022,
    price: 7500000,
    mileage: 35000,
    fuel_type: "Petrol",
    transmission: "Automatic",
    body_type: "SUV",
    color: "White",
    description: "Compact luxury SUV with legendary off-road capability.",
    features: ["Terrain Response 2", "ClearSight", "Touch Pro Duo", "Wade Sensing"],
    status: "available",
    location: "Eldoret",
    image_urls: []
  },
  {
    make: "Volvo",
    model: "XC90",
    variant: "T6 Inscription",
    year: 2023,
    price: 11200000,
    mileage: 18000,
    fuel_type: "Hybrid",
    transmission: "Automatic",
    body_type: "SUV",
    color: "Black",
    description: "Flagship SUV with Scandinavian luxury and plug-in hybrid efficiency.",
    features: ["Pilot Assist", "Bowers & Wilkins", "Air Suspension", "Crystal Gear Shifter"],
    status: "available",
    location: "Nairobi",
    image_urls: []
  },
  {
    make: "Bentley",
    model: "Continental GT",
    variant: "W12",
    year: 2023,
    price: 245000,
    mileage: 1500,
    fuel_type: "Petrol",
    transmission: "Automatic",
    body_type: "Coupe",
    color: "Onyx Black",
    description: "Grand tourer blending breathtaking performance with luxury.",
    features: ["Mulliner Driving Spec", "Naim Audio", "Rotating Display", "Panoramic Roof"],
    status: "available",
    location: "Nairobi",
    image_urls: []
  },
  {
    make: "Land Rover",
    model: "Range Rover",
    variant: "SV Autobiography",
    year: 2022,
    price: 195000,
    mileage: 8500,
    fuel_type: "Petrol",
    transmission: "Automatic",
    body_type: "SUV",
    color: "Santorini Black",
    description: "Flagship SUV with luxury appointments and long wheelbase comfort.",
    features: ["Executive Seats", "Massage", "Meridian Sound", "Deployable Tables"],
    status: "available",
    location: "Mombasa",
    image_urls: []
  },
  {
    make: "Rolls-Royce",
    model: "Ghost",
    variant: "V12",
    year: 2022,
    price: 380000,
    mileage: 3200,
    fuel_type: "Petrol",
    transmission: "Automatic",
    body_type: "Sedan",
    color: "Arctic White",
    description: "Ultimate expression of effortless luxury and refinement.",
    features: ["Starlight Headliner", "Bespoke Audio", "Massage Seats", "Champagne Cooler"],
    status: "available",
    location: "Nairobi",
    image_urls: []
  },
  {
    make: "Aston Martin",
    model: "DBS Superleggera",
    variant: "V12",
    year: 2021,
    price: 275000,
    mileage: 5800,
    fuel_type: "Petrol",
    transmission: "Automatic",
    body_type: "Coupe",
    color: "Quantum Silver",
    description: "Super GT delivering 715hp with exquisite craftsmanship.",
    features: ["Carbon Fiber Pack", "Bang & Olufsen Audio", "Ceramic Brakes", "360 Camera"],
    status: "available",
    location: "Nairobi",
    image_urls: []
  },
  {
    make: "Mercedes-Benz",
    model: "S-Class",
    variant: "S680 Maybach",
    year: 2023,
    price: 230000,
    mileage: 2100,
    fuel_type: "Petrol",
    transmission: "Automatic",
    body_type: "Sedan",
    color: "Obsidian Black",
    description: "Maybach flagship sedan with ultimate comfort and luxury.",
    features: ["Executive Seats", "Burmester 4D", "Rear Entertainment", "Night Vision"],
    status: "available",
    location: "Nairobi",
    image_urls: []
  },
  {
    make: "Ferrari",
    model: "SF90 Stradale",
    variant: "Hybrid",
    year: 2022,
    price: 550000,
    mileage: 1200,
    fuel_type: "Hybrid",
    transmission: "Automatic",
    body_type: "Coupe",
    color: "Rosso Corsa",
    description: "Hybrid hypercar with 986hp combining V8 and electric motors.",
    features: ["Assetto Fiorano", "Carbon Wheels", "Racing Seats", "Track Telemetry"],
    status: "available",
    location: "Nairobi",
    image_urls: []
  },
  {
    make: "Ferrari",
    model: "Purosangue",
    variant: "V12",
    year: 2024,
    price: 425000,
    mileage: 750,
    fuel_type: "Petrol",
    transmission: "Automatic",
    body_type: "SUV",
    color: "Rosso Mugello",
    description: "Ferrari’s first four-door, four-seat SUV with 715hp V12.",
    features: ["Active Suspension", "Carbon Roof", "Heated Seats", "Dynamic Enhancer"],
    status: "available",
    location: "Nairobi",
    image_urls: []
  },
  {
    make: "Lamborghini",
    model: "Urus",
    variant: "V8 Twin-Turbo",
    year: 2024,
    price: 235000,
    mileage: 2800,
    fuel_type: "Petrol",
    transmission: "Automatic",
    body_type: "SUV",
    color: "Yellow",
    description: "Super SUV with 657hp and Lamborghini racing DNA.",
    features: ["ANIMA Modes", "Carbon Brakes", "Sport Exhaust", "Air Suspension"],
    status: "available",
    location: "Nairobi",
    image_urls: []
  },
  {
    make: "Land Rover",
    model: "Defender 110",
    variant: "V8",
    year: 2024,
    price: 95000,
    mileage: 4200,
    fuel_type: "Petrol",
    transmission: "Automatic",
    body_type: "SUV",
    color: "Carpathian Grey",
    description: "Rugged Defender with V8 power and luxury interior.",
    features: ["Terrain Response 2", "Wade Sensing", "Air Suspension", "3D Camera"],
    status: "available",
    location: "Nairobi",
    image_urls: []
  },
  {
    make: "Range Rover",
    model: "Sport",
    variant: "V8",
    year: 2024,
    price: 125000,
    mileage: 3500,
    fuel_type: "Petrol",
    transmission: "Automatic",
    body_type: "SUV",
    color: "Byron Blue",
    description: "Dynamic SUV combining performance and refinement.",
    features: ["Dynamic Response", "Meridian Sound", "Panoramic Roof", "Matrix LED"],
    status: "available",
    location: "Nairobi",
    image_urls: []
  },
  {
    make: "Bentley",
    model: "Bentayga",
    variant: "V8",
    year: 2024,
    price: 185000,
    mileage: 1800,
    fuel_type: "Petrol",
    transmission: "Automatic",
    body_type: "SUV",
    color: "Glacier White",
    description: "Luxury SUV with handcrafted interior and powerful V8.",
    features: ["Mulliner Spec", "Naim Audio", "All-Terrain", "Rotating Display"],
    status: "available",
    location: "Nairobi",
    image_urls: []
  },
  {
    make: "Mercedes-Benz",
    model: "S-Class",
    variant: "S450 4MATIC AMG",
    year: 2024,
    price: 155000,
    mileage: 2900,
    fuel_type: "Petrol",
    transmission: "Automatic",
    body_type: "Sedan",
    color: "Diamond Silver",
    description: "Flagship luxury sedan with AMG Line and latest MBUX tech.",
    features: ["MBUX Assistant", "Burmester 4D", "Executive Seats", "Driver Assist"],
    status: "available",
    location: "Nairobi",
    image_urls: []
  },
  {
    make: "Porsche",
    model: "Cayenne",
    variant: "V6 Turbo",
    year: 2024,
    price: 105000,
    mileage: 3100,
    fuel_type: "Petrol",
    transmission: "Automatic",
    body_type: "SUV",
    color: "Black",
    description: "Luxury SUV with Porsche performance and versatility.",
    features: ["PASM", "Sport Chrono", "Bose Audio", "Adaptive Cruise"],
    status: "available",
    location: "Nairobi",
    image_urls: []
  },
  {
    make: "Porsche",
    model: "Panamera",
    variant: "V6 Twin-Turbo",
    year: 2024,
    price: 145000,
    mileage: 2400,
    fuel_type: "Petrol",
    transmission: "Automatic",
    body_type: "Sedan",
    color: "Crayon",
    description: "Luxury four-door GT with Porsche driving dynamics.",
    features: ["PASM", "Sport Chrono", "Bose Audio", "Premium Package"],
    status: "available",
    location: "Nairobi",
    image_urls: []
  }
];

  const { error: vehiclesError } = await supabase.from("vehicles").insert(vehicles);
  if (vehiclesError) {
    console.error("❌ Failed to insert vehicles:", vehiclesError.message);
  } else {
    console.log(`✅ Inserted ${vehicles.length} vehicles`);
  }

  console.log("🌱 Seed complete!");
}

seed().catch((err) => {
  console.error("❌ Seeding failed:", err.message);
  process.exit(1);
});
