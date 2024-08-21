import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function GET(request: Request) {
    const baseUrl = new URL(request.url).origin; // ดึง base URL จาก request
    const response = NextResponse.redirect(`${baseUrl}/login`); // สร้าง URL ที่ถูกต้องสำหรับการ redirect

    // ลบ cookie โดยการตั้งค่า maxAge เป็น 0
    response.cookies.set('token', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 0, // ลบ cookie
        path: '/',
        sameSite: 'lax',
    });

    return response;
}
