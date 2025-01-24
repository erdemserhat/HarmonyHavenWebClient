import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Navbar } from './components/common/Navbar'
import { Home } from './pages/Home'
import { Articles } from './pages/Articles'
import { ArticleDetail } from './pages/ArticleDetail'
import { Quotes } from './pages/Quotes'
import { Notifications } from './pages/Notifications'
import { Profile } from './pages/Profile'
import { PrivacyPolicy } from './pages/PrivacyPolicy'
import { PrivacyPolicyHtml } from './pages/PrivacyPolicyHtml'
import { AccountDeletion } from './pages/AccountDeletion'
import { PrivacyPolicyEncrypted } from './pages/PrivacyPolicyEncrypted'
import { NotFound } from './pages/NotFound'
import { ArticlesProvider } from './context/ArticlesContext'
import { LoadingProvider } from './context/LoadingContext'
import { QuotesProvider } from './context/QuotesContext'
import './App.css'

function App() {
  return (
    <Router>
      <LoadingProvider>
        <ArticlesProvider>
          <QuotesProvider>
            <div className="app-container">
              <Navbar />
              <div className="content-container">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/articles" element={<Articles />} />
                  <Route path="/articles/:id/:slug?" element={<ArticleDetail />} />
                  <Route path="/quotes" element={<Quotes />} />
                  <Route path="/notifications" element={<Notifications />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                  <Route path="/privacy-policy-html" element={<PrivacyPolicyHtml />} />
                  <Route path="/account-deletion" element={<AccountDeletion />} />
                  <Route path="/privacy-policy-encryptext" element={<PrivacyPolicyEncrypted />} />
                  <Route path="/404" element={<NotFound />} />
                  <Route path="*" element={<Navigate to="/404" replace />} />
                </Routes>
              </div>
            </div>
          </QuotesProvider>
        </ArticlesProvider>
      </LoadingProvider>
    </Router>
  )
}

export default App
