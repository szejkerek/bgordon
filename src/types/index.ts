/**
 * Shared TypeScript types for the portfolio site
 */

// ============================================
// Social & Link Types
// ============================================

export type IconType = 
  | 'email' 
  | 'github' 
  | 'linkedin' 
  | 'trophy' 
  | 'medal' 
  | 'star' 
  | 'award' 
  | 'book' 
  | 'users'
  | 'play'
  | 'external'
  | 'briefcase'
  | 'graduation'
  | 'gamepad'
  | 'download'
  | 'arrow-left'
  | 'team';

export interface SocialLink {
  type: IconType;
  text: string;
  url: string;
}

export interface PrimaryLink {
  text: string;
  url: string;
}

// ============================================
// Hero Section Types
// ============================================

export interface HeroData {
  label?: string;
  name?: string;
  bio?: string;
  photo?: string;
  primaryLink?: PrimaryLink;
  socialLinks?: SocialLink[];
}

// ============================================
// Work & Education Types
// ============================================

export interface WorkExperience {
  company: string;
  role: string;
  period: string;
  description: string;
  skills: string[];
  logo?: string;
}

export interface Education {
  institution: string;
  degree: string;
  period: string;
  description: string;
  skills: string[];
  logo?: string;
}

// ============================================
// Content Collection Types (Runtime)
// ============================================

export interface GameData {
  title: string;
  description: string;
  date: string;
  tags?: string[];
  image?: string;
  gallery?: string[];
  playUrl?: string;
  sourceUrl?: string;
  jam?: string;
  featured?: boolean;
  teamSize?: number;
}

export interface GameEntry {
  slug: string;
  data: GameData;
  render: () => Promise<{ Content: any }>;
}

export interface AchievementType {
  type: 'winner' | 'finalist' | 'participant' | 'publication' | 'organization';
}

export interface AchievementData {
  title: string;
  event: string;
  date: string;
  description: string;
  type: AchievementType['type'];
  icon?: IconType;
  url?: string;
  image?: string;
  gallery?: string[];
  game?: string;
  rank?: string;
  participants?: string;
}

export interface AchievementEntry {
  slug: string;
  data: AchievementData;
  render: () => Promise<{ Content: any }>;
}

// ============================================
// Media Types
// ============================================

export type MediaType = 'image' | 'video' | 'gif';

export interface MediaItem {
  src: string;
  type: MediaType;
  alt?: string;
}

// ============================================
// Component Props Types
// ============================================

export interface CardBaseProps {
  className?: string;
}

export interface ButtonProps {
  variant?: 'primary' | 'secondary';
  href?: string;
  external?: boolean;
  icon?: IconType;
}

// ============================================
// Layout Props
// ============================================

export interface LayoutProps {
  title: string;
  description?: string;
  image?: string;
  canonicalUrl?: string;
}
