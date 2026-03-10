import PostListAdmin from "@/components/PostListAdmin";
import SpinLoader from "@/components/SpinLoader";
import { findAllPostsAdmin } from "@/lib/post/queries/admin";
import { Metadata } from "next";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Post Admin",
};
export default async function AdminPostPage() {
  return (
    <Suspense fallback={<SpinLoader containerClasses="mb-16" />}>
      <PostListAdmin />
    </Suspense>
  );
}
