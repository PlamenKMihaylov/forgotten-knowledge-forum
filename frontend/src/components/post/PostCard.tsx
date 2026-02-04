import { Post } from "../../types/post";
import { PostHeader } from "./PostHeader";
import { PostBody } from "./PostBody";
import { PostFooter } from "./PostFooter";

interface Props {
  post: Post;
}

export function PostCard({ post }: Props) {
  return (
    <article className="post-card">
      <PostHeader post={post} />
      <PostBody post={post} />
      <PostFooter post={post} />
    </article>
  );
}
