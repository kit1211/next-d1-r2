import { NextRequest, NextResponse } from 'next/server';
import { findById, update } from '../service';


export const runtime = 'edge'



export async function PATCH(request: NextRequest, { params }: { params: { test: string }}) {
    try {
        const id:string = params.test; 
        const inComingData: any = await request.json();
        const data = await update(id, inComingData);
        
        return NextResponse.json({ message: 'Successxxxx', result: data });
    } catch (error: any) {
        return NextResponse.json({ message: 'Failed to process request', error: error.message }, { status: 500 });
    }
}

