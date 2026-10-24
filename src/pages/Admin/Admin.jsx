import React, { useState, useEffect } from 'react';
import { Download, LogOut, MessageSquare, Bot, Star, RefreshCw } from 'lucide-react';
import AdminLoginForm from '../../components/AdminLoginForm/AdminLoginForm';
import styles from './Admin.module.css';

export default function Admin() {
  const [token, setToken] = useState(() => sessionStorage.getItem('shivanand_admin_token') || '');
  const [activeTab, setActiveTab] = useState('messages');
  const [messages, setMessages] = useState([]);
  const [chats, setChats] = useState([]);
  const [ratings, setRatings] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const [msgRes, chatRes, rateRes] = await Promise.all([
        fetch('/api/messages').catch(() => null),
        fetch('/api/chats').catch(() => null),
        fetch('/api/ratings').catch(() => null),
      ]);

      if (msgRes?.ok) {
        const d = await msgRes.json();
        setMessages(d.messages || []);
      } else {
        const local = JSON.parse(localStorage.getItem('shivanand_portfolio_messages') || '[]');
        setMessages(local);
      }

      if (chatRes?.ok) {
        const d = await chatRes.json();
        setChats(d.chats || []);
      } else {
        const local = JSON.parse(localStorage.getItem('shivanand_portfolio_chats') || '[]');
        setChats(local);
      }

      if (rateRes?.ok) {
        const d = await rateRes.json();
        setRatings(d.ratings || []);
      } else {
        const local = JSON.parse(localStorage.getItem('shivanand_portfolio_ratings') || '[]');
        setRatings(local);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchDashboardData();
    }
  }, [token]);

  const handleLogout = () => {
    sessionStorage.removeItem('shivanand_admin_token');
    setToken('');
  };

  const handleDownloadExcel = async () => {
    try {
      const res = await fetch(`/api/export-excel?token=${token}`);
      if (!res.ok) throw new Error('Export failed');
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Shivanand_Portfolio_Leads_${new Date().toISOString().slice(0, 10)}.xlsx`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch {
      alert('Could not download Excel file. Please try again.');
    }
  };

  if (!token) {
    return <AdminLoginForm onLoginSuccess={(newToken) => setToken(newToken)} />;
  }

  const avgRating = ratings.length
    ? (ratings.reduce((acc, r) => acc + Number(r.stars), 0) / ratings.length).toFixed(1)
    : '5.0';

  return (
    <div className={styles.adminPage}>
      <div className={styles.topBar}>
        <div className={styles.titleArea}>
          <h1 className={styles.pageTitle}>Admin Dashboard</h1>
          <p className={styles.pageSub}>Portfolio analytics, recruiter leads &amp; chatbot transcripts</p>
        </div>

        <div className={styles.actionsGroup}>
          <button type="button" className={styles.excelBtn} onClick={handleDownloadExcel}>
            <Download size={16} />
            <span>Export to Excel (.xlsx)</span>
          </button>
          <button type="button" className={styles.logoutBtn} onClick={fetchDashboardData} title="Refresh">
            <RefreshCw size={15} className={loading ? 'animate-spin' : ''} />
          </button>
          <button type="button" className={styles.logoutBtn} onClick={handleLogout}>
            <LogOut size={15} />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* KPI Stats Row */}
      <div className={styles.statsRow}>
        <div className={styles.statCard}>
          <span className={styles.statValue}>{messages.length}</span>
          <span className={styles.statLabel}>Contact Inquiries</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statValue}>{chats.length}</span>
          <span className={styles.statLabel}>Chatbot Conversations</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statValue}>{ratings.length}</span>
          <span className={styles.statLabel}>Verified Ratings</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statValue}>★ {avgRating}</span>
          <span className={styles.statLabel}>Average Score</span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className={styles.tabBar}>
        <button
          type="button"
          className={`${styles.tabBtn} ${activeTab === 'messages' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('messages')}
        >
          <MessageSquare size={15} style={{ display: 'inline', marginRight: 6 }} />
          Messages ({messages.length})
        </button>
        <button
          type="button"
          className={`${styles.tabBtn} ${activeTab === 'chats' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('chats')}
        >
          <Bot size={15} style={{ display: 'inline', marginRight: 6 }} />
          Chatbot Logs ({chats.length})
        </button>
        <button
          type="button"
          className={`${styles.tabBtn} ${activeTab === 'ratings' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('ratings')}
        >
          <Star size={15} style={{ display: 'inline', marginRight: 6 }} />
          Ratings ({ratings.length})
        </button>
      </div>

      {/* Content Table */}
      <div className={styles.tableCard}>
        {activeTab === 'messages' && (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Date</th>
                <th>Name</th>
                <th>Email</th>
                <th>Company</th>
                <th>Message</th>
              </tr>
            </thead>
            <tbody>
              {messages.length === 0 ? (
                <tr>
                  <td colSpan={5} className={styles.emptyMsg}>No contact messages yet.</td>
                </tr>
              ) : (
                messages.map((m, idx) => (
                  <tr key={m.id || idx}>
                    <td style={{ whiteSpace: 'nowrap' }}>
                      {m.createdAt ? new Date(m.createdAt).toLocaleDateString('en-IN') : 'Recent'}
                    </td>
                    <td><strong>{m.name}</strong></td>
                    <td><a href={`mailto:${m.email}`} style={{ color: 'var(--accent-primary)' }}>{m.email}</a></td>
                    <td>{m.company || '—'}</td>
                    <td>{m.message}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}

        {activeTab === 'chats' && (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Timestamp</th>
                <th>Recruiter Question</th>
                <th>Bot Answer</th>
              </tr>
            </thead>
            <tbody>
              {chats.length === 0 ? (
                <tr>
                  <td colSpan={3} className={styles.emptyMsg}>No chatbot transcripts yet.</td>
                </tr>
              ) : (
                chats.map((c, idx) => (
                  <tr key={c.id || idx}>
                    <td style={{ whiteSpace: 'nowrap' }}>
                      {c.timestamp ? new Date(c.timestamp).toLocaleTimeString('en-IN') : 'Recent'}
                    </td>
                    <td style={{ color: 'var(--accent-primary)', fontWeight: 600 }}>{c.question}</td>
                    <td style={{ whiteSpace: 'pre-line' }}>{c.answer}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}

        {activeTab === 'ratings' && (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Date</th>
                <th>Visitor</th>
                <th>Role</th>
                <th>Rating</th>
                <th>Feedback</th>
              </tr>
            </thead>
            <tbody>
              {ratings.length === 0 ? (
                <tr>
                  <td colSpan={5} className={styles.emptyMsg}>No ratings recorded yet.</td>
                </tr>
              ) : (
                ratings.map((r, idx) => (
                  <tr key={r.id || idx}>
                    <td style={{ whiteSpace: 'nowrap' }}>
                      {r.createdAt ? new Date(r.createdAt).toLocaleDateString('en-IN') : 'Recent'}
                    </td>
                    <td><strong>{r.name}</strong></td>
                    <td>{r.role}</td>
                    <td style={{ color: '#fbbf24', fontWeight: 700 }}>★ {r.stars}/5</td>
                    <td>{r.comment || '—'}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}