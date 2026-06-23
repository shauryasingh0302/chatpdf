import { supabase } from "./supabase";
import fs from "fs";
import path from "path";

export async function downloadFromSupabase(file_key: string): Promise<string> {
  return new Promise(async (resolve, reject) => {
    try {
      const { data: obj, error } = await supabase.storage
        .from("ChatPDF")
        .download(file_key);

      if (error) {
        console.error(error);
        reject(error);
        return;
      }

      const tmpDir = "/tmp";

      // Ensure /tmp directory exists , this is the solution for this error
      if (!fs.existsSync(tmpDir)) {
        fs.mkdirSync(tmpDir);
      }

      const file_name = path.join(
        tmpDir,
        `${Date.now().toString()}.pdf`
      );

      const buffer = Buffer.from(await obj.arrayBuffer());

      fs.writeFileSync(file_name, buffer);

      return resolve(file_name);
    } catch (error) {
      console.error(error);
      reject(error);
      return null;
    }
  });
}

// downloadFromSupabase("uploads/1693568801787chongzhisheng_resume.pdf");