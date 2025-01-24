import { useState, useEffect, useRef, useCallback } from 'react'
import { quotesService } from '../../services/api/quotes.service.js'
import { useQuotes } from '../../context/QuotesContext.jsx'
import { motion, AnimatePresence } from 'framer-motion'
import './Quotes.css'
import { useLoading } from '../../context/LoadingContext.jsx'

export function Quotes() {
  const { 
    quotes, 
    setQuotes,
    categories,
    hasMore,
    setHasMore
  } = useQuotes()
  
  const [selectedCategories, setSelectedCategories] = useState([1])
  const [page, setPage] = useState(1)
  const [seed] = useState(Math.floor(Math.random() * 1000000))
  const [error, setError] = useState(null)
  const loader = useRef(null)
  const videoRefs = useRef({})
  const { isLoading, setIsLoading } = useLoading()

  const handleObserver = useCallback((entries) => {
    const target = entries[0]
    if (target.isIntersecting && hasMore && !isLoading) {
      setPage(prev => prev + 1)
    }
  }, [hasMore, isLoading])

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: "20px",
      threshold: 0
    }
    const observer = new IntersectionObserver(handleObserver, option)
    if (loader.current) observer.observe(loader.current)
    
    return () => {
      if (loader.current) observer.unobserve(loader.current)
    }
  }, [handleObserver])

  useEffect(() => {
    setPage(1)
    setQuotes([])
    fetchQuotes(1)
  }, [selectedCategories])

  useEffect(() => {
    if (page > 1) {
      fetchQuotes(page)
    }
  }, [page])

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.7
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const video = entry.target
        if (entry.isIntersecting) {
          Object.values(videoRefs.current).forEach(v => {
            if (v && v !== video) {
              v.pause()
              v.currentTime = 0
              v.muted = true
            }
          })
          video.play().catch(() => {
            console.log('Video playback was prevented')
          })
          video.muted = false
        } else {
          video.pause()
          video.currentTime = 0
          video.muted = true
        }
      })
    }, options)

    Object.values(videoRefs.current).forEach(video => {
      if (video) {
        observer.observe(video)
      }
    })

    return () => {
      Object.values(videoRefs.current).forEach(video => {
        if (video) {
          observer.unobserve(video)
        }
      })
    }
  }, [quotes])

  const handleCategoryToggle = (categoryId) => {
    setSelectedCategories(prev => {
      if (prev.includes(categoryId)) {
        if (prev.length === 1) return prev
        return prev.filter(id => id !== categoryId)
      } else {
        return [...prev, categoryId]
      }
    })
  }

  const fetchQuotes = async (pageNum) => {
    try {
      setIsLoading(true)
      const response = await quotesService.getQuotes(
        selectedCategories,
        pageNum,
        10,
        seed
      )
      
      if (pageNum === 1) {
        setQuotes(response)
      } else {
        setQuotes(prev => [...prev, ...response])
      }
      
      setHasMore(response.length > 0)
    } catch (error) {
      setError('Alıntılar yüklenirken bir hata oluştu')
      console.error('Error fetching quotes:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const renderMedia = (quote) => {
    const isVideo = quote.imageUrl?.toLowerCase().endsWith('.mp4')

    if (isVideo) {
      return (
        <video 
          ref={el => videoRefs.current[quote.id] = el}
          className="quote-video"
          loop
          muted
          playsInline
          controls
        >
          <source src={quote.imageUrl} type="video/mp4" />
          Video yüklenemedi
        </video>
      )
    }

    return (
      <img 
        src={quote.imageUrl} 
        alt={quote.quote}
        className="quote-image"
        onError={(e) => {
          e.target.src = '/placeholder-image.jpg'
          e.target.onerror = null
        }}
      />
    )
  }

  if (error) {
    return (
      <div className="error-message">
        {error}
        <button onClick={() => fetchQuotes(1)} className="retry-button">
          Tekrar Dene
        </button>
      </div>
    )
  }

  return (
    <div className="quotes-page">
      <div className="categories-bar">
        <div className="categories-scroll">
          {categories.map(category => (
            <button
              key={category.id}
              className={`category-chip ${selectedCategories.includes(category.id) ? 'active' : ''}`}
              onClick={() => handleCategoryToggle(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      <div className="quotes-feed">
        <AnimatePresence mode="popLayout">
          {quotes.map((quote) => (
            <motion.div
              key={quote.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className={`quote-card ${quote.imageUrl?.toLowerCase().endsWith('.mp4') ? 'video-card' : ''}`}
            >
              <div className="quote-image-container">
                {renderMedia(quote)}
              </div>
              <div className="quote-content">
                <p className="quote-text">{quote.quote}</p>
                <div className="quote-footer">
                  <span className="quote-writer">- {quote.writer}</span>
                  {quote.isLiked && (
                    <span className="quote-liked">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                      </svg>
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isLoading && (
          <div className="loading-spinner">
            Loading...
          </div>
        )}

        <div ref={loader} style={{ height: "20px" }} />

        {!isLoading && quotes.length === 0 && (
          <div className="no-quotes">
            Bu kategoride henüz alıntı bulunmuyor.
          </div>
        )}
      </div>
    </div>
  )
} 