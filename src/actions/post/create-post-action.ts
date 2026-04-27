"use server";

import { makePartialPublicPost, PublicPost } from "@/dto/post/dto";
import { verifyLoginSession } from "@/lib/login/manage-login";
import { PostCreateSchema } from "@/lib/post/validations";
import { PostModel } from "@/models/post/post-model";
import { postRepository } from "@/repositories/post";
import { getZodErrorMessages } from "@/utils/get-zod-error-message";
import { makeSlugFromText } from "@/utils/make-slug-from-text";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

type CreatePostState = {
  formState: PublicPost;
  errors: string[];
  success?: string;
};

export async function createPostAction(
  prevState: CreatePostState,
  formData: FormData,
): Promise<CreatePostState> {
  if (!(formData instanceof FormData)) {
    return {
      formState: prevState.formState,
      errors: ["Dados Inválidos"],
    };
  }

  const formdataObj = Object.fromEntries(formData.entries());
  const zodParsedObj = PostCreateSchema.safeParse(formdataObj);

  const isAuthenticated = await verifyLoginSession();
  if (!isAuthenticated) {
    return {
      errors: ["Faça login em outra aba antes de salvar"],
      formState: makePartialPublicPost(prevState.formState),
    };
  }

  if (!zodParsedObj.success) {
    const errors = getZodErrorMessages(zodParsedObj.error.format());
    return {
      errors,
      formState: makePartialPublicPost(prevState.formState),
    };
  }

  const validPostData = zodParsedObj.data;
  const newPost: PostModel = {
    ...validPostData,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    id: uuidv4(),
    slug: makeSlugFromText(validPostData.title),
  };

  try {
    await postRepository.create(newPost);
  } catch (e: unknown) {
    if (e instanceof Error) {
      return {
        formState: newPost,
        errors: [e.message],
      };
    }

    return {
      formState: newPost,
      errors: ["Erro desconhecido"],
    };
  }

  revalidateTag("posts", "max");

  redirect(`/admin/post/${newPost.id}?created=1`);
}
