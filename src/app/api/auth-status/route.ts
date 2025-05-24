import { verifyJwt } from '@/lib/jwt'
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    const token = req.cookies.get('admin_auth')?.value;
    const decoded = token ? verifyJwt(token) : null;

    return NextResponse.json({ authorized: !!decoded, email: decoded?.email });
}