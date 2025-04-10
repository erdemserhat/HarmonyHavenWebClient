import { useState, useEffect } from 'react';
import './login-register-screen.css';
import { FcGoogle } from 'react-icons/fc';
import { GoogleLogin } from '@react-oauth/google';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import {authService} from "@/services/api/auth.service.js";
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import {googleService} from "@/services/api/google.service.js";
import {useAuthChecker} from "@/context/AuthContext.jsx";


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
    const [isLoading, setIsLoading] = useState(false)
    const { isAuthenticated, setIsAuthenticated } = useAuthChecker();


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
        // Input değiştiğinde hata mesajını temizle
        setError('');
    };

    const validateForm = () => {
        // E-posta formatı kontrolü
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            setError(ERROR_MESSAGES[101]);
            return false;
        }

        // Şifre uzunluğu kontrolü
        if (formData.password.length < 8) {
            setError(ERROR_MESSAGES[102]);
            return false;
        }

        // Şifre gücü kontrolü
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;
        if (!passwordRegex.test(formData.password)) {
            setError(ERROR_MESSAGES[103]);
            return false;
        }

        // Kayıt olma durumunda şifre tekrar kontrolü
        if (!isLoginMode && formData.password !== formData.confirmPassword) {
            setError("Şifreler eşleşmiyor!");
            return false;
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            if (!validateForm()) {
                setIsLoading(false);
                return;
            }

            if(isLoginMode) {
                const response = await authService.login({
                    email: formData.email,
                    password: formData.password,
                });

                // Form validasyon hatası varsa
                if (!response.formValidationResult.isValid) {
                    setError(response.formValidationResult.errorMessage || ERROR_MESSAGES[response.formValidationResult.errorCode]);
                }
                // Kimlik bilgileri hatası varsa
                else if (!response.credentialsValidationResult.isValid) {
                    if (response.credentialsValidationResult.errorCode === 105) {
                        setError("Şifre yanlış");
                    } else if (response.credentialsValidationResult.errorCode === 104) {
                        setError("Böyle bir kullanıcı bulunamadı");
                    } else {
                        setError(response.credentialsValidationResult.errorMessage || ERROR_MESSAGES[401]);
                    }
                }
                // Başarılı giriş
                else if (response.isAuthenticated) {
                    console.log('Giriş başarılı!');
                    navigate('/articles');
                    setIsAuthenticated(true);
                }
            } else {
                const response = await authService.register({
                    name: formData.name,
                    email: formData.email,
                    password: formData.password,
                });

                // Form validasyon hatası varsa
                if (!response.formValidationResult.isValid) {
                    setError(response.formValidationResult.errorMessage || ERROR_MESSAGES[response.formValidationResult.errorCode]);
                } else {
                    // Başarılı kayıt işlemleri
                    console.log('Kayıt başarılı!');
                    // Kayıt başarılı olduğunda giriş moduna geç
                    navigate('/articles');
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
            // Google tarafından dönen JWT token
            const credential = response.credential;

            console.log('Google User:', credential);

            // Login işleminin bitmesini bekle
            await googleService.login(credential);

            // Login işlemi başarılı olduysa sayfayı yenile
            navigate('/articles');
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
                            <GoogleLogin onSuccess={handleSuccess} onError={handleError} />
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