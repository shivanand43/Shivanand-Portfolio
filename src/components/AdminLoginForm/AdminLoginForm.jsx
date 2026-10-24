import React, { useState } from 'react';
import { Shield, Lock, User, ArrowRight } from 'lucide-react';
import styles from './AdminLoginForm.module.css';

export default function AdminLoginForm({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/admin-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok || !data.ok) {
        throw new Error(data.message || 'Invalid admin credentials');
      }

      // Save token in sessionStorage
      sessionStorage.setItem('shivanand_admin_token', data.token);
      onLoginSuccess(data.token);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.header}>
        <span className={styles.badge}>
 <img src="/security.png" alt="security" className={styles.socialIcon} />
    Security Gate
  
        </span>
        <h2 className={styles.title}>Admin Access</h2>
        <p className={styles.subtitle}>
          Sign in to view recruiter leads, chats &amp; analytics
        </p>
      </div>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.field}>
          <label className={styles.label}>
            <User size={13} style={{ display: 'inline', marginRight: 4 }} />
            Username
          </label>
          <input
            type="text"
            required
            className={styles.input}
            placeholder="Admin username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>
            <Lock size={13} style={{ display: 'inline', marginRight: 4 }} />
            Password
          </label>
          <input
            type="password"
            required
            className={styles.input}
            placeholder="••••••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {error && <div className={styles.errorBanner}>{error}</div>}

        <button type="submit" className={styles.submitBtn} disabled={loading}>
          <span>{loading ? 'Authenticating...' : 'Sign In to Dashboard'}</span>
          <ArrowRight size={16} />
        </button>
      </form>
    </div>
  );
}