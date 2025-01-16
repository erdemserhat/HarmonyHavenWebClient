import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Navbar } from './components/common/Navbar'
import { Login } from './pages/Login'
import { Quotes } from './pages/Quotes'
import { Articles } from './pages/Articles'
import { Notifications } from './pages/Notifications'
import { QuotesProvider } from './context/QuotesContext'
import { authService } from './services/api/auth.service'
import { useEffect, useState } from 'react'
import './App.css'
import { ArticleDetail } from './pages/ArticleDetail'
import { ArticlesProvider } from './context/ArticlesContext'
import { Profile } from './pages/Profile'
import { LoadingSpinner } from './components/common/LoadingSpinner'
import { LoadingProvider } from './context/LoadingContext'

// Router dışında kullanılacak ana komponent
function AppContent() {
  const [isAuthenticated, setIsAuthenticated] = useState(authService.isAuthenticated())
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const checkAuth = () => {
      setIsAuthenticated(authService.isAuthenticated())
    }

    window.addEventListener('storage', checkAuth)
    return () => window.removeEventListener('storage', checkAuth)
  }, [])

  // Sayfa yüklendiğinde kısa bir loading göster
  useEffect(() => {
    setIsLoading(true)
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 500)
    return () => clearTimeout(timer)
  }, [])


  return (
    <ArticlesProvider>
      {isAuthenticated && <Navbar />}
      <div className="app-container">
        {isLoading && <LoadingSpinner />}
        <Routes>
          <Route
            path="/"
            element={
              isAuthenticated ? (
                  <Articles />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
            <AppContent />
          <Route
            path="/articles"
            element={
              isAuthenticated ? (
                <Articles />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/notifications"
            element={
              isAuthenticated ? (
                <Notifications />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/quotes"
            element={
              isAuthenticated ? (
                <QuotesProvider>
                  <Quotes />
                </QuotesProvider>
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/login"
            element={
              !isAuthenticated ? (
                <Login />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
          <Route
            path="/articles/:id"
            element={
              isAuthenticated ? (
                <ArticleDetail />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </ArticlesProvider>
  )
}

// Ana App komponenti
function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(authService.isAuthenticated())
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const checkAuth = () => {
            setIsAuthenticated(authService.isAuthenticated())
        }

        window.addEventListener('storage', checkAuth)
        return () => window.removeEventListener('storage', checkAuth)
    }, [])

    // Sayfa yüklendiğinde kısa bir loading göster
    useEffect(() => {
        setIsLoading(true)
        const timer = setTimeout(() => {
            setIsLoading(false)
        }, 500)
        return () => clearTimeout(timer)
    }, [])





  return (
    <Router>
      <LoadingProvider>
        <ArticlesProvider>
          {isAuthenticated && <Navbar />}
          <div className="app-container">
            <Routes>
              <Route
                path="/"
                element={
                  isAuthenticated ? (
                      <Articles />
                  ) : (
                    <Navigate to="/login" replace />
                  )
                }
              />
              <Route
                path="/articles"
                element={
                  isAuthenticated ? (
                    <Articles />
                  ) : (
                    <Navigate to="/login" replace />
                  )
                }
              />
              <Route
                path="/notifications"
                element={
                  isAuthenticated ? (
                    <Notifications />
                  ) : (
                    <Navigate to="/login" replace />
                  )
                }
              />


                {

                }
              <Route
                path="/quotes"
                element={
                  isAuthenticated ? (
                    <QuotesProvider>
                      <Quotes />
                    </QuotesProvider>
                  ) : (
                    <Navigate to="/login" replace />
                  )
                }
              />
              <Route
                path="/login"
                element={
                  !isAuthenticated ? (
                    <Login />
                  ) : (
                    <Navigate to="/" replace />
                  )
                }
              />
              <Route
                path="/articles/:id"
                element={
                  isAuthenticated ? (
                    <ArticleDetail />
                  ) : (
                    <Navigate to="/login" replace />
                  )
                }
              />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </div>
        </ArticlesProvider>
      </LoadingProvider>
    </Router>
  )
}

export default App
