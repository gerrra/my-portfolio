import { useStore } from '@/store/useStore';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

interface ApiFetchOptions {
    method?: HttpMethod
    body?: unknown
    headers?: HeadersInit
    query?: Record<string, string>
};

export async function apiFetch<T>(
    path: string,
    options: ApiFetchOptions = {}
): Promise<T> {
    useStore.setState({ loading: true });

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || '';
    const url = new URL(path, baseUrl);

    // Если есть query-параметры
    if (options.query) {
        Object.entries(options.query).forEach(([key, value]) => {
            url.searchParams.append(key, value);
        });
    }

    const res = await fetch(url.toString(), {
        method: options.method ?? 'GET',
        headers: {
            'Content-Type': 'application/json',
            ...options.headers,
        },
        body: options.body ? JSON.stringify(options.body) : undefined,
        cache: 'no-store',
    });

    if (!res.ok) {
        const error = await res.json().catch(() => null);
        useStore.setState({ loading: false });
        throw new Error(error?.message || `Request failed: ${res.status}`);
    }

    useStore.setState({ loading: false });
    return res.json();
}
