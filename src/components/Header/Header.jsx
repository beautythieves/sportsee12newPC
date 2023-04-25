import React from "react";
import logo from "./logo.png";
import "./Header.css";
export default function Header() {
  return (
    <header className="header-container">
      <img className="header-logo" src={logo} alt="sportsee logo" />
      <nav className="header-nav">
        <h1 className="header-accueil">
          <a href="/">Accueil</a>
        </h1>
        <h1 className="header-about">
          <a href="/about">Profil</a>
        </h1>
        <h1 className="header-services">
          <a href="/services">Réglages</a>
        </h1>
        <h1 className="header-contact">
          <a href="/contact">Communauté</a>
        </h1>
      </nav>
    </header>
  );
}

