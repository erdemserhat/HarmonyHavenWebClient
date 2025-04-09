import React, { useState, useEffect, useRef } from 'react'
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom'
import { authService } from '../../../services/api/auth.service'
import './Navbar.css'
import icoImage from '../../../assets/ico.png'
import axios from "@/services/api/axios.js"
import {useAuthChecker} from "@/context/AuthContext.jsx"
import { FaComments, FaHome, FaNewspaper, FaBell, FaInfoCircle, FaUserAlt, FaSignOutAlt } from 'react-icons/fa'

export function Navbar() {
    const navigate = useNavigate()
    const location = useLocation()
    const { isAuthenticated, setIsAuthenticated } = useAuthChecker()
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [profileDropdownOpen, setProfileDropdownOpen] = useState(false)
    const dropdownRef = useRef(null)

    // Check if current route is chat page
    const isOnChatPage = location.pathname === '/chat'

    useEffect(() => {
        // Close dropdown when clicking outside
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setProfileDropdownOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    // Close mobile menu when changing routes
    useEffect(() => {
        setIsMenuOpen(false)
    }, [location.pathname])

    const logout = async () => {
        try {
            await axios.post('/user/logout', {}, { withCredentials: true })
            navigate('/')
            setIsAuthenticated(false)
        } catch (error) {
            console.error('Logout failed:', error)
        }
    }

    const handleLogout = () => {
        logout()
        setProfileDropdownOpen(false)
    }

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    // Loading state when checking authentication
    if (isAuthenticated === null) {
        return (
            <nav className="navbar">
                <div className="navbar-container">
                    <Link to="/" className="navbar-brand">
                        <img src={icoImage} alt="Harmony Haven Logo" />
                        <span>{isOnChatPage ? 'Harmonia AI' : 'Harmony Haven'}</span>
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
                    <span>{isOnChatPage ? 'Harmonia AI' : 'Harmony Haven'}</span>
                </Link>

                <button className="menu-button" onClick={toggleMenu} aria-label="Toggle menu">
                    <span className={`hamburger ${isMenuOpen ? 'open' : ''}`}></span>
                </button>

                <div className={`navbar-links ${isMenuOpen ? 'open' : ''}`}>
                    <NavLink to="/presentation" className="nav-link">
                        <FaInfoCircle />
                        Projeyi Keşfet
                    </NavLink>
                    
                    <NavLink to="/" className="nav-link">
                        <FaHome />
                        Ana Sayfa
                    </NavLink>
                    
                    <NavLink to="/articles" className="nav-link">
                        <FaNewspaper />
                        Makaleler
                    </NavLink>
                    
                    {isAuthenticated && (
                        <NavLink to="/chat" className="nav-link">
                            <FaComments />
                            Chat
                        </NavLink>
                    )}
                    
                    {isAuthenticated ? (
                        <div className="profile-dropdown-container" ref={dropdownRef}>
                            <button 
                                className="profile-button" 
                                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                                aria-expanded={profileDropdownOpen}
                                aria-label="User profile"
                            >
                                <FaUserAlt />
                                <span className="notification-indicator"></span>
                            </button>
                            
                            {profileDropdownOpen && (
                                <div className="profile-dropdown">
                                    <NavLink to="/profile" className="dropdown-item">
                                        <FaUserAlt />
                                        <span>Profil</span>
                                    </NavLink>
                                    
                                    <NavLink to="/notifications" className="dropdown-item">
                                        <FaBell />
                                        <span>Bildirimler</span>
                                    </NavLink>
                                    
                                    <button className="dropdown-item" onClick={handleLogout}>
                                        <FaSignOutAlt />
                                        <span>Çıkış Yap</span>
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <NavLink to="/login" className="nav-link login-button">
                            Giriş Yap
                        </NavLink>
                    )}
                </div>
            </div>
        </nav>
    )
} 