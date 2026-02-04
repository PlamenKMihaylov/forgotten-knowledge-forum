export interface Post {
    id: string;
    title: string;
    content: string;
    created_at: string;

    author: {
        id: string;
        username: string;
        avatar_url: string | null;
    }

    upvotes_count: number;
    comments_count: number;
    image_url?: string | null;
}