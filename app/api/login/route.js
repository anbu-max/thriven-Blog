import { NextResponse } from "next/server";

// Simple in-memory storage to track failed login attempts by IP.
// Tracks IP -> { failedAttempts, lockUntil }
const loginAttempts = new Map();

export async function POST(request) {
    const { username, password } = await request.json();
    
    // Get client IP address
    const ip = request.headers.get("x-forwarded-for") || "127.0.0.1";
    const now = Date.now();

    // Check if the IP is currently rate-limited/locked
    if (loginAttempts.has(ip)) {
        const record = loginAttempts.get(ip);
        if (record.lockUntil > now) {
            const secondsLeft = Math.ceil((record.lockUntil - now) / 1000);
            return NextResponse.json(
                { error: `Too many failed login attempts. Brute-force protection active. Try again in ${secondsLeft} seconds.` },
                { status: 429 }
            );
        }
    }

    const AUTH_USER = process.env.ADMIN_USERNAME;
    const AUTH_PASS = process.env.ADMIN_PASSWORD;

    if (username === AUTH_USER && password === AUTH_PASS) {
        // Clear failed attempts on successful login
        loginAttempts.delete(ip);

        // Set an HttpOnly cookie for session
        const response = NextResponse.json({ success: true });
        
        // This is a simple session indicator for the middleware
        response.cookies.set('admin_session', 'true', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 60 * 60 * 24 * 7, // 7 days
            path: '/',
        });

        return response;
    }

    // Increment failed attempts count
    const record = loginAttempts.get(ip) || { failedAttempts: 0, lockUntil: 0 };
    record.failedAttempts += 1;
    
    if (record.failedAttempts >= 5) {
        record.lockUntil = now + 15 * 60 * 1000; // 15 minutes lockout
        record.failedAttempts = 0; // Reset counter for next lockout cycle
        loginAttempts.set(ip, record);
        
        return NextResponse.json(
            { error: "Too many failed attempts. Access locked for 15 minutes." },
            { status: 429 }
        );
    }
    
    loginAttempts.set(ip, record);
    const attemptsLeft = 5 - record.failedAttempts;
    return NextResponse.json(
        { error: `Invalid credentials. ${attemptsLeft} attempts remaining before lockout.` },
        { status: 401 }
    );
}

// Optional: Logout API
export async function DELETE() {
    const response = NextResponse.json({ success: true });
    response.cookies.set('admin_session', '', { maxAge: 0 });
    return response;
}

