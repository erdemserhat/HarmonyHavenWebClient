import { useState, useEffect } from 'react'
import { userService } from '../services/api/user.service'
import './Profile.css'
import { useLoading } from '../context/LoadingContext'

export function Profile() {
  const { setIsLoading } = useLoading()
  const [userInfo, setUserInfo] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    setIsLoading(true)
    fetchUserInfo().finally(() => {
      setIsLoading(false)
    })
  }, [])

  const fetchUserInfo = async () => {
    try {
      const data = await userService.getUserInfo()
      setUserInfo(data)
    } catch (error) {
      setError('Profil bilgileri yüklenirken bir hata oluştu')
      console.error('Error fetching user info:', error)
    }
  }

  const getProfileImage = () => {
    if (!userInfo || userInfo.profilePhotoPath === '-') {
      return '/src/assets/default-avatar.png'
    }
    return userInfo.profilePhotoPath
  }

  if (error) {
    return (
      <div className="profile-error">
        <p>{error}</p>
        <button onClick={fetchUserInfo} className="retry-button">
          Tekrar Dene
        </button>
      </div>
    )
  }

  return (
    <div className="profile-page">
      <div className="profile-container">
        <div className="profile-header">
          <h1>Profil Bilgileri</h1>
        </div>

        <div className="profile-content">
          <div className="profile-avatar-section">
            <img 
              src={getProfileImage()} 
              alt={userInfo?.name} 
              className="profile-avatar"
            />
          </div>

          <div className="profile-info-section">
            <div className="info-group">
              <label>Ad Soyad</label>
              <div className="info-value">{userInfo?.name}</div>
            </div>

            <div className="info-group">
              <label>E-posta</label>
              <div className="info-value">{userInfo?.email}</div>
            </div>

            <div className="info-group">
              <label>Kullanıcı ID</label>
              <div className="info-value">#{userInfo?.id}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 