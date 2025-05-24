'use client'

import Link from "next/link";
import { useStore } from "../../store/useStore";

export const AdminMenu = (() => {
    const isAuthorized = useStore((store) => store.isAuthorized);

    return (
        <>
            {
                isAuthorized &&
                <>
                    <Link
                        href='/admin/posts'
                    >
                        Posts
                    </Link>
                    <Link
                        href='/admin/logs'
                    >
                        Logs
                    </Link>
                </>
            }
        </>
    )
});
