import React, { useState, useEffect, useRef } from 'react'
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom'
import { authService } from '../../../services/api/auth.service'
import './Navbar.css'
import icoImage from '../../../assets/ico.png'
import axios from "@/services/api/axios.js"
import {useAuthChecker} from "@/context/AuthContext.jsx";
import { FaComments, FaHome, FaSearch, FaNewspaper, FaBell, FaUser } from 'react-icons/fa';

export function Navbar() {
    const navigate = useNavigate()
    const location = useLocation()
    const { isAuthenticated, setIsAuthenticated } = useAuthChecker();
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [profileDropdownOpen, setProfileDropdownOpen] = useState(false)
    const dropdownRef = useRef(null)
    
    // Chat sayfasında olup olmadığını kontrol et
    const isChatPage = location.pathname === '/chat'

    useEffect(() => {
        // Click dışında dropdown'ı kapatmak için event listener
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


    const logout = async () => {
        try {
            await axios.post('/user/logout', {}, { withCredentials: true });
            navigate('/')
            setIsAuthenticated(false); // Global state'i güncelle
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    const handleLogout = () => {
        // Sadece dropdown'ı kapatıyoruz, çıkış işlemini kullanıcı yapacak
        logout()
        setProfileDropdownOpen(false)
    }

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
        <>
            <nav className="navbar">
                <div className="navbar-container">
                    <Link to="/" className="navbar-brand">
                        <img src={icoImage} alt="Harmony Haven Logo" />
                        <span>{isChatPage ? "Harmonia AI" : "Harmony Haven"}</span>
                    </Link>

                    <button className="menu-button" onClick={toggleMenu}>
                        <span className={`hamburger ${isMenuOpen ? 'open' : ''}`}></span>
                    </button>

                    <div className={`navbar-links ${isMenuOpen ? 'open' : ''}`}>
                        <Link to="/presentation" className="nav-link" onClick={() => setIsMenuOpen(false)}>
                            <FaSearch className="nav-icon" />
                            Projeyi Keşfet
                        </Link>
                        <Link to="/" className="nav-link" onClick={() => setIsMenuOpen(false)}>
                            <FaHome className="nav-icon" />
                            Ana Sayfa
                        </Link>
                        <Link to="/articles" className="nav-link" onClick={() => setIsMenuOpen(false)}>
                            <FaNewspaper className="nav-icon" />
                            Makaleler
                        </Link>
                        {isAuthenticated && (
                            <>
                                <Link to="/chat" className="nav-link" onClick={() => setIsMenuOpen(false)}>
                                    <FaComments className="nav-icon" />
                                    Chat
                                </Link>
                                <NavLink to="/notifications" className="nav-link notification-button" onClick={() => setIsMenuOpen(false)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
                                    </svg>
                                </NavLink>
                            </>
                        )}
                        {isAuthenticated ? (
                            <div className="profile-dropdown-container" ref={dropdownRef}>
                                <div className="profile-button" onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                                    </svg>
                                </div>
                                {profileDropdownOpen && (
                                    <div className="profile-dropdown">
                                        <Link to="/profile" className="dropdown-item">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                                            </svg>
                                            <span>Profil</span>
                                        </Link>
                                        <div className="dropdown-item" onClick={handleLogout}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                                            </svg>
                                            <span>Çıkış Yap</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <NavLink to="/login" className="nav-link login-button" onClick={() => setIsMenuOpen(false)}>
                                Giriş Yap
                            </NavLink>
                        )}
                    </div>
                </div>
            </nav>

            {/* Mobile Bottom Navigation */}
            <div className="mobile-bottom-nav">
                <NavLink to="/" className="mobile-nav-item" onClick={() => setIsMenuOpen(false)}>
                    <FaHome className="mobile-nav-icon" />
                    <span>Ana Sayfa</span>
                </NavLink>
                <NavLink to="/articles" className="mobile-nav-item" onClick={() => setIsMenuOpen(false)}>
                    <FaNewspaper className="mobile-nav-icon" />
                    <span>Makaleler</span>
                </NavLink>
                {isAuthenticated ? (
                    <>
                        <NavLink to="/chat" className="mobile-nav-item" onClick={() => setIsMenuOpen(false)}>
                            <FaComments className="mobile-nav-icon" />
                            <span>Chat</span>
                        </NavLink>
                        <NavLink to="/profile" className="mobile-nav-item" onClick={() => setIsMenuOpen(false)}>
                            <FaUser className="mobile-nav-icon" />
                            <span>Profil</span>
                        </NavLink>
                    </>
                ) : (
                    <NavLink to="/login" className="mobile-nav-item" onClick={() => setIsMenuOpen(false)}>
                        <FaUser className="mobile-nav-icon" />
                        <span>Giriş</span>
                    </NavLink>
                )}
            </div>
        </>
    )
} 