import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { SEO } from '../../../components/SEO'
import './Home.css'
import googlePlayIcon from '../../../assets/google-play.svg'
import appleStoreIcon from '../../../assets/app-store.svg'

export function Home() {
  return (
    <div className="home-page">
      <SEO 
        title="Harmony Haven - Kişisel Gelişim ve Motivasyon Uygulaması"
        description="Harmony Haven ile kişisel gelişiminizi destekleyin. Yapay zeka destekli motivasyon asistanı, ilham verici makaleler ve günlük bildirimlerle hayatınıza pozitif değer katın. Ücretsiz indirin, hemen başlayın!"
        keywords="kişisel gelişim uygulaması, motivasyon uygulaması, yapay zeka asistanı, kişisel gelişim, motivasyon, ilham verici alıntılar, kişisel gelişim makaleleri, ücretsiz motivasyon uygulaması"
        ogImage="https://www.harmonyhavenapp.com/favicon/web-app-manifest-512x512.png"
        canonicalUrl="https://www.harmonyhavenapp.com"
      />
      <motion.div 
        className="home-content"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="content-grid">
          <div className="left-content">
            <header className="app-header">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                Harmony Haven: Kişisel Gelişim ve Motivasyon Uygulamanız
              </motion.h1>
              <motion.p 
                className="subtitle"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Motivasyon ve İlham Kaynağınız
              </motion.p>
            </header>

            <motion.section 
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
            </motion.section>

            <motion.div 
              className="cta-section"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <div className="store-buttons">
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
                
                <a 
                  href="#" 
                  className="store-button coming-soon"
                  onClick={(e) => e.preventDefault()}
                >
                  <img 
                    src={appleStoreIcon} 
                    alt="App Store" 
                    className="store-icon" 
                  />
                  <span>Yakında</span>
                </a>
              </div>
            </motion.div>
          </div>

          <motion.div 
            className="right-content"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="phone-frames-container">
              <div className="phone-frame">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="phone-video"
                >
                  <source
                    src="https://www.harmonyhavenapp.com/sources/sample.mp4"
                    type="video/mp4"
                  />
                  Tarayıcınız video oynatmayı desteklemiyor.
                </video>
              </div>
              
              <div className="phone-frame">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="phone-video"
                >
                  <source
                    src="https://www.harmonyhavenapp.com/sources/sample2.mp4"
                    type="video/mp4"
                  />
                  Tarayıcınız video oynatmayı desteklemiyor.
                </video>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.section 
          className="features"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h2>Öne Çıkan Özellikler</h2>
          <div className="features-grid">
            <article className="feature-card">
              <span className="feature-icon" aria-hidden="true">📚</span>
              <h3>Kategorilere Göre Makaleler</h3>
              <p>Çeşitli konularda ilham verici ve bilgilendirici makaleler.</p>
            </article>

            <article className="feature-card">
              <span className="feature-icon" aria-hidden="true">🎯</span>
              <h3>Kişiselleştirilmiş Bildirimler</h3>
              <p>Yapay zeka tarafından kullanıcıya özel motivasyon mesajları.</p>
            </article>

            <article className="feature-card">
              <span className="feature-icon" aria-hidden="true">💫</span>
              <h3>İlham Verici Alıntılar</h3>
              <p>Günlük ilham ve motivasyon için ilham verici alıntılar.</p>
            </article>
          </div>
        </motion.section>

        <motion.section 
          className="testimonials"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h2>Kullanıcı Deneyimleri</h2>
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="rating">★★★★★</div>
              <div className="testimonial-content">
                <p className="testimonial-text">
                  "Harmony Haven sayesinde her gün yeni bir motivasyon kaynağı buluyorum. 
                  Özellikle kişiselleştirilmiş bildirimler tam ihtiyacım olan zamanda geliyor."
                </p>
              </div>
              <div className="testimonial-author">
                <div className="author-avatar">AY</div>
                <div className="author-info">
                  <div className="author-name">Ayşe Yılmaz</div>
                  <div className="author-title">Yoga Eğitmeni</div>
                </div>
              </div>
            </div>

            <div className="testimonial-card">
              <div className="rating">★★★★★</div>
              <div className="testimonial-content">
                <p className="testimonial-text">
                  "İlham verici makaleler ve günlük alıntılar hayatıma çok şey kattı. 
                  Artık her sabah uygulamayı açmak günlük rutinimin vazgeçilmez bir parçası."
                </p>
              </div>
              <div className="testimonial-author">
                <div className="author-avatar">MK</div>
                <div className="author-info">
                  <div className="author-name">Mehmet Kaya</div>
                  <div className="author-title">Yazılım Geliştirici</div>
                </div>
              </div>
            </div>

            <div className="testimonial-card">
              <div className="rating">★★★★★</div>
              <div className="testimonial-content">
                <p className="testimonial-text">
                  "Bu uygulama gerçekten hayatımı değiştirdi. Yapay zeka destekli önerileri 
                  sayesinde kendimi daha motive ve odaklanmış hissediyorum."
                </p>
              </div>
              <div className="testimonial-author">
                <div className="author-avatar">ZD</div>
                <div className="author-info">
                  <div className="author-name">Zeynep Demir</div>
                  <div className="author-title">Öğretmen</div>
                </div>
              </div>
            </div>

            <div className="testimonial-card">
              <div className="rating">★★★★★</div>
              <div className="testimonial-content">
                <p className="testimonial-text">
                  "Her kategoride özenle seçilmiş sözler var. İş hayatından kişisel gelişime, 
                  felsefeden günlük motivasyona kadar her alanda ilham verici alıntılar bulabiliyorum. 
                  Bu kadar kapsamlı ve kaliteli bir koleksiyon görmedim."
                </p>
              </div>
              <div className="testimonial-author">
                <div className="author-avatar">EK</div>
                <div className="author-info">
                  <div className="author-name">Elif Kara</div>
                  <div className="author-title">Edebiyat Öğretmeni</div>
                </div>
              </div>
            </div>

            <div className="testimonial-card">
              <div className="rating">★★★★★</div>
              <div className="testimonial-content">
                <p className="testimonial-text">
                  "Uygulamanın arayüzü çok kullanıcı dostu ve modern. Kategoriler arası geçiş yapmak, 
                  favori sözlerimi kaydetmek ve arkadaşlarımla paylaşmak çok kolay. Özellikle sabah 
                  bildirimleri günüme harika bir başlangıç yapıyor."
                </p>
              </div>
              <div className="testimonial-author">
                <div className="author-avatar">CB</div>
                <div className="author-info">
                  <div className="author-name">Can Bulut</div>
                  <div className="author-title">Grafik Tasarımcı</div>
                </div>
              </div>
            </div>

            <div className="testimonial-card">
              <div className="rating">★★★★★</div>
              <div className="testimonial-content">
                <p className="testimonial-text">
                  "Öğrencilerime motivasyon sağlamak için harika bir kaynak buldum. Sınıfta 
                  her gün farklı bir alıntı paylaşıyorum ve öğrencilerimin üzerindeki olumlu 
                  etkisini görmek beni çok mutlu ediyor. Eğitimciler için mükemmel bir uygulama!"
                </p>
              </div>
              <div className="testimonial-author">
                <div className="author-avatar">SA</div>
                <div className="author-info">
                  <div className="author-name">Selin Arslan</div>
                  <div className="author-title">Lise Rehber Öğretmeni</div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        <motion.div 
          className="instagram-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h2>Bizi Instagram'da Takip Edin</h2>
          <p>
            Günlük ilham, motivasyon ve güncellemeler için Instagram hesabımızı takip edin.
          </p>
          <a 
            href="https://www.instagram.com/harmonyinhaven"
            target="_blank"
            rel="noopener noreferrer"
            className="instagram-button"
          >
            <svg 
              className="instagram-icon" 
              viewBox="0 0 24 24" 
              fill="currentColor"
            >
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.012-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
            @harmonyinhaven
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