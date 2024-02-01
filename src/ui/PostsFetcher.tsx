import { fetchPosts } from "@/app/lib/actions";
import PostsGallery from "./PostsGallery";

export async function PostsFetcher() {
  const posts = await fetchPosts();

  return ( <PostsGallery posts={posts} />
  );
};
