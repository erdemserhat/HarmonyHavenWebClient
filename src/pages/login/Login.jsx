import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { authService } from '../../services/api/auth.service.js'
import { motion, AnimatePresence } from 'framer-motion'
import logo from '../../assets/ico.png'
import './Login.css'
import PlayStoreIcon from '../../assets/google-play.svg'

export function Login() {
  const navigate = useNavigate()
  const [isLogin, setIsLogin] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const [loginData, setLoginData] = useState({
    email: 'serhat@test.com',
    password: 'Test.0101.'
  })

  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const handleLoginSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const result = await authService.login(loginData)
      console.log('Login result:', result)
      console.log("hereee")

      if (result.isAuthenticated) {
        console.log('Authentication successful, navigating...')

        document.cookie = "auth_token=" + result.jwt + "; Path=/; Secure; SameSite=Lax";

        //  navigate('/', { replace: true })
      //  window.location.reload()
      } else {
        setError('Giriş başarısız. Lütfen tekrar deneyin.')
      }
    } catch (err) {
      console.error('Login error:', err)
      setError(err.message || 'Giriş başarısız. Lütfen tekrar deneyin.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleRegisterSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (registerData.password !== registerData.confirmPassword) {
      setError('Şifreler eşleşmiyor')
      return
    }

    setIsLoading(true)

    try {
      await authService.register({
        name: registerData.name,
        email: registerData.email,
        password: registerData.password
      })
      
      const loginResult = await authService.login({
        email: registerData.email,
        password: registerData.password
      })

      console.log('Register and login successful, navigating...')
      if (loginResult.isAuthenticated) {
        navigate('/', { replace: true })
        window.location.reload()
      }
    } catch (err) {
      console.error('Register error:', err)
      setError(err.message || 'İşlem başarısız. Lütfen tekrar deneyin.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = () => {
    authService.logout()
    window.dispatchEvent(new Event('storage'))
    navigate('/login')
  }

  return (
    <div className="auth-page">
      <div className="auth-background">
        <div className="gradient-sphere sphere-1"></div>
        <div className="gradient-sphere sphere-2"></div>
        <div className="gradient-sphere sphere-3"></div>
      </div>

      <motion.div 
        className="auth-container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="auth-brand">
          <motion.img 
            src={logo}
            alt="Harmony Haven Logo" 
            className="auth-logo"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ 
              type: "spring",
              stiffness: 260,
              damping: 20 
            }}
          />
          <motion.h1>Harmony Haven</motion.h1>
          <motion.p className="brand-subtitle">
            Motivasyon ve İlham Kaynağınız
          </motion.p>

          <motion.div className="brand-features">
            <h2>Öne Çıkan Özellikler</h2>
            <ul>
              <li>
                <span className="feature-icon">📚</span>
                <div className="feature-text">
                  <strong>Kategorilere Göre Makaleler:</strong>
                  <p>Çeşitli konularda ilham verici ve bilgilendirici makaleler.</p>
                </div>
              </li>
              <li>
                <span className="feature-icon">🎯</span>
                <div className="feature-text">
                  <strong>Kişiselleştirilmiş Bildirimler:</strong>
                  <p>Yapay zeka tarafından kullanıcıya özel motivasyon mesajları.</p>
                </div>
              </li>
              <li>
                <span className="feature-icon">💫</span>
                <div className="feature-text">
                  <strong>İlham Verici Alıntılar:</strong>
                  <p>Günlük ilham ve motivasyon için ilham verici alıntılar.</p>
                </div>
              </li>
            </ul>
          </motion.div>

          <motion.div className="brand-contact">
            <h3>İletişim</h3>
            <p>
              Bizimle iletişime geçmek veya daha fazla bilgi almak için{' '}
              <a href="mailto:harmonyhavenapp@gmail.com">
                harmonyhavenapp@gmail.com
              </a>
              {' '}adresine e-posta gönderebilirsiniz.
            </p>
          </motion.div>
        </div>

        <div className="auth-form-container">
          <div className="auth-tabs">
            <button 
              className={`auth-tab ${isLogin ? 'active' : ''}`}
              onClick={() => setIsLogin(true)}
            >
              <span className="tab-icon">👋</span>
              Giriş Yap
            </button>
            <button 
              className={`auth-tab ${!isLogin ? 'active' : ''}`}
              onClick={() => setIsLogin(false)}
            >
              <span className="tab-icon">✨</span>
              Kayıt Ol
            </button>
          </div>

          <AnimatePresence mode="wait">
            {isLogin ? (
              <motion.form 
                key="login"
                className="auth-form"
                onSubmit={handleLoginSubmit}
                initial={{ opacity: 0, rotateY: -10 }}
                animate={{ opacity: 1, rotateY: 0 }}
                exit={{ opacity: 0, rotateY: 10 }}
                transition={{ duration: 0.3 }}
              >
                <div className="form-group">
                  <label htmlFor="login-email">E-posta</label>
                  <input
                    type="email"
                    id="login-email"
                    value={loginData.email}
                    onChange={(e) => setLoginData(prev => ({
                      ...prev,
                      email: e.target.value
                    }))}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="login-password">Şifre</label>
                  <input
                    type="password"
                    id="login-password"
                    value={loginData.password}
                    onChange={(e) => setLoginData(prev => ({
                      ...prev,
                      password: e.target.value
                    }))}
                    required
                  />
                </div>

                {error && <div className="auth-error">{error}</div>}

                <button 
                  type="submit"
                  className="auth-button"
                  disabled={isLoading}
                >
                  {isLoading ? 'Giriş yapılıyor...' : 'Giriş Yap'}
                </button>
              </motion.form>
            ) : (
              <motion.form 
                key="register"
                className="auth-form"
                onSubmit={handleRegisterSubmit}
                initial={{ opacity: 0, rotateY: 10 }}
                animate={{ opacity: 1, rotateY: 0 }}
                exit={{ opacity: 0, rotateY: -10 }}
                transition={{ duration: 0.3 }}
              >
                <div className="form-group">
                  <label htmlFor="register-name">Ad Soyad</label>
                  <input
                    type="text"
                    id="register-name"
                    value={registerData.name}
                    onChange={(e) => setRegisterData(prev => ({
                      ...prev,
                      name: e.target.value
                    }))}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="register-email">E-posta</label>
                  <input
                    type="email"
                    id="register-email"
                    value={registerData.email}
                    onChange={(e) => setRegisterData(prev => ({
                      ...prev,
                      email: e.target.value
                    }))}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="register-password">Şifre</label>
                  <input
                    type="password"
                    id="register-password"
                    value={registerData.password}
                    onChange={(e) => setRegisterData(prev => ({
                      ...prev,
                      password: e.target.value
                    }))}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="register-confirm-password">Şifre Tekrar</label>
                  <input
                    type="password"
                    id="register-confirm-password"
                    value={registerData.confirmPassword}
                    onChange={(e) => setRegisterData(prev => ({
                      ...prev,
                      confirmPassword: e.target.value
                    }))}
                    required
                  />
                </div>

                {error && <div className="auth-error">{error}</div>}

                <button 
                  type="submit"
                  className="auth-button"
                  disabled={isLoading}
                >
                  {isLoading ? 'Kayıt yapılıyor...' : 'Kayıt Ol'}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>

        <div className="auth-footer">
          <a 
            href="https://play.google.com/store/apps/details?id=com.erdemserhat.harmonyhaven"
            target="_blank"
            rel="noopener noreferrer"
            className="store-button"
          >
            <img src={PlayStoreIcon} alt="Google Play" className="store-icon" />
            <span>Google Play'de İndir</span>
          </a>

          <a 
            href="https://harmonyhaven.erdemserhat.com/gizlilik_politikasi.html"
            target="_blank"
            rel="noopener noreferrer"
            className="policy-link"
          >
            Gizlilik Politikası
          </a>
        </div>
      </motion.div>
    </div>
  )
} 