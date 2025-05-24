import { Post } from "../../models/post";
import { CreatePost } from "../../types/post/createPostType";
import { UpdatePost } from "../../types/post/updatePostType";
import { apiFetch } from "./fetch";
import { methodType } from "@/enums/methodType";

const baseUrl = '/api/posts';

export const getPosts = (): Promise<Post[]> => apiFetch<Post[]>(baseUrl);

export const createPost = (data: CreatePost): Promise<Post> => apiFetch<Post>(
    baseUrl,
    {
        method: methodType.POST,
        body: data,
    },
);

export const getPostById = (id: string): Promise<Post> => apiFetch<Post>(`${baseUrl}/${id}`);

export const updatePost = (id: string, data: UpdatePost): Promise<Post> => apiFetch<Post>(
    `${baseUrl}/${id}`,
    {
        method: methodType.PUT,
        body: data,
    },
);

export const deletePost = (id: string): Promise<Post> => apiFetch<Post>(
    `${baseUrl}/${id}`,
    { method: methodType.DELETE },
);
