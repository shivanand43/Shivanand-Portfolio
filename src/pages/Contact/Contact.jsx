import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { useSiteContent } from '../../context/SiteContentContext';
import PageBack from '../../components/PageBack/PageBack';
import styles from './Contact.module.css';

export default function Contact() {
  const { content, profile } = useSiteContent();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newMsg = {
      id: Date.now().toString(),
      ...formData,
      createdAt: new Date().toISOString(),
    };

    // Save locally immediately & send to API if online
    const existing = JSON.parse(
      localStorage.getItem('shivanand_portfolio_messages') || '[]'
    );
    localStorage.setItem(
      'shivanand_portfolio_messages',
      JSON.stringify([newMsg, ...existing])
    );

    try {
      await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newMsg),
      });
    } catch {
      // Offline/local fallback already saved above
    }

    setSubmitted(true);
    setFormData({ name: '', email: '', company: '', message: '' });
  };

  return (
    <div className={styles.contactPage}>
      <PageBack />

      <div className={styles.contactGrid}>
        <div className={styles.infoCard}>
          <h1 className={styles.heading}>{content.contactHeading}</h1>
          <p className={styles.subtext}>{content.contactSubtext}</p>

          <div className={styles.contactList}>
            <a href={`mailto:${profile.email}`} className={styles.contactItem}>
              <Mail size={18} />
              <span>{profile.email}</span>
            </a>
            <a href={`tel:${profile.phone}`} className={styles.contactItem}>
              <Phone size={18} />
              <span>{profile.phone}</span>
            </a>
            <div className={styles.contactItem}>
              <MapPin size={18} />
              <span>{profile.location}</span>
            </div>
          </div>
        </div>

        <div className={styles.formCard}>
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.fieldGroup}>
              <label className={styles.label}>Your Name *</label>
              <input
                type="text"
                required
                className={styles.input}
                placeholder="Recruiter / Hiring Manager Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div className={styles.fieldGroup}>
              <label className={styles.label}>Email Address *</label>
              <input
                type="email"
                required
                className={styles.input}
                placeholder="you@company.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div className={styles.fieldGroup}>
              <label className={styles.label}>Company / Organization</label>
              <input
                type="text"
                className={styles.input}
                placeholder="Company Name (Optional)"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              />
            </div>

            <div className={styles.fieldGroup}>
              <label className={styles.label}>Message *</label>
              <textarea
                required
                className={styles.textarea}
                placeholder="Hi Shivanand, we have an opening for a Full-Stack / React Developer..."
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
              />
            </div>

            {submitted && (
              <div className={styles.successMsg}>
                ✓ Thank you! Your message has been saved and sent to Shivanand.
              </div>
            )}

            <button type="submit" className={styles.submitBtn}>
              <Send size={17} />
              <span>Send Message</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}