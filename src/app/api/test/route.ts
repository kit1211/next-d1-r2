import { NextRequest, NextResponse } from 'next/server';

import { findAll, create , update} from './service';

export const runtime = 'edge'




export async function GET() {
    try {
        const data: any = await findAll();
        return NextResponse.json({ message: 'Success', data: data }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ message: 'Failed to process request', error: error.message }, { status: 500 });
    }
}




export async function POST(request: NextRequest) {
    try {
        const data: any = await request.json(); 
        const sendRequest: any = await create(data);
        return NextResponse.json({ message: 'Success', data: sendRequest });
    } catch (error: any) {
        return NextResponse.json({ message: 'Failed to process request', error: error.message }, { status: 500 });
    }
}


