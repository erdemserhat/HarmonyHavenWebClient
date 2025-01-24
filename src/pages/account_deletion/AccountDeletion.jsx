import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './AccountDeletion.css'

export function AccountDeletion() {
  const navigate = useNavigate()
  const [htmlContent, setHtmlContent] = useState('')

  useEffect(() => {
    fetch('/hesap_silme.html')
      .then(response => response.text())
      .then(data => {
        setHtmlContent(data)
      })
      .catch(error => {
        console.error('Hesap silme politikası yüklenirken hata:', error)
      })
  }, [])

  return (
    <div className="account-deletion-page">
      <div className="account-deletion-container">
        <button className="back-button" onClick={() => navigate(-1)}>
          <span className="back-arrow">←</span> Geri
        </button>

        <div 
          className="account-deletion-content"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      </div>
    </div>
  )
} 