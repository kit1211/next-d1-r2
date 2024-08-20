import type { NextRequest, NextResponse } from 'next/server'
import { getRequestContext } from '@cloudflare/next-on-pages'

export const runtime = 'edge'
const DB = getRequestContext().env.DB;

export async function GET(request: NextRequest) {
    const result = await DB.prepare('select * from product').run();
    const data = result.results;
    return new Response(JSON.stringify(data), {
        headers: { 'Content-Type': 'application/json' },
        status: 200 
    });
}


export async function POST(request: NextRequest) {

    console.log("request", request.body);
    // const productName = "name";
    // const description = "testvvb";
    // const price = 200.00;
    // const quantity = 70;
    // const sql = `INSERT INTO product (name, description, price, quantity) VALUES ("${productName}", "${description}", ${price}, ${quantity})`;
    // const result = await DB.prepare(sql).run();


    // return new Response(JSON.stringify({ success: true, message: "Product added successfully", data: request.body }), {
    //     headers: { 'Content-Type': 'application/json' },
    //     status: 201 // HTTP status code 201 for Created
    // });
}