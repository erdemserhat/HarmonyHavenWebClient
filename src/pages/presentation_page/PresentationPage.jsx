import React, { useEffect, useRef } from "react";
import "./presentationPage.css";
import PropTypes from "prop-types";
import androidIcon from "../../assets/android-icon.png";
import appleIcon from "../../assets/apple-icon.png";
import securityIcon from "../../assets/django-icon.webp";
import reactIcon from "../../assets/react-logo.png";
import quarkusIcon from "../../assets/quarkus-logo.png";





export function PresentationPage() {
    return (
        <div className="presentation-container">
            <RepositoryCard name="Android Client" description="Android Client GitHub Reposun Göz Atın" icon={androidIcon} />
            <RepositoryCard name="iOS Client" description="iOS Client GitHub Reposun Göz Atın" icon={appleIcon} />
            <RepositoryCard name="Web Client" description="Web Client GitHub Reposuna Göz Atın" icon={reactIcon} />
            <RepositoryCard name="Yorum Mikroservisi" description="Web Client GitHub Reposuna Göz Atın" icon={quarkusIcon} />


            <RepositoryCard name="Güvenlik Mikroservisi" description="UUID tabanlı mikroservis modulüne göz atın" icon={securityIcon} />




        </div>
    );
}

export function RepositoryCard({name,description,icon}) {

    return(
        <div className="repository-card">

            <div className="card-header">
                <img className="card-icon" src={icon} alt="My Icon" />
                <p className="card-title">{name}</p>

            </div>
            <p className="card-description">{description}</p>
        </div>
    )

}



RepositoryCard.propTypes = {
    name: PropTypes.string,
    description: PropTypes.string,
    icon: PropTypes.string
}
