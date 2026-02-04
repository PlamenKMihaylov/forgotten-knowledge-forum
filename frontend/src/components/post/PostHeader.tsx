import type { Post } from "@/types/post";
import avatar from "@assets/avatar-placeholder.webp"

interface Props {
    post: Post;
}

export function PostHeader({ post }: Props) {
    return (
        <div>
            <img src={post.author.avatar_url ?? avatar}
                alt={post.author.username} 
                className="avatar"
            />
            <div>
                <strong>{post.author.username}</strong>
                <span>{new Date(post.created_at).toLocaleDateString()}</span>
            </div>
        </div>
    );
}