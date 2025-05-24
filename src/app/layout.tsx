import Link from 'next/link';
import './globals.css';
import { Loading } from '@/components/loading/Loading';
import { LoginButton } from '../components/auth/LoginButton';
import { AdminMenu } from '../components/adminMenu/AdminMenu';

export default async function RootLayout({ children }: { children: React.ReactNode }) {
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
                    <div
                        className='
                            flex
                            w-full
                        '
                    >
                        <nav
                            className='
                                flex
                                w-full
                                gap-4
                                items-center
                            '
                        >
                            <Link
                                href='/'
                            >
                                Main
                            </Link>
                            <Link
                                href='/blog'
                            >
                                Blog
                            </Link>
                            <AdminMenu />
                        </nav>
                        <LoginButton />
                    </div>
                </header>
                <main>
                    {children}
                </main>
            </body>
        </html>
    )
}
