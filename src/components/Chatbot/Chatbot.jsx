import React, { useState, useEffect, useRef } from 'react';
import { X, Send, RotateCcw, Download, Sparkles } from 'lucide-react';
import { useSiteContent } from '../../context/SiteContentContext';
import { QUICK_QUESTIONS, getSmartChatbotResponse } from '../../data/chatbotKnowledge';
import styles from './Chatbot.module.css';

const CHAT_LOGS_KEY = 'shivanand_portfolio_chats';

function ModernBotAvatar({ size = 30 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <line x1="32" y1="6" x2="32" y2="14" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />
      <circle cx="32" cy="5" r="3.5" fill="#38bdf8" />
      <rect x="10" y="14" width="44" height="36" rx="12" fill="#0f172a" stroke="#ffffff" strokeWidth="2.5" />
      <rect x="16" y="21" width="32" height="16" rx="6" fill="#1e293b" />
      <circle className={styles.botEye} cx="25" cy="29" r="3.5" fill="#38bdf8" />
      <circle className={styles.botEye} cx="39" cy="29" r="3.5" fill="#38bdf8" />
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
    text: `Hi there! 👋 I'm ${profile.name}'s AI Assistant.

Ask me anything about his experience at Relvix & Interioverse, tech stack, or hiring availability!`,
  };

  const [messages, setMessages] = useState([initialBotMessage]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isOpen) {
        setShowTeaser(true);
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

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

    setTimeout(async () => {
      const replyData = getSmartChatbotResponse(trimmed, profile, projects);
      const botMsg = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        ...replyData,
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);

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
        // Fallback active
      }
    }, 700);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSendMessage(input);
  };

  return (
    <div className={styles.chatbotWrapper}>
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
            React, Next.js, or mobile experience!
          </p>
        </div>
      )}

      {isOpen && (
        <div className={styles.chatWindow}>
          <div className={styles.chatHeader}>
            <div className={styles.botIdentity}>
              <div className={styles.miniBotFace}>
                <ModernBotAvatar size={26} />
              </div>
              <div>
                <div className={styles.botName}>Shivanand&apos;s Assistant</div>
                <div className={styles.botStatus}>● Online • Instant Q&amp;A</div>
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
                  style={{ whiteSpace: 'pre-line' }}
                >
                  {msg.text}

                  {msg.actionUrl && (
                    <div style={{ marginTop: '0.6rem' }}>
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

          <form className={styles.inputForm} onSubmit={handleFormSubmit}>
            <input
              type="text"
              className={styles.chatInput}
              placeholder="Ask about experience, stack, projects..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button type="submit" className={styles.sendBtn} aria-label="Send">
              <Send size={16} />
            </button>
          </form>
        </div>
      )}

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