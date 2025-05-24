import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET!

type TokenPayload = {
    email: string
    role: 'admin'
};

export function signJwt(payload: TokenPayload): string {
    return jwt.sign(payload, secret, {
        expiresIn: process.env.JWT_EXPIRES_IN || '1d',
    });
}

export function verifyJwt(token: string): TokenPayload | null {
    try {
        return jwt.verify(token, secret) as TokenPayload;
    } catch {
        return null;
    }
}