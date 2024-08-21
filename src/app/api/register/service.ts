import { getRequestContext } from '@cloudflare/next-on-pages'
import { genSaltSync, hashSync } from "bcrypt-ts";

import { NextResponse } from 'next/server';


export const runtime = 'edge'



export async function create(username: string, password: string) {
    try {
        const DB = getRequestContext().env.DB;
        const hash = hashSync(password, genSaltSync(10));
        const sql = `INSERT INTO users (username, password) VALUES  (?, ?)`;
        const result = await DB.prepare(sql).bind(username, hash).run();
        return result;
    } catch (error: any) {
        return error.message
        
    }

}

export async function findAllUser() {
    try {

        const DB = getRequestContext().env.DB;

        const sql = `SELECT * FROM users`;
        const result = await DB.prepare(sql).bind().run();
        return result.results;
    } catch (error: any) {
        return error.message
        
    }
}

export async function findByUsername(username: string) {
    try {
        const DB = getRequestContext().env.DB;

        const sql = `SELECT * FROM users WHERE username = ?`;
        const result = await DB.prepare(sql).bind(username).run();
        return result.results;
    } catch (error: any) {
        return error.message
        
    }
}





export default {  create, findByUsername, findAllUser }

