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

export async function deleteById(id: string) {
    try{
        const sql = `DELETE FROM product WHERE id = ?`;
        const result = await DB.prepare(sql).bind(id).run();
        if(result)
            return result.success;
    }catch(error: any){
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

export async function update(params:any, obj:any) {
    try {
        const id:string = params;
        const objm:any = obj;
        // console.log('id', id);
        // console.log('params', objm);
        const data:any = await findById(id);

        //ตรวจสอบมีการเปลี่ยนแปลงค่าหรือไม่ ถ้าไม่ก็รีเทิร์น error ออกไป
        if(!objm.name && !objm.description && !objm.price && !objm.quantity)
            return 'No data change';
    
        // ตรวจสอบค่าที่รับเข้ามา หากไม่มีให้ใช้ค่าจาก findbyid
        const name = objm.name || data[0].name;
        const description = objm.description || data[0].description;
        const price = objm.price || data[0].price;
        const quantity = objm.quantity || data[0].quantity;
        
        const sql = `UPDATE product SET name = ?, description = ?, price = ?, quantity = ? WHERE id = ?`;
        const result = await DB.prepare(sql).bind(name, description, price, quantity, id).run();
        if(result)
            return result.success;

    } catch (error: any) {
        return error.message
    }
}




export default { findAll, create, update, findById, deleteById }