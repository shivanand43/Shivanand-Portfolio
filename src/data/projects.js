export const projectsData = [

{
  id: 'abdm-hims-healthcare',
  title: 'ABDM & HIMS Healthcare Platform',
  category: 'Frontend-Web',
  badge: 'Enterprise Healthcare',

  shortDescription:
    'Unified clinical and hospital management platform supporting web and native mobile applications with ABDM health record interoperability.',

  fullDescription:
    'A Hospital Information Management System (HIMS) designed to streamline hospital operations and digital healthcare workflows. Built using Angular, Ionic and Capacitor with a shared codebase for web and native mobile platforms. Integrated ABDM-related services through Spring Boot REST APIs to support secure digital health record interoperability. Developed patient admission and billing modules using PrimeNG.',

  problemStatement: [
    'Hospitals need a centralized platform to manage patient information and daily operations.',
    'Manual patient admission and billing processes can lead to delays and operational inefficiencies.',
    'Healthcare systems need secure interoperability to exchange digital health records through supported ABDM integrations.'
  ],

  keyFeatures: [
    {
      title: 'Unified Multi-Platform Application',
      description:
        'A shared Angular and Ionic codebase supporting web and native mobile application deployment using Capacitor.'
    },
    {
      title: 'ABDM Integration',
      description:
        'Integration of ABDM-related connectors with Spring Boot REST APIs to support digital health record interoperability.'
    },
    {
      title: 'Patient Admission Management',
      description:
        'Healthcare admission interfaces for managing patient registration and admission information.'
    },
    {
      title: 'Hospital Billing',
      description:
        'Billing interfaces for managing patient charges and hospital billing workflows.'
    },
    {
      title: 'Reusable UI Components',
      description:
        'PrimeNG components including tables, forms, dropdowns and dialogs for consistent application interfaces.'
    }
  ],

  myContributions: [
    'Developed healthcare application interfaces using Angular and Ionic.',
    'Implemented reusable UI components and workflows using PrimeNG.',
    'Integrated frontend modules with Spring Boot REST APIs.',
    'Worked on ABDM connector integration for healthcare interoperability.',
    'Developed patient admission and billing modules.'
  ],

  architecture: [
    {
      layer: 'Frontend',
      technology: 'Angular + Ionic',
      description:
        'Handles application screens, user interactions and healthcare workflows.'
    },
    {
      layer: 'Mobile Integration',
      technology: 'Capacitor',
      description:
        'Enables native mobile application deployment using the shared web codebase.'
    },
    {
      layer: 'Backend',
      technology: 'Spring Boot',
      description:
        'Provides REST APIs for frontend communication and healthcare application operations.'
    },
    {
      layer: 'Database',
      technology: 'SQL',
      description:
        'Stores and retrieves application data.'
    },
    {
      layer: 'Interoperability',
      technology: 'ABDM Connectors',
      description:
        "Supports integration with India's digital healthcare ecosystem."
    }
  ],

  metrics: [
    'Unified Multi-Platform Codebase',
    'ABDM Health Record Interoperability',
    'Patient Admission Management',
    'Hospital Billing Workflows'
  ],

  techStack: [
    'Angular',
    'Ionic',
    'Capacitor',
    'PrimeNG',
    'Spring Boot',
    'SQL',
    'REST APIs'
  ],

  liveUrl: '',
  githubUrl: 'https://github.com/shivanand43',
  featured: true
},

{
  id: 'interioverse-real-estate',
  title: 'Interioverse Admin Dashboard',
    category: 'Full-Stack Web',
badge: 'Interior Design Platform',
 shortDescription:'Next.js & React management system featuring AWS S3 3D asset catalogs, city-wise pricing, JWT RBAC, and Recharts analytics.',
  description:
    'A centralized admin dashboard for managing users, designers, projects, subscriptions, quotations and interior design resources.',

  keyFeatures: [
    {
      title: 'User & Designer Management',
      description:
        'Admin interfaces for managing users, designer profiles and subscriptions.'
    },
    {
      title: 'Project & Quotation Management',
      description:
        'Features for tracking projects, managing quotations and handling customer information.'
    },
    {
      title: '3D Asset Management',
      description:
        'Centralized catalog for uploading and managing 3D models, templates and interior design resources.'
    },
    {
      title: 'City-Wise Pricing',
      description:
        'Pricing management for handling city-based rates and quotation details.'
    },
    {
      title: 'Dashboard Analytics',
      description:
        'Charts and dashboard components for monitoring platform activity and growth.'
    }
  ],

  myContributions: [
    'Developed the complete admin dashboard frontend using Next.js and React.',
    'Built backend APIs using Node.js and Express.js.',
    'Integrated frontend modules with backend REST APIs.',
    'Implemented JWT authentication, search, filtering and data management.',
    'Worked on MongoDB operations and AWS S3 file uploads.'
  ],

  architecture: [
    {
      layer: 'Frontend',
      technology: 'Next.js + React.js',
      description:
        'Handles admin interfaces, navigation and dashboard interactions.'
    },
    {
      layer: 'Backend',
      technology: 'Node.js + Express.js',
      description:
        'Provides REST APIs for application operations and data management.'
    },
    {
      layer: 'Database',
      technology: 'MongoDB',
      description:
        'Stores users, designers, projects, subscriptions and other platform data.'
    },
    {
      layer: 'Authentication',
      technology: 'JWT',
      description:
        'Handles secure user authentication and access.'
    },
    {
      layer: 'Cloud Storage',
      technology: 'AWS S3',
      description:
        'Stores 3D models, templates and other uploaded assets.'
    }
  ],

  metrics: [
    'Centralized Admin Management',
    '3D Asset & Template Management',
    'Automated Quotation Workflows',
    'Dashboard Analytics & Reporting'
  ],

  techStack: [
    'Next.js',
    'React.js',
    'JavaScript',
    'Node.js',
    'Express.js',
    'MongoDB',
    'JWT',
    'Axios',
    'AWS S3',
    'Razorpay',
    'Google Authentication'
  ],

  liveUrl: '',
  githubUrl: 'https://github.com/shivanand43',
  featured: true
},

 
{
  id: 'workday-ai-autofill',
  title: 'AI-Powered Workday Autofill Extension',
  category: 'AI & Extensions',
  badge: 'AI-Powered Chrome Extension',

  shortDescription:
    'An AI-powered Chrome extension that extracts resume details and automatically fills Workday job application forms.',

  fullDescription:
    'Built a Chrome extension to understand AI integration using Google Gemini. It extracts information from PDF resumes, matches details with Workday form fields and automates form filling.',

  keyFeatures: [
    {
      title: 'PDF Resume Parsing',
      description: 'Extracts information from uploaded PDF resumes.'
    },
    {
      title: 'AI Resume Analysis',
      description: 'Uses Gemini AI to convert resume details into structured JSON.'
    },
    {
      title: 'Smart Field Mapping',
      description: 'Matches resume information with Workday form fields.'
    },
    {
      title: 'Automatic Form Filling',
      description: 'Automatically fills application fields using resume data.'
    },
    {
      title: 'Local Data Storage',
      description: 'Stores parsed resume information using Chrome Storage API.'
    }
  ],

  myContributions: [
    'Developed the Chrome extension interface using React.',
    'Integrated Gemini AI for resume parsing and field matching.',
    'Implemented PDF text extraction using pdfjs-dist.',
    'Developed Workday form detection and autofill functionality.',
    'Implemented communication between popup, background and content scripts.'
  ],

  architecture: [
    {
      layer: 'Frontend',
      technology: 'React + Vite',
      description: 'Handles the Chrome extension popup interface.'
    },
    {
      layer: 'AI Integration',
      technology: 'Google Gemini',
      description: 'Extracts resume details and matches form fields.'
    },
    {
      layer: 'PDF Processing',
      technology: 'pdfjs-dist',
      description: 'Extracts text from uploaded PDF resumes.'
    },
    {
      layer: 'Browser Integration',
      technology: 'Chrome Extension MV3',
      description: 'Detects and fills Workday application forms.'
    }
  ],

  metrics: [
    'AI-Powered Resume Parsing',
    'Smart Form Field Matching',
    'Automated Application Filling'
  ],

  techStack: [
    'React',
    'JavaScript',
    'Vite',
    'Manifest V3',
    'Google Gemini AI',
    'pdfjs-dist',
    'Chrome Storage API',
    'Prompt Engineering'
  ],

  liveUrl: '',
  githubUrl: 'https://github.com/shivanand43/workday-ai-autofiller',
  featured: true
},

  {
    id: 'smart-kirani-app',
    title: 'Smart Kirani — Multi-Role eCommerce App',
    category: 'Mobile Apps',
    badge: 'React Native + Node.js',
    shortDescription:
      'Cross-platform mobile application digitizing local grocery (kirana) stores with Customer, Owner, and Delivery role flows.',
    fullDescription:
      'Developed a full-stack mobile commerce application using React Native, Expo Router, Zustand, Node.js, and MongoDB. Features distinct multi-role navigation for customers, shopkeepers, and delivery partners, lightweight Zustand cart/catalog state, and persistent sessions via AsyncStorage.',
    techStack: ['React Native', 'Expo Router', 'Zustand', 'Node.js', 'Express.js', 'MongoDB', 'AsyncStorage'],
    metrics: ['3-Role Architecture', 'Zero Prop-Drilling via Zustand', 'iOS & Android Responsive UI'],
    liveUrl: '',
    githubUrl: 'https://github.com/shivanand43',
    featured: true,
  },
 
{
  id: 'v18-premium-tuition',
  title: 'V.18 Premium Tuition Learning Portal',
  category: 'Full-Stack Web',
  badge: '3D-Based Learning Platform',

  shortDescription:
    'A modern educational platform for online and offline tuition, featuring interactive learning programs and 3D-based education.',

  fullDescription:
    'Developed an educational website to showcase tuition programs, smart learning features and student admission services. Focused on responsive design, website performance and automated enquiry handling.',

  problemStatement: [
    'Traditional learning methods can make complex subjects difficult to understand.',
    'Students need access to flexible online and offline learning programs.',
    'Managing admission enquiries manually takes additional time.'
  ],

  keyFeatures: [
    {
      title: 'Learning Programs',
      description:
        'Showcases online classes, offline tuition, home tuition and exam preparation programs.'
    },
    {
      title: '3D & AR/VR Learning',
      description:
        'Highlights interactive learning experiences using 3D visuals and immersive technology.'
    },
    {
      title: 'Student Admissions',
      description:
        'Provides admission information and enquiry options for students and parents.'
    },
    {
      title: 'Demo Booking',
      description:
        'Allows parents and students to request free demo classes.'
    },
    {
      title: 'Responsive Design',
      description:
        'Provides a user-friendly experience across mobile, tablet and desktop devices.'
    }
  ],

  myContributions: [
    'Developed the responsive frontend using React and TypeScript.',
    'Designed educational program pages and reusable UI components.',
    'Integrated EmailJS for automated enquiry submissions.',
    'Optimized website performance and SEO.'
  ],

  architecture: [
    {
      layer: 'Frontend',
      technology: 'React 18 + TypeScript',
      description:
        'Handles website pages, learning programs and user interactions.'
    },
    {
      layer: 'Styling',
      technology: 'Tailwind CSS',
      description:
        'Creates responsive layouts and consistent UI designs.'
    },
    {
      layer: 'Email Integration',
      technology: 'EmailJS',
      description:
        'Handles contact and admission enquiry submissions.'
    },
    {
      layer: 'Performance',
      technology: 'Google Lighthouse',
      description:
        'Used to measure and optimize website performance and SEO.'
    }
  ],

  data: [
    {
      title: 'Lighthouse Score',
      value: '95+'
    },
    {
      title: 'Learning Programs',
      value: '6'
    },
    {
      title: 'Device Support',
      value: 'Responsive'
    }
  ],

  metrics: [
    '95+ Lighthouse Performance & SEO',
    'Automated Email Enquiry Integration',
    'Mobile-First Responsive Design'
  ],

  techStack: [
    'React 18',
    'TypeScript',
    'Tailwind CSS',
    'EmailJS',
    'Google Lighthouse'
  ],

  liveUrl: 'https://www.v18premiumtuition.com/',
  githubUrl: 'https://github.com/shivanand43',
  featured: false
},

  {
  id: 'portfolio-recruiter-chatbot',
  title: 'Full-Stack Portfolio & Recruiter Chatbot',
  category: 'Full Stack Development',
  badge: ' Chatbot + Admin Dashboard',

  shortDescription:
    'An interactive portfolio with a recruiter chatbot, visitor tracking, ratings, contact forms and a secure admin dashboard.',

  fullDescription:
    'Developed a full-stack portfolio platform with a recruiter chatbot, visitor tracking, rating system and contact form. Used Vercel KV to store visitor details, chatbot conversations, ratings and contact submissions without maintaining a separate backend server. Built a secure admin dashboard to view all stored data, monitor portfolio activity and export records to Excel.',

  keyFeatures: [
    {
      title: 'Visitor Tracking',
      description:
        'Tracks portfolio visits and displays available visitor details, including name and location, to help understand visitor activity.'
    },
    {
      title: 'Cloud Data Storage',
      description:
        'Uses Vercel KV to store visitor details, chatbot conversations, ratings and contact form submissions without a separate backend server.'
    },
    {
      title: 'Recruiter Chatbot',
      description:
        'Helps recruiters quickly find information about skills, experience, projects and contact details.'
    },
    {
      title: 'Portfolio Rating System',
      description:
        'Allows visitors to rate the portfolio and stores their feedback for review.'
    },
    {
      title: 'Admin Dashboard',
      description:
        'Displays visitor activity, chatbot conversations, ratings and contact form submissions in one place.'
    },
    {
      title: 'JWT Authentication',
      description:
        'Protects admin access using JWT-based authentication.'
    },
    {
      title: 'Excel Data Export',
      description:
        'Allows admin to export stored visitor, chat, rating and contact details into Excel sheets.'
    }
  ],

  myContributions: [
    'Developed the portfolio frontend and recruiter chatbot.',
    'Implemented visitor tracking to monitor portfolio activity and available visitor location details.',
    'Integrated Vercel KV for cloud-based data storage.',
    'Built a rating system and contact form for visitor feedback and enquiries.',
    'Developed an admin dashboard to manage and view all stored data.',
    'Implemented JWT authentication to secure admin access.',
    'Added Excel export functionality for downloading stored records.'
  ],

  architecture: [
    {
      layer: 'Frontend',
      technology: 'React.js',
      description: 'Handles the portfolio, chatbot, rating UI and admin dashboard.'
    },
    {
      layer: 'Serverless APIs',
      technology: 'Vercel Functions',
      description: 'Handles data operations without maintaining a separate backend server.'
    },
    {
      layer: 'Cloud Storage',
      technology: 'Vercel KV',
      description: 'Stores visitor details, chatbot conversations, ratings and contact submissions.'
    },
    {
      layer: 'Authentication',
      technology: 'JWT',
      description: 'Secures access to the admin dashboard.'
    },
    {
      layer: 'Analytics',
      technology: 'Recharts',
      description: 'Displays portfolio activity and rating information.'
    },
    {
      layer: 'Data Export',
      technology: 'Excel',
      description: 'Exports stored records for admin use.'
    }
  ],

  metrics: [
    'Visitor Activity Tracking',
    'Centralized Cloud Data Storage',
    'JWT-Secured Admin Dashboard',
    'Recruiter Chatbot',
    'Portfolio Rating & Feedback',
    'One-Click Excel Data Export'
  ],

  techStack: [
    'React.js',
    'JavaScript',
    'Node.js',
    'Express.js',
    'Vercel Serverless Functions',
    'Vercel KV',
    'JWT Authentication',
    'Recharts',
    'Excel Export',
    'REST APIs'
  ],

  liveUrl: 'https://shivanand-portfolio-zeta.vercel.app/projects/interioverse-real-estate',
  githubUrl: 'https://github.com/shivanand43/Shivanand-Portfolio/tree/visiterTrakerChanges',
  featured: false
},
];