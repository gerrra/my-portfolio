import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
    req: Request,
    { params }: { params: { id: string } }
) {
    const id = parseInt(params.id);
    const post = await prisma.post.findUnique({ where: { id } });

    if (!post) {
        return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    return NextResponse.json(post);
}

export async function PUT(
    req: Request,
    { params }: { params: { id: string } }
) {
    const id = parseInt(params.id);
    const body = await req.json();
    const { title, content } = body;

    if (!title || !content) {
        return NextResponse.json({ error: 'All fields are required' }, { status: 400 })
    }

    const post = await prisma.post.update({
        where: { id },
        data: { title, content },
    });

    return NextResponse.json(post);
}

export async function DELETE(
    req: Request,
    { params }: { params: { id: string } }
) {
    const id = parseInt(params.id);

    const post = await prisma.post.delete({ where: { id } });

    return NextResponse.json(post);
}
