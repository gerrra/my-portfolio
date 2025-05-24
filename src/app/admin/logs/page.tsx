import { getLogEntries } from '@/lib/api/logs'
import { LogEntry } from '../../../models/logEntry'

export default async function LogsPage() {
    const logs: LogEntry[] = await getLogEntries();

    return (
        <main
            className='
                p-8
                max-w-3xl
                mx-auto
            '
        >
            <h1
                className='
                    text-2xl
                    font-bold
                    mb-4
                '
            >
                Action log
            </h1>
            <ul
                className='space-y-2'
            >
                {
                    logs.map((log: LogEntry) => (
                        <li
                            key={log.id}
                            className='
                                border-b
                                py-2
                                grid
                                grid-cols-1
                                gap-2
                            '
                        >
                            <strong>
                                {log.action}
                            </strong>
                            <span
                                className='text-gray-600'
                            >
                                {log.details}
                            </span>
                            {
                                log.userEmail &&
                                <span
                                    className='text-gray-600'
                                >
                                    👤 {log.userEmail}
                                </span>
                            }
                            {
                                log.userEmail &&
                                <span
                                    className='text-gray-600'
                                >
                                    Role: {log.role}
                                </span>
                            }
                            <div
                                className='
                                    text-sm
                                    text-gray-400
                                '
                            >
                                {new Date(log.createdAt ?? '').toLocaleString()}
                            </div>
                        </li>
                    ))
                }
            </ul>
        </main>
    )
}