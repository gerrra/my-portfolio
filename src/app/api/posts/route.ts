import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
    const posts = await prisma.post.findMany({
        orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json(posts);
}

export async function POST(req: Request) {
    const body = await req.json();
    const { title, content } = body;

    if (!title || !content) {
        return NextResponse.json({ error: 'All fields are required' }, { status: 400 })
    }

    const post = await prisma.post.create({
        data: { title, content },
    });

    return NextResponse.json(post);
}