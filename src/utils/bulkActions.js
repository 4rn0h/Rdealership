import { supabase } from "../supabaseClient";

const CHUNK_SIZE = 50; // chunk size for large updates

async function chunkArray(array, size) {
  const chunks = [];
  for (let i = 0; i < array.length; i += size) chunks.push(array.slice(i, i + size));
  return chunks;
}

/**
 * Handles bulk actions for selected vehicles
 * @param {string[]} vehicleIds
 * @param {string} action
 * @param {number} [percent]
 */
export async function handleBulkAction(vehicleIds, action, percent = 0) {
  if (!vehicleIds?.length) return;

  try {
    const chunks = await chunkArray(vehicleIds, CHUNK_SIZE);

    switch (action) {
      case "status-available":
      case "status-reserved":
      case "status-sold": {
        const newStatus = action.split("-")[1];
        for (const chunk of chunks) {
          const { error } = await supabase.from("vehicles").update({ status: newStatus }).in("id", chunk);
          if (error) throw error;
        }
        console.log(`✅ Updated ${vehicleIds.length} vehicles to status: ${newStatus}`);
        break;
      }

      case "price-increase":
      case "price-decrease": {
        // Fetch all vehicles
        const { data: vehiclesData, error: fetchError } = await supabase
          .from("vehicles")
          .select("id, price")
          .in("id", vehicleIds);
        if (fetchError) throw fetchError;

        // Apply updates in chunks
        for (const chunk of await chunkArray(vehiclesData, CHUNK_SIZE)) {
          const updates = chunk.map(v => {
            const factor = action === "price-increase" ? 1 + percent / 100 : 1 - percent / 100;
            return { id: v.id, price: Math.round(v.price * factor) };
          });

          for (const update of updates) {
            const { error } = await supabase.from("vehicles").update({ price: update.price }).eq("id", update.id);
            if (error) throw error;
          }
        }

        console.log(`✅ Updated prices for ${vehicleIds.length} vehicles`);
        break;
      }

      case "export": {
        const { data, error } = await supabase.from("vehicles").select("*").in("id", vehicleIds);
        if (error) throw error;

        const csv = [Object.keys(data[0]).join(","), ...data.map(row => Object.values(row).join(","))].join("\n");

        const blob = new Blob([csv], { type: "text/csv" });
        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.download = "vehicles_export.csv";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        console.log(`✅ Exported ${data.length} vehicles`);
        break;
      }

      case "delete": {
        for (const chunk of chunks) {
          const { error } = await supabase.from("vehicles").delete().in("id", chunk);
          if (error) throw error;
        }
        console.log(`✅ Deleted ${vehicleIds.length} vehicles`);
        break;
      }

      default:
        console.warn("⚠️ Unknown bulk action:", action);
    }
  } catch (err) {
    console.error("❌ Bulk action failed:", err.message);
  }
}
