import React, { useState, useEffect, useRef } from 'react'
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom'
import { authService } from '../../../services/api/auth.service'
import './style.css'
import icoImage from '../../../assets/ico.png'
import axios from "@/services/api/axios.js"
import {useAuthChecker} from "@/context/AuthContext.jsx";
import { FaComments, FaHome, FaSearch, FaNewspaper, FaBell, FaUser, FaPlus, FaBookmark, FaChartBar, FaSignOutAlt, FaCog, FaBars, FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

export function Navbar() {
    const navigate = useNavigate()
    const location = useLocation()
    const { isAuthenticated, setIsAuthenticated } = useAuthChecker();
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [profileDropdownOpen, setProfileDropdownOpen] = useState(false)
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const [isNavbarCollapsed, setIsNavbarCollapsed] = useState(false);
    const dropdownRef = useRef(null)
    
    // Ekran boyutunu kontrol et
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
            if (window.innerWidth > 768) {
                setIsMenuOpen(false);
            }
        };
        
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    
    // Mevcut sayfayı kontrol et
    const getPageTitle = () => {
        const path = location.pathname;
        
        if (path === '/chat') return "Harmonia AI";
        if (path === '/profile') return "Profil";
        if (path === '/articles') return "Makaleler";
        if (path.startsWith('/articles/')) return "Makale Detayı";
        if (path === '/notifications') return "Bildirimler";
        if (path === '/presentation') return "Projeyi Keşfet";
        if (path === '/login') return "Giriş Yap";
        if (path === '/') return "Ana Sayfa";
        
        return "Harmony Haven";
    };

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

    // Navbar durumunu localStorage'a kaydet
    useEffect(() => {
        if (!isMobile) {
            localStorage.setItem('navbarCollapsed', isNavbarCollapsed.toString());
            // Navbar durumunu body class'ına ekle (CSS için)
            document.body.classList.toggle('navbar-collapsed', isNavbarCollapsed);
        }
    }, [isNavbarCollapsed, isMobile]);

    // Sayfa yüklendiğinde önceki durumu kontrol et
    useEffect(() => {
        const savedState = localStorage.getItem('navbarCollapsed');
        if (savedState !== null && !isMobile) {
            setIsNavbarCollapsed(savedState === 'true');
        }
    }, [isMobile]);

    const toggleNavbar = () => {
        setIsNavbarCollapsed(!isNavbarCollapsed);
    };

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
        logout()
        setProfileDropdownOpen(false)
    }

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    // Aktif menü item kontrolü
    const isActive = (path) => {
        return location.pathname === path;
    };

    // Sayfa yüklenirken loading durumu
    if (isAuthenticated === null) {
        return (
            <nav className="navbar">
                <div className="navbar-container">
                    <Link to="/" className="navbar-brand">
                        <img src={icoImage} alt="Harmony Haven Logo" />
                        <span>Harmony Haven</span>
                    </Link>
                </div>
            </nav>
        )
    }

    return (
        <>
            <nav className={`navbar ${isNavbarCollapsed ? 'collapsed' : ''}`}>
                <div className="navbar-container">
                    {/* Logo & Brand */}
                    <Link to="/" className="navbar-brand">
                        <img src={icoImage} alt="Harmony Haven Logo" />
                        {isMobile ? (
                            <span>{getPageTitle()}</span>
                        ) : (
                            <span className={isNavbarCollapsed ? 'hidden' : ''}>Harmony Haven</span>
                        )}
                    </Link>

                    {/* Masaüstü menü linkleri - mobilde gizli */}
                    {!isMobile && (
                        <div className="navbar-links">
                            {/* Ana Menü Linkleri */}
                            <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`} onClick={() => setIsMenuOpen(false)}>
                                <FaHome className="nav-icon" />
                                <span className={isNavbarCollapsed ? 'hidden' : ''}>Ana Sayfa</span>
                            </Link>
                            
                            <Link to="/presentation" className={`nav-link ${isActive('/presentation') ? 'active' : ''}`} onClick={() => setIsMenuOpen(false)}>
                                <FaSearch className="nav-icon" />
                                <span className={isNavbarCollapsed ? 'hidden' : ''}>Keşfet</span>
                            </Link>
                            
                            <Link to="/articles" className={`nav-link ${isActive('/articles') ? 'active' : ''}`} onClick={() => setIsMenuOpen(false)}>
                                <FaNewspaper className="nav-icon" />
                                <span className={isNavbarCollapsed ? 'hidden' : ''}>Makaleler</span>
                            </Link>
                            
                            {isAuthenticated && (
                                <>
                                    <Link to="/chat" className={`nav-link ${isActive('/chat') ? 'active' : ''}`} onClick={() => setIsMenuOpen(false)}>
                                        <FaComments className="nav-icon" />
                                        <span className={isNavbarCollapsed ? 'hidden' : ''}>Chat</span>
                                    </Link>
                                    
                                    <Link to="/write-article" className={`nav-link ${isActive('/write-article') ? 'active' : ''}`} onClick={() => setIsMenuOpen(false)}>
                                        <FaPlus className="nav-icon" />
                                        <span className={isNavbarCollapsed ? 'hidden' : ''}>Oluştur</span>
                                    </Link>
                                    
                                    <NavLink to="/notifications" className={`nav-link ${isActive('/notifications') ? 'active' : ''}`} onClick={() => setIsMenuOpen(false)}>
                                        <FaBell className="nav-icon" />
                                        <span className={isNavbarCollapsed ? 'hidden' : ''}>Bildirimler</span>
                                    </NavLink>
                                    
                                    <Link to="/profile" className={`nav-link ${isActive('/profile') ? 'active' : ''}`} onClick={() => setIsMenuOpen(false)}>
                                        <FaUser className="nav-icon" />
                                        <span className={isNavbarCollapsed ? 'hidden' : ''}>Profil</span>
                                    </Link>
                                    
                                    <div className="nav-link logout-button" onClick={handleLogout}>
                                        <FaSignOutAlt className="nav-icon" />
                                        <span className={isNavbarCollapsed ? 'hidden' : ''}>Çıkış</span>
                                    </div>
                                </>
                            )}
                            
                            {!isAuthenticated && (
                                <NavLink to="/login" className="nav-link login-button" onClick={() => setIsMenuOpen(false)}>
                                    <FaUser className="nav-icon" />
                                    <span className={isNavbarCollapsed ? 'hidden' : ''}>Giriş Yap</span>
                                </NavLink>
                            )}
                        </div>
                    )}
                </div>
            </nav>

            {/* Navbar Kollapsa/Genişletme Butonu (sadece masaüstü) */}
            {!isMobile && (
                <button 
                    className={`navbar-toggle-button ${isNavbarCollapsed ? 'collapsed' : ''}`} 
                    onClick={toggleNavbar}
                    aria-label="Toggle navigation"
                >
                    {isNavbarCollapsed ? <FaChevronRight /> : <FaChevronLeft />}
                </button>
            )}

            {/* Mobile Bottom Navigation */}
            {isMobile && (
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
            )}
        </>
    )
} 