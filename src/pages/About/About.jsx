import React from 'react';
import { Briefcase, GraduationCap, MapPin, Mail, Phone } from 'lucide-react';
import { useSiteContent } from '../../context/SiteContentContext';
import PageBack from '../../components/PageBack/PageBack';
import SkillsShowcase from '../../components/SkillsShowcase/SkillsShowcase';
import styles from './About.module.css';

export default function About() {
  const { content, profile } = useSiteContent();

  return (
    <div className={styles.aboutPage}>
      <div>
        <PageBack />
        <div className={styles.introCard}>
          <h1 className={styles.pageTitle}>{content.aboutHeading}</h1>
          <p className={styles.summaryText}>{profile.summary}</p>

          <div className={styles.metaRow}>
            <span className={styles.metaItem}>
              <MapPin size={16} /> {profile.location}
            </span>
            <span className={styles.metaItem}>
              <Mail size={16} /> {profile.email}
            </span>
            <span className={styles.metaItem}>
              <Phone size={16} /> {profile.phone}
            </span>
          </div>
        </div>
      </div>

      {/* Work Experience */}
      <section>
        <h2 className={styles.sectionHeading}>
          <Briefcase size={22} /> Work Experience
        </h2>
        <div className={styles.timeline}>
          {profile.experience.map((exp) => (
            <div key={exp.id} className={styles.timelineCard}>
              <div className={styles.cardHeader}>
                <div>
                  <h3 className={styles.roleTitle}>{exp.role}</h3>
                  <p className={styles.companyName}>
                    {exp.company} • {exp.location}
                  </p>
                </div>
                <span className={styles.periodBadge}>{exp.period}</span>
              </div>

              <p className={styles.projectSub}>Key Domain: {exp.projectTitle}</p>

              <ul className={styles.bulletList}>
                {exp.highlights.map((bullet, idx) => (
                  <li key={idx}>{bullet}</li>
                ))}
              </ul>

              <div className={styles.techRow}>
                {exp.techStack.map((tech) => (
                  <span key={tech} className={styles.techBadge}>
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Education */}
      <section>
        <h2 className={styles.sectionHeading}>
          <GraduationCap size={22} /> Education
        </h2>
        <div className={styles.timeline}>
          {profile.education.map((edu) => (
            <div key={edu.id} className={styles.timelineCard}>
              <div className={styles.cardHeader}>
                <div>
                  <h3 className={styles.roleTitle}>{edu.degree}</h3>
                  <p className={styles.companyName}>{edu.institution}</p>
                </div>
                <span className={styles.periodBadge}>{edu.period}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <SkillsShowcase />
    </div>
  );
}