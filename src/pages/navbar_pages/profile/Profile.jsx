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
                </div>
            </div>

            <div className="profile-section">
                <h2>İstatistikler</h2>
                <div className="profile-stats">
                    <div className="stat-item">
                        <span className="stat-value">{user.articleCount || 0}</span>
                        <span className="stat-label">Makale</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-value">{user.followerCount || 0}</span>
                        <span className="stat-label">Takipçi</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-value">{user.followingCount || 0}</span>
                        <span className="stat-label">Takip Edilen</span>
                    </div>
                </div>

                <div className="profile-activity">
                    <h2>Son Aktiviteler</h2>
                    <div className="activity-list">
                        <div className="activity-item">
                            <div className="activity-icon">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
                                </svg>
                            </div>
                            <div className="activity-content">
                                <div className="activity-title">Yeni Makale Yayınlandı</div>
                                <div className="activity-date">2 saat önce</div>
                            </div>
                        </div>
                        <div className="activity-item">
                            <div className="activity-icon">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                                    <circle cx="9" cy="7" r="4"/>
                                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                                    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                                </svg>
                            </div>
                            <div className="activity-content">
                                <div className="activity-title">Yeni Takipçi</div>
                                <div className="activity-date">1 gün önce</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>);
} 