import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Code, ExternalLink } from 'lucide-react';
import styles from './ProjectCard.module.css';

export default function ProjectCard({ project }) {
  return (
    <article className={styles.card}>
      <div>
        <div className={styles.topRow}>
          <span className={styles.categoryBadge}>{project.badge}</span>
          <span className={styles.domainTag}>{project.category}</span>
        </div>

        <h3 className={styles.title}>{project.title}</h3>
        <p className={styles.description}>{project.shortDescription}</p>

        {project.metrics && (
          <div className={styles.metricsList}>
            {project.metrics.map((m) => (
              <span key={m} className={styles.metricPill}>
                ✓ {m}
              </span>
            ))}
          </div>
        )}
      </div>

      <div>
        <div className={styles.techStack}>
          {project.techStack.slice(0, 6).map((tech) => (
            <span key={tech} className={styles.techChip}>
              {tech}
            </span>
          ))}
        </div>

        <div className={styles.actionsRow}>
          <Link to={`/projects/${project.id}`} className={styles.detailsLink}>
            <span>Case Study</span>
            <ArrowRight size={15} />
          </Link>

          <div className={styles.extLinks}>
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className={styles.iconBtn}
                title="Source Code"
              >
                <Code size={17} />
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className={styles.iconBtn}
                title="Live Demo"
              >
                <ExternalLink size={17} />
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}