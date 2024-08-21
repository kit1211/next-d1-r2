import Link from "next/link";
import Image from "next/image";
export default function Home() {
    return (
        <div>

            <h2 className="text-center text-bg-primary m-2 p-2">
                Cloudflare Pages with Next.js and Wrangler + D1, R2
            </h2>



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
                                {Array.from({ length: 10 }, (_, index) => (
                                    <tr key={index}>
                                        <td>{index+1}</td>
                                        <td>
                                            รูป {index+1}
                                        </td>
                                        <td><Image
                                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7lZtI1KAAtwY0Lkl_dYKR99F62zP1ANTkNkcHa9VTAZ62N9luix1jIfvUTq_gps1oM1o&usqp=CAU"
                                                alt={`Image ${index + 1}`}
                                                width={100}
                                                height={100}
                                                unoptimized={true}  // Consider using this only if external domains are not configured in next.config.js
                                            /></td>
                                        <td>
                                            <button className="btn btn-secondary">ชมภาพ</button>
                                            <button className="btn btn-danger">ลบ</button>
                                        </td>
                                    </tr>
                                ))}
                                
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
