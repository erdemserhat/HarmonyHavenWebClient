import { useState, useEffect } from 'react'
import { articleService } from '../../services/api/article.service'
import { ArticleGrid } from './articles/ArticleGrid'
import { LoadingSpinner } from '../common/LoadingSpinner'
import { SearchInput } from '../common/SearchInput'
import { useArticles } from '../../context/ArticlesContext'

export function Articles() {
  const { articles, setArticles } = useArticles()
  const [filteredArticles, setFilteredArticles] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    fetchArticles()
  }, [])

  useEffect(() => {
    filterArticles()
  }, [searchTerm, articles])

  const fetchArticles = async () => {
    try {
      setIsLoading(true)
      const data = await articleService.getAllArticles()
      setArticles(data)
      setFilteredArticles(data)
    } catch (err) {
      setError('Failed to load articles')
      console.error('Error fetching articles:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const filterArticles = () => {
    const filtered = articles.filter(article =>
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.contentPreview.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setFilteredArticles(filtered)
  }

  const handleSearch = (value) => {
    setSearchTerm(value)
  }

  if (isLoading) {
    return (
      <div className="articles">
        <h2>Articles</h2>
        <LoadingSpinner message="Loading articles..." />
      </div>
    )
  }

  if (error) {
    return (
      <div className="articles">
        <h2>Articles</h2>
        <div className="error-message">{error}</div>
      </div>
    )
  }

  return (
    <div className="articles">
      <div className="articles-header">
        <h2>Articles</h2>
        <SearchInput
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search articles..."
        />
      </div>
      {filteredArticles.length === 0 ? (
        <div className="no-results">
          No articles found matching your search.
        </div>
      ) : (
        <ArticleGrid articles={filteredArticles} />
      )}
    </div>
  )
} 