"use server";
import { supabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

export async function upsertProduct(formData: FormData) {
  const imageFile = formData.get("immagine") as File;
  let immagine_url = "";

  // 1. Upload dell'immagine se presente
  if (imageFile && imageFile.size > 0) {
    const fileName = `${Date.now()}-${imageFile.name}`;
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("bottiglie")
      .upload(fileName, imageFile);

    if (uploadError)
      throw new Error("Errore upload immagine: " + uploadError.message);

    // Recuperiamo l'URL pubblico
    const { data: publicUrl } = supabase.storage
      .from("bottiglie")
      .getPublicUrl(fileName);

    immagine_url = publicUrl.publicUrl;
  }

  // 2. Inserimento dati nel Database
  const nome = formData.get("nome") as string;
  const slug = nome
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-");

  const { error } = await supabase.from("prodotti").insert([
    {
      nome,
      slug,
      prezzo: parseFloat(formData.get("prezzo") as string),
      categoria: formData.get("categoria") as string,
      stock: parseInt(formData.get("stock") as string),
      descrizione: formData.get("descrizione") as string,
      immagine_url: immagine_url || formData.get("immagine_url_backup"), // Fallback se non c'è file
    },
  ]);

  if (error) return { success: false, error: error.message };

  revalidatePath("/admin");
  return { success: true };
}
