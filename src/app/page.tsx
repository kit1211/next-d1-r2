import Link from "next/link";
import Image from "next/image";
export default function Home() {
    return (
        <div>

            <h2 className="text-center text-bg-primary m-2 p-2">
                Cloudflare Pages with Next.js and Wrangler + D1, R2
            </h2>
            <div className="container-fluid m-2 border border-success text-center">
                <h4>Lists</h4>
                <div className="row m-2">
                    <div className="col-6 col-md-8">
                        <p>รูปภาพทั้งหมด</p>

                        <div className="row">
                            {Array.from({ length: 10 }, (_, index) => (
                                <div key={index} className="col-6 col-md-3">
                                    <Image
                                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7lZtI1KAAtwY0Lkl_dYKR99F62zP1ANTkNkcHa9VTAZ62N9luix1jIfvUTq_gps1oM1o&usqp=CAU"
                                        alt={`Image ${index + 1}`}
                                        width={200}
                                        height={200}
                                        unoptimized={true}  // Consider using this only if external domains are not configured in next.config.js
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="col-6 col-md-4">Second Component</div>
                </div>
            </div>

        </div>
    );
}
