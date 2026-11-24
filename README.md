# 🚀 Shivanand Patil — Full-Stack Developer Portfolio & Recruiter Suite

A high-performance, interactive full-stack personal portfolio built with **React (Vite)** and **Node.js Serverless APIs**. Beyond showcasing projects and skills, this application acts as an active lead-generation and recruiter engagement engine—featuring real-time visitor tracking, an AI-assisted recruiter chatbot, EmailJS alerts, JWT-secured admin analytics, and one-click Excel (.xlsx) reporting.

---
## 📋 Table of Contents
1. [Project Overview](#-project-overview)
2. [Tech Stack](#-tech-stack)
3. [Project Folder Structure](#-project-folder-structure)
4. [Core Features & How They Work](#-core-features--how-they-work)
5. [Security, Authentication (JWT) & Storage Architecture](#-security-authentication-jwt--storage-architecture)
6. [Environment Variables (.env) Setup](#-environment-variables-env-setup)
7. [Local Development & Testing Guide](#-local-development--testing-guide)

---

## 🎯 Project Overview

Most developer portfolios are static digital resumes. This project is engineered as a **full-stack web application** that actively interacts with visitors and gives the site owner (Admin) complete visibility into recruiter engagement:
- **For Visitors & Recruiters:** Smooth glassmorphic cyber-blue UI, interactive 3D tilt skill cards, animated tech-stack "train" banners, rolling KPI metrics, a 5-star review system, and an instant recruiter chatbot.
- **For the Admin (Shivanand Patil):** Automated EmailJS notifications whenever someone visits or sends an inquiry, backed by a JWT-protected `/admin` dashboard to review leads, read chatbot transcripts, inspect ratings, and export all records into a multi-sheet Excel file.

---

## 🛠 Tech Stack

| Layer | Technologies Used |
| :--- | :--- |
| **Frontend Framework** | React.js, React Router DOM, Vite |
| **Styling & UI Physics** | CSS Modules (`.module.css`), Glassmorphism, Custom 3D Tilt & Spotlight Physics, IntersectionObserver Animations |
| **Icons & Visuals** | Lucide React, Custom Animated GIFs (`train.gif`) |
| **Backend & Serverless** | Node.js Serverless Handlers (`/api/*`), Custom Vite Local API Middleware |
| **Security & Auth** | JSON Web Tokens (`jsonwebtoken` / JWT), Environment-based Credential Verification |
| **Database & Caching** | `@vercel/kv` (Upstash Redis) with automatic Local In-Memory / `localStorage` fallback |
| **Notifications & AI** | `@emailjs/browser` (Instant visitor & lead alerts), Recruiter Chatbot Q&A Engine |
| **Data Export** | `xlsx` (SheetJS) for multi-sheet `.xlsx` generation |

---
## 📂 Project Folder Structure

Every file and folder in this project has a single, clear responsibility:

```text
shivanand-portfolio/
├── api/                                # Serverless Backend API Endpoints (Runs on Vercel & Vite Dev)
│   ├── lib/
│   │   ├── adminToken.js               # Generates & verifies JWT security tokens using JWT_SECRET
│   │   └── portfolioStore.js           # Dual storage engine: saves/reads data via @vercel/kv or local memory
│   ├── admin-login.js                  # POST: Verifies admin credentials from .env & issues a JWT token
│   ├── chats.js                        # GET/POST: Logs recruiter chatbot Q&A transcripts & fetches them for Admin
│   ├── export-excel.js                 # GET (JWT Protected): Builds & downloads a 3-sheet .xlsx report
│   ├── messages.js                     # GET/POST: Saves contact form inquiries & loads them in Admin
│   └── ratings.js                      # GET/POST: Stores 5-star visitor ratings & reviews
│
├── public/                             # Static Public Assets (Served directly from root /)
│   ├── assets/
│   │   └── profile.jpeg                # Developer profile photo displayed in the Hero floating card
│   └── train.gif                       # Animated train engine icon used in ProjectCard tech-stack streams
│
├── src/                                # Frontend React Application
│   ├── components/                     # Reusable UI Widgets & Layout Blocks
│   │   ├── AdminLoginForm.jsx          # Secure login card rendered when /admin has no active JWT
│   │   ├── AdminLoginForm.module.css   # Cyber-slate & electric-blue styles for the Admin login form
│   │   ├── Chatbot.jsx                 # Floating recruiter assistant with 5-sec auto-popup & typing indicator
│   │   ├── Chatbot.module.css          # Styling for the chatbot window, bubbles, and quick-prompt chips
│   │   ├── CountUp.jsx                 # IntersectionObserver component that rolls numbers up from 0 on scroll
│   │   ├── Footer.jsx                  # Site footer with quick navigation, social links & copyright
│   │   ├── Footer.module.css           # Responsive footer layout styles
│   │   ├── Navbar.jsx                  # Sticky glassmorphic navigation bar with mobile menu & Admin shield link
│   │   ├── Navbar.module.css           # Navigation bar & responsive drawer styles
│   │   ├── PortfolioRating.jsx         # Interactive 5-star rating & feedback widget on the Home page
│   │   ├── PortfolioRating.module.css  # Star hover glow & feedback card styles
│   │   ├── ProjectCard.jsx             # Project showcase card featuring the moving "Tech Stack Train"
│   │   ├── ProjectCard.module.css      # CSS keyframe track & fade masks for the train animation
│   │   ├── SkillsShowcase.jsx          # "Core Technical Skills" section with cursor-tracking 3D tilt cards
│   │   ├── SkillsShowcase.module.css   # 3D perspective & radial spotlight gradient styles
│   │   ├── VisitorTracker.jsx          # Welcome modal capturing visitor name/location & triggering EmailJS alert
│   │   └── VisitorTracker.module.css   # Electric cyber-blue & dark-glass popup modal styling
│   │
│   ├── context/
│   │   └── SiteContentContext.jsx      # Global React Context providing profile, project & live site content
│   │
│   ├── data/
│   │   ├── profile.js                  # Shivanand Patil's resume summary, experience, education & social links
│   │   └── projects.js                 # Detailed case studies, metrics, tech stacks & links for all projects
│   │
│   ├── hooks/
│   │   └── useScrollReveal.js          # Custom hook triggering smooth fade-up animations when scrolling
│   │
│   ├── pages/                          # Main Routed Views
│   │   ├── About.jsx                   # Full career timeline, experience breakdown & academic background
│   │   ├── About.module.css            # Timeline and biography layout styles
│   │   ├── Admin.jsx                   # Protected Admin Dashboard: KPIs, tabbed tables, Excel export & logout
│   │   ├── Admin.module.css            # Dashboard grid, green Excel export button & responsive table styles
│   │   ├── Contact.jsx                 # Interactive contact form wired to EmailJS & /api/messages
│   │   ├── Contact.module.css          # Contact form & direct info card styles
│   │   ├── Home.jsx                    # Landing page: Hero photo ring, CountUp stats, Featured Work, Skills & Rating
│   │   ├── Home.module.css             # Hero floating animations, dashed rotating ring & responsive grids
│   │   ├── ProjectDetail.jsx           # Deep-dive case study view for individual projects (/projects/:id)
│   │   ├── ProjectDetail.module.css    # Case study architecture & metric highlight styles
│   │   ├── Projects.jsx                # Filterable portfolio gallery showing all engineering projects
│   │   └── Projects.module.css         # Filter tabs and project grid styles
│   │
│   ├── App.jsx                         # Root router configuring all routes (/admin, /projects, etc.) & global widgets
│   ├── index.css                       # Global CSS variables (cyber-blue palette, dark slate backgrounds, fonts)
│   └── main.jsx                        # React DOM entry point
│
├── .env / .env.local                   # Secret keys (JWT_SECRET, ADMIN credentials, KV keys, EmailJS IDs)
├── package.json                        # Project dependencies and npm scripts
├── vercel.json                         # Vercel deployment & serverless routing configuration
└── vite.config.js                      # Vite config + custom localApiServer middleware for running /api/* locally


✨ Core Features & How They Work
1. Visitor Tracker & Instant EmailJS Notification (VisitorTracker.jsx)
How it works: When a new visitor lands on the site, a cyber-blue glassmorphic welcome modal greets them (stored in sessionStorage so it never annoys them twice in the same session).

Alert Pipeline: Whether the visitor enters their name or clicks skip, the tracker captures basic visit metadata (timestamp, device/referrer info) and fires an EmailJS alert directly to Shivanand's inbox so you know immediately when a recruiter checks your portfolio.

2. Recruiter AI Chatbot (Chatbot.jsx + api/chats.js)
How it works: Appears in the bottom-right corner with a friendly auto-popup after 5 seconds. Recruiters can click quick-question chips or type custom questions about Shivanand's experience, tech stack, notice period, or projects.

Persistence: Every Q&A exchange is saved via POST /api/chats so you can see what recruiters are asking most often inside your Admin Dashboard.

3. Custom Interactive UI Engineering
Floating Hero Photo (Home.jsx): Features a rotating dashed orbital ring (spinSlow), radial ambient glow, and counter-floating badge cards (Full-Stack Dev & React & Node).

Rolling Count-Up Stats (CountUp.jsx): Uses IntersectionObserver + requestAnimationFrame with an easeOutCubic curve so KPI metrics (1.5+ Years, 6+, 95+, 30%+) count up smoothly when scrolled into view.

Tech Stack Train (ProjectCard.jsx): Each project card renders a single continuous train (train.gif engine leading the tech stack carriages) moving smoothly from left to right with soft edge fade masks (mask-image) and pause-on-hover.

3D Magnetic Spotlight (SkillsShowcase.jsx): Tracks cursor coordinates (--mouse-x, --mouse-y) in real time to tilt skill cards in 3D perspective while illuminating a radial cyan spotlight beneath the hovered tags.

4. One-Click Excel Export (api/export-excel.js)
How it works: Inside the /admin dashboard, clicking Export to Excel (.xlsx) sends a GET request with your JWT token to /api/export-excel.

Output: The server fetches all records from Vercel KV and uses xlsx (SheetJS) to generate a formatted .xlsx workbook with 3 separate tabs: Contact Messages, Chatbot Logs, and Visitor Ratings.
