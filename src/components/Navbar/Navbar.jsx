import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Download, Menu, X, Shield } from 'lucide-react';
import { useSiteContent } from '../../context/SiteContentContext';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { profile } = useSiteContent();

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={styles.navbar}>
      <div className={styles.navContainer}>
        <NavLink to="/" className={styles.logo} onClick={closeMenu}>
          <span className={styles.logoBadge}>SP</span>
          <span>
            Shivanand <span className={styles.logoAccent}>Patil</span>
          </span>
        </NavLink>

        <ul className={`${styles.navLinks} ${menuOpen ? styles.navLinksOpen : ''}`}>
          <li>
            <NavLink
              to="/"
              end
              onClick={closeMenu}
              className={({ isActive }) =>
                `${styles.navItem} ${isActive ? styles.activeLink : ''}`
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              onClick={closeMenu}
              className={({ isActive }) =>
                `${styles.navItem} ${isActive ? styles.activeLink : ''}`
              }
            >
              About
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/projects"
              onClick={closeMenu}
              className={({ isActive }) =>
                `${styles.navItem} ${isActive ? styles.activeLink : ''}`
              }
            >
              Projects
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact"
              onClick={closeMenu}
              className={({ isActive }) =>
                `${styles.navItem} ${isActive ? styles.activeLink : ''}`
              }
            >
              Contact
            </NavLink>
          </li>
        </ul>

        <div className={styles.navActions}>
          <a
            href={profile.resumeUrl}
            download="Shivanand_Patil_Resume.pdf"
            target="_blank"
            rel="noreferrer"
            className={styles.resumeBtn}
          >
            <Download size={16} />
            <span className={styles.resumeText}>Resume</span>
          </a>

          <NavLink
            to="/admin"
            title="Admin Dashboard"
            className={styles.adminIconLink}
            onClick={closeMenu}
          >
            <Shield size={17} />
          </NavLink>

          <button
            type="button"
            className={styles.menuToggle}
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Toggle Menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>
    </header>
  );
}