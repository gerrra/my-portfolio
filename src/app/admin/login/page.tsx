'use client'

import { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getAuthStatus, login } from '../../../lib/api/auth'
import { LoginResponse } from '../../../types/auth/loginResponse';
import { AuthStatusResponse } from '../../../types/auth/authStatusResponse';
import { useStore } from '../../../store/useStore';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();
    
    const checkAuth = useCallback(
        () => {
            getAuthStatus()
                .then((data: AuthStatusResponse) => useStore.setState({ isAuthorized: data.authorized }))
                .catch(() => useStore.setState({ isAuthorized: false }));
        },
        [],
    );

    useEffect(
        () => checkAuth(),
        [checkAuth],
    );

    const handleSubmit = useCallback(
        (e: React.FormEvent) => {
            e.preventDefault();
            if (!email || !password) return;

            login({ email, password })
                .then((res: LoginResponse) => {
                    if ('success' in res) {
                        checkAuth();
                        router.push('/admin/posts');
                    } else {
                        alert(res.error)
                    }
                })
                .catch(() => alert('Invalid login'));
        },
        [email, password, router, checkAuth],
    );

    return (
        <main
            className='
                p-8
                max-w-md
                mx-auto
            '
        >
            <h1
                className='
                    text-2xl
                    font-bold
                    mb-4
                '
            >
                Admin Login
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
                    type='email'
                    placeholder='Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className='
                        border
                        p-2
                        rounded
                    '
                />
                <input
                    type='password'
                    placeholder='Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
                        py-2
                        rounded
                    '
                >
                    Login
                </button>
            </form>
        </main>
    )
}