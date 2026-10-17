import React, { useState } from 'react';
import { useSiteContent } from '../../context/SiteContentContext';
import PageBack from '../../components/PageBack/PageBack';
import ProjectCard from '../../components/ProjectCard/ProjectCard';
import styles from './Projects.module.css';

const CATEGORIES = ['All', 'Full-Stack Web', 'Mobile Apps', 'AI & Extensions'];

export default function Projects() {
  const { projects } = useSiteContent();
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredProjects =
    selectedCategory === 'All'
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

  return (
    <div className={styles.projectsPage}>
      <div>
        <PageBack />
        <div className={styles.headerBox}>
          <h1 className={styles.pageTitle}>Projects &amp; Case Studies</h1>
          <p className={styles.pageSubtitle}>
            Enterprise architectures and personal products built across Web, Mobile, and AI
          </p>
        </div>
      </div>

      <div className={styles.filterBar}>
        <div className={styles.tabs}>
          {CATEGORIES.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setSelectedCategory(category)}
              className={`${styles.tabBtn} ${
                selectedCategory === category ? styles.activeTab : ''
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.grid}>
        {filteredProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}