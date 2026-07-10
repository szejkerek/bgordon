import {
  Mail,
  Trophy,
  Medal,
  Star,
  Award,
  Book,
  Users,
  Play,
  ExternalLink,
  Briefcase,
  GraduationCap,
  Gamepad2,
  Download,
  ArrowLeft,
  X,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ZoomIn,
  Image as ImageIcon,
} from 'lucide-svelte';
import GithubIcon from '../components/icons/GithubIcon.svelte';
import LinkedinIcon from '../components/icons/LinkedinIcon.svelte';

const iconComponents = {
  email: Mail,
  github: GithubIcon,
  linkedin: LinkedinIcon,
  trophy: Trophy,
  medal: Medal,
  star: Star,
  award: Award,
  book: Book,
  users: Users,
  play: Play,
  external: ExternalLink,
  briefcase: Briefcase,
  graduation: GraduationCap,
  gamepad: Gamepad2,
  download: Download,
  'arrow-left': ArrowLeft,
  team: Users,
  x: X,
  'chevron-left': ChevronLeft,
  'chevron-right': ChevronRight,
  'chevron-down': ChevronDown,
  'zoom-in': ZoomIn,
  image: ImageIcon,
} satisfies Record<string, unknown>;

export { iconComponents };
export type IconType = keyof typeof iconComponents;

export const achievementIconKeys = ['trophy', 'medal', 'star', 'award', 'book', 'users'] as const satisfies readonly IconType[];
export type AchievementIconType = typeof achievementIconKeys[number];
