import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { registerSuccess, registerFailure } from './authSlice';

function RegistrationPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { error } = useSelector((state) => state.auth);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();
            if (response.ok) {
                dispatch(registerSuccess());
                navigate('/login');
            } else {
                dispatch(registerFailure(data.error || 'Registration failed'));
            }
        } catch (err) {
            dispatch(registerFailure('Server error'));
        }
    };

    console.log('RegistrationPage.jsx loaded');
    return (
        <div>
            <div className="top-bar"></div>
            <div className="login-btn" onClick={() => navigate('/login')}>Log In</div>
            <div className="login"></div>
            <div className="login-container">
                <h2>Registration</h2>
                <div className="form-data">
                    <div className="form-group">
                        <label htmlFor="email">Your Email</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Your Email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Your Password</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Your Password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button className="sign-in-btn" onClick={handleRegister}>Register</button>
                    {error && <p className="text-red-500 text-center mt-2">{error}</p>}
                </div>
            </div>
        </div>
    );
}

export default RegistrationPage;