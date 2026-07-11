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
  MapPin,
  Award,
} from 'lucide-svelte';
import GithubIcon from '../components/icons/GithubIcon.svelte';
import LinkedinIcon from '../components/icons/LinkedinIcon.svelte';
import ItchIcon from '../components/icons/ItchIcon.svelte';
import UnityIcon from '../components/icons/UnityIcon.svelte';
import UnrealIcon from '../components/icons/UnrealIcon.svelte';

const iconComponents = {
  email: Mail,
  github: GithubIcon,
  linkedin: LinkedinIcon,
  itch: ItchIcon,
  unity: UnityIcon,
  unreal: UnrealIcon,
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
  location: MapPin,
  award: Award,
} satisfies Record<string, unknown>;

export { iconComponents };
export type IconType = keyof typeof iconComponents;
