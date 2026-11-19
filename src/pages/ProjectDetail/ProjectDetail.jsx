import React from 'react';
import { useParams } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';
import { useSiteContent } from '../../context/SiteContentContext';
import PageBack from '../../components/PageBack/PageBack';
import styles from './ProjectDetail.module.css';

// Update spotlight coordinates directly on the card.
// This avoids React state updates and keeps pointer movement lightweight.
const handleCardPointerMove = (event) => {
  const card = event.currentTarget;
  const rect = card.getBoundingClientRect();

  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  card.style.setProperty('--spotlight-x', `${x}px`);
  card.style.setProperty('--spotlight-y', `${y}px`);
  card.style.setProperty('--spotlight-opacity', '1');
};

const handleCardPointerLeave = (event) => {
  event.currentTarget.style.setProperty('--spotlight-opacity', '0');
};

const spotlightProps = {
  onPointerMove: handleCardPointerMove,
  onPointerDown: handleCardPointerMove,
  onPointerLeave: handleCardPointerLeave,
};

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
        {/* Project Header */}
        <div className={styles.badgeRow}>
          <span className={styles.badge}>{project.badge}</span>
          <span className={styles.badge}>{project.category}</span>
        </div>

        <h1 className={styles.title}>{project.title}</h1>

        <p className={styles.fullDesc}>{project.fullDescription}</p>

        {/* Problem Statement */}
        {project.problemStatement?.length > 0 && (
          <section>
            <h3 className={styles.subHeading}>Problem Statement</h3>

            <ul className={styles.contentList}>
              {project.problemStatement.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </section>
        )}

        {/* Key Features */}
        {project.keyFeatures?.length > 0 && (
          <section>
            <h3 className={styles.subHeading}>Key Features</h3>

            <div className={styles.featureGrid}>
              {project.keyFeatures.map((feature, index) => (
                <div
                  key={index}
                  className={`${styles.featureCard} ${styles.spotlightCard}`}
                  {...spotlightProps}
                >
                  <h4>{feature.title}</h4>
                  <p>{feature.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* My Contributions */}
        {project.myContributions?.length > 0 && (
          <section>
            <h3 className={styles.subHeading}>My Contributions</h3>

            <div className={styles.contentList}>
              {project.myContributions.map((item, index) => (
                <div key={index} className={styles.listItem}>
                  <CheckCircle2 size={18} />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Architecture */}
        {project.architecture?.length > 0 && (
          <section>
            <h3 className={styles.subHeading}>System Architecture</h3>

            <div className={styles.architectureGrid}>
              {project.architecture.map((item, index) => (
                <div
                  key={index}
                  className={`${styles.architectureCard} ${styles.spotlightCard}`}
                  {...spotlightProps}
                >
                  <span className={styles.architectureLayer}>
                    {item.layer}
                  </span>

                  <h4>{item.technology}</h4>
                  <p>{item.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Engineering Impact */}
        {project.metrics?.length > 0 && (
          <section>
            <h3 className={styles.subHeading}>Key Engineering Impact</h3>

            <div className={styles.metricsGrid}>
              {project.metrics.map((metric) => (
                <div
                  key={metric}
                  className={`${styles.metricItem} ${styles.spotlightCard}`}
                  {...spotlightProps}
                >
                  <CheckCircle2 size={18} />
                  <span>{metric}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Technologies */}
        {project.techStack?.length > 0 && (
          <section>
            <h3 className={styles.subHeading}>Technologies &amp; Tools</h3>

            <div className={styles.techTags}>
              {project.techStack.map((tech) => (
                <span key={tech} className={styles.techTag}>
                  {tech}
                </span>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
