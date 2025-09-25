// src/lib/supabaseClient.js
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// ✅ Enable session persistence and auto refresh
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});

// Bucket name for vehicle images
const BUCKET_NAME = "vehicle-image";

/**
 * Upload a vehicle image to Supabase Storage
 * @param {File} file - The image file to upload
 * @returns {string} Public URL of the uploaded file
 */
export async function uploadVehicleImage(file) {
  try {
    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}-${Math.random()
      .toString(36)
      .slice(2)}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(fileName, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (uploadError) throw uploadError;

    // Generate a public URL
    const { data } = supabase.storage.from(BUCKET_NAME).getPublicUrl(fileName);

    return data.publicUrl;
  } catch (err) {
    console.error("❌ Failed to upload image:", err.message);
    throw err;
  }
}

/**
 * Delete a vehicle image from Supabase Storage
 * @param {string} publicUrl - The public URL of the image to delete
 * @returns {boolean} true if deleted successfully
 */
export async function deleteVehicleImage(publicUrl) {
  try {
    const baseUrl = `${supabaseUrl}/storage/v1/object/public/${BUCKET_NAME}/`;
    if (!publicUrl.startsWith(baseUrl)) {
      throw new Error("Invalid public URL for Supabase Storage");
    }

    const filePath = publicUrl.replace(baseUrl, "");

    const { error: deleteError } = await supabase.storage
      .from(BUCKET_NAME)
      .remove([filePath]);

    if (deleteError) throw deleteError;

    console.log(`🗑️ Deleted image: ${filePath}`);
    return true;
  } catch (err) {
    console.error("❌ Failed to delete image:", err.message);
    return false;
  }
}
