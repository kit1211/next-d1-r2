// /src/app/api/login/route.ts
import { NextResponse } from 'next/server';
import { compare  } from "bcrypt-ts";
import { SignJWT } from 'jose';
import { findByUsername } from './service';

export const runtime = 'edge'

const secretKey = new TextEncoder().encode(process.env.JWT_SECRET);

export async function POST(request: Request){

    const { username, password }: { username: string, password: string } = await request.json();
    const userData = await findByUsername(username);
    if(userData.length === 0){
        return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    const user = userData[0];
    if (!user.password) {
        return NextResponse.json({ message: 'Password not found' }, { status: 400 });
    }
    const passwordMatch = await compare(password, user.password);
    if (passwordMatch !== true) {
        return NextResponse.json({ message: 'Invalid password' }, { status: 401 });
    }

  

    const token = await new SignJWT({ id: user.id, username: user.username })
        .setProtectedHeader({ alg: 'HS256' })
        .setExpirationTime('20m')
        .sign(secretKey);
    
    return NextResponse.json({ message: 'Login_successful', token:"ss" });
}



// export async function POST(request: Request) {
//     const { username }: { username: string } = await request.json();

//     const userData = await geetAll(username);
//     return NextResponse.json({ message: 'loggedin', data: userData}, { status: 200 });
// }
