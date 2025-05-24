import { AuthStatusResponse } from "../../types/auth/authStatusResponse";
import { LoginResponse } from "../../types/auth/loginResponse";
import { LoginType } from "../../types/auth/loginType";
import { LogoutResponse } from "../../types/auth/logoutResponse";
import { apiFetch } from "./fetch";
import { methodType } from "@/enums/methodType";

export const getAuthStatus = (): Promise<AuthStatusResponse> => apiFetch<AuthStatusResponse>(
    '/api/auth-status',
);

export const login = (data: LoginType): Promise<LoginResponse> => apiFetch<LoginResponse>(
    '/api/login',
    {
        method: methodType.POST,
        body: data,
    },
);

export const logout = (): Promise<LogoutResponse> => apiFetch<LogoutResponse>(
    '/api/logout',
    {
        method: methodType.POST,
    },
);
