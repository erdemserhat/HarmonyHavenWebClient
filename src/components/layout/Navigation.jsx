import PropTypes from 'prop-types'
import { authService } from '../../services/api/auth.service'

export function Navigation({ activeTab, onTabChange }) {
  const handleLogout = () => {
    authService.logout()
  }

  return (
    <nav className="navigation">
      <div className="nav-tabs">
        <button
          className={`nav-tab ${activeTab === 'posts' ? 'active' : ''}`}
          onClick={() => onTabChange('posts')}
        >
          Posts
        </button>
        <button
          className={`nav-tab ${activeTab === 'notifications' ? 'active' : ''}`}
          onClick={() => onTabChange('notifications')}
        >
          Notifications
        </button>
        <button
          className={`nav-tab ${activeTab === 'articles' ? 'active' : ''}`}
          onClick={() => onTabChange('articles')}
        >
          Articles
        </button>
      </div>
      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>
    </nav>
  )
}

Navigation.propTypes = {
  activeTab: PropTypes.string.isRequired,
  onTabChange: PropTypes.func.isRequired,
} 