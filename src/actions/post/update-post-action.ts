"use server";

import {
  makePartialPublicPost,
  makePublicPostFormDb,
  PublicPost,
} from "@/dto/post/dto";
import { PostUpdateSchema } from "@/lib/post/validations";
import { PostModel } from "@/models/post/post-model";
import { postRepository } from "@/repositories/post";
import { getZodErrorMessages } from "@/utils/get-zod-error-message";
import { makeRandomString } from "@/utils/make-random-string";
import { revalidateTag } from "next/cache";

type UpdatePostState = {
  formState: PublicPost;
  errors: string[];
  success?: string;
};

export async function updatePostAction(
  prevState: UpdatePostState,
  formData: FormData,
): Promise<UpdatePostState> {
  if (!(formData instanceof FormData)) {
    return {
      formState: prevState.formState,
      errors: ["Dados Inválidos"],
    };
  }

  const id = formData.get("id")?.toString();

  if (!id) {
    return {
      formState: prevState.formState,
      errors: ["Dados Inválidos"],
    };
  }

  const formdataObj = Object.fromEntries(formData.entries());
  const zodParsedObj = PostUpdateSchema.safeParse(formdataObj);

  if (!zodParsedObj.success) {
    const errors = getZodErrorMessages(zodParsedObj.error.format());
    return {
      errors,
      formState: makePartialPublicPost(formdataObj),
    };
  }

  const validPostData = zodParsedObj.data;
  const newPost: PostModel = {
    ...(validPostData as PostModel),
    updatedAt: new Date().toISOString(),
  };
  let post;
  try {
    post = await postRepository.update(id, newPost);
  } catch (e: unknown) {
    if (e instanceof Error) {
      return {
        formState: makePartialPublicPost(formdataObj),
        errors: [e.message],
      };
    }

    return {
      formState: makePartialPublicPost(formdataObj),
      errors: ["Erro desconhecido"],
    };
  }

  revalidateTag("posts", "max");

  revalidateTag(`post-${post.slug}`, "max");

  return {
    formState: makePublicPostFormDb(post),
    errors: [],
    success: makeRandomString(),
  };
}
