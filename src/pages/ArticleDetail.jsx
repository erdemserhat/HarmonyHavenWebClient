import { useParams, useNavigate, useLocation } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import './ArticleDetail.css'

export function ArticleDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const article = location.state?.article

  if (!article) {
    navigate('/articles')
    return null
  }

  return (
    <div className="article-detail-page">
      <div className="article-detail-container">
        <button 
          className="back-button"
          onClick={() => navigate('/articles')}
        >
          <span className="back-arrow">←</span>
          <span className="back-text">Geri</span>
        </button>

        <div className="article-header">
          <h1 className="article-title">{article.title}</h1>
          <div className="article-meta">
            <span className="article-date">
              <i className="far fa-calendar"></i> {article.publishDate}
            </span>
            <span className="article-category">
              <i className="far fa-folder"></i> Kategori {article.categoryId}
            </span>
          </div>
        </div>

        <div className="article-cover">
          <img 
            src={article.imagePath} 
            alt={article.title}
            onError={(e) => {
              e.target.src = 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80'
            }}
          />
        </div>

        <div className="article-body">
          <div className="article-content">
            <ReactMarkdown className="markdown-content">{article.content}</ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  )
} 