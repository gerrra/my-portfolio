import * as t from 'io-ts'
import { DateFromISOString } from 'io-ts-types';

export const LogEntryType = t.type({
    id: t.string,
    action: t.union([t.string, t.null, t.undefined]),
    details: t.union([t.string, t.null, t.undefined]),
    userEmail: t.union([t.string, t.null, t.undefined]),
    role: t.union([t.string, t.null, t.undefined]),
    createdAt: t.union([DateFromISOString, t.null, t.undefined]),
});

export type LogEntryDTO = t.TypeOf<typeof LogEntryType>;

class LogEntry {
    id: string;
    action: string | null;
    details: string | null;
    userEmail: string | null;
    role: string | null;
    createdAt: Date | null;

    constructor(params: LogEntryDTO) {
        this.id = params.id;
        this.action = params.action ?? null;
        this.details = params.details ?? null;
        this.userEmail = params.userEmail ?? null;
        this.role = params.role ?? null;
        this.createdAt = params.createdAt ?? null;
    };
};

export { LogEntry };
