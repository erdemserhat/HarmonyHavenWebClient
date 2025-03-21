import { useState, useEffect } from 'react';
import './login-register-screen.css';
import { FcGoogle } from 'react-icons/fc';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import {authService} from "@/services/api/auth.service.js";

const promotionalImages = [
    'http://harmonyhaven.erdemserhat.com/sources/ps/1.jpg',
    'https://harmonyhaven.erdemserhat.com/sources/ps/2.jpg',
    'https://harmonyhaven.erdemserhat.com/sources/ps/3.jpg',
    'https://harmonyhaven.erdemserhat.com/sources/ps/4.jpg',
    'https://harmonyhaven.erdemserhat.com/sources/ps/5.jpg',
    'https://harmonyhaven.erdemserhat.com/sources/ps/6.jpg'
];

export function LoginRegisterScreen() {
    const [isLoginMode, setIsLoginMode] = useState(true);
    const [showPasswords, setShowPasswords] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentImageIndex((prevIndex) => 
                prevIndex === promotionalImages.length - 1 ? 0 : prevIndex + 1
            );
        }, 5000); // Her 5 saniyede bir resim değişecek

        return () => clearInterval(timer);
    }, []);

    const handleImageClick = (direction) => {
        if (direction === 'next') {
            setCurrentImageIndex((prevIndex) => 
                prevIndex === promotionalImages.length - 1 ? 0 : prevIndex + 1
            );
        } else {
            setCurrentImageIndex((prevIndex) => 
                prevIndex === 0 ? promotionalImages.length - 1 : prevIndex - 1
            );
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

    };

    return (
        <div className="auth-container">
            <div className="auth-content">
                <div className="promotional-section">
                    <div className="image-slider" 
                         onClick={() => handleImageClick('next')}
                         style={{ cursor: 'pointer' }}>
                        {promotionalImages.map((img, index) => (
                            <img
                                key={index}
                                src={img}
                                alt={`Promotional ${index + 1}`}
                                className={`slider-image ${index === currentImageIndex ? 'active' : ''}`}
                            />
                        ))}
                    </div>
                    <div className="slider-dots">
                        {promotionalImages.map((_, index) => (
                            <button
                                key={index}
                                className={`dot ${index === currentImageIndex ? 'active' : ''}`}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setCurrentImageIndex(index);
                                }}
                            />
                        ))}
                    </div>
                </div>

                <div className="auth-box">
                    <div className={`auth-tabs ${!isLoginMode ? 'register' : ''}`}>
                        <button 
                            className={`tab-button ${isLoginMode ? 'active' : ''}`}
                            onClick={() => setIsLoginMode(true)}
                        >
                            Giriş Yap
                        </button>
                        <button 
                            className={`tab-button ${!isLoginMode ? 'active' : ''}`}
                            onClick={() => setIsLoginMode(false)}
                        >
                            Kayıt Ol
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="auth-form">
                        <button type="button" className="google-auth-button">
                            <FcGoogle className="google-icon" />
                            Google ile {isLoginMode ? 'Giriş Yap' : 'Kayıt Ol'}
                        </button>

                        <div className="divider">
                            <span>veya</span>
                        </div>

                        {!isLoginMode && (
                            <div className="form-group">
                                <input
                                    type="text"
                                    placeholder="İsim"
                                    className="auth-input"
                                />
                            </div>
                        )}

                        <div className="form-group">
                            <input
                                type="email"
                                placeholder="E-posta"
                                className="auth-input"
                            />
                        </div>

                        <div className="form-group passwords-container">
                            <div className="password-input-container">
                                <input
                                    type={showPasswords ? "text" : "password"}
                                    placeholder="Şifre"
                                    className="auth-input"
                                />
                            </div>

                            {!isLoginMode && (
                                <div className="password-input-container">
                                    <input
                                        type={showPasswords ? "text" : "password"}
                                        placeholder="Şifre Tekrar"
                                        className="auth-input"
                                    />
                                </div>
                            )}
                            
                            <button 
                                type="button"
                                className="password-toggle"
                                onClick={() => setShowPasswords(!showPasswords)}
                            >
                                {showPasswords ? <FiEyeOff /> : <FiEye />}
                            </button>
                        </div>

                        <button type="submit" className="submit-button">
                            {isLoginMode ? 'Giriş Yap' : 'Kayıt Ol'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}