'use client';

import { useRouter } from 'next/navigation';

const LogoutButton = () => {
    const router = useRouter();

    const handleLogout = () => {
        // ลบ JWT token ออกจาก localStorage
        localStorage.removeItem('token');
        router.push('/login'); // Redirect ไปที่หน้า Login หลังจาก logout
    };

    return (
        <button onClick={handleLogout} className="btn btn-danger">
            Logout
        </button>
    );
};

export default LogoutButton;
