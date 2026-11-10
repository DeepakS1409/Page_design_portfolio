export type ChapterId =
  | 'about'
  | 'skills'
  | 'projects'
  | 'certificates'
  | 'achievements'
  | 'education'
  | 'interests'
  | 'contact';

export interface ChapterMeta {
  id: ChapterId;
  spreadIndex: number;
  number: string;
  title: string;
  shortTitle: string;
  subtitle: string;
  pageNumbers: [number, number];
  continuation?: boolean;
  spreadPart?: number;
}

export interface TimelineItem {
  period: string;
  title: string;
  detail: string;
}

export interface SkillCategory {
  id: string;
  title: string;
  iconName: 'code' | 'globe' | 'wrench' | 'sparkles';
  items: string[];
}

export interface ProjectPanel {
  badge: string;
  title: string;
  imageUrl: string;
  features: string[];
}

export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  status: string;
  shortDescription: string;
  detailedOverview: string;
  keyCapabilities: string[];
  technologies: string[];
  imageUrl?: string;
  imagePlaceholderLabel: string;
  githubUrl?: string;
  liveDemoUrl?: string;
  dualShowcase?: {
    left: ProjectPanel;
    right: ProjectPanel;
  };
}

export interface CertificateItem {
  id: string;
  title: string;
  issuer: string;
  subtitle?: string;
  details: string[];
  imageUrl?: string;
  imagePlaceholderHint: string;
  badgeText?: string;
}

export interface AchievementItem {
  id: string;
  rankOrBadge: string;
  title: string;
  organization: string;
  highlights: string[];
  featured?: boolean;
}

export interface TechInterestItem {
  id: string;
  title: string;
  summary: string;
  illustration:
    | 'ai'
    | 'iot'
    | 'arduino'
    | 'esp32'
    | 'robotics'
    | 'embedded'
    | 'sensors'
    | 'integration';
}

