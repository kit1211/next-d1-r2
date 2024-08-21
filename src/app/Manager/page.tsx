'use client';

import Image from "next/image";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';


interface ImageData {
    id: number;
    name: string;
    bucket: string;
    createdAt: string;
}

interface ApiResponse {
    message: string;
    resullt: ImageData[];
}


const Manager = () => {
    const [images, setImages] = useState<ImageData[]>([]);  // สถานะสำหรับเก็บข้อมูลภาพที่ดึงมาจาก API
    const router = useRouter();

    useEffect(() => {
        // ตรวจสอบ JWT token จาก localStorage
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/login');
        } else {
            // ดึงข้อมูลจาก API
            fetchImages();
        }
    }, [router]);

    const fetchImages = async () => {
        try {
            const response = await fetch('/api/upload');
            const data = (await response.json()) as ApiResponse;
            if (response.ok) {
                setImages(data.resullt);  // เก็บข้อมูลภาพในสถานะ
            } else {
                console.error("Failed to fetch images", data.message);
            }
        } catch (error) {
            console.error("Error fetching images", error);
        }
    };

    return (
        <div className="container-fluid m-2">
            <div className="card">
                <div className="card-body">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>ลำดับ</th>
                                <th>ชื่อไฟล์</th>
                                <th>รูปภาพ</th>
                                <th>จัดการ</th>
                            </tr>
                        </thead>
                        <tbody>
                            {images.length > 0 ? (
                                images.map((image, index) => (
                                    <tr key={image.id}>
                                        <td>{index + 1}</td>
                                        <td>{image.name}</td>
                                        <td>
                                            <Image
                                                src={`https://pub-91f4534ac9b1454e914994eca5560a09.r2.dev/${image.name}`}  // URL ของรูปภาพ
                                                alt={image.name}
                                                width={100}
                                                height={100}
                                                unoptimized={true}  // ใช้ unoptimized ถ้า external domain ยังไม่ได้ตั้งค่าใน next.config.js
                                            />
                                        </td>
                                        <td>
                                            <a href={`https://pub-91f4534ac9b1454e914994eca5560a09.r2.dev/${image.name}`} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">ชมภาพ</a>
                                            <button className="btn btn-danger" onClick={() => handleDelete(image.name)}>ลบ</button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={4}>ไม่มีข้อมูลภาพ</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

const handleDelete = async (fileName: string) => {
    try {
        const response = await fetch('/api/upload', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ fileName }),
        });

        if (response.ok) {
            alert("ลบไฟล์สำเร็จ");
            location.reload();  // รีเฟรชหน้าเพื่อล้างข้อมูลเก่า
        } else {
            alert("ลบไฟล์ไม่สำเร็จ");
        }
    } catch (error) {
        console.error("Error deleting file", error);
        alert("เกิดข้อผิดพลาดขณะลบไฟล์");
    }
};

export default Manager;
