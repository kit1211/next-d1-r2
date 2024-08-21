import { getRequestContext } from '@cloudflare/next-on-pages'

import { NextResponse } from 'next/server';


export const runtime = 'edge'


export async function create(name:string, bucket:string) {
    try {
        const DB = getRequestContext().env.DB;

        const sql = `INSERT INTO image_info (name, bucket) VALUES  (?, ?)`;
        const result = await DB.prepare(sql).bind(name, bucket).run();
        return result;
    } catch (error: any) {
        return error.message
        
    }

}

export async function findAllImage() {
    try {
        const DB = getRequestContext().env.DB;

        const sql = `SELECT * FROM image_info`;
        const result = await DB.prepare(sql).bind().run();
        return result.results;
    } catch (error: any) {
        return error.message
        
    }
}

export async function findByName(name: string) {
    try {
        const DB = getRequestContext().env.DB;
        const sql = `SELECT * FROM image_info WHERE name = ?`;
        const result = await DB.prepare(sql).bind(name).run();
        return result.results;
    } catch (error: any) {
        return error.message
        
    }
}



export async function deleteByImageName(name: string) {
    try{
        const DB = getRequestContext().env.DB;
        const sql = `DELETE FROM image_info WHERE name = ?`;
        const result = await DB.prepare(sql).bind(name).run();
        if(result)
            return result.success;
    }catch(error: any){
        return error.message
    }
}




export default {  create, findByName, findAllImage, deleteByImageName }

