import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import './ArticleCard.css'

export function ArticleCard({ article }) {
  const getPreviewContent = (content) => {
    if (!content) return ''
    const maxLength = 150
    const plainText = content.replace(/[#*`]/g, '')
    return plainText.length > maxLength 
      ? plainText.substring(0, maxLength) + '...'
      : plainText
  }

  return (
    <motion.div
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{
        duration: 0.2,
        ease: "easeOut"
      }}
    >
      <Link 
        to={`/articles/${article.id}`}
        className="article-card-link"
      >
        <article className="article-card">
          {article.category && (
            <div className="article-categories">
              <span className="article-category-tag">
                {article.category}
              </span>
            </div>
          )}
          <div className="article-image-container">
            <img 
              src={article.imagePath} 
              alt={article.title} 
              className="article-image"
              onError={(e) => {
                e.target.src = '/placeholder-image.jpg'
                e.target.onerror = null
              }}
            />
          </div>
          <div className="article-content">
            <h3 className="article-title">"{article.title}</h3>
            <p className="article-preview">{getPreviewContent(article.content)}</p>
            <span className="read-more-link">
              Read More
            </span>
          </div>
        </article>
      </Link>
    </motion.div>
  )
}

ArticleCard.propTypes = {
  article: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string,
    publishDate: PropTypes.string.isRequired,
    category: PropTypes.string,
    imagePath: PropTypes.string.isRequired,
  }).isRequired,
} 