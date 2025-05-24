'use client'

import { useCallback, useEffect, useState } from 'react';
import { getPostById, updatePost } from '@/lib/api/posts';
import { useParams, useRouter } from 'next/navigation';

export default function EditPostPage() {
    const params = useParams();
    const router = useRouter();
    const id = params.id as string;
    const [title, setTitle] = useState<string | null>(null);
    const [content, setContent] = useState<string | null>(null);

    useEffect(
        () => {
            getPostById(id).then(post => {
                setTitle(post.title);
                setContent(post.content);
            });
        },
        [id],
    );

    const handleSubmit = useCallback(
        (e: React.FormEvent) => {
            e.preventDefault();
            if (!title || !content) return;

            updatePost(id, { title, content })
                .then(() => router.push('/admin/posts'))
        },
        [title, content, router, id],
    );

    return (
        <main
            className='
                p-8
                max-w-2xl
            '
        >
            <h1
                className='
                    text-2xl
                    font-bold
                    mb-4
                '
            >
                Edit Post
            </h1>
            <form
                onSubmit={handleSubmit}
                className='
                    flex
                    flex-col
                    gap-4
                '
            >
                <input
                    type='text'
                    placeholder='Title'
                    value={title ?? ''}
                    onChange={(e) => setTitle(e.target.value)}
                    className='border p-2 rounded'
                />
                <textarea
                    placeholder='Content'
                    value={content ?? ''}
                    onChange={(e) => setContent(e.target.value)}
                    className='
                        border
                        p-2
                        rounded
                        min-h-[150px]
                    '
                />
                <button
                    type='submit'
                    className='
                        bg-blue-500
                        text-white
                        px-4
                        py-2
                        rounded
                    '
                >
                    Save
                </button>
            </form>
        </main>
    )
}