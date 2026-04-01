"use server";
import { drizzleDb } from "@/db/drizzle";
import { postTable } from "@/db/drizzle/schemas";
import { postRepository } from "@/repositories/post";
import { logColor } from "@/utils/log-color";
import { eq } from "drizzle-orm";
import { revalidateTag } from "next/cache";

export async function deletePostAction(id: string) {
  // TODO: checar login do usuário

  logColor("" + id);

  if (!id || typeof id !== "string") {
    return {
      error: "Dados Inválidos",
    };
  }

  const post = await postRepository.findById(id).catch(() => undefined);

  if (!post) {
    return {
      error: "Post não existe",
    };
  }

  await drizzleDb.delete(postTable).where(eq(postTable.id, id));

  revalidateTag("posts", "max");
  revalidateTag(`post-${post.slug}`, "max");

  return {
    error: undefined,
  };
}
