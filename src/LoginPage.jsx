import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginSuccess, loginFailure } from './authSlice.jsx';

function LoginPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { error } = useSelector((state) => state.auth);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();
            if (response.ok) {
                dispatch(loginSuccess());
                navigate('/deals');
            } else {
                dispatch(loginFailure(data.error || 'Login failed'));
            }
        } catch (err) {
            dispatch(loginFailure('Server error'));
            console.error('Login error:', err);
        }
    };

    console.log('LoginPage.jsx loaded');
    return (
        <div>
            <div className="top-bar"></div>
            <div className="login"></div>
            <div className="login-container">
                <h2>Login</h2>
                <div className="form-data">
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="forgot">
                        <a href="#" onClick={() => navigate('/forgot-password')}>
                            Forgot password?
                        </a>
                    </div>
                    <button className="sign-in-btn" onClick={handleLogin}>Sign In</button>
                    <p className="signup">
                        Don’t have account? <a href="#" onClick={() => navigate('/register')}>Sign Up</a>
                    </p>
                    {error && <p className="text-red-500 text-center mt-2">{error}</p>}
                </div>
            </div>
        </div>
    );
}

export default LoginPage;