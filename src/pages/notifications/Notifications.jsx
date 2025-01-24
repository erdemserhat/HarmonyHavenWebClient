import { useState, useEffect } from 'react'
import { notificationService } from '../../services/api/notification.service.js'
import { LoadingSpinner } from '../../components/common/LoadingSpinner.jsx'
import './Notifications.css'

export function Notifications() {
  const [notifications, setNotifications] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)

  useEffect(() => {
    fetchNotifications()
  }, [page])

  const fetchNotifications = async () => {
    try {
      setIsLoading(true)
      const data = await notificationService.getNotifications(page)
      
      // Tekrarlanan bildirimleri filtrele
      const uniqueNotifications = data.filter(newNotif => 
        !notifications.some(existingNotif => existingNotif.id === newNotif.id)
      )
      
      if (uniqueNotifications.length < 20) {
        setHasMore(false)
      }
      
      setNotifications(prev => [...prev, ...uniqueNotifications])
    } catch (err) {
      setError('Bildirimler yüklenirken bir hata oluştu')
      console.error('Error fetching notifications:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const formatTimestamp = (timestamp) => {
    // Timestamp'i milisaniye cinsine çevir (eğer saniye olarak geldiyse)
    const milliseconds = timestamp * 1000
    const date = new Date(milliseconds)
    const now = new Date()
    const diffInHours = Math.abs(now - date) / 36e5 // Saat farkı

    // Geçersiz tarih kontrolü
    if (isNaN(date.getTime())) {
      return 'Geçersiz tarih'
    }

    if (diffInHours < 24) {
      return date.toLocaleTimeString('tr-TR', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: false
      })
    } else if (diffInHours < 48) {
      return 'Dün'
    } else {
      return date.toLocaleDateString('tr-TR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      })
    }
  }

  if (error) {
    return (
      <div className="error-message">
        {error}
      </div>
    )
  }

  return (
    <div className="notifications-page">
      <div className="notifications-container">
        <div className="notifications-header">
          <h1>Bildirimler</h1>
          {notifications.length > 0 && (
            <span className="notification-count">
              {notifications.length} bildirim
            </span>
          )}
        </div>
        
        <div className="notifications-list">
          {notifications.map(notification => (
            <div 
              key={notification.id} 
              className={`notification-item ${!notification.isRead ? 'unread' : ''}`}
            >
              <div className="notification-header">
                <div className="notification-title-group">
                  {!notification.isRead && (
                    <span className="unread-dot"></span>
                  )}
                  <h3>{notification.title}</h3>
                </div>
                <span className="notification-time">
                  {formatTimestamp(notification.timeStamp)}
                </span>
              </div>
              <p className="notification-content">{notification.content}</p>
            </div>
          ))}

          {isLoading && (
            <div className="loading-container">
              <LoadingSpinner />
            </div>
          )}

          {!isLoading && hasMore && notifications.length > 0 && (
            <button 
              className="load-more-button"
              onClick={() => setPage(prev => prev + 1)}
            >
              Daha Fazla Yükle
            </button>
          )}

          {!isLoading && notifications.length === 0 && (
            <div className="no-notifications">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
              </svg>
              <p>Henüz bildirim bulunmuyor</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 