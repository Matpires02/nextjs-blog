"use server";

import {
  IMAGE_SERVER_URL,
  IMAGE_UPLOAD_DIRECTORY,
  IMAGE_UPLOAD_MAX_SIZE,
} from "@/lib/constants";
import { mkdir, writeFile } from "fs/promises";
import { extname, resolve } from "path";

export async function uploadImageAction(
  formData: FormData,
): Promise<{ url: string; error?: string }> {
  if (!(formData instanceof FormData)) {
    return { error: "Dados inválidos", url: "" };
  }

  const file = formData.get("file");
  if (!(file instanceof File)) {
    return { error: "Arquivo inválido", url: "" };
  }

  if (file.size > IMAGE_UPLOAD_MAX_SIZE) {
    return { error: "Arquivo muito grande", url: "" };
  }

  if (!file.type.startsWith("image/")) {
    return { error: "Imagem Inválida", url: "" };
  }

  const fileExtension = extname(file.name);
  const uniqueImageName = `${Date.now()}${fileExtension}`;
  const uploadPath = resolve(process.cwd(), "public", IMAGE_UPLOAD_DIRECTORY);

  await mkdir(uploadPath, { recursive: true });

  const fileArrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(fileArrayBuffer);

  const filePath = resolve(uploadPath, uniqueImageName);

  await writeFile(filePath, buffer);

  const url = `${IMAGE_SERVER_URL}/${uniqueImageName}`;

  return { url: url };
}
