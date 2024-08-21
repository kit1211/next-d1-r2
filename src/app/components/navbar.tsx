'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import LogoutButton from './LogoutButton';

const Nav = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // ตรวจสอบ JWT token จาก localStorage
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);  // ผู้ใช้เข้าสู่ระบบแล้ว
        } else {
            setIsLoggedIn(false);  // ผู้ใช้ยังไม่ได้เข้าสู่ระบบ
        }
    }, []);

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <Link className="navbar-brand" href="/">Next D1-R2</Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" href="/uploader">Uploader</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" href="/Manager">Manager</Link>
                        </li>
                    </ul>
                    <ul className="navbar-nav ml-auto mb-2 mb-lg-0">
                        {!isLoggedIn && (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" href="/register">Register</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" href="/login">Login</Link>
                                </li>
                            </>
                        )}
                        {isLoggedIn && (
                            <li className="nav-item">
                                <LogoutButton /> {/* ปุ่ม Logout จะแสดงเมื่อผู้ใช้เข้าสู่ระบบ */}
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Nav;
