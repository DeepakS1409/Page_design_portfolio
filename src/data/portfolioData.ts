import {
  AchievementItem,
  CertificateItem,
  ChapterMeta,
  ProjectItem,
  SkillCategory,
  TechInterestItem,
  TimelineItem,
} from '../types/portfolio';

/**
 * ============================================================================
 * DEEPAK S — PORTFOLIO CONTENT CONFIGURATION
 * ============================================================================
 * Edit this file to update personal information, skills, currently learning
 * topics, projects, certificates, social links, or contact settings without
 * touching the 3D book engine.
 */

export const PERSONAL_INFO = {
  name: 'Deepak S',
  coverTitle: 'DEEPAK S',
  coverEdition: 'MY DIGITAL JOURNEY',
  coverSubtitle: 'Exploring Technology. Building Possibilities.',
  degree: 'B.Tech Information Technology',
  college: 'Sri Eshwar College of Engineering',
  batch: '2026–2030',
  educationStatus: 'Currently Pursuing',
  professionalIdentity: [
    'Aspiring IT Professional',
    'Software Development',
    'Artificial Intelligence',
    'Technology Enthusiast',
  ],
  careerObjective:
    'An aspiring IT professional interested in software development, artificial intelligence, and innovative technology solutions. Passionate about learning, building projects, and exploring new technologies.',
  aboutIntro:
    'I am an aspiring IT professional interested in software development, artificial intelligence, and innovative technology solutions. I enjoy learning new technologies, exploring ideas, and building practical projects.',
  // Place your portrait at public/assets/profile/deepak-profile.jpg and set the path below
  profileImageUrl: '' as string,
  profilePlaceholderText: 'Profile Photo Placeholder — Add image at public/assets/profile/',
};

export const SOCIAL_LINKS = {
  github: 'https://github.com/DeepakS1409',
  // Replace the empty string with your actual LinkedIn profile URL when ready
  linkedin: 'https://www.linkedin.com/in/deepak-s-0bab28405/',
  linkedinPlaceholderLabel: 'LinkedIn Profile (Placeholder — Update in portfolioData.ts)',
};

export const CONTACT_CONFIG = {
  // Set your real email address for the mailto fallback (e.g., 'deepak@example.com')
  recipientEmail: 'deepaksenthilkumar14@gmail.com',
  // Optional: If you configure a form backend (e.g., Formspree URL), set it here.
  // When empty, the form uses a validated mailto: fallback instead of faking submission.
  formEndpoint: '' as string,
  closingLine: 'Thanks for exploring my journey.',
};

export const BOOK_CHAPTERS: ChapterMeta[] = [
  {
    id: 'about',
    spreadIndex: 0,
    number: '01',
    title: 'About Me',
    shortTitle: 'About',
    subtitle: 'Identity, Objective & Journey',
    pageNumbers: [1, 2],
  },
  {
    id: 'about',
    spreadIndex: 1,
    number: '01',
    title: 'About Me',
    shortTitle: 'About',
    subtitle: 'Personal Journey, Continued',
    pageNumbers: [3, 4],
    continuation: true,
  },
  {
    id: 'skills',
    spreadIndex: 2,
    number: '02',
    title: 'My Skills',
    shortTitle: 'Skills',
    subtitle: 'Languages, Web, Tools & AI',
    pageNumbers: [5, 6],
  },
  {
    id: 'projects',
    spreadIndex: 3,
    number: '03',
    title: "Projects I've Worked On",
    shortTitle: 'Projects',
    subtitle: 'Software & AI Concepts',
    pageNumbers: [7, 8],
  },
  {
    id: 'projects',
    spreadIndex: 4,
    number: '03',
    title: "Projects I've Worked On",
    shortTitle: 'Projects',
    subtitle: 'More Software & AI Concepts',
    pageNumbers: [9, 10],
    continuation: true,
  },
  {
    id: 'certificates',
    spreadIndex: 5,
    number: '04',
    title: 'Certifications and Participation',
    shortTitle: 'Certificates',
    subtitle: 'Verified Credentials & Events',
    pageNumbers: [11, 12],
  },
  {
    id: 'achievements',
    spreadIndex: 6,
    number: '05',
    title: 'Achievements and Milestones',
    shortTitle: 'Achievements',
    subtitle: 'Rankings & Recognitions',
    pageNumbers: [13, 14],
  },
  {
    id: 'education',
    spreadIndex: 7,
    number: '06',
    title: 'My Education',
    shortTitle: 'Education',
    subtitle: 'Academic Foundation',
    pageNumbers: [15, 16],
  },
  {
    id: 'interests',
    spreadIndex: 8,
    number: '07',
    title: 'Beyond Coding',
    shortTitle: 'Interests',
    subtitle: 'AI, IoT, Robotics & Hardware',
    pageNumbers: [17, 18],
  },
  {
    id: 'contact',
    spreadIndex: 9,
    number: '08',
    title: "Let's Connect",
    shortTitle: 'Contact',
    subtitle: 'Reach Out & Collaborate',
    pageNumbers: [19, 20],
  },
];

export const JOURNEY_TIMELINE: TimelineItem[] = [
  {
    period: '2026',
    title: 'Beginning B.Tech Information Technology',
    detail:
      'Started undergraduate studies at Sri Eshwar College of Engineering (2026–2030 batch), building a foundation in programming and problem-solving.',
  },
  {
    period: 'Exploration',
    title: 'Software & Web Development',
    detail:
      'Learning core languages (C, C++, Python, JavaScript) and modern web technologies (HTML, CSS, React) to turn concepts into practical applications.',
  },
  {
    period: 'AI & Events',
    title: 'Generative AI & Hackathons',
    detail:
      'Participating in national and campus hackathons such as Ziro.Digital National Agentic AI Hackathon 2026 and BOSS $1000 Contributor Hackathon.',
  },
  {
    period: 'Ongoing',
    title: 'Building & Growing',
    detail:
      'Continuously designing project concepts across AI, web applications, and smart systems while exploring hardware-software integration.',
  },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: 'programming',
    title: 'Programming',
    iconName: 'code',
    items: ['C', 'C++', 'Python', 'JavaScript'],
  },
  {
    id: 'web',
    title: 'Web Development',
    iconName: 'globe',
    items: ['HTML', 'CSS', 'React'],
  },
  {
    id: 'tools',
    title: 'Tools and Technologies',
    iconName: 'wrench',
    items: ['Git', 'GitHub', 'VS Code', 'Antigravity', 'Streamlit'],
  },
  {
    id: 'ai',
    title: 'AI and Technology',
    iconName: 'sparkles',
    items: [
      'Generative AI',
      'AI integration',
      'Prompt engineering',
      'Machine learning fundamentals',
    ],
  },
];

// Keep this array updated as you explore new topics
export const CURRENTLY_LEARNING: string[] = [
  'Full-Stack React & TypeScript Patterns',
  'Agentic AI Workflows & LLM Integration',
  'Data Structures & Problem Solving',
  'Embedded Systems & ESP32 Fundamentals',
];

export const PROJECTS: ProjectItem[] = [
  {
    id: 'deepkart',
    title: 'DeepKart',
    category: 'Web & E-Commerce',
    status: 'Project Concept / Build',
    shortDescription:
      'An e-commerce website with product browsing, cart, wishlist, checkout, orders, and profile functionality.',
    detailedOverview:
      'DeepKart is designed as a full-featured e-commerce web experience centered on clean product discovery, shopping cart management, saved wishlists, structured checkout flow, order tracking views, and user profile management.',
    keyCapabilities: [
      'Product catalog browsing and item views',
      'Interactive cart and wishlist state management',
      'Checkout flow, order history, and profile screens',
    ],
    technologies: ['HTML', 'CSS', 'JavaScript', 'React'],
    imageUrl: '',
    imagePlaceholderLabel: 'DeepKart Screenshot Placeholder',
    githubUrl: '',
    liveDemoUrl: '',
  },
  {
    id: 'factorymind-ai',
    title: 'FactoryMind AI',
    category: 'Artificial Intelligence',
    status: 'Concept Design',
    shortDescription:
      'An AI-powered digital twin and autonomous production scheduling concept designed to improve manufacturing planning and decision-making.',
    detailedOverview:
      'FactoryMind AI explores how digital twin modeling and AI-assisted scheduling can help visualize production bottlenecks, evaluate planning scenarios, and support smarter manufacturing decisions.',
    keyCapabilities: [
      'Digital twin conceptual workflow for factory operations',
      'Autonomous production scheduling logic exploration',
      'Decision-support insights for resource planning',
    ],
    technologies: ['Python', 'Generative AI', 'AI integration', 'Streamlit'],
    imageUrl: '',
    imagePlaceholderLabel: 'FactoryMind AI Preview Placeholder',
    githubUrl: '',
    liveDemoUrl: '',
  },
  {
    id: 'whatsapp-ai-center',
    title: 'WhatsApp AI Intelligence Center',
    category: 'AI & Routing',
    status: 'Project Concept',
    shortDescription:
      'An AI-based message intelligence and routing project involving message analysis and image and voice classification.',
    detailedOverview:
      'WhatsApp AI Intelligence Center focuses on multi-modal message triage—analyzing incoming text, images, and voice inputs to classify intent and route communications efficiently.',
    keyCapabilities: [
      'Automated message analysis and intent categorization',
      'Image and voice classification pipeline concept',
      'Structured routing workflow for incoming messages',
    ],
    technologies: ['Python', 'Generative AI', 'Prompt engineering', 'AI integration'],
    imageUrl: '',
    imagePlaceholderLabel: 'WhatsApp AI Center Placeholder',
    githubUrl: '',
    liveDemoUrl: '',
  },
  {
    id: 'padika-ai',
    title: 'Padika AI',
    category: 'EdTech & AI',
    status: 'Concept Design',
    shortDescription:
      'An AI-powered educational assistant concept designed to help students access learning materials and academic information.',
    detailedOverview:
      'Padika AI is conceptualized as a student-focused academic companion that organizes study resources and uses AI assistance to help learners locate materials and understand academic concepts faster.',
    keyCapabilities: [
      'Guided access to organized learning materials',
      'AI-assisted academic Q&A and study support',
      'Student-centered interface for quick revision',
    ],
    technologies: ['Python', 'Generative AI', 'Prompt engineering', 'React'],
    imageUrl: '',
    imagePlaceholderLabel: 'Padika AI Preview Placeholder',
    githubUrl: '',
    liveDemoUrl: '',
  },
  {
    id: 'smart-parking',
    title: 'Smart Parking System',
    category: 'Smart Mobility',
    status: 'Concept Design',
    shortDescription:
      'A mobile parking management concept using QR-based entry and exit, booking, and parking slot navigation.',
    detailedOverview:
      'Smart Parking System outlines a streamlined mobile experience for urban parking—combining advance slot booking, QR-code verified entry and exit, and guided navigation to available parking spaces.',
    keyCapabilities: [
      'QR-based entry and exit verification concept',
      'Advance parking slot reservation workflow',
      'In-lot slot availability and navigation guidance',
    ],
    technologies: ['JavaScript', 'React', 'QR Workflow', 'AI / Smart Systems'],
    imageUrl: '',
    imagePlaceholderLabel: 'Smart Parking Preview Placeholder',
    githubUrl: '',
    liveDemoUrl: '',
  },
  {
    id: 'smart-streetlight',
    title: 'Hybrid Smart Street Light Fault Monitoring System',
    category: 'Smart Infrastructure',
    status: 'Concept Design',
    shortDescription:
      'A smart infrastructure concept for monitoring streetlight faults, handling QR-based public complaints, tracking fault locations, and helping maintenance workers manage repairs.',
    detailedOverview:
      'This smart infrastructure concept connects automated fault monitoring with citizen reporting via pole-mounted QR codes, enabling location tracking of faulty lights and organized repair workflows for maintenance teams.',
    keyCapabilities: [
      'Streetlight fault monitoring and status tracking concept',
      'QR-based public complaint intake with location mapping',
      'Maintenance worker repair queue and resolution tracking',
    ],
    technologies: ['IoT Concept', 'Sensors', 'Web Interface', 'QR Reporting'],
    imageUrl: '',
    imagePlaceholderLabel: 'Street Light System Placeholder',
    githubUrl: '',
    liveDemoUrl: '',
  },
];

export const CERTIFICATES: CertificateItem[] = [
  {
    id: 'igen-student-member',
    title: 'IGEN — Student Member',
    issuer: 'The Institution of Green Engineers',
    subtitle: 'Membership Credential',
    badgeText: 'G Score: 25',
    details: [
      'The Institution of Green Engineers',
      'Non-Donor Member',
      'G Score: 25',
      'Validity: October 2027',
    ],
    imageUrl: '/assets/certificates/igen-student-member.jpg',
    imagePlaceholderHint: 'Add actual image: public/assets/certificates/igen-student-member.jpg',
  },
  {
    id: 'boss-hackathon',
    title: 'BOSS $1000 Contributor Hackathon',
    issuer: 'Organized by BOSS Console',
    subtitle: 'Certificate of Participation',
    badgeText: 'Participation',
    details: [
      'Organized by BOSS Console',
      'Certificate of Participation',
      'Sri Eshwar College of Engineering',
    ],
    imageUrl: '/assets/certificates/boss-hackathon-contributor.png',
    imagePlaceholderHint: 'Add actual image: public/assets/certificates/boss-hackathon-contributor.png',
  },
  {
    id: 'national-agentic-ai-2026',
    title: 'National Agentic AI Hackathon 2026',
    issuer: 'Organized by Ziro.Digital',
    subtitle: 'Team: TRIFORGE',
    badgeText: 'Rank #132',
    details: [
      'Organized by Ziro.Digital',
      'Team: TRIFORGE',
      'National Qualification Rank: #132',
      'Overall Evaluation Score: 116/180',
      'Sri Eshwar College of Engineering',
    ],
    imageUrl: '/assets/certificates/ziro_ai.png',
    imagePlaceholderHint: 'Add actual image: public/assets/certificates/ziro_ai.png',
  },
];

export const ACHIEVEMENTS: AchievementItem[] = [
  {
    id: 'ziro-rank-132',
    rankOrBadge: 'National Rank #132',
    title: 'Ziro.Digital National Agentic AI Hackathon 2026',
    organization: 'Ziro.Digital · Team TRIFORGE · Sri Eshwar College of Engineering',
    featured: true,
    highlights: [
      'National Qualification Rank: #132',
      'Overall Evaluation Score: 116/180',
      'Competed with Team TRIFORGE in Agentic AI problem solving',
    ],
  },
  {
    id: 'boss-contributor',
    rankOrBadge: 'Hackathon Participation',
    title: 'BOSS $1000 Contributor Hackathon',
    organization: 'BOSS Console · Sri Eshwar College of Engineering',
    highlights: [
      'Certificate of Participation',
      'Collaborated on open-source / contributor hackathon challenges',
    ],
  },
  {
    id: 'igen-member',
    rankOrBadge: 'G Score: 25',
    title: 'IGEN — Student Member',
    organization: 'The Institution of Green Engineers',
    highlights: [
      'Non-Donor Student Member',
      'Verified G Score: 25 (Valid through October 2027)',
    ],
  },
];

export const EDUCATION_TIMELINE: TimelineItem[] = [
  {
    period: '2026',
    title: 'Program Admission — B.Tech IT',
    detail:
      'Joined Sri Eshwar College of Engineering in the 2026–2030 Information Technology cohort.',
  },
  {
    period: '2026–Present',
    title: 'Core Computing & Software Foundations',
    detail:
      'Studying programming fundamentals, web development, and software engineering principles while applying concepts in hackathons.',
  },
  {
    period: 'Ongoing',
    title: 'AI & Emerging Technology Exploration',
    detail:
      'Building conceptual fluency in Generative AI, prompt engineering, machine learning fundamentals, and hardware-software integration.',
  },
  {
    period: '2030 (Expected)',
    title: 'B.Tech Information Technology Graduation',
    detail: 'Working steadily toward degree completion and readiness for software and AI engineering roles.',
  },
];

export const TECH_INTERESTS: TechInterestItem[] = [
  {
    id: 'ai',
    title: 'Artificial Intelligence',
    summary: 'Exploring generative models, intelligent agents, and practical AI applications.',
    illustration: 'ai',
  },
  {
    id: 'iot',
    title: 'Internet of Things',
    summary: 'Interested in connected devices, telemetry concepts, and smart environments.',
    illustration: 'iot',
  },
  {
    id: 'arduino',
    title: 'Arduino',
    summary: 'Learning microcontroller prototyping, digital I/O, and foundational electronics.',
    illustration: 'arduino',
  },
  {
    id: 'esp32',
    title: 'ESP32',
    summary: 'Exploring Wi-Fi/BLE-enabled microcontrollers for connected system prototypes.',
    illustration: 'esp32',
  },
  {
    id: 'robotics',
    title: 'Robotics',
    summary: 'Curious about autonomous motion, actuation, and perception systems.',
    illustration: 'robotics',
  },
  {
    id: 'embedded',
    title: 'Embedded Systems',
    summary: 'Studying how low-level firmware interacts directly with hardware components.',
    illustration: 'embedded',
  },
  {
    id: 'sensors',
    title: 'Sensors and Electronics',
    summary: 'Understanding signal acquisition, environmental sensing, and circuit basics.',
    illustration: 'sensors',
  },
  {
    id: 'integration',
    title: 'Hardware & Software Integration',
    summary: 'Connecting physical sensors and controllers with modern software interfaces.',
    illustration: 'integration',
  },
];

