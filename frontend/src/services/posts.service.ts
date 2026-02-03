import { supabase } from './supabaseClient'

export async function getPosts() {
    const { data, error } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', {ascending: false})
    
    if (error) throw error;
    return data;
}

export async function createPost(title: string, content: string, userId: string) {
    const { data, error } = await supabase
    .from('posts')
    .insert({
        title,
        content,
        author_id: userId
    })
    .select()
    .single();

    if(error) throw error;
    return data;
}

