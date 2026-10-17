import React, { useState, useEffect, useRef } from 'react';
import { X, Send, RotateCcw, Download, Sparkles } from 'lucide-react';
import { useSiteContent } from '../../context/SiteContentContext';
import styles from './Chatbot.module.css';

const CHAT_LOGS_KEY = 'shivanand_portfolio_chats';

const QUICK_QUESTIONS = [
  '💼 Work Experience',
  '⚛️ Tech Stack & Skills',
  '🚀 Top Projects',
  '📱 Mobile & AI Work',
  '📄 Download Resume',
  '📞 Contact & Availability',
];

function ModernBotAvatar({ size = 30 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Antenna */}
      <line x1="32" y1="6" x2="32" y2="14" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />
      <circle cx="32" cy="5" r="3.5" fill="#38bdf8" />
      {/* Head Outer Shell */}
      <rect x="10" y="14" width="44" height="36" rx="12" fill="#0f172a" stroke="#ffffff" strokeWidth="2.5" />
      {/* Visor Screen */}
      <rect x="16" y="21" width="32" height="16" rx="6" fill="#1e293b" />
      {/* Glowing Animated Eyes */}
      <circle className={styles.botEye} cx="25" cy="29" r="3.5" fill="#38bdf8" />
      <circle className={styles.botEye} cx="39" cy="29" r="3.5" fill="#38bdf8" />
      {/* Friendly Smile */}
      <path d="M25 42C27.5 44.5 36.5 44.5 39 42" stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

export default function Chatbot() {
  const { profile, projects } = useSiteContent();
  const [isOpen, setIsOpen] = useState(false);
  const [showTeaser, setShowTeaser] = useState(false);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const initialBotMessage = {
    id: 'welcome-msg',
    sender: 'bot',
    text: `Hi there! 👋 I'm ${profile.name}'s AI Recruiter Assistant.\n\nAsk me anything about his 1.5+ years of Full-Stack experience (React, Next.js, Angular, React Native, Node.js), enterprise projects, or hiring availability!`,
  };

  const [messages, setMessages] = useState([initialBotMessage]);

  // 5-Second Auto-Popup Greeting
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isOpen) {
        setShowTeaser(true);
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, [isOpen]);

  // Auto-scroll to bottom when messages or typing bubble changes
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Smart Resume-Trained Answer Engine
  const generateSmartReply = (queryText) => {
    const q = queryText.toLowerCase();

    if (q.includes('experience') || q.includes('work') || q.includes('company') || q.includes('relvix') || q.includes('interioverse')) {
      return {
        text: `💼 **${profile.name} has ${profile.experienceYears} of production experience:**\n\n1. **Frontend Developer @ Relvix Node-bit Pvt Ltd** (Jul 2026 – Present): Architected the ABDM & HIMS Healthcare Platform using Angular, Ionic, Capacitor, PrimeNG & Spring Boot REST APIs.\n\n2. **Software Developer @ Interioverse Design Pvt Ltd** (Feb 2025 – Jul 2026): Built the Next.js/React Real Estate SaaS (AWS S3 3D catalog, JWT RBAC, Recharts) and a React Native Project Management app (reduced dev time by 30%).`,
      };
    }

    if (q.includes('skill') || q.includes('tech') || q.includes('stack') || q.includes('react') || q.includes('angular') || q.includes('node')) {
      return {
        text: `⚛️ **Core Technical Stack:**\n• **Frontend:** ${profile.skills.frontend.slice(0, 7).join(', ')}\n• **State:** ${profile.skills.stateManagement.join(', ')}\n• **Mobile:** ${profile.skills.mobile.join(', ')}\n• **Backend, Cloud & AI:** ${profile.skills.backendCloudAi.join(', ')}`,
      };
    }

    if (q.includes('mobile') || q.includes('native') || q.includes('ai') || q.includes('gemini') || q.includes('extension')) {
      return {
        text: `🚀 **Mobile & AI Highlights:**\n• **AI Workday Autofill Chrome Extension (MV3):** Uses Google Gemini LLM to parse PDF resumes into JSON and autofill enterprise job portals (80% faster).\n• **Smart Kirani App:** Multi-role React Native + Expo + Zustand + Node.js/MongoDB grocery eCommerce app.\n• **Interioverse Mobile App:** React Native + Redux Toolkit + OTPAuth.`,
      };
    }

    if (q.includes('project') || q.includes('portfolio') || q.includes('built')) {
      const topList = projects
        .slice(0, 4)
        .map((p) => `• **${p.title}** (${p.badge})`)
        .join('\n');
      return {
        text: `🏆 **Featured Projects by ${profile.name}:**\n${topList}\n\nYou can explore full case studies on the Projects page!`,
      };
    }

    if (q.includes('resume') || q.includes('cv') || q.includes('download')) {
      return {
        text: `📄 You can download ${profile.name}'s latest ATS-verified Resume directly below:`,
        actionUrl: profile.resumeUrl,
        actionLabel: 'Download Resume PDF',
      };
    }

    if (q.includes('contact') || q.includes('hire') || q.includes('email') || q.includes('phone') || q.includes('location') || q.includes('notice')) {
      return {
        text: `📞 **Direct Contact & Hiring Info:**\n• **Location:** ${profile.location} (Open to Bangalore / Remote / Hybrid)\n• **Email:** ${profile.email}\n• **Phone:** ${profile.phone}\n• **Status:** Available for Full-Stack, Frontend (React/Next/Angular), and React Native roles!`,
        actionUrl: `mailto:${profile.email}`,
        actionLabel: 'Send Email Now',
      };
    }

    if (q.includes('education') || q.includes('degree') || q.includes('college')) {
      const edu = profile.education[0];
      return {
        text: `🎓 **Education:**\n${edu.degree}\n${edu.institution} (${edu.period})`,
      };
    }

    return {
      text: `Thanks for asking! Here is a quick snapshot of **${profile.name}**:\n• **Role:** ${profile.role} (${profile.experienceYears} exp)\n• **Key Stack:** React.js, Next.js, Angular, React Native, Redux Toolkit, Zustand, Node.js, MongoDB & Gemini AI.\n• **Contact:** ${profile.email} | ${profile.phone}\n\nTry clicking any topic chip below or ask about his specific projects!`,
    };
  };

  const handleSendMessage = async (textToSend) => {
    const trimmed = textToSend.trim();
    if (!trimmed || isTyping) return;

    const userMsg = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: trimmed,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Simulate natural typing delay with animated bubble
    setTimeout(async () => {
      const replyData = generateSmartReply(trimmed);
      const botMsg = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        ...replyData,
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);

      // Save chat log for Admin Dashboard & backend API
      const logEntry = {
        id: Date.now().toString(),
        question: trimmed,
        answer: replyData.text,
        timestamp: new Date().toISOString(),
      };

      try {
        const existing = JSON.parse(localStorage.getItem(CHAT_LOGS_KEY) || '[]');
        localStorage.setItem(CHAT_LOGS_KEY, JSON.stringify([logEntry, ...existing]));

        await fetch('/api/chats', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(logEntry),
        });
      } catch {
        // Saved in localStorage fallback
      }
    }, 750);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSendMessage(input);
  };

  return (
    <div className={styles.chatbotWrapper}>
      {/* 5-Second Auto Popup Teaser */}
      {showTeaser && !isOpen && (
        <div
          className={styles.teaserBubble}
          onClick={() => {
            setIsOpen(true);
            setShowTeaser(false);
          }}
        >
          <div className={styles.teaserHeader}>
            <span>
              <Sparkles size={13} /> AI Recruiter Assistant
            </span>
            <button
              type="button"
              className={styles.teaserClose}
              onClick={(e) => {
                e.stopPropagation();
                setShowTeaser(false);
              }}
              aria-label="Close teaser"
            >
              <X size={14} />
            </button>
          </div>
          <p>
            👋 Hi! Reviewing <strong>{profile.name}&apos;s</strong> portfolio? Ask me about his
            React, Next.js, Angular, or React Native experience!
          </p>
        </div>
      )}

      {/* Open Chat Window */}
      {isOpen && (
        <div className={styles.chatWindow}>
          <div className={styles.chatHeader}>
            <div className={styles.botIdentity}>
              <div className={styles.miniBotFace}>
                <ModernBotAvatar size={26} />
              </div>
              <div>
                <div className={styles.botName}>Shivanand&apos;s AI Assistant</div>
                <div className={styles.botStatus}>● Online • Instant Recruiter Q&amp;A</div>
              </div>
            </div>

            <div className={styles.headerActions}>
              <button
                type="button"
                className={styles.iconBtn}
                onClick={() => setMessages([initialBotMessage])}
                title="Reset Conversation"
              >
                <RotateCcw size={14} />
              </button>
              <button
                type="button"
                className={styles.iconBtn}
                onClick={() => setIsOpen(false)}
                title="Minimize Chat"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          <div className={styles.messagesArea}>
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={msg.sender === 'user' ? styles.msgRowUser : styles.msgRowBot}
              >
                <div
                  className={
                    msg.sender === 'user' ? styles.userBubble : styles.botBubble
                  }
                >
                  {msg.text}

                  {msg.actionUrl && (
                    <div>
                      <a
                        href={msg.actionUrl}
                        download={
                          msg.actionUrl.endsWith('.pdf')
                            ? 'Shivanand_Patil_Resume.pdf'
                            : undefined
                        }
                        target="_blank"
                        rel="noreferrer"
                        className={styles.actionLink}
                      >
                        <Download size={13} />
                        <span>{msg.actionLabel}</span>
                      </a>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Animated 3-Dot Typing Bubble */}
            {isTyping && (
              <div className={styles.msgRowBot}>
                <div className={styles.typingBubble}>
                  <span className={styles.typingDot} />
                  <span className={styles.typingDot} />
                  <span className={styles.typingDot} />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* One-Click Recruiter Quick Chips */}
          <div className={styles.quickChips}>
            {QUICK_QUESTIONS.map((q) => (
              <button
                key={q}
                type="button"
                className={styles.chipBtn}
                onClick={() => handleSendMessage(q)}
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input Bar */}
          <form className={styles.inputForm} onSubmit={handleFormSubmit}>
            <input
              type="text"
              className={styles.chatInput}
              placeholder="Ask about skills, experience, resume..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button type="submit" className={styles.sendBtn} aria-label="Send">
              <Send size={16} />
            </button>
          </form>
        </div>
      )}

      {/* Floating Bot Face Button */}
      <button
        type="button"
        className={styles.launcherBtn}
        onClick={() => {
          setIsOpen((prev) => !prev);
          setShowTeaser(false);
        }}
        aria-label="Toggle AI Recruiter Chatbot"
      >
        <span className={styles.onlineBadge} />
        {isOpen ? <X size={26} /> : <ModernBotAvatar size={34} />}
      </button>
    </div>
  );
}