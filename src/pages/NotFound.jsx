import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import './NotFound.css';

export function NotFound() {
  const location = useLocation();

  return (
    <div className="not-found-page">
      <motion.div 
        className="not-found-content"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1>404</h1>
        <h2>Sayfa Bulunamadı</h2>
        <p>Sayfa mevcut değil veya taşınmış olabilir.</p>
        <div className="not-found-buttons">
          <Link to="/" className="home-button">
            Ana Sayfaya Dön
          </Link>
          <Link to="/articles" className="articles-button">
            Makalelere Git
          </Link>
        </div>
      </motion.div>
    </div>
  );
} 