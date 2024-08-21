import AWS from 'aws-sdk';

const s3 = new AWS.S3({
    endpoint: 'https://69085aadf4ffd773057d9221f9040e9d.r2.cloudflarestorage.com', // ใช้ endpoint ของ R2 ของคุณ
    accessKeyId: process.env.R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
    region: 'auto', // ใช้ 'auto' สำหรับ R2
});

export const POST = async (req: Request) => {
    try {
        const data = await req.formData();
        const file = data.get('file') as File;

        if (!file) {
            return new Response(JSON.stringify({ message: 'No file uploaded' }), { status: 400 });
        }

        // อ่านไฟล์เป็น Buffer
        const buffer = await file.arrayBuffer();  // แปลง ReadableStream เป็น ArrayBuffer
        const fileBuffer = Buffer.from(buffer);   // แปลง ArrayBuffer เป็น Buffer

        const params = {
            Bucket: process.env.R2_BUCKET_NAME!, // ตั้งค่าชื่อ Bucket ของคุณ
            Key: `${Date.now()}_${file.name}`, // ตั้งชื่อไฟล์ใน R2
            Body: fileBuffer,
            ContentType: file.type,
        };

        const uploadResult = await s3.upload(params).promise();
        // console.log('Upload Result:', uploadResult);
        return new Response(JSON.stringify({ message: 'File uploaded successfully', fileNamee: uploadResult.Key }), { status: 200 });
    } catch (error) {
        console.error('Upload Error:', error);
        return new Response(JSON.stringify({ message: 'File upload failed', error }), { status: 500 });
    }
};




export const DELETE = async (req: Request) => {
    try {
        const { fileName }: { fileName: string } = await req.json();
        if (!fileName) {
            return new Response(JSON.stringify({ message: 'No file name provided' }), { status: 400 });
        }
        const params = {
            Bucket: process.env.R2_BUCKET_NAME!,
            Key: fileName,
        };
        await s3.deleteObject(params).promise();
        return new Response(JSON.stringify({ message: 'File deleted successfully' }), { status: 200 });
    } catch (error) {
        console.error('Delete Error:', error);
        return new Response(JSON.stringify({ message: 'File deletion failed', error }), { status: 500 });
    }
};