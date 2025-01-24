import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Navbar } from './components/common/Navbar'
import { Home } from './pages/home/Home.jsx'
import { Articles } from './pages/articles/Articles.jsx'
import { ArticleDetail } from './pages/article_detail/ArticleDetail.jsx'
import { Quotes } from './pages/quotes/Quotes.jsx'
import { Notifications } from './pages/notifications/Notifications.jsx'
import { Profile } from './pages/profile/Profile.jsx'
import { PrivacyPolicyHtml } from './pages/privacy-policy/PrivacyPolicyHtml.jsx'
import { AccountDeletion } from './pages/account_deletion/AccountDeletion.jsx'
import { PrivacyPolicyEncrypted } from './pages/privacy-policy/encryptext/PrivacyPolicyEncrypted.jsx'
import { NotFound } from './pages/not_found/NotFound.jsx'
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
                  <Route path="/privacy-policy" element={<PrivacyPolicyHtml />} />
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
