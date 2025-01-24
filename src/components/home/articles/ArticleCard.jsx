import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

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
    <Link to={`/articles/${article.id}`} className="article-card">
      <div className="article-image">
        <img 
          src={article.imagePath} 
          alt={article.title}
          onError={(e) => {
            e.target.src = '/placeholder-image.jpg'
          }}
        />
      </div>
      <div className="article-info">
        <h3 className="article-title">{article.title}</h3>
        <p className="article-preview">{getPreviewContent(article.content)}</p>
        <span className="article-date">{article.publishDate}</span>
      </div>
    </Link>
  )
}

ArticleCard.propTypes = {
  article: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string,
    publishDate: PropTypes.string.isRequired,
    imagePath: PropTypes.string.isRequired,
  }).isRequired,
} 