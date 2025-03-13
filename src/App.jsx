import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Navbar } from '@/pages/common/navbar/Navbar.jsx'
import { Home } from '@/pages/navbar_pages/home/Home.jsx'
import { Articles } from '@/pages/navbar_pages/articles/Articles.jsx'
import { ArticleDetail } from '@/pages/navbar_pages/articles/article_detail/ArticleDetail.jsx'
import { PrivacyPolicyHtml } from '@/pages/policy_pages/privacy_policy/PrivacyPolicyHtml.jsx'
import { AccountDeletion } from '@/pages/policy_pages/account_deletion_policy/AccountDeletion.jsx'
import { PrivacyPolicyEncrypted } from '@/pages/policy_pages/privacy_policy/encryptext/PrivacyPolicyEncrypted.jsx'
import { NotFound } from '@/pages/common/not_found/NotFound.jsx'
import { ArticlesProvider } from './context/ArticlesContext'
import { LoadingProvider } from './context/LoadingContext'
import { QuotesProvider } from './context/QuotesContext'
import './App.css'
import {ArticleWriting} from "@/pages/navbar_pages/article-writing/ArticleWriting.jsx";

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
                  <Route path="/write-article" element={<ArticleWriting />} />
                  <Route path="/articles" element={<Articles />} />
                  <Route path="/articles/:id/:slug?" element={<ArticleDetail />} />
                  <Route path="/quotes" element={<NotFound />} />
                  <Route path="/notifications" element={<NotFound />} />
                  <Route path="/profile" element={<NotFound />} />
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
