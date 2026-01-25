// src/components/header/index.jsx

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './index.css';
import logo from '../../assets/logo.png';
import ThemeToggle from '../ThemeToggle';

const Header = ({ onContactClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  const handleNavClick = (path) => {
    navigate(path);
    setIsMenuOpen(false);
  };
  
  const handleContactClick = () => {
    onContactClick();
    setIsMenuOpen(false);
  }

  const headerClassName = isScrolled ? 'header-container scrolled' : 'header-container';
  const navClassName = isMenuOpen ? 'nav-menu open' : 'nav-menu';

  return (
    <header className={headerClassName}>
      <div className="header-content">
        <div className="logo-container">
          <Link to="/" onClick={() => setIsMenuOpen(false)}>
            <img src={logo} alt="Logo da Empresa" className="logo" />
          </Link>
          <div className="logo-text">
            <span className="logo-text-line1">DATA-RO</span>
            <span className="logo-text-line2">INTELIGÊNCIA TERRITORIAL</span>
          </div>
        </div>
        <div className="nav-center-wrapper">
          <nav className={navClassName}>
            <ul>
              <li><Link to="/" onClick={() => setIsMenuOpen(false)}>INÍCIO</Link></li>
              <li><Link to="/services" onClick={() => setIsMenuOpen(false)}>PORTFÓLIO</Link></li>
              <li><a href="#" onClick={handleContactClick}>CONTATO</a></li>
              <li><Link to="/about-us" onClick={() => setIsMenuOpen(false)}>SOBRE NÓS</Link></li>
              <li><Link to="/paineis/login" className="paineis-link" onClick={() => setIsMenuOpen(false)}>RONDÔNIA EM NÚMEROS</Link></li>
            </ul>
          </nav>
        </div>
        <div className="header-actions">
          <ThemeToggle />
          <Link to="/admin/login" className="login-icon-btn" title="Área de Gestão">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
              <polyline points="16 17 21 12 16 7"></polyline>
              <line x1="21" y1="12" x2="9" y2="12"></line>
            </svg>
          </Link>
          <div className="menu-toggle" onClick={toggleMenu}>
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
