import React from "react";
import "./Hero.css";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <nav className="hero">
      <div className="hero-container">
        <Link to="/">
        <img className="hero-image" src="/src/assets/my-logo.png" alt="logo" />
        </Link>
        <div className="hero-intro">
          <p className="heading">Timify +</p>
          <p className="tagline">Redefining the podcast listening experience...</p>
        </div>
      </div>
    </nav>
  );
}
