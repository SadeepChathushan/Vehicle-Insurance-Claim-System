import { createClient } from "@supabase/supabase-js";

const key = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZybWpncnRwem54aHRyZGdoanFiIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczODA3MjA0OCwiZXhwIjoyMDUzNjQ4MDQ4fQ.YAUbkIr18AYxKlJM7BoRdzvXqZJyreVUciwe08lBKWI`;
const url = "https://vrmjgrtpznxhtrdghjqb.supabase.co"; // The Supabase project URL

const supabase = createClient(url, key);

export default async function uploadMediaToSupabase(file) {
  return new Promise(async (resolve, reject) => {
    if (!file) {
      reject("No file provided");
      return;
    }

    const fileName = `${Date.now()}_${file.name}`;

    try {
      // Upload to your bucket named "Accidentimages"
      const { data: uploadData, error: uploadError } = await supabase
        .storage
        .from("Accidentimages")
        .upload(fileName, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (uploadError) {
        // e.g., "new row violates row-level security policy" or "Bucket not found"
        reject(`Upload failed: ${uploadError.message}`);
        return;
      }

      // Retrieve public URL (works if bucket is public or if there's a SELECT policy)
      const { data: publicData, error: publicUrlError } = supabase
        .storage
        .from("Accidentimages")
        .getPublicUrl(fileName);

      if (publicUrlError) {
        reject(`Failed to retrieve public URL: ${publicUrlError.message}`);
        return;
      }

      resolve(publicData.publicUrl);
    } catch (err) {
      reject(`Unexpected error: ${err.message}`);
    }
  });
}
