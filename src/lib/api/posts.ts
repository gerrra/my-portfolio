import { Post } from "../../models/post";
import { CreatePost } from "../../types/post/createPostType";
import { UpdatePost } from "../../types/post/updatePostType";

export async function getPosts(): Promise<Post[]> {
    const res = await fetch('/api/posts');

    if (!res.ok) throw new Error('Failed to load posts')

    return res.json();
}

export async function createPost(data: CreatePost) {
    const res = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });

    if (!res.ok) throw new Error('Failed to create post')

    return res.json();
}

export async function getPostById(id: number): Promise<Post> {
    const res = await fetch(`/api/posts/${id}`);

    if (!res.ok) throw new Error('Failed to load post')

    return res.json();
}

export async function updatePost(id: number, data: UpdatePost) {
    const res = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });

    if (!res.ok) throw new Error('Failed to update post')

    return res.json();
}

export async function deletePost(id: number) {
    const res = await fetch(`/api/posts/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
    });

    if (!res.ok) {
        const error = await res.json()
        throw new Error(error?.message ?? 'Failed to delete post')
    }

    return res.json();
}