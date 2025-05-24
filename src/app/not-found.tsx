'use client'

import { useRouter } from "next/navigation";

export default function NotFoundPage() {
    const router = useRouter();

    return (
        <main
            className='
                p-8
                text-center
            '
        >
            <h1
                className='
                    text-3xl
                    font-bold
                    mb-4
                '
            >
                Page not found
            </h1>
            <button
                onClick={() => router.back()}
                className='
                    inline-block
                    bg-blue-600
                    text-white
                    px-4
                    py-2
                    rounded
                    hover:bg-blue-700
                '
            >
                Back
            </button>
        </main>
    )
}