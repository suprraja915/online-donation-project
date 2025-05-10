import React from 'react';
import './Header.css';

export default function Header() {
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header>
      <h1>Support Our Cause</h1>
      <nav>
        <button onClick={() => scrollToSection('campaigns-section')}>Campaigns</button>
        <button onClick={() => scrollToSection('donation-form')}>Donate Now</button>
        <button onClick={() => scrollToSection('contact-section')}>Contact</button>
      </nav>
    </header>
  );
}
