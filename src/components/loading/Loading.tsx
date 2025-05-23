'use client'

import { useStore } from '@/store/useStore'

export const Loading = (() => {
    const loading = useStore((store) => store.loading);

    return (
        <div>
            <div
                className={`
                    grid
                    items-center
                    absolute
                    w-full
                    h-full
                    bg-black/50
                    transition-opacity
                    duration-300
                    inset-0
                    text-center
                    text-white
                    text-2xl
                    ${
                        loading
                            ? 'opacity-100 pointer-events-auto'
                            : 'opacity-0 pointer-events-none'
                    }
                `}
            >
                Loading...
            </div>
        </div>
    )
});
