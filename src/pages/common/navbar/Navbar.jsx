import { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { authService } from '../../../services/api/auth.service'
import './Navbar.css'
import icoImage from '../../../assets/ico.png'

export function Navbar() {
    const [isAuthenticated, setIsAuthenticated] = useState(null)
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [unreadNotifications, setUnreadNotifications] = useState(0)

    useEffect(() => {
        const checkAuthStatus = async () => {
            try {
                const status = await authService.isAuthenticated()
                setIsAuthenticated(status)
            } catch (error) {
                console.error('Auth status check failed:', error)
                setIsAuthenticated(false)
            }
        }
        checkAuthStatus()
    }, [])

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    // Sayfa yüklenirken loading durumu
    if (isAuthenticated === null) {
        return (
            <nav className="navbar">
                <div className="navbar-container">
                    <Link to="/" className="navbar-brand">
                        <img src={icoImage} alt="Harmony Haven Logo" />
                        <span>Harmony Haven</span>
                    </Link>
                    <div className="navbar-links">
                        <div className="nav-link loading-placeholder"></div>
                    </div>
                </div>
            </nav>
        )
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
                    {isAuthenticated && (
                        <NavLink to="/notifications" className="nav-link notification-button" onClick={() => setIsMenuOpen(false)}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
                            </svg>
                            {unreadNotifications > 0 && (
                                <span className="notification-badge">{unreadNotifications}</span>
                            )}
                        </NavLink>
                    )}
                    {isAuthenticated ? (
                        <NavLink to="/profile" className="nav-link profile-button" onClick={() => setIsMenuOpen(false)}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.964 0a9 9 0 10-11.964 0m11.964 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            Profil
                        </NavLink>
                    ) : (
                        <NavLink to="/login" className="nav-link login-button" onClick={() => setIsMenuOpen(false)}>
                            Giriş Yap
                        </NavLink>
                    )}
                </div>
            </div>
        </nav>
    )
} 