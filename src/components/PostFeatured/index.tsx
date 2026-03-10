import { postRepository } from "@/repositories/post";
import { PostCoverImage } from "../PostCoverImage";
import { PostSummary } from "../PostSumary";
import { findAllPublicPostCached } from "@/lib/post/queries/public";

export async function PostFeatured() {
  const posts = await findAllPublicPostCached();
  const post = posts[0];
  const postLink = `/post/${post.slug}`;
  return (
    <section className="grid grid-cols-1 gap-8 mb-16 sm:grid-cols-2 group">
      <PostCoverImage
        linkProps={{
          href: postLink,
        }}
        imageProps={{
          width: 1200,
          height: 720,
          src: post.coverImageUrl,
          alt: "Alt da imagem",
          priority: true,
        }}
      />
      <PostSummary
        createdAt={post.createdAt}
        excerpt={post.excerpt}
        postHeading="h1"
        postLink={postLink}
        title={post.title}
      />
    </section>
  );
}
