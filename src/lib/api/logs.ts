import { prisma } from '@/lib/prisma'
import { LogEntry } from '../../models/logEntry';

export async function getLogEntries(limit = 50): Promise<LogEntry[]> {
    return prisma.logEntry.findMany({
        orderBy: { createdAt: 'desc' },
        take: limit,
    });
};
