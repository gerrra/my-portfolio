'use client'

import { useCallback, useEffect } from "react";
import { getAuthStatus, logout } from "../../lib/api/auth";
import { usePathname, useRouter } from "next/navigation";
import { AuthStatusResponse } from "../../types/auth/authStatusResponse";
import { useStore } from "../../store/useStore";

export const LoginButton = (() => {
    const router = useRouter();
    const pathname = usePathname();
    const loginPageName = '/admin/login';
    const isAuthorized = useStore((store) => store.isAuthorized);

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

    const handle = async () => {
        if (isAuthorized) {
            await logout();
            checkAuth();
        }
        router.push('/admin/login');
    };

    return (
        <>
            {
                pathname !== loginPageName &&
                <button
                    onClick={handle}
                    className='
                        bg-blue-500
                        text-white
                        px-4
                        py-2
                        rounded
                    '
                >
                    {isAuthorized ? 'Logout' : 'Login'}
                </button>
            }
        </>
    )
});
