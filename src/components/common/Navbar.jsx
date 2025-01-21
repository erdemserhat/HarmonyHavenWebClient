import { useState } from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'
import icoImage from '../../assets/ico.png'
import googlePlayIcon from '../../assets/google-play.svg'

export function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    const shareUrl = () => {
        if (navigator.share) {
            navigator.share({
                title: document.title,
                text: document.querySelector('meta[name="description"]')?.content,
                url: window.location.href
            });
        } else {
            // Kopyala butonu için fallback
            navigator.clipboard.writeText(window.location.href);
            // Kullanıcıya bildirim göster
        }
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-brand">
                    <img src={icoImage} alt="Harmony Haven Logo" />
                    <span>Harmony Haven</span>
                </Link>

                <button className="menu-button" onClick={toggleMenu}>
                    <span className={`hamburger ${isMenuOpen ? 'open' : ''}`}></span>
                </button>

                <div className={`navbar-links ${isMenuOpen ? 'open' : ''}`}>
                    <Link to="/" className="nav-link" onClick={() => setIsMenuOpen(false)}>
                        Ana Sayfa
                    </Link>
                    <Link to="/articles" className="nav-link" onClick={() => setIsMenuOpen(false)}>
                        Makaleler
                    </Link>

                    <div className="store-button-container">
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
                    </div>
                </div>

                <button 
                    onClick={shareUrl}
                    className="share-button"
                    aria-label="Sayfayı paylaş"
                >
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="20" 
                        height="20" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                    >
                        <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/>
                        <polyline points="16 6 12 2 8 6"/>
                        <line x1="12" y1="2" x2="12" y2="15"/>
                    </svg>
                </button>
            </div>
        </nav>
    )
} 