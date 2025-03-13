import { useState } from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'
import icoImage from '../../../assets/ico.png'
import googlePlayIcon from '../../../assets/google-play.svg'

export function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }



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
                    <Link to="/write-article" className="nav-link" onClick={() => setIsMenuOpen(false)}>
                        Makale Yaz
                    </Link>

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

            </div>
        </nav>
    )
} 