import { getRequestContext } from '@cloudflare/next-on-pages'
import { ProductParamCreate, ProductParamUpdate } from '@/app/interfaces/product';


export const runtime = 'edge'
const DB = getRequestContext().env.DB;


export async function findAll() {
    try {
        const result = await DB.prepare('select * from product').run();
        return result.results;
    } catch (error: any) {
        return error.message
        
    }
}


export async function create(params: ProductParamCreate) {
    try {
        const sql = `INSERT INTO product (name, description, price, quantity) VALUES  (?, ?, ?, ?)`;
        const result = await DB.prepare(sql).bind(params.name, params.description, params.price, params.quantity).run();
        if(result)
            return params;
    } catch (error: any) {
        return error.message
        
    }

}

export async function findById(id: string) {
    try {
        const sql = `SELECT * FROM product WHERE id = ?`;
        const result = await DB.prepare(sql).bind(id).run();
        return result.results;
    } catch (error: any) {
        return error.message
        
    }
}

export async function update(params:any, obj:object) {
    try {
        const id:string = params;
        const objm:object = obj;
        console.log('id', id);
        console.log('params', objm);
        // use findById
        // console.log('id', id);
        const data:any = await findById(id);

        // const sql = `UPDATE product SET name = ?, description = ?, price = ?, quantity = ? WHERE id = ?`;
        // const result = await DB.prepare(sql).bind(name, description, price, quantity, id).run();
        // if(result)
            return data;
    } catch (error: any) {
        return error.message
        
    }
}




export default { findAll, create, update, findById }