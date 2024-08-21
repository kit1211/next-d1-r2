// /src/app/api/register/route.ts
import { NextResponse } from 'next/server';
import { create, findByUsername, findAllUser } from './service';


export const runtime = 'edge'



export async function POST(request: Request) {
    const { username, password } = await request.json() as { username: string, password: string };
    const userExists = await findByUsername(username);
    if (userExists.length > 0) {
        return NextResponse.json({ message: 'User already exists' }, { status: 400 });
    }
    const user = await create(username, password);
    if (user.success === true) {
        return NextResponse.json({ message: 'User_created', data: user }, { status: 201 });
    }
    return NextResponse.json({ message: 'Failed to register' }, { status: 500 });
}


export async function GET(request: Request) {
    const user = await findAllUser();
    return NextResponse.json({ message: 'GetALL', data: user }, { status: 200 });
}
