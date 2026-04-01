"use client";

import { createPostAction } from "@/actions/post/create-post-action";
import { updatePostAction } from "@/actions/post/update-post-action";
import { Button } from "@/components/Button";
import ImageUploader from "@/components/ImageUploader";
import { InputCheckbox } from "@/components/InputCheckbox";
import { InputText } from "@/components/InputText";
import MarkdownEditor from "@/components/MarkdownEditor";
import { makePartialPublicPost, PublicPost } from "@/dto/post/dto";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useActionState, useEffect, useState } from "react";
import { toast } from "react-toastify";

type ManagePostFormUpdateProps = {
  publicPost: PublicPost;
  mode: "update";
};

type ManagePostFormCreateProps = {
  mode: "create";
};

type ManagePostFormProps =
  | ManagePostFormCreateProps
  | ManagePostFormUpdateProps;

export default function ManagePostForm(props: ManagePostFormProps) {
  const { mode } = props;
  const searchParams = useSearchParams();
  const created = searchParams.get("created");
  const router = useRouter();

  let publicPost;

  if (mode === "update") {
    publicPost = props.publicPost;
  }

  const initialState = {
    formState: makePartialPublicPost({ ...publicPost }),
    errors: [],
  };
  const [state, action, isPending] = useActionState(
    mode === "create" ? createPostAction : updatePostAction,
    initialState,
  );

  useEffect(() => {
    toast.dismiss();
    if (state.errors.length > 0) {
      state.errors.forEach((e) => toast.error(e));
    }
  }, [state.errors]);

  useEffect(() => {
    if (state.success) {
      toast.dismiss();
      toast.success("Post atualizado com sucesso!");
    }
  }, [state.success]);

  useEffect(() => {
    if (created === "1") {
      toast.dismiss();
      toast.success("Post criado com sucesso!");
      const url = new URL(window.location.href);
      url.searchParams.delete("created");
      router.replace(url.toString());
    }
  }, [created, router]);

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
          disabled={isPending}
          readOnly
        />
        <InputText
          labelText="Slug"
          name="slug"
          type="text"
          defaultValue={formState.slug}
          disabled={isPending}
          readOnly
        />
        <InputText
          labelText="Autor"
          name="author"
          placeholder="Digite o nome do autor"
          type="text"
          disabled={isPending}
          defaultValue={formState.author}
        />
        <InputText
          labelText="Título"
          name="title"
          placeholder="Digite o título"
          type="text"
          defaultValue={formState.title}
          disabled={isPending}
        />
        <InputText
          labelText="Excerto"
          name="excerpt"
          placeholder="Digite o resumo"
          type="text"
          defaultValue={formState.excerpt}
          disabled={isPending}
        />
        <MarkdownEditor
          labelText="Conteúdo"
          textAreaName="content"
          setValue={setContentValue}
          value={contentValue}
          disabled={isPending}
        />
        <ImageUploader disabled={isPending} />
        <InputText
          labelText="Url da imagem de capa"
          name="coverImageUrl"
          placeholder="Digite a url da imagem"
          type="text"
          defaultValue={formState.coverImageUrl}
          disabled={isPending}
        />

        <InputCheckbox
          labelText="Publicar?"
          name="published"
          placeholder="Digite a url da imagem"
          type="checkbox"
          defaultChecked={formState.published}
          disabled={isPending}
        />

        <div className="mt-4 flex gap-6">
          <Button type="submit" disabled={isPending}>
            Enviar
          </Button>

          <Button variant="ghost" type="button" disabled={isPending}>
            <Link href="/admin/post"> Voltar </Link>
          </Button>
        </div>
      </div>
    </form>
  );
}
