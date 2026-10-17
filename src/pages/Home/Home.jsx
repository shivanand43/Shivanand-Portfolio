import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Download, Sparkles, Mail } from 'lucide-react';
import { useSiteContent } from '../../context/SiteContentContext';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import ProjectCard from '../../components/ProjectCard/ProjectCard';
import SkillsShowcase from '../../components/SkillsShowcase/SkillsShowcase';
import styles from './Home.module.css';
import profileImage from '../../assets/ShivanandImage.png';
import PortfolioRating from '../../components/PortfolioRating/PortfolioRating';
export default function Home() {
  const { content, profile, projects } = useSiteContent();
  const [imgError, setImgError] = useState(false);
  const [projectsRef, projectsVisible] = useScrollReveal();

  const featuredProjects = projects.filter((p) => p.featured).slice(0, 4);

  const stats = [
    { value: profile.experienceYears, label: 'Production Experience' },
    { value: '6+', label: 'Enterprise & AI Projects' },
    { value: '95+', label: 'Lighthouse Performance' },
    { value: '30%+', label: 'Dev Cycle Optimization' },
  ];

  return (
    <div className={styles.homeContainer}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroContent}>
          <div className={styles.statusBadge}>
            <span className={styles.pulseDot} />
            <span>{content.heroBadge}</span>
          </div>

          <h1 className={styles.heroTitle}>
            Hi, I&apos;m <span className={styles.gradientText}>{profile.name}</span>
          </h1>

          <h2 className={styles.heroSubtitle}>
            {profile.role} • React, Next.js, Angular &amp; React Native
          </h2>

          <p className={styles.heroDescription}>{profile.summary}</p>

          <div className={styles.ctaGroup}>
            <Link to="/projects" className={styles.primaryBtn}>
              <Sparkles size={18} />
              <span>Explore Projects</span>
            </Link>

            <a
              href={profile.resumeUrl}
              download="Shivanand_Patil_Resume.pdf"
              target="_blank"
              rel="noreferrer"
              className={styles.secondaryBtn}
            >
              <Download size={18} />
              <span>Download Resume</span>
            </a>

            <Link to="/contact" className={styles.secondaryBtn}>
              <Mail size={18} />
              <span>Contact Me</span>
            </Link>
          </div>
        </div>

        {/* Floating Animated Profile Image */}
        <div className={styles.heroVisual}>
          <div className={styles.floatingFrame}>
            <div className={styles.glowRing} />
            <div className={styles.avatarContainer}>
              {!imgError ? (
                <img
                  src={profileImage}
                  alt={profile.name}
                  className={styles.profileImg}
                  onError={() => setImgError(true)}
                />
              ) : (
                <div className={styles.avatarFallback}>
                  <span className={styles.initials}>SP</span>
                </div>
              )}
            </div>

            <div className={styles.orbitBadgeTop}>⚛️ React • Next.js • Angular</div>
            <div className={styles.orbitBadgeLeft}>📱 React Native • Ionic</div>
            <div className={styles.orbitBadgeBottom}>🤖 Node.js • Gemini AI</div>
          </div>
        </div>
      </section>

      {/* Metrics Bar */}
      <section className={styles.statsGrid}>
        {stats.map((item) => (
          <div key={item.label} className={styles.statCard}>
            <div className={styles.statValue}>{item.value}</div>
            <div className={styles.statLabel}>{item.label}</div>
          </div>
        ))}
      </section>

      {/* Featured Projects */}
      <section
        ref={projectsRef}
        className={`${styles.revealHidden} ${
          projectsVisible ? styles.revealVisible : ''
        }`}
      >
        <div className={styles.sectionHeader}>
          <div>
            <h2 className={styles.sectionTitle}>Featured Engineering Work</h2>
            <p className={styles.sectionSub}>
              Healthcare platforms, Real Estate SaaS, Mobile Commerce &amp; AI Extensions
            </p>
          </div>
          <Link to="/projects" className={styles.viewAllLink}>
            <span>View All {projects.length} Projects</span>
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className={styles.projectsGrid}>
          {featuredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>

      {/* Technical Skills Showcase */}
      <SkillsShowcase />

      {/* Portfolio Rating */}
      <PortfolioRating />
    </div>
  );
}