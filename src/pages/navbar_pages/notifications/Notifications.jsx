import React, { useState, useEffect } from 'react';
import './Notifications.css';
import { notificationService } from "@/services/api/notification.service.js";
import { notificationSchedulerService } from "@/services/api/notification-scheduler.service.js";
import { LoadingSpinner } from "@/pages/common/loading_spinner/LoadingSpinner.jsx";
import { FaTrash, FaEdit, FaPlus, FaTimes, FaClock } from 'react-icons/fa';

export function Notifications() {
    const [activeTab, setActiveTab] = useState('notifications');
    const [notifications, setNotifications] = useState([]);
    const [scheduledNotifications, setScheduledNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [schedulersLoading, setSchedulersLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showScheduleForm, setShowScheduleForm] = useState(false);
    const [editingScheduler, setEditingScheduler] = useState(null);
    
    // Form state
    const [notificationType, setNotificationType] = useState('MESSAGE');
    const [definedType, setDefinedType] = useState('DEFAULT');
    const [predefinedMessageSubject, setPredefinedMessageSubject] = useState('GOOD_MORNING');
    const [predefinedReminderSubject, setPredefinedReminderSubject] = useState('WATER_DRINK');
    const [customSubject, setCustomSubject] = useState('');
    const [preferredTime, setPreferredTime] = useState('13:46');
    const [selectedDays, setSelectedDays] = useState(['Pa', 'Sa', 'Ça', 'Pe', 'Cu', 'Ct', 'Pz']);
    
    // Days of week mapping
    const daysMap = {
        'Pa': 'MONDAY',
        'Sa': 'TUESDAY',
        'Ça': 'WEDNESDAY',
        'Pe': 'THURSDAY',
        'Cu': 'FRIDAY',
        'Ct': 'SATURDAY',
        'Pz': 'SUNDAY'
    };

    // Fetch both data types on component mount instead of on every tab change
    useEffect(() => {
        fetchNotifications();
        fetchScheduledNotifications();
    }, []);

    const fetchNotifications = async () => {
        try {
            setLoading(true);
            const response = await notificationService.getNotifications();
            const notificationsData = response || [];
            setNotifications(notificationsData);
        } catch (err) {
            console.error('Notifications fetch error:', err);
            setError('Bildirimler yüklenirken bir hata oluştu.');
            setNotifications([]);
        } finally {
            setLoading(false);
        }
    };
    
    const fetchScheduledNotifications = async () => {
        try {
            setSchedulersLoading(true);
            const schedulers = await notificationSchedulerService.getScheduledNotifications();
            setScheduledNotifications(schedulers || []);
        } catch (err) {
            console.error('Scheduled notifications fetch error:', err);
            setError('Planlanan bildirimler yüklenirken bir hata oluştu.');
            setScheduledNotifications([]);
        } finally {
            setSchedulersLoading(false);
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
    
    const handleOpenScheduleForm = () => {
        resetForm();
        setShowScheduleForm(true);
    };
    
    const handleCloseScheduleForm = () => {
        setShowScheduleForm(false);
        setEditingScheduler(null);
        resetForm();
    };
    
    const resetForm = () => {
        setNotificationType('MESSAGE');
        setDefinedType('DEFAULT');
        setPredefinedMessageSubject('GOOD_MORNING');
        setPredefinedReminderSubject('WATER_DRINK');
        setCustomSubject('');
        setPreferredTime('13:46');
        setSelectedDays(['Pa', 'Sa', 'Ça', 'Pe', 'Cu', 'Ct', 'Pz']);
    };
    
    const handleEditScheduler = (scheduler) => {
        setEditingScheduler(scheduler);
        
        // Map backend values to form state
        setNotificationType(scheduler.type);
        setDefinedType(scheduler.definedType);
        
        if (scheduler.predefinedMessageSubject) {
            setPredefinedMessageSubject(scheduler.predefinedMessageSubject);
        }
        
        if (scheduler.predefinedReminderSubject) {
            setPredefinedReminderSubject(scheduler.predefinedReminderSubject);
        }
        
        if (scheduler.customSubject) {
            setCustomSubject(scheduler.customSubject);
        }
        
        // Format time for time input (HH:MM)
        const timeString = scheduler.preferredTime.split('T')[1]?.substring(0, 5) || '13:46';
        setPreferredTime(timeString);
        
        // Map days
        const days = scheduler.daysOfWeek.map(day => {
            // Find the key in daysMap with the matching value
            return Object.keys(daysMap).find(key => daysMap[key] === day) || '';
        }).filter(day => day !== '');
        
        setSelectedDays(days);
        
        setShowScheduleForm(true);
    };
    
    const handleDeleteScheduler = async (id) => {
        if (window.confirm('Bu bildirimi silmek istediğinize emin misiniz?')) {
            try {
                await notificationSchedulerService.deleteScheduledNotification(id);
                setScheduledNotifications(prev => prev.filter(item => item.id !== id));
            } catch (err) {
                console.error('Error deleting scheduler:', err);
                alert('Bildirim silinemedi. Lütfen tekrar deneyin.');
            }
        }
    };
    
    const handleDayToggle = (day) => {
        if (selectedDays.includes(day)) {
            setSelectedDays(prev => prev.filter(d => d !== day));
        } else {
            setSelectedDays(prev => [...prev, day]);
        }
    };
    
    const isFormValid = () => {
        if (selectedDays.length === 0) return false;
        if (definedType === 'CUSTOM' && !customSubject.trim()) return false;
        return true;
    };
    
    const handleSubmitScheduler = async (e) => {
        e.preventDefault();
        
        if (!isFormValid()) {
            alert('Lütfen gerekli alanları doldurun.');
            return;
        }
        
        // Prepare data for API
        const schedulerData = {
            id: editingScheduler?.id,
            type: notificationType,
            definedType: definedType,
            customSubject: definedType === 'CUSTOM' ? customSubject : null,
            predefinedMessageSubject: notificationType === 'MESSAGE' && definedType === 'DEFAULT' ? predefinedMessageSubject : null,
            predefinedReminderSubject: notificationType === 'REMINDER' && definedType === 'DEFAULT' ? predefinedReminderSubject : null,
            preferredTime: preferredTime,
            daysOfWeek: selectedDays.map(day => daysMap[day])
        };
        
        try {
            if (editingScheduler) {
                await notificationSchedulerService.updateScheduledNotification(schedulerData);
            } else {
                await notificationSchedulerService.scheduleNotification(schedulerData);
            }
            
            fetchScheduledNotifications();
            handleCloseScheduleForm();
        } catch (err) {
            console.error('Error saving scheduler:', err);
            alert('Bildirim kaydedilemedi. Lütfen tekrar deneyin.');
        }
    };
    
    const getNotificationTitle = (scheduler) => {
        if (scheduler.definedType === 'CUSTOM') {
            return scheduler.customSubject;
        } else if (scheduler.type === 'MESSAGE') {
            switch (scheduler.predefinedMessageSubject) {
                case 'GOOD_MORNING': return 'Günaydın';
                case 'GOOD_EVENING': return 'İyi Akşamlar';
                case 'MOTIVATION': return 'Motivasyon';
                default: return 'Mesaj';
            }
        } else if (scheduler.type === 'REMINDER') {
            switch (scheduler.predefinedReminderSubject) {
                case 'WATER_DRINK': return 'Su İçme';
                case 'SLEEP_TIME': return 'Uyku Saati';
                case 'EXERCISE': return 'Egzersiz';
                default: return 'Hatırlatıcı';
            }
        }
        return 'Bildirim';
    };
    
    const formatTime = (timeString) => {
        // If it's ISO format, extract just the time part
        if (timeString.includes('T')) {
            return timeString.split('T')[1]?.substring(0, 5) || timeString;
        }
        return timeString;
    };
    
    const formatDays = (daysArray) => {
        // Map from backend enum values to Turkish abbreviations
        const reverseDaysMap = {
            'MONDAY': 'Pzt',
            'TUESDAY': 'Sal',
            'WEDNESDAY': 'Çar',
            'THURSDAY': 'Per',
            'FRIDAY': 'Cum',
            'SATURDAY': 'Cmt',
            'SUNDAY': 'Paz'
        };
        
        return daysArray.map(day => reverseDaysMap[day] || day).join(', ');
    };

    if (loading && activeTab === 'notifications') {
        return (
            <div className="notifications-container">
                <div className="notifications-loading">
                    <LoadingSpinner />
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
            <div className="notifications-tabs">
                <button 
                    className={`tab-button ${activeTab === 'notifications' ? 'active' : ''}`}
                    onClick={() => setActiveTab('notifications')}
                >
                    Bildirimler
                </button>
                <button 
                    className={`tab-button ${activeTab === 'scheduler' ? 'active' : ''}`}
                    onClick={() => setActiveTab('scheduler')}
                >
                    Zamanlayıcı
                </button>
            </div>
            
            <div className="notifications-content-wrapper">
                {activeTab === 'notifications' ? (
                    <>
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
                                        <div className="notification-actions"></div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="scheduled-notifications-header">
                            <h1>Bildirim Zamanlamaları</h1>
                            <button className="add-scheduler-button" onClick={handleOpenScheduleForm}>
                                <FaPlus /> <span className="button-text">Yeni Ekle</span>
                            </button>
                        </div>
                        
                        {schedulersLoading ? (
                            <div className="notifications-loading">
                                <LoadingSpinner />
                                <p>Zamanlanmış bildirimler yükleniyor...</p>
                            </div>
                        ) : (
                            <div className="scheduled-notifications-content">
                                {scheduledNotifications.length === 0 ? (
                                    <p className="no-notifications">Henüz planlanmış bildirim bulunmuyor.</p>
                                ) : (
                                    <div className="scheduled-notifications-list">
                                        {scheduledNotifications.map((scheduler) => (
                                            <div key={scheduler.id} className="scheduled-notification-item">
                                                <div className="scheduler-content">
                                                    <h3 className="scheduler-title">
                                                        Mesaj: {getNotificationTitle(scheduler)}
                                                    </h3>
                                                    <div className="scheduler-details">
                                                        <p className="scheduler-time">
                                                            <FaClock /> Saat: {formatTime(scheduler.preferredTime)}
                                                        </p>
                                                        <p className="scheduler-days">
                                                            <span role="img" aria-label="calendar">📅</span> Günler: {formatDays(scheduler.daysOfWeek)}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="scheduler-actions">
                                                    <button 
                                                        className="edit-button" 
                                                        onClick={() => handleEditScheduler(scheduler)}
                                                        aria-label="Düzenle"
                                                    >
                                                        <FaEdit />
                                                    </button>
                                                    <button 
                                                        className="delete-button" 
                                                        onClick={() => handleDeleteScheduler(scheduler.id)}
                                                        aria-label="Sil"
                                                    >
                                                        <FaTrash />
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                    </>
                )}
            </div>
            
            {showScheduleForm && (
                <div className="schedule-form-overlay">
                    <div className="schedule-form-container">
                        <div className="schedule-form-header">
                            <h2>{editingScheduler ? 'Bildirimi Düzenle' : 'Bildirim Zamanlama'}</h2>
                            <button className="close-button" onClick={handleCloseScheduleForm}>
                                <FaTimes />
                            </button>
                        </div>
                        
                        <form onSubmit={handleSubmitScheduler} className="schedule-form">
                            <div className="form-section">
                                <h3>Bildirim Türü</h3>
                                <div className="button-group">
                                    <button 
                                        type="button"
                                        className={notificationType === 'MESSAGE' ? 'active' : ''}
                                        onClick={() => setNotificationType('MESSAGE')}
                                    >
                                        Mesaj
                                    </button>
                                    <button 
                                        type="button"
                                        className={notificationType === 'REMINDER' ? 'active' : ''}
                                        onClick={() => setNotificationType('REMINDER')}
                                    >
                                        Hatırlatma
                                    </button>
                                </div>
                            </div>
                            
                            <div className="form-section">
                                <h3>Tanımlama Tipi</h3>
                                <div className="button-group">
                                    <button 
                                        type="button"
                                        className={definedType === 'DEFAULT' ? 'active' : ''}
                                        onClick={() => setDefinedType('DEFAULT')}
                                    >
                                        Hazır Şablonlar
                                    </button>
                                    <button 
                                        type="button"
                                        className={definedType === 'CUSTOM' ? 'active' : ''}
                                        onClick={() => setDefinedType('CUSTOM')}
                                    >
                                        Kendin Oluştur
                                    </button>
                                </div>
                            </div>
                            
                            {definedType === 'DEFAULT' ? (
                                <div className="form-section">
                                    <h3>{notificationType === 'MESSAGE' ? 'Hazır Mesaj Seçin' : 'Hazır Hatırlatıcı Seçin'}</h3>
                                    <div className="radio-group">
                                        {notificationType === 'MESSAGE' ? (
                                            <>
                                                <label className="radio-option">
                                                    <input 
                                                        type="radio" 
                                                        name="predefinedMessage" 
                                                        checked={predefinedMessageSubject === 'GOOD_MORNING'}
                                                        onChange={() => setPredefinedMessageSubject('GOOD_MORNING')}
                                                    />
                                                    <span className="radio-label">Günaydın</span>
                                                </label>
                                                <label className="radio-option">
                                                    <input 
                                                        type="radio" 
                                                        name="predefinedMessage" 
                                                        checked={predefinedMessageSubject === 'GOOD_EVENING'}
                                                        onChange={() => setPredefinedMessageSubject('GOOD_EVENING')}
                                                    />
                                                    <span className="radio-label">İyi Akşamlar</span>
                                                </label>
                                                <label className="radio-option">
                                                    <input 
                                                        type="radio" 
                                                        name="predefinedMessage" 
                                                        checked={predefinedMessageSubject === 'MOTIVATION'}
                                                        onChange={() => setPredefinedMessageSubject('MOTIVATION')}
                                                    />
                                                    <span className="radio-label">Motivasyon</span>
                                                </label>
                                            </>
                                        ) : (
                                            <>
                                                <label className="radio-option">
                                                    <input 
                                                        type="radio" 
                                                        name="predefinedReminder" 
                                                        checked={predefinedReminderSubject === 'WATER_DRINK'}
                                                        onChange={() => setPredefinedReminderSubject('WATER_DRINK')}
                                                    />
                                                    <span className="radio-label">Su İçme</span>
                                                </label>
                                                <label className="radio-option">
                                                    <input 
                                                        type="radio" 
                                                        name="predefinedReminder" 
                                                        checked={predefinedReminderSubject === 'SLEEP_TIME'}
                                                        onChange={() => setPredefinedReminderSubject('SLEEP_TIME')}
                                                    />
                                                    <span className="radio-label">Uyku Saati</span>
                                                </label>
                                                <label className="radio-option">
                                                    <input 
                                                        type="radio" 
                                                        name="predefinedReminder" 
                                                        checked={predefinedReminderSubject === 'EXERCISE'}
                                                        onChange={() => setPredefinedReminderSubject('EXERCISE')}
                                                    />
                                                    <span className="radio-label">Egzersiz</span>
                                                </label>
                                            </>
                                        )}
                                    </div>
                                </div>
                            ) : (
                                <div className="form-section">
                                    <h3>Özel Bildirim Metni</h3>
                                    <textarea
                                        placeholder={notificationType === 'MESSAGE' ? 'Örnek: beni motive eden bir mesaj yaz' : 'Örnek: bana toplantımı hatırlat'}
                                        value={customSubject}
                                        onChange={(e) => setCustomSubject(e.target.value)}
                                        className="custom-message-input"
                                        rows={3}
                                    />
                                </div>
                            )}
                            
                            <div className="form-section">
                                <h3>Bildirim Saati</h3>
                                <input 
                                    type="time" 
                                    value={preferredTime}
                                    onChange={(e) => setPreferredTime(e.target.value)}
                                    className="time-input"
                                />
                            </div>
                            
                            <div className="form-section">
                                <h3>Bildirim Günleri</h3>
                                <div className="days-selection">
                                    <div className="days-group">
                                        {Object.keys(daysMap).map(day => (
                                            <button
                                                key={day}
                                                type="button"
                                                className={`day-button ${selectedDays.includes(day) ? 'selected' : ''}`}
                                                onClick={() => handleDayToggle(day)}
                                            >
                                                {day}
                                            </button>
                                        ))}
                                    </div>
                                    <label className="everyday-checkbox">
                                        <input 
                                            type="checkbox" 
                                            checked={selectedDays.length === Object.keys(daysMap).length}
                                            onChange={(e) => {
                                                if (e.target.checked) {
                                                    setSelectedDays(Object.keys(daysMap));
                                                } else {
                                                    setSelectedDays([]);
                                                }
                                            }}
                                        />
                                        <span>Hergün</span>
                                    </label>
                                </div>
                            </div>
                            
                            <button 
                                type="submit" 
                                className="submit-button"
                                disabled={!isFormValid()}
                            >
                                Bildirim Planla
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
} 