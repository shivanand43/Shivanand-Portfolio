import React from 'react';
import { Code2, Layers, Cpu, Smartphone, Database, Gauge } from 'lucide-react';
import { useSiteContent } from '../../context/SiteContentContext';
import styles from './SkillsShowcase.module.css';

export default function SkillsShowcase() {
  const { profile } = useSiteContent();
  const { skills } = profile;

  const categories = [
    { title: 'Frontend Engineering', icon: <Code2 size={18} />, items: skills.frontend },
    { title: 'State Management', icon: <Layers size={18} />, items: skills.stateManagement },
    { title: 'Mobile App Development', icon: <Smartphone size={18} />, items: skills.mobile },
    { title: 'Backend, Cloud & AI', icon: <Database size={18} />, items: skills.backendCloudAi },
    { title: 'API & Authentication', icon: <Cpu size={18} />, items: skills.apiIntegration },
    { title: 'Performance & DevOps', icon: <Gauge size={18} />, items: skills.performanceTools },
  ];

  return (
    <section className={styles.skillsSection}>
      <div className={styles.headerRow}>
        <h2 className={styles.sectionTitle}>Technical Arsenal</h2>
        <p className={styles.sectionSubtitle}>
          Production-tested technologies across Healthcare, Real Estate, Mobile & AI
        </p>
      </div>

      <div className={styles.grid}>
        {categories.map((cat) => (
          <div key={cat.title} className={styles.categoryCard}>
            <h3 className={styles.categoryTitle}>
              {cat.icon}
              <span>{cat.title}</span>
            </h3>
            <div className={styles.tagList}>
              {cat.items.map((skill) => (
                <span key={skill} className={styles.skillTag}>
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}