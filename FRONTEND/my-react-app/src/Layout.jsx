import { useState, useEffect } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { Shield, Sun, Moon, Menu, X, Car } from 'lucide-react';

export default function Layout() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Handle theme changes
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* NAVBAR */}
      <header className="navbar-header">
        <div className="navbar-container">
          {/* Logo & Brand */}
          <NavLink to="/" className="navbar-logo" onClick={closeMobileMenu}>
            <div className="logo-icon-wrapper">
              <Shield className="logo-shield" size={24} />
              <Car className="logo-car" size={14} />
            </div>
            <span className="navbar-brand">FraudShield <span className="brand-highlight">AI</span></span>
          </NavLink>

          {/* Desktop Navigation */}
          <nav className="desktop-nav">
            <NavLink to="/" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
              Home
            </NavLink>
            <NavLink to="/about" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
              About
            </NavLink>
            <NavLink to="/prediction" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
              Prediction
            </NavLink>
            <NavLink to="/contact" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
              Contact
            </NavLink>
          </nav>

          {/* Right Controls */}
          <div className="navbar-controls">
            <button 
              className="theme-toggle-btn" 
              onClick={toggleTheme} 
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
            
            <button 
              className="analyze-cta-btn" 
              onClick={() => {
                closeMobileMenu();
                navigate('/prediction');
              }}
            >
              Analyze Claim
            </button>

            {/* Mobile Menu Hamburger */}
            <button 
              className="mobile-hamburger-btn" 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        <div className={`mobile-nav-menu ${mobileMenuOpen ? 'open' : ''}`}>
          <nav className="mobile-nav-links">
            <NavLink to="/" className={({ isActive }) => isActive ? "mobile-nav-link active" : "mobile-nav-link"} onClick={closeMobileMenu}>
              Home
            </NavLink>
            <NavLink to="/about" className={({ isActive }) => isActive ? "mobile-nav-link active" : "mobile-nav-link"} onClick={closeMobileMenu}>
              About
            </NavLink>
            <NavLink to="/prediction" className={({ isActive }) => isActive ? "mobile-nav-link active" : "mobile-nav-link"} onClick={closeMobileMenu}>
              Prediction
            </NavLink>
            <NavLink to="/contact" className={({ isActive }) => isActive ? "mobile-nav-link active" : "mobile-nav-link"} onClick={closeMobileMenu}>
              Contact
            </NavLink>
            
            <div className="mobile-menu-divider"></div>
            
            <button 
              className="mobile-analyze-btn" 
              onClick={() => {
                closeMobileMenu();
                navigate('/prediction');
              }}
            >
              Analyze Claim
            </button>
          </nav>
        </div>
      </header>

      {/* MAIN CONTENT AREA */}
      <main className="main-content">
        <Outlet />
      </main>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-brand-section">
            <div className="footer-logo">
              <Shield className="footer-shield-icon" size={20} />
              <span>FraudShield AI</span>
            </div>
            <p className="footer-tagline">AI-powered vehicle insurance fraud detection.</p>
          </div>
          
          <div className="footer-links-section">
            <NavLink to="/" className="footer-link">Home</NavLink>
            <NavLink to="/about" className="footer-link">About</NavLink>
            <NavLink to="/prediction" className="footer-link">Prediction</NavLink>
            <NavLink to="/contact" className="footer-link">Contact</NavLink>
          </div>
          
          <div className="footer-copyright-section">
            <p className="footer-copyright">&copy; 2026 FraudShield AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
}
