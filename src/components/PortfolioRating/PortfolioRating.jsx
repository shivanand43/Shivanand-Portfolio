import React, { useState, useEffect } from 'react';
import { Star, Send, CheckCircle2, Sparkles } from 'lucide-react';
import styles from './PortfolioRating.module.css';

const STORAGE_KEY = 'shivanand_portfolio_ratings';

const INITIAL_RATINGS = [
  {
    id: 'seed-1',
    name: 'Tech Recruiter',
    role: 'Hiring Partner',
    stars: 5,
    comment: 'Clean architecture, fast UI, and impressive healthcare & real estate case studies!',
    createdAt: '2026-10-10T10:00:00.000Z',
  },
  {
    id: 'seed-2',
    name: 'Senior Frontend Lead',
    role: 'Engineering Reviewer',
    stars: 5,
    comment: 'Great modular code and smooth responsive layout across desktop and mobile.',
    createdAt: '2026-10-14T14:30:00.000Z',
  },
];

const LABELS = {
  1: 'Needs Work',
  2: 'Fair',
  3: 'Good',
  4: 'Very Impressive',
  5: 'Outstanding (5/5)',
};

export default function PortfolioRating() {
  const [ratings, setRatings] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : INITIAL_RATINGS;
    } catch {
      return INITIAL_RATINGS;
    }
  });

  const [selectedStars, setSelectedStars] = useState(5);
  const [hoveredStars, setHoveredStars] = useState(0);
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(ratings));
    } catch {
      // Ignore storage quota errors
    }
  }, [ratings]);

  const averageScore =
    ratings.length > 0
      ? (ratings.reduce((sum, item) => sum + Number(item.stars), 0) / ratings.length).toFixed(1)
      : '5.0';

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newEntry = {
      id: Date.now().toString(),
      name: name.trim() || 'Anonymous Visitor',
      role: role.trim() || 'Recruiter / Visitor',
      stars: selectedStars,
      comment: comment.trim() || 'Rated portfolio experience.',
      createdAt: new Date().toISOString(),
    };

    setRatings((prev) => [newEntry, ...prev]);
    setSubmitted(true);
    setName('');
    setRole('');
    setComment('');

    try {
      await fetch('/api/ratings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newEntry),
      });
    } catch {
      // Already saved locally above
    }
  };

  const activeStarCount = hoveredStars || selectedStars;

  return (
    <section className={styles.ratingSection}>
      {/* Left Column: Live Rating Summary & Recent Reviews */}
      <div className={styles.summaryBox}>
        <span className={styles.badge}>
          <Sparkles size={14} /> Visitor &amp; Recruiter Feedback
        </span>

        <h2 className={styles.title}>Rate This Portfolio</h2>
        <p className={styles.subtitle}>
          Your feedback helps me continuously refine the UI, performance, and case studies.
        </p>

        <div className={styles.scoreRow}>
          <span className={styles.bigScore}>{averageScore}</span>
          <div className={styles.scoreMeta}>
            <div className={styles.starsPreview}>
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={18}
                  fill={star <= Math.round(Number(averageScore)) ? '#fbbf24' : 'transparent'}
                  color="#fbbf24"
                />
              ))}
            </div>
            <span className={styles.totalReviews}>
              Based on {ratings.length} verified ratings
            </span>
          </div>
        </div>

        <div className={styles.recentList}>
          {ratings.slice(0, 2).map((item) => (
            <div key={item.id} className={styles.recentItem}>
              <div className={styles.recentTop}>
                <span>
                  {item.name} • <small>{item.role}</small>
                </span>
                <span>{'★'.repeat(item.stars)}</span>
              </div>
              <p className={styles.recentComment}>{item.comment}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Right Column: Interactive 5-Star Form */}
      <form className={styles.formBox} onSubmit={handleSubmit}>
        <h3 className={styles.formHeading}>Leave Your Rating</h3>

        <div className={styles.starPicker}>
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              className={styles.starBtn}
              onMouseEnter={() => setHoveredStars(star)}
              onMouseLeave={() => setHoveredStars(0)}
              onClick={() => setSelectedStars(star)}
              aria-label={`Rate ${star} stars`}
            >
              <Star
                size={28}
                fill={star <= activeStarCount ? '#fbbf24' : 'transparent'}
                color={star <= activeStarCount ? '#fbbf24' : '#64748b'}
              />
            </button>
          ))}
          <span className={styles.ratingLabel}>{LABELS[activeStarCount]}</span>
        </div>

        <div className={styles.inputRow}>
          <input
            type="text"
            className={styles.input}
            placeholder="Your Name (Optional)"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            className={styles.input}
            placeholder="Role / Company (e.g. HR, Tech Lead)"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          />
        </div>

        <textarea
          className={styles.textarea}
          placeholder="Share quick feedback on my projects or portfolio UI..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />

        {submitted && (
          <div className={styles.thankYouBanner}>
            <CheckCircle2 size={18} />
            <span>Thank you! Your {selectedStars}-star rating has been recorded.</span>
          </div>
        )}

        <button type="submit" className={styles.submitBtn}>
          <Send size={16} />
          <span>Submit Rating</span>
        </button>
      </form>
    </section>
  );
}