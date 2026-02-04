import type { Post } from "@/types/post";

interface Props {
    post: Post;
}

export function PostBody({ post }: Props) {
    return (
        <div className="post-body">
            <h3>{post.title}</h3>

            <p className="post-content">
                {post.content}
            </p>

            {post.image_url && (
                <img 
                    src={post.image_url} 
                    alt={post.title}
                    className="post-image"
                />
            )}
        </div>
    );
}