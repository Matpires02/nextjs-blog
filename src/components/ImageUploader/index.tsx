"use client";

import { Form, ImageUpIcon } from "lucide-react";
import { Button } from "../Button";
import { useRef, useState, useTransition } from "react";
import { IMAGE_UPLOAD_MAX_SIZE } from "@/lib/constants";
import { toast } from "react-toastify";
import { uploadImageAction } from "@/actions/upload/upload-image-action";
import { asyncDelay } from "@/utils/async-delay";

export default function ImageUploader() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, startTransition] = useTransition();
  const [imageUrl, setImageUrl] = useState("");

  function handleChooseFile(): void {
    toast.dismiss();
    if (!fileInputRef.current) return;

    fileInputRef.current.click();
  }

  function handleChange(): void {
    if (!fileInputRef.current) return;
    const fileInput = fileInputRef.current;
    const file = fileInput?.files?.[0];
    if (!file) {
      fileInput.value = "";
      setImageUrl("");
      return;
    }

    if (file.size > IMAGE_UPLOAD_MAX_SIZE) {
      const max = IMAGE_UPLOAD_MAX_SIZE;
      toast.error(`Imagem muito grande. Máx.: ${max}KB.`);

      fileInput.value = "";
      setImageUrl("");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    startTransition(async () => {
      const result = await uploadImageAction(formData);

      if (result.error) {
        toast.error(result.error);
        fileInput.value = "";
        setImageUrl("");
        return;
      }

      toast.success("Imagem enviada");
      setImageUrl(result.url);
    });

    fileInput.value = "";
  }

  return (
    <div className="flex flex-col gap-4">
      <Button
        type="button"
        className="self-start"
        onClick={handleChooseFile}
        disabled={isUploading}
      >
        <ImageUpIcon />
        Enviar uma imagem
      </Button>

      {!!imageUrl && (
        <div className="flex flex-col gap-4">
          <p>
            <b>URL:</b> {imageUrl}
          </p>

          {/* eslint-disable-next-line */}
          <img src={imageUrl} className="rounded-lg" alt="uploaded image" />
        </div>
      )}
      <input
        ref={fileInputRef}
        type="file"
        name="file"
        accept="image/*"
        className="hidden"
        onChange={handleChange}
        disabled={isUploading}
      />
    </div>
  );
}
