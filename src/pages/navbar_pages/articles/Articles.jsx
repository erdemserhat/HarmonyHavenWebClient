import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { LoadingSpinner } from '@/pages/common/loading_spinner/LoadingSpinner.jsx'
import { useArticles } from '../../../context/ArticlesContext.jsx'
import './Articles.css'
import { useLoading } from '../../../context/LoadingContext.jsx'
import { motion } from 'framer-motion'
import axios from '../../../services/api/axios.js'
import { ArticleList } from './article_list/ArticleList.jsx'
import { Helmet } from 'react-helmet'

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
  const [activeCategory, setActiveCategory] = useState('all')
  const scrollContainerRef = useRef(null)

  useEffect(() => {
    // Sadece makaleler yüklenmemişse fetchArticles'ı çağır
    if (!isLoaded) {
      setIsLoading(true)
      fetchArticles().finally(() => {
        setIsLoading(false)
      })
    } else {
      // Makaleler zaten yüklenmişse, sadece filtreleme işlemini yap
      setFilteredArticles(articles)
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    // Eğer makaleler yüklenmemişse hiçbir şey yapma
    if (!isLoaded) return

    // Filtre değiştiğinde sadece filtreleme işlemi yap
    setIsFiltering(true)
    const timer = setTimeout(() => {
      filterArticles()
      setIsFiltering(false)
    }, 300)
    
    return () => clearTimeout(timer)
    
  }, [isLoaded, selectedCategory, searchTerm])

  const filterArticles = () => {
    let filtered = articles
    
    // Kategori filtresi
    if (selectedCategory !== 1) {
      filtered = filtered.filter(article => article.categoryId === selectedCategory)
    }
    
    // Arama filtresi - başlık ve içerikte arama
    if (searchTerm) {
      const searchLower = normalizeText(searchTerm)
      filtered = filtered.filter(article => {
        const titleLower = normalizeText(article.title)
        const contentLower = normalizeText(article.content) // Tam içerikte arama
        return titleLower.includes(searchLower) || contentLower.includes(searchLower)
      })
    }

    setFilteredArticles(filtered)
  }

  // Metni normalize eden fonksiyonu güncelliyoruz
  const normalizeText = (text) => {
    if (!text) return ''
    return text
      .toLowerCase()
      .trim()
      .normalize('NFD') // Aksanlı karakterleri ayır
      .replace(/[\u0300-\u036f]/g, '') // Aksan işaretlerini kaldır
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
      const response = await axios.get('/articles')
      // Backend'den gelen veride slug olduğundan emin olalım
      const articlesWithSlugs = response.data.map(article => ({
        ...article,
        slug: article.slug || 'no-slug' // Eğer slug yoksa fallback değer
      }))
      updateArticles(articlesWithSlugs)
      setFilteredArticles(articlesWithSlugs) // Yüklenen makaleleri direkt olarak filtrelenmiş makalelere atıyoruz
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

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId)
    setActiveCategory(categoryId)
  }

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      })
    }
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
      <Helmet>
        <title>Makaleler - Harmony Haven</title>
        <meta name="description" content="Teknoloji, programlama ve daha fazlası hakkında makaleler." />
      </Helmet>
      <motion.div 
        className="articles-content"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1>Makaleler</h1>
        
        <div className="search-bar">
          <input
            type="text"
            placeholder="Makalelerde ara..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="search-icon">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </div>

        <div className="categories-container">
          <button 
            className="scroll-button left" 
            onClick={() => scroll('left')}
            aria-label="Sola kaydır"
          >
            ←
          </button>
          
          <div className="categories-scroll" ref={scrollContainerRef}>
            {CATEGORIES.map(category => (
              <button
                key={category.id}
                className={`category-button ${selectedCategory === category.id ? 'active' : ''}`}
                onClick={() => handleCategoryChange(category.id)}
              >
                {category.name}
              </button>
            ))}
          </div>
          
          <button 
            className="scroll-button right" 
            onClick={() => scroll('right')}
            aria-label="Sağa kaydır"
          >
            →
          </button>
        </div>

        <div className="articles-grid">
          <ArticleList articles={filteredArticles} />
          
          {!isFiltering && filteredArticles.length === 0 && (
            <div className="no-articles">
              Bu kriterlere uygun makale bulunamadı.
            </div>
          )}
        </div>
      </motion.div>
    </div>
  )
} 