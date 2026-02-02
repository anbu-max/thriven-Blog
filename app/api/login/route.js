import { NextResponse } from "next/server";

export async function POST(request) {
    const { username, password } = await request.json();

    const AUTH_USER = process.env.ADMIN_USERNAME;
    const AUTH_PASS = process.env.ADMIN_PASSWORD;

    if (username === AUTH_USER && password === AUTH_PASS) {
        // Set an HttpOnly cookie for session
        const response = NextResponse.json({ success: true });
        
        // This is a simple session indicator for the middleware
        response.cookies.set('admin_session', 'true', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 60 * 60 * 24, // 24 hours
            path: '/',
        });

        return response;
    }

    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
}

// Optional: Logout API
export async function DELETE() {
    const response = NextResponse.json({ success: true });
    response.cookies.set('admin_session', '', { maxAge: 0 });
    return response;
}
