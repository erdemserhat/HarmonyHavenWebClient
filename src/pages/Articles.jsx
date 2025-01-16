import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { LoadingSpinner } from '../components/common/LoadingSpinner'
import { useArticles } from '../context/ArticlesContext'
import './Articles.css'
import { useLoading } from '../context/LoadingContext'

// Sabit kategoriler
const CATEGORIES = [
  { id: 1, name: "Tümü" },
  { id: 3, name: "Motivasyon & Kişisel Gelişim" },
  { id: 5, name: "Yaşam & Sağlık" },
  { id: 6, name: "Bilim & Teknoloji" },
  { id: 12, name: "Yazılım & Programlama" }
]

export function Articles() {
  const navigate = useNavigate()
  const { articles, isLoaded, updateArticles } = useArticles()
  const [isLoading, setIsLoading] = useState(!isLoaded)
  const [error, setError] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState(1)
  const [filteredArticles, setFilteredArticles] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [isFiltering, setIsFiltering] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    fetchArticles().finally(() => {
      setIsLoading(false)
    })
  }, [])

  useEffect(() => {
    if (!isLoaded) {
      fetchArticles()
    } else {
      setIsFiltering(true)
      const timer = setTimeout(() => {
        filterArticles()
        setIsFiltering(false)
      }, 300)
      
      return () => clearTimeout(timer)
    }
  }, [isLoaded, selectedCategory, searchTerm])

  const filterArticles = () => {
    let filtered = articles
    
    // Kategori filtresi
    if (selectedCategory !== 1) {
      filtered = filtered.filter(article => article.categoryId === selectedCategory)
    }
    
    // Arama filtresi - case insensitive (büyük/küçük harf duyarsız)
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase()
      filtered = filtered.filter(article => {
        const titleLower = article.title.toLowerCase()
        const contentLower = article.contentPreview.toLowerCase()
        
        return titleLower.includes(searchLower) || contentLower.includes(searchLower)
      })
    }

    setFilteredArticles(filtered)
  }

  // Metni normalize eden yardımcı fonksiyon
  const normalizeText = (text) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/ğ/g, 'g')
      .replace(/ü/g, 'u')
      .replace(/ş/g, 's')
      .replace(/ı/g, 'i')
      .replace(/ö/g, 'o')
      .replace(/ç/g, 'c')
      .replace(/\s+/g, ' ') // Birden fazla boşluğu tek boşluğa çevir
  }

  const fetchArticles = async () => {
    try {
      setIsLoading(true)
      const token = localStorage.getItem('auth_token')
      
      const response = await fetch('https://harmonyhavenappserver.erdemserhat.com/api/v1/articles', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'harmonyhavenapikey': 'harmonyhavenapikeyK12yW8CBSoBfy41Cu6b3UDbMfEjijD0cKp4K166z29CADrYT4nRtOolZlOxGaOL5X7wmXY9fqyiFRvLeCB2OYS6J9x5zYbtSuiqsieelAD2lo9'
        }
      })

      if (!response.ok) {
        throw new Error('Makaleler yüklenemedi')
      }

      const data = await response.json()
      updateArticles(data)
    } catch (err) {
      setError('Makaleler yüklenirken bir hata oluştu')
      console.error('Error fetching articles:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleArticleClick = (article) => {
    navigate(`/articles/${article.id}`, { state: { article } })
  }

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId)
  }

  if (isLoading) {
    return (
      <div className="articles-loading">
        <LoadingSpinner />
      </div>
    )
  }

  if (error) {
    return <div className="articles-error">{error}</div>
  }

  return (
    <div className="articles-page">
      <h1>Makaleler</h1>
      
      <div className="search-bar">
        <input
          type="text"
          placeholder="Makalelerde ara..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="search-icon">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
      </div>

      <div className="categories-container">
        {CATEGORIES.map(category => (
          <button
            key={category.id}
            className={`category-button ${selectedCategory === category.id ? 'active' : ''}`}
            onClick={() => handleCategoryClick(category.id)}
          >
            {category.name}
          </button>
        ))}
      </div>

      <div className="articles-grid">
        {!isFiltering && filteredArticles.map(article => (
          <div 
            key={article.id} 
            className={`article-card ${isFiltering ? 'fade-out' : ''}`}
            onClick={() => handleArticleClick(article)}
          >
            <div className="article-image">
              <img 
                src={article.imagePath} 
                alt={article.title}
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80'
                }}
              />
            </div>
            <div className="article-content">
            <h1 className="article-header">{article.title}</h1>
            <p>{article.contentPreview}</p>
              <div className="article-footer">
                <span className="publish-date">{article.publishDate}</span>
                <button className="read-more">Devamını Oku</button>
              </div>
            </div>
          </div>
        ))}
        
        {!isFiltering && filteredArticles.length === 0 && (
          <div className="no-articles">
            Bu kriterlere uygun makale bulunamadı.
          </div>
        )}
      </div>
    </div>
  )
} 