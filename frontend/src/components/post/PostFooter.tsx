import type { Post } from "@/types/post";

interface Props {
    post: Post;
}

export function PostFooter({ post }: Props) {
    return (
        <div className="post-footer">
            <div className="left">
                <span>👍 {post.upvotes_count}</span>
                <span>💬 {post.comments_count}</span>
            </div>

            <div className="right">
                {/* future: save / ask AI */}
            </div>
        </div>
    );
}