import { prisma } from './prisma'

export async function logAction(
  action: string,
  details?: string,
  userEmail?: string,
  role?: string,
) {
  try {
    await prisma.logEntry.create({
      data: {
        action,
        details,
        userEmail,
        role,
      },
    })
  } catch (err) {
    console.error('Failed to log action:', err)
  }
}