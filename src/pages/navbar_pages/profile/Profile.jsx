import React, {useState, useEffect} from 'react';
import {authService} from '../../../services/api/auth.service';
import './Profile.css';
import {Helmet} from 'react-helmet';

export function Profile() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [imageError, setImageError] = useState(false);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const userData = await authService.getUserInformation();
                setUser(userData);
                console.log("Kullanıcı bilgileri:", userData);
            } catch (err) {
                setError('Profil bilgileri yüklenirken bir hata oluştu.');
                console.error('Profile fetch error:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchUserProfile();
    }, []);

    const handleImageError = () => {
        setImageError(true);
        console.error("Profil fotoğrafı yüklenemedi");
    };

    // CORS sorunlarından kaçınmak için baş harfi görüntüleme yaklaşımı kullanacağız
    // CORS hatası aldığımızda veya resim yüklenemediğinde bu yaklaşım kullanılacak
    const getInitials = (name) => {
        if (!name) return 'U';
        return name.charAt(0).toUpperCase();
    };

    if (loading) {
        return (<div className="profile-container">
            <div className="profile-loading">
                <div className="loading-spinner"></div>
                <p>Profil yükleniyor...</p>
            </div>
        </div>);
    }

    if (error) {
        return (<div className="profile-container">
            <div className="profile-error">
                <p>{error}</p>
            </div>
        </div>);
    }

    if (!user) {
        return (<div className="profile-container">
            <div className="profile-error">
                <p>Kullanıcı bulunamadı.</p>
            </div>
        </div>);
    }


    return (<div className="profile-container">
        <Helmet>
            <title>Profil - {user.name}</title>
            <meta name="description" content="Kullanıcı profil sayfası"/>
        </Helmet>
        <div className="profile-header">
            <div className="profile-avatar">
                {!imageError && user.profilePhotoPath ? (
                    <img
                        className="profile-photo"
                        src={user.profilePhotoPath}
                        alt="Profile"
                        onError={() => setImageError(true)}
                    />
                ) : (
                    <div className="profile-initials">
                        {getInitials(user.name)}
                    </div>
                )}
            </div>
            <div className="profile-info">
                <h1>{user.name}</h1>
                <p className="profile-email">{user.email}</p>
                <p className="profile-id">ID: {user.id}</p>
            </div>
        </div>

        <div className="profile-content">
            <div className="profile-section">
                <h2>Profil Bilgileri</h2>
                <div className="profile-details">
                    <div className="detail-item">
                        <label>İsim</label>
                        <span>{user.name}</span>
                    </div>
                    <div className="detail-item">
                        <label>E-posta</label>
                        <span>{user.email}</span>
                    </div>
                </div>
            </div>

            <div className="profile-section">
                <h2>İstatistikler</h2>
                <div className="profile-stats">
                    <div className="stat-item">
                        <span className="stat-value">0</span>
                        <span className="stat-label">Makale</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-value">0</span>
                        <span className="stat-label">Takipçi</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-value">0</span>
                        <span className="stat-label">Takip Edilen</span>
                    </div>
                </div>
            </div>
        </div>
    </div>);
} 