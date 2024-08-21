
"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from 'next/navigation';

interface UploaderProps { }

const Uploader: React.FC<UploaderProps> = () => {

    const router = useRouter();
    useEffect(() => {
        // ตรวจสอบ JWT token จาก localStorage
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/login');
        }
    }, [router]);


    const [file, setFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);
    const [message, setMessage] = useState<string>("");
    const [fileName, setFileName] = useState<string>("");

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFile(e.target.files[0]);
        }
    };

    const handleUpload = async () => {
        if (!file) {
            setMessage("Please select a file first.");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        setUploading(true);
        setMessage("");
        setFileName("");

        try {
            const response = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });
            console.log(response);
            if (response.ok) {
                const responseData: any = await response.json();
                setFileName(responseData.fileName);
                setMessage("File uploaded successfully!");
            } else {
                setMessage("File upload failed.");
            }
        } catch (error) {
            setMessage("Error uploading file.");
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="container-fluid m-2 d-flex justify-content-center">
            <div className="card w-50">
                <div className="card-body">
                    <h3 className='mb-3'>Image Uploader with Cloudflare R2 Database</h3>
                    <div className="input-group mb-3">
                        <input type="file" className="form-control" accept="image/*" onChange={handleFileChange} />
                        <button type="button" className="btn btn-success" onClick={handleUpload} disabled={uploading}>{uploading ? "Uploading..." : "Upload"}</button>
                    </div>
                    {message && (
                        message === "File uploaded successfully!" ? (
                            <div className="alert alert-success" role="alert">
                                <Link className="nav-link active" href={`https://pub-91f4534ac9b1454e914994eca5560a09.r2.dev/${fileName}`} target="_blank" rel="noopener noreferrer">
                                    ชมภาพ https://pub-91f4534ac9b1454e914994eca5560a09.r2.dev/{fileName}
                                </Link>
                            </div>
                        ) : (
                            <div className="alert alert-danger" role="alert">
                                {message}
                            </div>
                        )
                    )}

                </div>
            </div>
        </div>
    );
};

export default Uploader;
