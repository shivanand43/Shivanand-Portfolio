import { profileData } from './profile';
import { projectsData } from './projects';

export const siteContentDefaults = {
  heroBadge: 'Available for Full-Stack & Frontend Opportunities',
  heroTitle: `Hi, I'm ${profileData.name}`,
  heroSubtitle: profileData.role,
  heroDescription: profileData.tagline,
  aboutHeading: 'Engineering Scalable Web & Mobile Products',
  aboutDescription: profileData.summary,
  contactHeading: "Let's Build Something Impactful",
  contactSubtext:
    'Looking for a Full-Stack / Frontend Engineer experienced in React, Next.js, Angular, React Native, and Node.js? Send a message or ask my AI Recruiter Assistant.',
  profile: profileData,
  projects: projectsData,
};