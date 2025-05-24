'use client'

import { useState, useEffect, useCallback } from 'react';
import { getPosts, createPost, deletePost } from '@/lib/api/posts';
import { Post } from '@/models/post';
import { useRouter } from 'next/navigation';
import ReactMarkdown from 'react-markdown';

export default function AdminPostsPage() {
    const router = useRouter();
    const [posts, setPosts] = useState<Post[]>([]);
    const [title, setTitle] = useState<string | null>(null);
    const [content, setContent] = useState<string | null>(null);

    const loadPosts = useCallback(
        () => {
            getPosts().then(setPosts);
        },
        [],
    );

    useEffect(
        () => loadPosts(),
        [loadPosts],
    );

    const handleSubmit = useCallback(
        (e: React.FormEvent) => {
            e.preventDefault();
            if (!title || !content) return;

            createPost({ title, content })
                .then(() => {
                    setTitle('');
                    setContent('');
                    loadPosts();
                })
        },
        [title, content, loadPosts],
    );

    const editPost = useCallback(
        (id: string) => {
            router.push(`/admin/posts/${id}`)
        },
        [router],
    );

    const deletePostAction = useCallback(
        (id: string) => {
            deletePost(id)
                .catch((err: string) => {
                    console.error('Ошибка при удалении:', err)
                })
                .then(loadPosts);
        },
        [loadPosts],
    );

    return (
        <div>
            <main
                className='p-8'
            >
                <h1
                    className='
                        text-2xl
                        font-bold
                        mb-4
                    '
                >
                    Create post
                </h1>
                <form
                    onSubmit={handleSubmit}
                    className='
                        mb-8
                        flex
                        flex-col
                        gap-4
                        max-w-lg
                    '
                >
                    <input
                        type='text'
                        placeholder='Title'
                        value={title ?? ''}
                        onChange={(e) => setTitle(e.target.value)}
                        className='
                            border
                            p-2
                            rounded
                        '
                    />
                    <textarea
                        placeholder='Content'
                        value={content ?? ''}
                        onChange={(e) => setContent(e.target.value)}
                        className='
                            border
                            p-2
                            rounded
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
                        Create post
                    </button>
                </form>
                <h1
                    className='
                        text-2xl
                        font-bold
                        mb-4
                    '
                >
                    Blog posts
                </h1>
                {
                    !posts.length
                        ? <div
                            className='
                                grid
                                grid-cols-1
                                text-lg
                                mb-4
                            '
                        >
                            <span>
                                There are no posts yet
                            </span>
                            <span>
                                Create a new one
                            </span>
                        </div>
                        : <ul
                            className='space-y-4'
                        >
                            {
                                posts.map((post) => (
                                    <li
                                        key={post.id}
                                        className='
                                            p-4
                                            rounded
                                            bg-gray-100
                                        '
                                    >
                                        <h2
                                            className='
                                                text-lg
                                                font-semibold
                                                mb-4
                                            '
                                        >
                                            {post.title}
                                        </h2>
                                        <div
                                            className='
                                                text-sm
                                                mb-2
                                            '
                                        >
                                            <ReactMarkdown>
                                                {post.content}
                                            </ReactMarkdown>
                                        </div>
                                        <p
                                            className='
                                                text-xs
                                                text-gray-500
                                                mb-2
                                            '
                                        >
                                            Created: {new Date(post.createdAt ?? '').toLocaleString()}
                                        </p>
                                        <p
                                            className='
                                                text-xs
                                                text-gray-500
                                                mb-2
                                            '
                                        >
                                            Updated: {new Date(post.updatedAt ?? '').toLocaleString()}
                                        </p>
                                        <p
                                            className='
                                                grid
                                                grid-cols-[auto_auto]
                                            '
                                        >
                                            <button
                                                type='submit'
                                                className='
                                                    bg-blue-500
                                                    text-white
                                                    px-4
                                                    py-2
                                                    rounded
                                                    justify-self-start
                                                '
                                                onClick={() => editPost(post.id)}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                type='submit'
                                                className='
                                                    bg-red-500
                                                    text-white
                                                    px-4
                                                    py-2
                                                    rounded
                                                    justify-self-end
                                                '
                                                onClick={() => deletePostAction(post.id)}
                                            >
                                                Delete
                                            </button>
                                        </p>
                                    </li>
                                ))
                            }
                        </ul>
                }
            </main>
        </div>
    )
}