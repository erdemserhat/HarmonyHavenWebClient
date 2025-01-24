import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './PrivacyPolicyEncrypted.css'

export function PrivacyPolicyEncrypted() {
  const navigate = useNavigate()
  const [htmlContent, setHtmlContent] = useState('')

  useEffect(() => {
    fetch('/gizlilik_politikasi_encryptext.html')
      .then(response => response.text())
      .then(data => {
        setHtmlContent(data)
      })
      .catch(error => {
        console.error('Şifreli gizlilik politikası yüklenirken hata:', error)
      })
  }, [])

  return (
    <div className="privacy-encrypted-page">
      <div className="privacy-encrypted-container">
        <button className="back-button" onClick={() => navigate(-1)}>
          <span className="back-arrow">←</span> Geri
        </button>

        <div 
          className="privacy-encrypted-content"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      </div>
    </div>
  )
} 