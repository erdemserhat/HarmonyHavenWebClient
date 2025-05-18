import { useState, useEffect } from 'react';
import './login-register-screen.css';
import { FcGoogle } from 'react-icons/fc';
import { GoogleLogin } from '@react-oauth/google';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { authService } from "@/services/api/auth.service.js";
import { useNavigate, useLocation } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import { googleService } from "@/services/api/google.service.js";
import { useAuthChecker } from "@/context/AuthContext.jsx";

const promotionalImages = [
    'http://harmonyhaven.erdemserhat.com/sources/ps/1.jpg',
    'https://harmonyhaven.erdemserhat.com/sources/ps/2.jpg',
    'https://harmonyhaven.erdemserhat.com/sources/ps/3.jpg',
    'https://harmonyhaven.erdemserhat.com/sources/ps/4.jpg',
    'https://harmonyhaven.erdemserhat.com/sources/ps/5.jpg',
    'https://harmonyhaven.erdemserhat.com/sources/ps/6.jpg'
];

const ERROR_MESSAGES = {
    101: "Geçersiz e-posta formatı.",
    102: "Şifre en az 8 karakter uzunluğunda olmalıdır.",
    103: "Şifre en az bir büyük harf, bir küçük harf ve bir rakam içermelidir.",
    401: "E-posta veya şifre hatalı.",
    500: "Sunucu hatası. Lütfen daha sonra tekrar deneyin."
};

export function LoginRegisterScreen() {
    const navigate = useNavigate();
    const location = useLocation();
    const [isLoginMode, setIsLoginMode] = useState(true);
    const [showPasswords, setShowPasswords] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { isAuthenticated, setIsAuthenticated } = useAuthChecker();
    
    // Check if we have a redirect path from a protected route
    const from = location.state?.from || '/articles';
    const [redirectMessage, setRedirectMessage] = useState('');
    
    useEffect(() => {
        // If we were redirected from a protected route, show a message
        if (location.state?.from === '/enneagram') {
            setRedirectMessage('Enneagram testine erişmek için lütfen giriş yapın.');
        } else if (location.state?.from === '/chat') {
            setRedirectMessage('Sohbet özelliğini kullanmak için lütfen giriş yapın.');
        } else if (location.state?.from) {
            setRedirectMessage('Bu sayfaya erişmek için lütfen giriş yapın.');
        }
    }, [location.state]);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentImageIndex((prevIndex) =>
                prevIndex === promotionalImages.length - 1 ? 0 : prevIndex + 1
            );
        }, 5000);

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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        setError('');
    };

    const validateForm = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            setError(ERROR_MESSAGES[101]);
            return false;
        }

        if (formData.password.length < 8) {
            setError(ERROR_MESSAGES[102]);
            return false;
        }

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;
        if (!passwordRegex.test(formData.password)) {
            setError(ERROR_MESSAGES[103]);
            return false;
        }

        if (!isLoginMode && formData.password !== formData.confirmPassword) {
            setError("Şifreler eşleşmiyor!");
            return false;
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            if (!validateForm()) {
                setIsLoading(false);
                return;
            }

            if (isLoginMode) {
                const response = await authService.login({
                    email: formData.email,
                    password: formData.password,
                });

                if (!response.formValidationResult.isValid) {
                    setError(response.formValidationResult.errorMessage || ERROR_MESSAGES[response.formValidationResult.errorCode]);
                }
                else if (!response.credentialsValidationResult.isValid) {
                    if (response.credentialsValidationResult.errorCode === 105) {
                        setError("Şifre yanlış");
                    } else if (response.credentialsValidationResult.errorCode === 104) {
                        setError("Böyle bir kullanıcı bulunamadı");
                    } else {
                        setError(response.credentialsValidationResult.errorMessage || ERROR_MESSAGES[401]);
                    }
                }
                else if (response.isAuthenticated) {
                    console.log('Giriş başarılı!');
                    navigate(from);
                    setIsAuthenticated(true);
                }
            } else {
                const response = await authService.register({
                    name: formData.name,
                    email: formData.email,
                    password: formData.password,
                });

                if (!response.formValidationResult.isValid) {
                    setError(response.formValidationResult.errorMessage || ERROR_MESSAGES[response.formValidationResult.errorCode]);
                } else {
                    console.log('Kayıt başarılı!');
                    navigate(from);
                    setIsAuthenticated(true);
                    setFormData({
                        name: '',
                        email: '',
                        password: '',
                        confirmPassword: ''
                    });
                }
            }
        } catch (error) {
            console.error('Auth error:', error);
            if (error.response?.status === 401) {
                setError(ERROR_MESSAGES[401]);
            } else if (error.response?.status === 500) {
                setError(ERROR_MESSAGES[500]);
            } else {
                setError("Bir hata oluştu. Lütfen tekrar deneyin.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleSuccess = async (response) => {
        try {
            const credential = response.credential;
            console.log('Google User:', credential);
            await googleService.login(credential);
            navigate(from);
            setIsAuthenticated(true);
        } catch (error) {
            console.error("Login failed:", error);
        }
    };

    const handleError = () => {
        console.log('Google Login Failed');
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
                            onClick={() => {
                                setIsLoginMode(true);
                                setError('');
                            }}
                        >
                            Giriş Yap
                        </button>
                        <button
                            className={`tab-button ${!isLoginMode ? 'active' : ''}`}
                            onClick={() => {
                                setIsLoginMode(false);
                                setError('');
                            }}
                        >
                            Kayıt Ol
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="auth-form">
                        {error && <div className="error-message">{error}</div>}

                        <div style={{ justifyContent: 'center', justifyItems: 'center' }}>
                            <GoogleLogin
                                onSuccess={handleSuccess}
                                onError={handleError}
                                useOneTap
                                auto_select
                                text="continue_with"
                                shape="rectangular"
                                size="large"
                            />
                        </div>

                        <div className="divider">
                            <span>veya</span>
                        </div>

                        {!isLoginMode && (
                            <div className="form-group">
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    placeholder="İsim"
                                    className="auth-input"
                                />
                            </div>
                        )}

                        <div className="form-group">
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                placeholder="E-posta"
                                className="auth-input"
                            />
                        </div>

                        <div className="form-group passwords-container">
                            <div className="password-input-container">
                                <input
                                    type={showPasswords ? "text" : "password"}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    placeholder="Şifre"
                                    className="auth-input"
                                />
                            </div>

                            {!isLoginMode && (
                                <div className="password-input-container">
                                    <input
                                        type={showPasswords ? "text" : "password"}
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleInputChange}
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

                        <button
                            type="submit"
                            className={`submit-button ${isLoading ? 'loading' : ''}`}
                            disabled={isLoading}
                        >
                            {isLoading ? 'İşleniyor...' : (isLoginMode ? 'Giriş Yap' : 'Kayıt Ol')}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}