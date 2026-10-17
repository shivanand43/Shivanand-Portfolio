import React from 'react';
import { Code, Briefcase, Mail, Phone } from 'lucide-react';
import { useSiteContent } from '../../context/SiteContentContext';
import styles from './Footer.module.css';

export default function Footer() {
  const { profile } = useSiteContent();

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <div className={styles.brandInfo}>
          <span className={styles.brandName}>
            {profile.name} — {profile.role}
          </span>
          <span className={styles.copyright}>
            © {new Date().getFullYear()} {profile.name}. Built with React, Vite & Node.js.
          </span>
        </div>

        <div className={styles.socialRow}>
          <a
            href={profile.socials.github}
            target="_blank"
            rel="noreferrer"
            className={styles.socialLink}
          >
            <Code size={16} /> GitHub
          </a>
          <a
            href={profile.socials.linkedin}
            target="_blank"
            rel="noreferrer"
            className={styles.socialLink}
          >
            <Briefcase size={16} /> LinkedIn
          </a>
          <a href={`mailto:${profile.email}`} className={styles.socialLink}>
            <Mail size={16} /> Email
          </a>
          <a href={`tel:${profile.phone}`} className={styles.socialLink}>
            <Phone size={16} /> Call
          </a>
        </div>
      </div>
    </footer>
  );
}