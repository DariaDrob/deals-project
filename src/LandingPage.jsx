import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDeals } from './dealsSlice';

function LandingPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { deals, loading, error } = useSelector((state) => state.deals);

    useEffect(() => {
        dispatch(fetchDeals());
    }, [dispatch]);

    if (loading) return <p>Loading deals...</p>;
    if (error) return <p style={{ color: 'red' }}>Error: {error} <button onClick={() => window.location.reload()}>Retry</button></p>;

    return (
        <div>
            <div className="top-bar"></div>
            <div className="signup-btn" onClick={() => navigate('/register')}>Sign Up</div>
            <div className="login-btn" onClick={() => navigate('/login')}>Log In</div>
            <div className="background">
                <div className="overlay"></div>
                <div className="main-heading">The chemical negatively charged</div>
                <div className="subtext">
                    Numerous calculations predict, and experiments confirm, that the force field reflects the beam,
                    while the mass defect is not formed. The chemical compound is negatively charged. Twhile the mass
                    defect is
                </div>
                <div className="get-started-btn" onClick={() => navigate('/login')}>Get Started</div>
            </div>
            <div className="deals-section landing-deals-section">
                <h2 className="deals-heading landing-deals-heading">Open Deals</h2>
                <div className="deals-grid landing-deals-grid">
                    {deals.map((deal, index) => (
                        <div
                            key={deal.id}
                            className={`picture${index + 1}`}
                            style={{
                                width: '630px',
                                height: '400px',
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                backgroundImage: `url(${deal.image_url})`,
                                position: 'relative',
                            }}
                        >
                            <div
                                style={{
                                    position: 'absolute',
                                    color: 'white',
                                    textShadow: '1px 1px 2px black',
                                }}
                            >
                                <div style={{ top: '297px', left: '14px', position: 'absolute', fontFamily: "'Merriweather', serif", fontSize: '20px', whiteSpace: 'nowrap' }}>{deal.title}</div>
                                <div style={{ top: '336px', left: '14px', position: 'absolute', fontFamily: "'Lato', sans-serif", fontSize: '18px', whiteSpace: 'nowrap' }}>{deal.price}</div>
                                <div style={{ top: '336px', left: '244px', position: 'absolute', fontFamily: "'Lato', sans-serif", fontSize: '18px', whiteSpace: 'nowrap' }}>Yield {deal.yield}</div>
                                <div style={{ top: '336px', left: '474px', position: 'absolute', fontFamily: "'Lato', sans-serif", fontSize: '18px', whiteSpace: 'nowrap' }}>Sold {deal.sold}</div>
                                <div style={{ top: '363px', left: '14px', position: 'absolute', fontFamily: "'Lato', sans-serif", fontSize: '18px', whiteSpace: 'nowrap' }}>Tiket - {deal.tiket}</div>
                                <div style={{ top: '363px', left: '244px', position: 'absolute', fontFamily: "'Lato', sans-serif", fontSize: '18px', whiteSpace: 'nowrap' }}>Days left {deal.days_left}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default LandingPage;