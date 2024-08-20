import { getRequestContext } from '@cloudflare/next-on-pages'
import { ProductParams } from '@/app/interfaces/product';



export const runtime = 'edge'
const DB = getRequestContext().env.DB;


export async function findAll() {
    const result = await DB.prepare('select * from product').run();
    return result.results;
}


export async function create(params: ProductParams) {
    const sql = `INSERT INTO product (name, description, price, quantity) VALUES  (?, ?, ?, ?)`;
    const result = await DB.prepare(sql).bind(params.name, params.description, params.price, params.quantity).run();
    if(result)
        return params;
}


// export async function update(params:type) {
//     const sql = `UPDATE product SET name = "${params.name}", description = "${params.description}", price = ${params.price}, quantity = ${params.quantity} WHERE id = ${params.id}`;
// }




export default { findAll, create }