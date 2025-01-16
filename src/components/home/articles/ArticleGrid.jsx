import { motion, AnimatePresence } from 'framer-motion'
import { ArticleCard } from './ArticleCard'
import PropTypes from 'prop-types'

export function ArticleGrid({ articles }) {
  return (
    <div className="articles-grid">
      <AnimatePresence mode="popLayout">
        {articles.map(article => (
          <motion.div
            key={article.id}
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
          >
            <ArticleCard article={article} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

ArticleGrid.propTypes = {
  articles: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      content: PropTypes.string,
      publishDate: PropTypes.string.isRequired,
      category: PropTypes.string,
      imagePath: PropTypes.string.isRequired,
    })
  ).isRequired,
} 