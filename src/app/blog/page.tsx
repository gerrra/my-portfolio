import { getPosts } from '@/lib/api/posts'
import Link from 'next/link'
import { Post } from '../../models/post'

export default async function BlogPage() {
    const posts: Post[] = await getPosts();

    return (
        <main
            className='
                p-8
                max-w-3xl
                mx-auto
            '
        >
            <h1
                className='
                    text-3xl
                    font-bold
                    mb-6
                '
            >
                Blog
            </h1>
            <ul
                className='space-y-6'
            >
                {
                    posts.map((post: Post) => (
                        <li
                            key={post.id}
                            className='
                                border-b
                                pb-4
                            '
                        >
                            <Link
                                href={`/blog/${post.id}`}
                            >
                                <h2
                                    className='
                                        text-xl
                                        font-semibold
                                        hover:underline
                                    '
                                >
                                    {post.title}
                                </h2>
                            </Link>
                            {
                                post.createdAt &&
                                <p
                                    className='
                                        text-sm
                                        text-gray-500
                                    '
                                >
                                    {new Date(post.createdAt).toLocaleDateString()}
                                </p>
                            }
                        </li>
                    ))
                }
            </ul>
        </main>
    )
}