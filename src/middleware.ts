import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const secretKey = new TextEncoder().encode(process.env.JWT_SECRET);

export async function middleware(request: NextRequest) {
    // ดึงค่า token จาก cookie
    const token = request.cookies.get('token') ;
    if (!token) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    try {
        // ตรวจสอบ JWT
        const tokenValue = token.value; 
        await jwtVerify(tokenValue, secretKey);
        return NextResponse.next(); 
    } catch (error) {
        console.error('JWT verification failed:', error);
        return NextResponse.redirect(new URL('/login', request.url));
    }
}

// ใช้ middleware กับหน้า /uploader
export const config = {
    matcher: ['/uploader'],
};
