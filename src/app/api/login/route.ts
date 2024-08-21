// /src/app/api/login/route.ts
import { NextResponse } from 'next/server';
import { compare  } from "bcrypt-ts";
import { SignJWT } from 'jose';
import { findByUsername } from './service';

export const runtime = 'edge'

const secretKey = new TextEncoder().encode(process.env.JWT_SECRET);

export async function POST(request: Request) {
    const { username, password } = await request.json() as { username: string, password: string };
    const userData = await findByUsername(username);
    if(userData.length === 0){
        return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    const user = userData[0];
    const passwordMatch = await compare(password, user.password);
    if (passwordMatch !== true) {
        return NextResponse.json({ message: 'Invalid password' }, { status: 401 });
    }

    const token = await new SignJWT({ id: user.id, username: user.username })
        .setProtectedHeader({ alg: 'HS256' })
        .setExpirationTime('20m')
        .sign(secretKey);
    const response = NextResponse.json({ message: 'Login successful' });
    response.cookies.set('token', token, {
        httpOnly: true,   // ป้องกันการเข้าถึงจาก JavaScript
        secure: process.env.NODE_ENV === 'production',  // ใช้ secure flag ใน production
        maxAge: 20 * 60,  // อายุของ cookie (20 นาที)
        path: '/',        // ให้ cookie ใช้งานได้ทั่วทั้งแอปพลิเคชัน
    });
    return response;
}



export async function GET(request: Request) {
    return NextResponse.json({ message: 'loggedin'}, { status: 200 });
}
