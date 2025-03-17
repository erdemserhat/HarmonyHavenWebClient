import { useState } from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'
import icoImage from '../../../assets/ico.png'

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
                    <Link to="/presentation" className="nav-link" onClick={() => setIsMenuOpen(false)}>
                        Projeyi Keşfet
                    </Link>
                    <Link to="/" className="nav-link" onClick={() => setIsMenuOpen(false)}>
                        Ana Sayfa
                    </Link>
                    <Link to="/articles" className="nav-link" onClick={() => setIsMenuOpen(false)}>
                        Makaleler
                    </Link>
                </div>
            </div>
        </nav>
    )
} 