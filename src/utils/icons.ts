import {
  Mail,
  Book,
  Users,
  Play,
  ExternalLink,
  Briefcase,
  GraduationCap,
  Download,
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
  book: Book,
  users: Users,
  play: Play,
  external: ExternalLink,
  briefcase: Briefcase,
  graduation: GraduationCap,
  download: Download,
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
