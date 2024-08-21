import { getRequestContext } from '@cloudflare/next-on-pages'

export const runtime = 'edge'
const DB = getRequestContext().env.DB;



export async function findByUsername(username: string) {
    try {
        const sql = `SELECT * FROM users WHERE username = ?`;
        const result = await DB.prepare(sql).bind(username).run();
        return result.results;
    } catch (error: any) {
        return error.message
        
    }
}



export default { findByUsername}

