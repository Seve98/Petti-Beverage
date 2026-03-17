"use server";
import { supabaseAdmin } from "@/lib/supabase"; // USA QUESTO!
import { revalidatePath } from "next/cache";

export async function upsertProduct(formData: FormData) {
  // Verifichiamo che il client admin esista
  if (!supabaseAdmin) throw new Error("Chiave Admin non configurata");

  const imageFile = formData.get("immagine") as File;
  let immagine_url = "";

  // 1. Upload dell'immagine (se l'utente ha caricato un file)
  if (imageFile && imageFile.size > 0) {
    // Puliamo il nome file da spazi o caratteri strani
    const cleanFileName = `${Date.now()}-${imageFile.name.replace(/\s+/g, "_")}`;

    const { data: uploadData, error: uploadError } = await supabaseAdmin.storage
      .from("bottiglie")
      .upload(cleanFileName, imageFile, {
        cacheControl: "3600",
        upsert: false,
      });

    if (uploadError) {
      console.error("Errore Storage:", uploadError);
      return {
        success: false,
        error: "Errore durante l'upload dell'immagine.",
      };
    }

    // Generiamo l'URL pubblico
    const { data } = supabaseAdmin.storage
      .from("bottiglie")
      .getPublicUrl(cleanFileName);

    immagine_url = data.publicUrl;
  }

  // 2. Preparazione dati Database
  const nome = formData.get("nome") as string;
  const slug = nome
    .toLowerCase()
    .trim()
    .normalize("NFD") // Rimuove accenti (es. à -> a)
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-");

  // 3. Inserimento nel Database
  const { error } = await supabaseAdmin.from("prodotti").insert([
    {
      nome,
      slug,
      prezzo: parseFloat(formData.get("prezzo") as string),
      categoria: formData.get("categoria") as string,
      stock: parseInt(formData.get("stock") as string),
      descrizione: formData.get("descrizione") as string,
      immagine_url:
        immagine_url || (formData.get("immagine_url_backup") as string),
    },
  ]);

  if (error) {
    console.error("Errore DB:", error);
    return { success: false, error: "Errore durante il salvataggio dei dati." };
  }

  // Aggiorna sia il catalogo che la dashboard
  revalidatePath("/admin/catalogo");
  revalidatePath("/admin");

  return { success: true };
}
