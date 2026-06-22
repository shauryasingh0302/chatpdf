import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function uploadToSupabase(
  file: File
): Promise<{ file_key: string; file_name: string }> {
  const file_key =
    "uploads/" + Date.now().toString() + file.name.replace(" ", "-");

  const { error } = await supabase.storage
    .from("ChatPDF")
    .upload(file_key, file);

  if (error) throw error;

  return {
    file_key,
    file_name: file.name,
  };
}

export function getSupabaseUrl(file_key: string) {
  const { data } = supabase.storage
    .from("ChatPDF")
    .getPublicUrl(file_key);

  return data.publicUrl;
}