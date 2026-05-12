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
} satisfies Record<string, unknown>;

export { iconComponents };
export type IconType = keyof typeof iconComponents;
