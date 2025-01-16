import { Link } from 'react-router-dom'
import './Home.css'

export function Home() {
  return (
    <div className="home-page">
      <div className="home-content">
        <h1>Welcome to Harmony Haven</h1>
        <p>Discover articles and inspiring quotes to enhance your journey.</p>
        
        <div className="home-cards">
          <Link to="/articles" className="home-card">
            <div className="card-content">
              <h2>View Articles</h2>
              <p>Read our curated collection of articles on various topics.</p>
            </div>
            <span className="card-arrow">→</span>
          </Link>

          <Link to="/quotes" className="home-card">
            <div className="card-content">
              <h2>View Quotes</h2>
              <p>Explore inspiring quotes and motivational content.</p>
            </div>
            <span className="card-arrow">→</span>
          </Link>
        </div>
      </div>
    </div>
  )
} 