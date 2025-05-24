import { NextResponse } from 'next/server';
import { verifyLogin } from '@/lib/auth';
import { logAction } from '@/lib/log';
import { signJwt } from '@/lib/jwt';

export async function POST(req: Request) {
    const { email, password } = await req.json();

    if (!verifyLogin(email, password)) {
        await logAction('LOGIN_FAILED', `email: ${email}`, email);
        return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const role = 'admin';
    const res = NextResponse.json({ success: true });
    const token = signJwt({ email, role });

    res.cookies.set('admin_auth', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
    })
    await logAction('LOGIN_SUCCESS', `email: ${email}`, email, role);

    return res;
};
