type Props = {
  posts: {
    id: string;
    title: string;
    image: string;
  }[];
};
export const PostsGallery = async ({ posts }: Props) => {
  return posts.map((post) => (
    <div>
      <div>{post.title}</div>
      <img src={post.image} alt={post.title} />
    </div>
  ));
};

export default PostsGallery;
