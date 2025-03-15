import React from "react";
import "./presentationPage.css";
import PropTypes from "prop-types";
import androidIcon from "../../assets/android-icon.webp";
import appleIcon from "../../assets/apple-icon.png";
import securityIcon from "../../assets/django-icon.webp";
import reactIcon from "../../assets/react-logo.png";
import quarkusIcon from "../../assets/quarkus-logo.png";
import ktorIcon from "../../assets/ktor-icon.png";

// GitHub icon as SVG component for better quality
const GitHubIcon = () => (
    <svg className="github-icon" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12" />
    </svg>
);

const repositories = [
    {
        name: "Android Client",
        description: "Native Android app using Kotlin, Jetpack Compose with MVVM + Onion Architecture",
        icon: androidIcon,
        url: "https://github.com/erdemserhat/HarmonyHavenAndroidClient"
    },
    {
        name: "iOS Client",
        description: "Native iOS app built with Swift, SwiftUI using MVVM + Onion Architecture",
        icon: appleIcon,
        url: "https://github.com/erdemserhat/HarmonyHavenIosClient"
    },
    {
        name: "Web Client",
        description: "Modern React application with Context API, JSX, HTML, and CSS",
        icon: reactIcon,
        url: "https://github.com/erdemserhat/HarmonyHavenWebClient"
    },
    {
        name: "Comment Microservice",
        description: "High-performance Quarkus service using Kotlin, Java with MVC pattern",
        icon: quarkusIcon,
        url: "https://github.com/erdemserhat/HarmonyHavenCommentMicroservice"
    },
    {
        name: "Security Microservice",
        description: "Python-based Django service with N-tier Architecture",
        icon: securityIcon,
        url: "https://github.com/erdemserhat/djangoCryptoMicroservice"
    },
    {
        name: "Backend",
        description: "Ktor-based service with Ktorm, MySQL, AWS using MVC + N-tier Architecture",
        icon: ktorIcon,
        url: "https://github.com/erdemserhat/HarmonyHavenKtorServer"
    }
];

export function PresentationPage() {
    return (
        <div className="presentation-page">
            <header className="page-header">
                <h1 className="page-title">Teknoloji Altyapımız</h1>
                <p className="page-subtitle">
                    Proje modüllerimizi keşfedin
                </p>
            </header>
            
            <div className="presentation-container">
                {repositories.map((repo, index) => (
                    <RepositoryCard
                        key={index}
                        name={repo.name}
                        description={repo.description}
                        icon={repo.icon}
                        url={repo.url}
                    />
                ))}
            </div>
        </div>
    );
}

export function RepositoryCard({ name, description, icon, url }) {
    const handleClick = () => {
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    return (
        <div className="repository-card" onClick={handleClick}>
            <div className="card-header">
                <img className="card-icon" src={icon} alt={`${name} icon`} />
                <h2 className="card-title">{name}</h2>
                <GitHubIcon />
            </div>
            <p className="card-description">{description}</p>
        </div>
    );
}

RepositoryCard.propTypes = {
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired
};
