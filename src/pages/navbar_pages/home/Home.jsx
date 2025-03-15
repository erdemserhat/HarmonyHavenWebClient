import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import './Home.css'
import googlePlayIcon from '../../../assets/google-play.svg'

export function Home() {
  return (
    <div className="home-page">
      <motion.div 
        className="home-content"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="content-grid">
          <div className="left-content">
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
                    src="https://harmonyhaven.erdemserhat.com/sources/sample.mp4"
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
                    src="https://harmonyhaven.erdemserhat.com/sources/sample2.mp4"
                    type="video/mp4"
                  />
                  Tarayıcınız video oynatmayı desteklemiyor.
                </video>
              </div>
            </div>
          </motion.div>
        </div>

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