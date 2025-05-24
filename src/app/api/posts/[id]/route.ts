import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { logAction } from '../../../../lib/log';
import { verifyJwt } from '../../../../lib/jwt';

export async function GET(
    req: Request,
    { params }: { params: { id: string } }
) {
    const { id } = await params;
    const post = await prisma.post.findUnique({ where: { id } });

    if (!post) {
        return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    return NextResponse.json(post);
}

export async function PUT(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    const { id } = await params;
    const body = await req.json();
    const { title, content } = body;

    if (!title || !content) {
        return NextResponse.json({ error: 'All fields are required' }, { status: 400 })
    }

    const token = req.cookies.get('admin_auth')?.value;
    const decoded = token ? verifyJwt(token) : null;
    const userEmail = decoded?.email;
    const role = decoded?.role;

    await logAction('UPDATE_POST', `Post ID: ${params.id}`, userEmail, role);

    const post = await prisma.post.update({
        where: { id },
        data: { title, content },
    });

    return NextResponse.json(post);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
    try {
        await prisma.post.delete({
            where: { id: params.id },
        });

        const token = req.cookies.get('admin_auth')?.value;
        const decoded = token ? verifyJwt(token) : null;
        const userEmail = decoded?.email;
        const role = decoded?.role;

        await logAction('DELETE_POST', `Post ID: ${params.id}`, userEmail, role);

        return NextResponse.json({ success: true });
    } catch (err) {
        console.error('Delete failed:', err);
        return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }
}