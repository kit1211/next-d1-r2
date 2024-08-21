// /src/app/register/page.tsx
'use client';

import { useState } from 'react';

export default function RegisterPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [message, setMessage] = useState('');

    const handleRegister = async () => {
        try {
            setMessage('');
            if(password !== password2){
                setMessage('Passwords do not match!');
            }
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });

            const data: any = await response.json();
            if (response.ok) {
                setMessage('Registration successful! You can now log in.');
            } else {
                setMessage(data.message);
            }
        } catch (error) {
            setMessage('An error occurred during registration.');
        }
    };

    return (
        <div className="container-fluid m-2 d-flex justify-content-center">
            <div className="card w-50">
                <div className="card-body">
                    <h1>Register User!</h1>
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
                    <div className="mb-3 row">
                        <label className="col-sm-4 col-form-label">Password Confirm!</label>
                        <div className="col-sm-8">
                            <input type="text" className="form-control" placeholder="Password Again"  value={password2} onChange={(e) => setPassword2(e.target.value)}/>
                        </div>
                    </div>
                    <div className="d-flex align-items-end flex-column">
                        <button className="btn btn-secondary" onClick={handleRegister} >Register</button>
                    </div>
                    {message && (
                        message === "User_created" ? (
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
