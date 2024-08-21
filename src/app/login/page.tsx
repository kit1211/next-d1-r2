// /src/app/login/page.tsx
'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LoginPage() {

    const [username, setUsername]   = useState('');
    const [password, setPassword]   = useState('');
    const [message, setMessage]     = useState('');
    const router = useRouter();


    const handleLogin = async () => {
        try {
            setMessage('');
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });
            const data: any = await response.json();
            if (response.ok) {
                localStorage.setItem('token', data.token);
                setMessage('Login successful');
                router.push('/uploader'); // Redirect หลังจากเข้าสู่ระบบสำเร็จ
            } else {
                setMessage(data.message);
            }
        } catch (error) {
            console.log(error)
            setMessage('An error occurred');
        }
    };

    return (
        <div className="container-fluid m-2 d-flex justify-content-center">
            <div className="card w-50">
                <div className="card-body">
                    <h1 className="mb-5 text-center">Login User!</h1>
                    <div className="mb-3 row">
                        <label className="col-sm-4 col-form-label">Username</label>
                        <div className="col-sm-8">
                            <input type="text" className="form-control" placeholder="Username"  value={username} onChange={(e) => setUsername(e.target.value)}/>
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <label className="col-sm-4 col-form-label">Password</label>
                        <div className="col-sm-8">
                            <input type="text" className="form-control" placeholder="Password"  value={password} onChange={(e) => setPassword(e.target.value)}/>
                        </div>
                    </div>
                    <div className="d-flex align-items-end flex-column">
                        <button className="btn btn-secondary" onClick={handleLogin} >Login</button>
                    </div>
                    {message && (
                        message === "Login_successful" ? (
                            <div className="alert alert-success mt-2" role="alert">
                                {message}
                            </div>
                        ) : (
                            <div className="alert alert-danger mt-2" role="alert">
                            {message}
                            </div>
                        )
                    )}
                </div>
            </div>
        </div>
    );
}
