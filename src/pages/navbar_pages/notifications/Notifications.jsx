import React, { useState, useEffect } from 'react';
import './Notifications.css';
import { notificationService } from "@/services/api/notification.service.js";

export function Notifications() {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchNotifications();
    }, []);

    const fetchNotifications = async () => {
        try {
            setLoading(true);
            const response = await notificationService.getNotifications();
            const notificationsData = response || [];
            console.log({ notificationsData });
            setNotifications(notificationsData);
        } catch (err) {
            console.error('Notifications fetch error:', err);
            setError('Bildirimler yüklenirken bir hata oluştu.');
            setNotifications([]);
        } finally {
            setLoading(false);
        }
    };

    const formatTimeAgo = (timeStamp) => {
        if (!timeStamp) return '';
        
        const date = new Date(timeStamp * 1000);
        const now = new Date();
        const diffInSeconds = Math.floor((now - date) / 1000);

        if (diffInSeconds < 60) {
            return 'Az önce';
        } else if (diffInSeconds < 3600) {
            const minutes = Math.floor(diffInSeconds / 60);
            return `${minutes} dakika önce`;
        } else if (diffInSeconds < 86400) {
            const hours = Math.floor(diffInSeconds / 3600);
            return `${hours} saat önce`;
        } else if (diffInSeconds < 2592000) {
            const days = Math.floor(diffInSeconds / 86400);
            return `${days} gün önce`;
        } else {
            return date.toLocaleDateString('tr-TR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        }
    };

    if (loading) {
        return (
            <div className="notifications-container">
                <div className="notifications-loading">
                    <div className="loading-spinner"></div>
                    <p>Bildirimler yükleniyor...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="notifications-container">
                <div className="notifications-error">
                    <p>{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="notifications-container">
            <div className="notifications-header">
                <h1>Bildirimler</h1>
                {(!notifications || notifications.length === 0) && (
                    <p className="no-notifications">Henüz bildiriminiz bulunmuyor.</p>
                )}
            </div>
            <div className="notifications-content">
                <div className="notifications-list">
                    {notifications && notifications.map((notification) => (
                        <div key={notification.id} className="notification-item">
                            <div className="notification-content">
                                <h3 className="notification-title">{notification.title}</h3>
                                <p className="notification-text">{notification.content}</p>
                                <span className="notification-time">{formatTimeAgo(notification.timeStamp)}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
} 