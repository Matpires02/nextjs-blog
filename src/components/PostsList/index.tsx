import { postRepository } from "@/repositories/post";
import { PostCoverImage } from "../PostCoverImage";
import { PostSummary } from "../PostSumary";
import { findAllPublicPostCached } from "@/lib/post/queries/public";

export async function PostsList() {
  const posts = await findAllPublicPostCached();

  if (posts.length <= 1) return null;

  return (
    <div className="grid grid-cols-1 mb-16 gap-8 sm:grid-cols-2 md:grid-cols-3">
      {posts.slice(1).map((p) => {
        const postLink = `/post/${p.slug}`;

        return (
          <div key={p.id} className="flex flex-col gap-4 group">
            <PostCoverImage
              linkProps={{
                href: postLink,
              }}
              imageProps={{
                width: 1200,
                height: 720,
                src: p.coverImageUrl.replace("http://localhost:3000", ""),
                alt: p.title,
              }}
            />
            <PostSummary
              createdAt={p.createdAt}
              excerpt={p.excerpt}
              postHeading="h2"
              postLink={postLink}
              title={p.title}
            />
          </div>
        );
      })}
    </div>
  );
}
