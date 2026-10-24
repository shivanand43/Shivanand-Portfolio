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
    <img src="/github.png" alt="GitHub" className={styles.socialIcon} />
    GitHub
  </a>

  <a
    href={profile.socials.linkedin}
    target="_blank"
    rel="noreferrer"
    className={styles.socialLink}
  >
    <img src="/linkedin.png" alt="LinkedIn" className={styles.socialIcon} />
    LinkedIn
  </a>
           <a href={`mailto:${profile.email}`} className={styles.socialLink}>
    <img src="/email.gif" alt="Email" className={styles.socialIcon} />
    Email
  </a>

  <a href={`tel:${profile.phone}`} className={styles.socialLink}>
    <img src="/phone.gif" alt="Call" className={styles.socialIcon} />
    Call
  </a>
        </div>
      </div>
    </footer>
  );
}