import { NextRequest, NextResponse } from 'next/server';
import { update, deleteById } from '../service';


export const runtime = 'edge'



export async function PATCH(request: NextRequest, { params }: { params: { test: string }}) {
    try {
        const id:string = params.test; 
        const inComingData: any = await request.json();
        const data = await update(id, inComingData);
        
        return NextResponse.json({ message: 'Success', result: data }, { status: 204  });
    } catch (error: any) {
        return NextResponse.json({ message: 'Failed to process request', error: error.message }, { status: 500 });
    }
}



export async function DELETE(request: NextRequest, { params }: { params: { test: string }}) {
    try {
        const id:string = params.test; 
        const deleted = await deleteById(id);
        
        return NextResponse.json({ message: 'Success', result: deleted }, { status: 500 });
    } catch (error: any) {
        return NextResponse.json({ message: 'Failed to process request', error: error.message }, { status: 500 });
    }
}