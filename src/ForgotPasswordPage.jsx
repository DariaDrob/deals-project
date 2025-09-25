import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ForgotPasswordPage() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [showMessage, setShowMessage] = useState(false);

    const handleSend = async () => {
        try {
            const response = await fetch('https://deals-project-ft1u.onrender.com/api/forgot-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });
            const data = await response.json();
            if (response.ok) {
                setMessage('Check your email for a new password');
                setShowMessage(true);
            } else {
                setMessage(data.error || 'Failed to send reset link');
                setShowMessage(true);
            }
        } catch (err) {
            setMessage('Server error');
            setShowMessage(true);
            console.error('Forgot password error:', err);
        }
    };

    const handleOk = () => {
        setShowMessage(false);
        setEmail(''); // Очищаем поле
    };

    return (
        <div className="forgot-password-page">
            <div className="top-bar"></div>
            <div className="login-btn" onClick={() => navigate('/login')}>Log In</div>
            <div className="login"></div>
            <div className="login-container">
                {showMessage && (
                    <div className="message-box">
                        <p className={message === 'Server error' ? 'text-red-500' : 'text-green-500'}>{message}</p>
                        <button className="ok-btn" onClick={handleOk}>
                            OK
                        </button>
                    </div>
                )}
                <h2>Forgot Password</h2>
                <div className="form-data">
                    <div className="form-group">
                        <label htmlFor="email">Enter your email</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Enter your email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <button className="sign-in-btn" onClick={handleSend}>
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ForgotPasswordPage;