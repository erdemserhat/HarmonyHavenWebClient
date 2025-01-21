import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Navbar } from './components/common/Navbar'
import { Articles } from './pages/Articles'
import { ArticleDetail } from './pages/ArticleDetail'
import { Home } from './pages/Home'
import { ArticlesProvider } from './context/ArticlesContext'
import { LoadingProvider } from './context/LoadingContext'
import { PrivacyPolicyHtml } from './pages/PrivacyPolicyHtml'
import { AccountDeletion } from './pages/AccountDeletion'
import { PrivacyPolicyEncrypted } from './pages/PrivacyPolicyEncrypted'
import './App.css'

function App() {
  return (
    <Router>
      <LoadingProvider>
        <ArticlesProvider>
          <Navbar />
          <div className="app-container">
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route path="/articles" element={<Articles />} />
              <Route path="/articles/:id" element={<ArticleDetail />} />
              <Route path="/articles/:id/:slug" element={<ArticleDetail />} />
              <Route path="/privacy-policy" element={<PrivacyPolicyHtml />} />
              <Route path="/account-deletion" element={<AccountDeletion />} />
              <Route path="/privacy-policy-encryptext" element={<PrivacyPolicyEncrypted />} />
            </Routes>
          </div>
        </ArticlesProvider>
      </LoadingProvider>
    </Router>
  )
}

export default App
