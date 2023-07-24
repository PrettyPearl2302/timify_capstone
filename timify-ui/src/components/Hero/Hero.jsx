import React from "react";
import "./Hero.css";

export default function Hero() {
  return (
    <nav className="hero">
      <div className="hero-container">
        <img className="hero-image" src="/src/assets/my-logo.png" alt="logo" />
        <div className="hero-intro">
          <p className="heading">Timify +</p>
          <p className="tagline">Redefining the podcast listening experience...</p>
        </div>
      </div>
    </nav>
  );
}
