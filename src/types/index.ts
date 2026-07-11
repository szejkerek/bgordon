/**
 * Shared TypeScript types for the portfolio site
 */

// ============================================
// Social & Link Types
// ============================================

export type { IconType } from '../utils/icons';

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
  location?: string;
  birthDate?: string;
  photo?: string;
  primaryLink?: PrimaryLink;
  socialLinks?: SocialLink[];
}

export interface HeroStat {
  value: string;
  label: string;
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


