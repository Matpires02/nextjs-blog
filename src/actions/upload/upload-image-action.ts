"use server";

import { verifyLoginSession } from "@/lib/login/manage-login";
import { mkdir, writeFile } from "fs/promises";
import { extname, resolve } from "path";

const IMAGE_UPLOAD_MAX_SIZE =
  Number(process.env.NEXT_PUBLIC_MAX_SIZE) || 921600;
const IMAGE_UPLOAD_DIRECTORY = process.env.IMAGE_UPLOAD_DIRECTORY || "uploads";
const IMAGE_SERVER_URL =
  process.env.IMAGE_SERVER_URL || "http://localhost:3000/uploads";

export async function uploadImageAction(
  formData: FormData,
): Promise<{ url: string; error?: string }> {
  const isAuthenticated = await verifyLoginSession();
  if (!isAuthenticated) {
    return {
      error: "Faça login em outra aba antes de salvar",
      url: "",
    };
  }

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
