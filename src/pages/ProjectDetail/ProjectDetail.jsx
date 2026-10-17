import React from 'react';
import { useParams } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';
import { useSiteContent } from '../../context/SiteContentContext';
import PageBack from '../../components/PageBack/PageBack';
import styles from './ProjectDetail.module.css';

export default function ProjectDetail() {
  const { id } = useParams();
  const { projects } = useSiteContent();

  const project = projects.find((p) => p.id === id);

  if (!project) {
    return (
      <div className={styles.detailWrapper}>
        <PageBack to="/projects" label="Back to Projects" />
        <div className={styles.detailCard}>
          <h2>Project Not Found</h2>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.detailWrapper}>
      <PageBack to="/projects" label="Back to Projects" />

      <div className={styles.detailCard}>
        <div className={styles.badgeRow}>
          <span className={styles.badge}>{project.badge}</span>
          <span className={styles.badge}>{project.category}</span>
        </div>

        <h1 className={styles.title}>{project.title}</h1>
        <p className={styles.fullDesc}>{project.fullDescription}</p>

        {project.metrics && (
          <div>
            <h3 className={styles.subHeading}>Key Engineering Impact</h3>
            <div className={styles.metricsGrid}>
              {project.metrics.map((m) => (
                <div key={m} className={styles.metricItem}>
                  <CheckCircle2 size={18} />
                  <span>{m}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div>
          <h3 className={styles.subHeading}>Technologies &amp; Architecture</h3>
          <div className={styles.techTags}>
            {project.techStack.map((tech) => (
              <span key={tech} className={styles.techTag}>
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}