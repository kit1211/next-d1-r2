'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
const LogoutButton = () => {
    const router = useRouter();

    const handleLogout = async () => {
        // เรียก API สำหรับ logout
        await fetch('/api/logout', {
            method: 'GET',
        });

        // Redirect ไปที่หน้า Login
        router.push('/login');
    };

    return (
   
        <Link className="nav-link" href="่javascript:;" onClick={handleLogout}>Logout</Link>
    );
};

export default LogoutButton;
