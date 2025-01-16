import {useState, useEffect} from 'react'
import {Link, NavLink, useNavigate} from 'react-router-dom'
import {authService} from '../../services/api/auth.service'
import {userService} from '../../services/api/user.service'
import './Navbar.css'

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const [showProfileMenu, setShowProfileMenu] = useState(false)
    const [userInfo, setUserInfo] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        fetchUserInfo()
    }, [])

    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 20
            if (isScrolled !== scrolled) {
                setScrolled(isScrolled)
            }
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [scrolled])

    const fetchUserInfo = async () => {
        try {
            const data = await userService.getUserInfo()
            setUserInfo(data)
        } catch (error) {
            console.error('Error fetching user info:', error)
        }
    }

    const handleLogout = () => {
        authService.logout()
        window.dispatchEvent(new Event('storage'))
        navigate('/login', {replace: true})
    }

    const getProfileImage = () => {
        if (!userInfo || userInfo.profilePhotoPath === '-') {
            return '/src/assets/default-avatar.png'
        }
        return userInfo.profilePhotoPath
    }

    const toggleMenu = () => {
        setIsOpen(!isOpen)
    }

    const closeMenu = () => {
        setIsOpen(false)
    }

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
            <div className="navbar-container">
                <Link to="/" className="navbar-brand" onClick={closeMenu}>
                    <img src="/src/assets/ico.png" alt="Harmony Haven Logo"/>
                    <span>Harmony Haven</span>
                </Link>

                <div className={`nav-links ${isOpen ? 'open' : ''}`}>
                    <NavLink to="/" className="nav-link" onClick={closeMenu}>
                        Ana Sayfa
                    </NavLink>
                    <NavLink to="/articles" className="nav-link" onClick={closeMenu}>
                        Makaleler
                    </NavLink>
                    <NavLink to="/quotes" className="nav-link" onClick={closeMenu}>
                        Alıntılar
                    </NavLink>
                    <NavLink to="/notifications" className="nav-link" onClick={closeMenu}>
                        Bildirimler
                    </NavLink>

                    <div className="profile-menu-container">
                        <button
                            className="profile-button"
                            onClick={() => setShowProfileMenu(!showProfileMenu)}
                        >
                            <img
                                src={getProfileImage()}
                                alt={userInfo?.name || 'Profile'}
                                className ="pp-avatar"
                            />

                            <span className="profile-name">
                {userInfo?.name || 'Kullanıcı'}
              </span>
                            <svg
                                className={`profile-arrow ${showProfileMenu ? 'open' : ''}`}
                                width="12"
                                height="12"
                                viewBox="0 0 12 12"
                            >
                                <path
                                    d="M2 4L6 8L10 4"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    fill="none"
                                />
                            </svg>
                        </button>

                        {showProfileMenu && (
                            <div className="profile-dropdown">
                                <div className="profile-info">
                                    <img
                                        src={getProfileImage()}
                                        alt={userInfo?.name || 'Profile'}
                                        className="profile-dropdown-avatar"
                                    />
                                    <div className="profile-details">
                                        <span className="profile-name">{userInfo?.name}</span>
                                        <span className="profile-email">{userInfo?.email}</span>
                                    </div>
                                </div>
                                <div className="profile-dropdown-divider"></div>
                                <Link to="/profile" className="profile-dropdown-item">
                                    <svg width="16" height="16" viewBox="0 0 24 24">
                                        <path
                                            d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
                                            fill="currentColor"/>
                                    </svg>
                                    Profil
                                </Link>
                                <button
                                    className="profile-dropdown-item logout"
                                    onClick={handleLogout}
                                >
                                    <svg width="16" height="16" viewBox="0 0 24 24">
                                        <path
                                            d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"
                                            fill="currentColor"/>
                                    </svg>
                                    Çıkış Yap
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                <button className="navbar-toggle" onClick={toggleMenu}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                         stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        {isOpen ? (
                            <>
                                <line x1="18" y1="6" x2="6" y2="18"/>
                                <line x1="6" y1="6" x2="18" y2="18"/>
                            </>
                        ) : (
                            <>
                                <line x1="3" y1="12" x2="21" y2="12"/>
                                <line x1="3" y1="6" x2="21" y2="6"/>
                                <line x1="3" y1="18" x2="21" y2="18"/>
                            </>
                        )}
                    </svg>
                </button>
            </div>
        </nav>
    )
} 