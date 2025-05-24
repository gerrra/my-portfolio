import { prisma } from '../src/lib/prisma'

async function main() {
  await prisma.post.createMany({
    data: [
      {
        title: 'Building a Portfolio with Next.js',
        content: 'Step-by-step guide to building a personal portfolio using Next.js and Tailwind CSS.',
      },
      {
        title: 'Understanding Server and Client Components',
        content: 'Clear explanation of how to separate logic and UI between server and client in App Router.',
      },
      {
        title: 'How to Protect Routes in Next.js',
        content: 'Learn how to use middleware to protect admin-only routes using JWT tokens.',
      },
      {
        title: 'Creating a Blog with Prisma and PostgreSQL',
        content: 'Walkthrough of setting up a blog backend with Prisma ORM and a PostgreSQL database.',
      },
      {
        title: 'Form Validation in Next.js',
        content: 'Implementing robust form validation using Zod or React Hook Form in client components.',
      },
      {
        title: 'Using Zustand for Global State',
        content: 'Simple and efficient global state management with Zustand for React and Next.js apps.',
      },
      {
        title: 'Logging Admin Actions in Your App',
        content: 'Track logins, post edits, and deletions with a Prisma model and logAction() utility.',
      },
      {
        title: 'Deploying Next.js Projects on Vercel',
        content: 'How to deploy your app, connect a domain, and set up environment variables on Vercel.',
      },
      {
        title: 'Responsive Layouts with Tailwind CSS',
        content: 'Best practices for creating responsive, mobile-first layouts using Tailwind utility classes.',
      },
      {
        title: 'Creating Reusable UI Components',
        content: 'Learn how to build clean, flexible, reusable UI components in a Next.js project.',
      },
    ],
  })

  console.log('✅ Posts seeded successfully')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding posts:', e)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })