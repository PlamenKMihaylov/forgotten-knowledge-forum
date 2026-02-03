import { supabase } from "./supabaseClient";

export async function getComments(postId: string) {
    const { data, error } = await supabase
    .from('comments')
    .select('*')
    .eq('post_id', postId)
    .order('created_at');

    if(error) throw error;
    return data;
}

export async function createComment(postId: string, content: string, userId: string) {
    const { data, error } = await supabase
    .from('comments')
    .insert({
        post_id: postId,
        content,
        user_id: userId
    })
    .select()
    .single();

    if(error) throw error;
    return data;
}