import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import './Home.css'
import googlePlayIcon from '../../assets/google-play.svg'

export function Home() {
  return (
    <div className="home-page">
      <motion.div 
        className="home-content"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="app-header">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Harmony Haven: İlham & Gelişim
          </motion.h1>
        </div>
        
        <motion.p 
          className="subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          Motivasyon ve İlham Kaynağınız
        </motion.p>

        <motion.div 
          className="app-description"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <p>
            <strong>Harmony Haven</strong>, kullanıcılarına ilham verici içerikler sunan ve 
            motivasyon sağlayan bir mobil uygulamadır. Uygulama, çeşitli kategorilerde 
            makaleler, yapay zeka destekli kişiselleştirilmiş bildirimler ve ilham verici 
            alıntılar sunar.
          </p>
        </motion.div>

        <motion.div 
          className="features"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h2>Öne Çıkan Özellikler</h2>
          <div className="features-grid">
            <div className="feature-card">
              <span className="feature-icon">📚</span>
              <h3>Kategorilere Göre Makaleler</h3>
              <p>Çeşitli konularda ilham verici ve bilgilendirici makaleler.</p>
            </div>

            <div className="feature-card">
              <span className="feature-icon">🎯</span>
              <h3>Kişiselleştirilmiş Bildirimler</h3>
              <p>Yapay zeka tarafından kullanıcıya özel motivasyon mesajları.</p>
            </div>

            <div className="feature-card">
              <span className="feature-icon">💫</span>
              <h3>İlham Verici Alıntılar</h3>
              <p>Günlük ilham ve motivasyon için ilham verici alıntılar.</p>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="cta-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Link to="/articles" className="cta-button">
            Makaleleri Keşfet
          </Link>
          
          <a 
            href="https://play.google.com/store/apps/details?id=com.erdemserhat.harmonyhaven"
            target="_blank"
            rel="noopener noreferrer"
            className="store-button"
          >
            <img 
              src={googlePlayIcon} 
              alt="Google Play" 
              className="store-icon" 
            />
            <span>Google Play'de İndir</span>
          </a>
        </motion.div>

        <motion.div 
          className="contact-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <h2>İletişim</h2>
          <p>
            Bizimle iletişime geçmek veya daha fazla bilgi almak için{' '}
            <a href="mailto:harmonyhavenapp@gmail.com">
              harmonyhavenapp@gmail.com
            </a>
            {' '}adresine e-posta gönderebilirsiniz.
          </p>
        </motion.div>
      </motion.div>

      <motion.div 
        className="footer"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <Link to="/privacy-policy" className="footer-link">
          Gizlilik Politikası
        </Link>
      </motion.div>
    </div>
  )
} 