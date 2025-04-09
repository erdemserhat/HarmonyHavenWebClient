import {BrowserRouter as Router, Routes, Route, Navigate, useLocation} from 'react-router-dom'
import {Navbar} from '@/pages/common/navbar/Navbar.jsx'
import {Home} from '@/pages/navbar_pages/home/Home.jsx'
import {Articles} from '@/pages/navbar_pages/articles/Articles.jsx'
import {ArticleDetail} from '@/pages/navbar_pages/articles/article_detail/ArticleDetail.jsx'
import {PrivacyPolicyHtml} from '@/pages/policy_pages/privacy_policy/PrivacyPolicyHtml.jsx'
import {AccountDeletion} from '@/pages/policy_pages/account_deletion_policy/AccountDeletion.jsx'
import {PrivacyPolicyEncrypted} from '@/pages/policy_pages/privacy_policy/encryptext/PrivacyPolicyEncrypted.jsx'
import {NotFound} from '@/pages/common/not_found/NotFound.jsx'
import {ArticlesProvider} from './context/ArticlesContext'
import {LoadingProvider} from './context/LoadingContext'
import {QuotesProvider} from './context/QuotesContext'
import './App.css'
import {ArticleWriting} from "@/pages/navbar_pages/article-writing/ArticleWriting.jsx";
import {PresentationPage} from "@/pages/navbar_pages/presentation_page/PresentationPage.jsx";
import {LoginRegisterScreen} from "@/pages/login-register/LoginRegisterScreen.jsx";
import {Profile} from "@/pages/navbar_pages/profile/Profile.jsx";
import {Notifications} from "@/pages/navbar_pages/notifications/Notifications.jsx";
import {GoogleOAuthProvider} from "@react-oauth/google";
import {AuthProvider} from "@/context/AuthContext.jsx";
import {Chat} from "@/pages/navbar_pages/chat/Chat.jsx";
import { useEffect } from 'react';

// Scroll to top component
function ScrollToTop() {
    const { pathname } = useLocation();
  
    useEffect(() => {
        // Reset main window scroll
        window.scrollTo(0, 0);
        
        // Reset all scrollable containers
        const scrollableElements = document.querySelectorAll('.chat-messages, .article-content, [data-scrollable]');
        scrollableElements.forEach(element => {
            if (element) {
                element.scrollTop = 0;
            }
        });
        
        // For mobile: ensure body scroll is reset
        document.body.style.overflow = '';
        document.documentElement.scrollTop = 0;
    }, [pathname]);
  
    return null;
}

const clientId = '456625388455-4cd1ujegfqut63lktptd1dm9ulpvfa8l.apps.googleusercontent.com'; // Buraya kendi Client ID'ni yaz

function App() {
    return (
        <AuthProvider>
            <GoogleOAuthProvider clientId={clientId}>
                <Router>
                    <ScrollToTop />
                    <LoadingProvider>
                        <ArticlesProvider>
                            <QuotesProvider>
                                <div className="app-container">
                                    <Navbar/>
                                    <div className="content-container">
                                        <Routes>
                                            <Route path="/" element={<Home/>}/>
                                            <Route path="/write-article" element={<ArticleWriting/>}/>
                                            <Route path="/login" element={<LoginRegisterScreen/>}/>
                                            <Route path="/articles" element={<Articles/>}/>
                                            <Route path="/articles/:id/:slug?" element={<ArticleDetail/>}/>
                                            <Route path="/quotes" element={<NotFound/>}/>
                                            <Route path="/notifications" element={<Notifications/>}/>
                                            <Route path="/profile" element={<Profile/>}/>
                                            <Route path="/chat" element={<Chat/>}/>
                                            <Route path="/privacy-policy" element={<PrivacyPolicyHtml/>}/>
                                            <Route path="/privacy-policy-html" element={<PrivacyPolicyHtml/>}/>
                                            <Route path="/account-deletion" element={<AccountDeletion/>}/>
                                            <Route path="/presentation" element={<PresentationPage/>}/>
                                            <Route path="/privacy-policy-encryptext"
                                                   element={<PrivacyPolicyEncrypted/>}/>
                                            <Route path="/404" element={<NotFound/>}/>
                                            <Route path="*" element={<Navigate to="/404" replace/>}/>
                                        </Routes>
                                    </div>
                                </div>
                            </QuotesProvider>
                        </ArticlesProvider>
                    </LoadingProvider>
                </Router>
            </GoogleOAuthProvider>
        </AuthProvider>
    )
}

export default App
