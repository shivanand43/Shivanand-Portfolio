import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import styles from './PageBack.module.css';

export default function PageBack({ to = '/', label = 'Back to Home' }) {
  return (
    <Link to={to} className={styles.backBtn}>
      <ArrowLeft size={16} />
      <span>{label}</span>
    </Link>
  );
}