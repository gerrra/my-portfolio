import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { logAction } from '../../../lib/log';
import { verifyJwt } from '../../../lib/jwt';

export async function GET() {
    const posts = await prisma.post.findMany({
        orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json(posts);
}

export async function POST(req: NextRequest) {
    const body = await req.json();
    const { title, content } = body;

    if (!title || !content) {
        return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }
    const token = req.cookies.get('admin_auth')?.value;
    const decoded = token ? verifyJwt(token) : null;
    const userEmail = decoded?.email;
    const role = decoded?.role;

    await logAction('CREATE_POST', title, userEmail, role);

    const post = await prisma.post.create({
        data: { title, content },
    });

    return NextResponse.json(post);
}
