export function verifyLogin(email: string, password: string): boolean {
    return (
        email === process.env.ADMIN_EMAIL &&
        password === process.env.ADMIN_PASSWORD
    );
}
