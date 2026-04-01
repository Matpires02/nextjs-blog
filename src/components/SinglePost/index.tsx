import { findPublicPostBySlugCached } from "@/lib/post/queries/public";
import Image from "next/image";
import { PostHeading } from "../PostHeading";
import { PostDate } from "../PostDate";
import { SafeMarkdown } from "../SafeMarkdown";
import { notFound } from "next/navigation";

type SinglePostParams = {
  slug: string;
};
export async function SinglePost({ slug }: SinglePostParams) {
  const post = await findPublicPostBySlugCached(slug);

  if (!post || !post.published) notFound();

  return (
    <article className="mb-16">
      <header className="group flex flex-col gap-4 mb-4">
        <Image
          src={post.coverImageUrl}
          width={1200}
          height={720}
          alt={post.title}
          className="rounded-xl"
          priority
        />

        <PostHeading url={`/post/${post.slug}`}>{post.title}</PostHeading>

        <p>
          {post.author} | <PostDate dateTime={post.createdAt} />
        </p>
      </header>
      <p className="mb-4 text-xl text-slate-600 dark:text-slate-50 dark:opacity-75">
        {post.excerpt}
      </p>
      <SafeMarkdown markdown={post.content} />
    </article>
  );
}
