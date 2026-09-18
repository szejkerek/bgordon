/**
 * Shared TypeScript types for the portfolio site
 */

// ============================================
// Media Types
// ============================================

/**
 * Everything an `<img>` needs from the build: a URL, optional responsive
 * variants, and the intrinsic dimensions that reserve its box before it loads.
 */
export interface MediaSource {
  src: string;
  srcset?: string;
  sizes?: string;
  width?: number;
  height?: number;
}

/**
 * The subset of a project a card renders. Deliberately not the content-collection
 * entry: props of a hydrated island are serialized into the HTML, and an entry
 * drags its whole markdown body, rendered output and digest along with it.
 */
export interface ProjectSummary {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  teamSize?: number;
  thumbnail?: MediaSource;
}

// ============================================
// Social & Link Types
// ============================================

export type { IconType } from '../utils/icons';

export interface SocialLink {
  type: IconType;
  text: string;
  url: string;
  /** Set false to keep a link in the footer but out of the hero. */
  inHero?: boolean;
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
  locationUrl?: string;
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
  logo?: MediaSource;
  url?: string;
}

export interface Education {
  institution: string;
  degree: string;
  period: string;
  description: string;
  skills: string[];
  logo?: MediaSource;
  url?: string;
}


