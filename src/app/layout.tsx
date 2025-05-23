import Link from 'next/link'
import './globals.css'
import { Loading } from '@/components/loading/Loading'

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html
            lang='en'
            className='
                relative
            '
        >
            <body
                className='
                    font-sans
                    h-full
                '
            >
                <Loading />
                <header
                    className='
                        bg-gray-100
                        p-4
                        text-black
                        z-1
                    '
                >
                    <nav
                        className='
                            flex
                            gap-4
                        '
                    >
                        <Link
                            href='/'
                        >
                            Main
                        </Link>
                        <Link
                            href='/admin/posts'
                        >
                            Posts
                        </Link>
                    </nav>
                </header>
                <main>
                    {children}
                </main>
            </body>
        </html>
    )
}
