export const QUICK_QUESTIONS = [
  '💼 Experience',
  '⚛️ Skills & Stack',
  '🚀 Top Projects',
  '📱 Mobile & AI Work',
  '📄 Download Resume',
  '📞 Contact / Hire',
];

export function getSmartChatbotResponse(queryText, profile, projects) {
  const q = queryText.toLowerCase().trim();

  // 1. Work Experience
  if (
    q.includes('experience') ||
    q.includes('work') ||
    q.includes('company') ||
    q.includes('relvix') ||
    q.includes('interioverse')
  ) {
    return {
      text: `💼 ${profile.name} brings ${profile.experienceYears} of production experience across two core roles:

🏢 Relvix Node-bit Pvt Ltd (Frontend Developer)
• Built the unified ABDM & HIMS Healthcare Platform.
• Used Angular, Ionic, Capacitor, PrimeNG, and Spring Boot REST APIs.
• Achieved national ABDM healthcare compliance.

🏢 Interioverse Design Pvt Ltd (Software Developer)
• Engineered real estate SaaS with Next.js, React, and AWS S3 3D catalogs.
• Built executive Recharts analytics dashboards.
• Reduced mobile dev cycles by ~30% with React Native & Redux Toolkit.`,
    };
  }

  // 2. Technical Skills & Stack
  if (
    q.includes('skill') ||
    q.includes('tech') ||
    q.includes('stack') ||
    q.includes('react') ||
    q.includes('angular') ||
    q.includes('node')
  ) {
    return {
      text: `⚛️ Technical Arsenal:

💻 Frontend: React.js, Next.js, Angular, TypeScript, Tailwind CSS, PrimeNG.
🔄 State Management: Redux Toolkit, Zustand, Context API.
📱 Mobile: React Native, Expo, Ionic, Capacitor.
⚙️ Backend & Cloud: Node.js, Express.js, MongoDB Atlas, AWS S3.
🤖 AI & Tools: Google Gemini LLM, Manifest V3 Extensions, Vite, Git.`,
    };
  }

  // 3. Mobile & AI Work
  if (
    q.includes('mobile') ||
    q.includes('native') ||
    q.includes('ai') ||
    q.includes('gemini') ||
    q.includes('extension')
  ) {
    return {
      text: `🚀 Mobile & AI Innovations:

🤖 AI Workday Autofill Extension (Chrome MV3)
• Integrates Google Gemini LLM to parse PDF resumes into JSON.
• Dispatches synthetic React events to automate job portals 80% faster.

🛒 Smart Kirani App
• Cross-platform React Native + Expo grocery eCommerce app.
• Features customer, store owner, and delivery partner workflows with Zustand.

📱 Interioverse Project Manager
• Scalable React Native app with Redux Toolkit and OTP authentication.`,
    };
  }

  // 4. Projects Showcase
  if (q.includes('project') || q.includes('portfolio') || q.includes('built')) {
    const topProjects = projects
      .slice(0, 3)
      .map((p) => `🌟 ${p.title} (${p.badge})\n   ${p.shortDescription}`)
      .join('\n\n');

    return {
      text: `🏆 Key Production Projects:\n\n${topProjects}\n\n👉 Check out the Projects page for full case studies!`,
    };
  }

  // 5. Download Resume
  if (q.includes('resume') || q.includes('cv') || q.includes('download')) {
    return {
      text: `📄 Click below to download ${profile.name}'s latest verified ATS Resume:`,
      actionUrl: profile.resumeUrl,
      actionLabel: 'Download Resume (PDF)',
    };
  }

  // 6. Contact, Hire & Availability
  if (
    q.includes('contact') ||
    q.includes('hire') ||
    q.includes('email') ||
    q.includes('phone') ||
    q.includes('location') ||
    q.includes('notice') ||
    q.includes('salary') ||
    q.includes('availability')
  ) {
    return {
      text: `🤝 Let's Connect!

📍 Location: ${profile.location} (Open to Bangalore / Hybrid / Remote)
📧 Email: ${profile.email}
📞 Phone: ${profile.phone}
💼 Availability: Available for Full-Stack, Frontend & React Native opportunities!`,
      actionUrl: `mailto:${profile.email}`,
      actionLabel: 'Send Email Directly',
    };
  }

  // 7. Education
  if (q.includes('education') || q.includes('college') || q.includes('degree')) {
    const edu = profile.education[0];
    return {
      text: `🎓 Education:
${edu.degree}
🏫 ${edu.institution} (${edu.period})`,
    };
  }

  // Default Friendly Fallback
  return {
    text: `👋 Thanks for asking! Here is a snapshot of ${profile.name}:

🎯 Role: ${profile.role} (${profile.experienceYears} production exp)
💡 Core Stack: React.js, Next.js, Angular, React Native, Node.js, MongoDB & Gemini AI
📍 Location: ${profile.location}

Click any quick chip below or ask about his specific healthcare and real estate projects!`,
  };
}