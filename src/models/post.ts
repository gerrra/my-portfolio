import * as t from 'io-ts'
import { DateFromISOString } from 'io-ts-types';

export const PostType = t.type({
    id: t.number,
    title: t.union([t.string, t.null, t.undefined]),
    content: t.union([t.string, t.null, t.undefined]),
    createdAt: t.union([DateFromISOString, t.null, t.undefined]),
    updatedAt: t.union([DateFromISOString, t.null, t.undefined]),
});

export type PostDTO = t.TypeOf<typeof PostType>;

class Post {
    id: number;
    title: string | null;
    content: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;

    constructor(params: PostDTO) {
        this.id = params.id;
        this.title = params.title ?? null;
        this.content = params.content ?? null;
        this.createdAt = params.createdAt ?? null;
        this.updatedAt = params.updatedAt ?? null;
    };
};

export { Post };
