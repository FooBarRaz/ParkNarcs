"use server";
import { fetchFakeData, fetchPosts } from "@/app/lib/actions";
import { PostsGallery } from "./PostsGallery";

export const PostsFetcher = async () => {
    // const posts = await fetchPosts();
    const posts = await fetchFakeData();

    return <PostsGallery posts={posts} />
}
