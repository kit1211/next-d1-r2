import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { create, findAllImage, deleteByImageName } from './service';

const s3 = new S3Client({
    endpoint: 'https://69085aadf4ffd773057d9221f9040e9d.r2.cloudflarestorage.com',
    region: 'auto',
    credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY_ID || '',
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || '',
    },
});


export const runtime = 'edge';



export const POST = async (req: Request) => {
    try {
        const data = await req.formData();
        const file = data.get('file') as File;

        if (!file) {
            return new Response(JSON.stringify({ message: 'No file uploaded' }), { status: 400 });
        }
        const buffer = await file.arrayBuffer();
        const fileNameRepl = `${Date.now()}_${file.name}`;
        const params = {
            Bucket: process.env.R2_BUCKET_NAME!,
            Key: fileNameRepl,
            Body: Buffer.from(buffer),
            ContentType: file.type,
        };

        await s3.send(new PutObjectCommand(params));
        await create(fileNameRepl, process.env.R2_BUCKET_NAME!);
        return new Response(JSON.stringify({ message: 'File uploaded successfully', fileName: fileNameRepl }), { status: 200 });
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
        await s3.send(new DeleteObjectCommand(params));
        await deleteByImageName(fileName);
        return new Response(JSON.stringify({ message: 'File deleted successfully' }), { status: 200 });
    } catch (error) {
        console.error('Delete Error:', error);
        return new Response(JSON.stringify({ message: 'File deletion failed', error }), { status: 500 });
    }
};




export const GET = async () => {
    try {
        const result = await findAllImage();
        return new Response(JSON.stringify({ message: 'GETDATA', resullt: result }), { status: 200 });
    } catch (error) {
        console.error('Delete Error:', error);
        return new Response(JSON.stringify({ message: 'File deletion failed', error }), { status: 500 });
    }
};
