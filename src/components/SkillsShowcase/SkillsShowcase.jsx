import React, { useRef } from 'react';
import { 
  Code2, 
  Layers, 
  Smartphone, 
  Server, 
  Database, 
  Wrench 
} from 'lucide-react';
import styles from './SkillsShowcase.module.css';

const skillCategories = [
  {
    title: 'Frontend Engineering',
    icon: <Code2 size={20} />,
    skills: [
      'React.js',
      'Next.js',
      'Angular',
      'TypeScript',
      'JavaScript (ES6+)',
      'HTML5',
      'CSS3 / CSS Modules',
      'Tailwind CSS',
      'PrimeNG',
      'Responsive Design',
    ],
  },
  {
    title: 'State Management',
    icon: <Layers size={20} />,
    skills: [
      'Redux Toolkit',
      'Zustand',
      'Context API',
      'RxJS',
    ],
  },
  {
    title: 'Mobile App Development',
    icon: <Smartphone size={20} />,
    skills: [
      'React Native',
      'Ionic',
      'Capacitor',
      'Expo',
      'Expo Router',
    ],
  },
  {
    title: 'Backend & APIs',
    icon: <Server size={20} />,
    skills: [
      'Node.js',
      'Express.js',
      'REST APIs',
      'JWT Authentication',
      'Serverless Functions',
    ],
  },
  {
    title: 'Databases & Storage',
    icon: <Database size={20} />,
    skills: [
      'MongoDB',
      'Vercel KV (Redis)',
      'SQL / PostgreSQL',
      'LocalStorage Cache',
    ],
  },
  {
    title: 'Tools & Workflows',
    icon: <Wrench size={20} />,
    skills: [
      'Git & GitHub',
      'Vite',
      'Postman',
      'VS Code',
      'PowerShell',
    ],
  },
];

function MagneticCard({ category }) {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    
    // Position of cursor inside the card
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Set cursor variables for the dynamic spotlight flare
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);

    // Calculate 3D tilt angles (-10deg to +10deg)
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -9;
    const rotateY = ((x - centerX) / centerX) * 9;

    card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    // Smooth reset back to normal flat orientation
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
  };

  return (
    <div
      ref={cardRef}
      className={styles.card}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className={styles.cardHeader}>
        <span className={styles.categoryIcon}>{category.icon}</span>
        <h3 className={styles.categoryTitle}>{category.title}</h3>
      </div>

      <div className={styles.pillList}>
        {category.skills.map((skill) => (
          <span key={skill} className={styles.pill}>
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function SkillsShowcase() {
  return (
    <section className={styles.section} id="skills">
      <div className={styles.header}>
        <h2 className={styles.title}>Core Technical Skills</h2>
        <p className={styles.subtitle}>
          Production-tested technologies across Healthcare, Real Estate, Mobile &amp; AI
        </p>
      </div>

      <div className={styles.grid}>
        {skillCategories.map((cat) => (
          <MagneticCard key={cat.title} category={cat} />
        ))}
      </div>
    </section>
  );
}