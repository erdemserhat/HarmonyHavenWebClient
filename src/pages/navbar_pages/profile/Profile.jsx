import React, { useState, useEffect } from 'react';
import { authService } from '../../../services/api/auth.service';
import './Profile.css';

export function Profile() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const userData = await authService.getCurrentUser();
                setUser(userData);
            } catch (err) {
                setError('Profil bilgileri yüklenirken bir hata oluştu.');
                console.error('Profile fetch error:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchUserProfile();
    }, []);

    if (loading) {
        return (
            <div className="profile-container">
                <div className="profile-loading">
                    <div className="loading-spinner"></div>
                    <p>Profil yükleniyor...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="profile-container">
                <div className="profile-error">
                    <p>{error}</p>
                </div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="profile-container">
                <div className="profile-error">
                    <p>Kullanıcı bulunamadı.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="profile-container">
            <div className="profile-header">
                <div className="profile-avatar">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.964 0a9 9 0 10-11.964 0m11.964 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                </div>
                <div className="profile-info">
                    <h1>{user.username}</h1>
                    <p className="profile-email">{user.email}</p>
                </div>
            </div>

            <div className="profile-content">
                <div className="profile-section">
                    <h2>Profil Bilgileri</h2>
                    <div className="profile-details">
                        <div className="detail-item">
                            <label>Kullanıcı Adı</label>
                            <span>{user.username}</span>
                        </div>
                        <div className="detail-item">
                            <label>E-posta</label>
                            <span>{user.email}</span>
                        </div>
                        <div className="detail-item">
                            <label>Kayıt Tarihi</label>
                            <span>{new Date(user.createdAt).toLocaleDateString('tr-TR')}</span>
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
        </div>
    );
} 