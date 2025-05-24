import { getPostById } from '@/lib/api/posts';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';

type Params = {
    params: { id: string }
}

export default async function BlogPostPage({ params }: Params) {
    const { id } = await params;
    const post = await getPostById(id).catch(() => null);

    if (!post) return notFound();

    return (
        <main
            className='
                p-8
                max-w-3xl
                mx-auto
                prose
            '
        >
            <h1>
                {post.title}
            </h1>
            <ReactMarkdown>
                {post.content}
            </ReactMarkdown>
            {
                post.createdAt &&
                <p
                    className='
                        text-sm
                        text-gray-500
                        mt-4
                    '
                >
                    {new Date(post.createdAt).toLocaleDateString()}
                </p>
            }
        </main>
    )
}