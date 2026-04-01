"use client";

import { createPostAction } from "@/actions/post/create-post-action";
import { Button } from "@/components/Button";
import ImageUploader from "@/components/ImageUploader";
import { InputCheckbox } from "@/components/InputCheckbox";
import { InputText } from "@/components/InputText";
import MarkdownEditor from "@/components/MarkdownEditor";
import { makePartialPublicPost, PublicPost } from "@/dto/post/dto";
import { useActionState, useEffect, useState } from "react";
import { toast } from "react-toastify";

type ManagePostFormProps = {
  publicPost?: PublicPost;
};

export default function ManagePostForm({ publicPost }: ManagePostFormProps) {
  const initialState = {
    formState: makePartialPublicPost({ ...publicPost }),
    errors: [],
  };
  const [state, action, ispending] = useActionState(
    createPostAction,
    initialState,
  );

  useEffect(() => {
    toast.dismiss();
    if (state.errors.length > 0) {
      state.errors.forEach((e) => toast.error(e));
    }
  }, [state.errors]);

  const { formState } = state;

  const [contentValue, setContentValue] = useState(publicPost?.content || "");
  return (
    <form action={action} className="mb-16">
      <div className="flex flex-col gap-6">
        <InputText
          labelText="Id"
          name="id"
          type="text"
          defaultValue={formState.id}
          readOnly
        />
        <InputText
          labelText="Slug"
          name="slug"
          type="text"
          defaultValue={formState.slug}
          readOnly
        />
        <InputText
          labelText="Autor"
          name="author"
          placeholder="Digite o nome do autor"
          type="text"
          defaultValue={formState.author}
        />
        <InputText
          labelText="Título"
          name="title"
          placeholder="Digite o título"
          type="text"
          defaultValue={formState.title}
        />
        <InputText
          labelText="Excerto"
          name="excerpt"
          placeholder="Digite o resumo"
          type="text"
          defaultValue={formState.excerpt}
        />
        <MarkdownEditor
          labelText="Conteúdo"
          textAreaName="content"
          setValue={setContentValue}
          value={contentValue}
        />
        <ImageUploader />
        <InputText
          labelText="Url da imagem de capa"
          name="coverImageUrl"
          placeholder="Digite a url da imagem"
          type="text"
          defaultValue={formState.coverImageUrl}
        />

        <InputCheckbox
          labelText="Publicar?"
          name="published"
          placeholder="Digite a url da imagem"
          type="checkbox"
          defaultChecked={formState.published}
        />

        <div className="mt-4">
          <Button type="submit">Enviar</Button>
        </div>
      </div>
    </form>
  );
}
