import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './PrivacyPolicyHtml.css'

export function PrivacyPolicyHtml() {
  const navigate = useNavigate()
  const [htmlContent, setHtmlContent] = useState('')

  useEffect(() => {
    fetch('/gizlilik_politikasi.html')
      .then(response => response.text())
      .then(data => {
        setHtmlContent(data)
      })
      .catch(error => {
        console.error('Gizlilik politikası yüklenirken hata:', error)
      })
  }, [])

  return (
    <div className="privacy-html-page">
      <div className="privacy-html-container">
        <button className="back-button" onClick={() => navigate(-1)}>
          <span className="back-arrow">←</span> Geri
        </button>

        <div 
          className="privacy-html-content"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      </div>
    </div>
  )
} 