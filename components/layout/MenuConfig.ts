import { 
  FileText,
  Users,
  Calendar,
  GraduationCap,
  Briefcase,
  LayoutDashboard,
} from 'lucide-react';

export const mainMenuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
];

export const moduleMenuItems = [
  {
    id: 'about',
    label: 'About',
    icon: FileText,
    submodules: [
      { id: 'mission', label: 'Mission', path: '/about/mission' },
      { id: 'terms', label: 'Terms', path: '/about/terms' },
    ],
  },
  {
    id: 'network',
    label: 'Network',
    icon: Users,
    submodules: [
      { id: 'directory', label: 'Directory', path: '/network/directory' },
      { id: 'reunions', label: 'Reunions', path: '/network/reunions' },
    ],
  },
  {
    id: 'events',
    label: 'Events',
    icon: Calendar,
    submodules: [
      { id: 'upcoming', label: 'Upcoming Events', path: '/events/upcoming' },
      { id: 'photos', label: 'Photos', path: '/events/gallery/photos', addPath: '/events/gallery/photos/add', icon: '/icons/photo.svg' },
      { id: 'videos', label: 'Videos', path: '/events/gallery/videos', addPath: '/events/gallery/videos/add', icon: '/icons/video.svg' },
      { id: 'awards', label: 'Awards', path: '/events/awards' },
    ],
  },
  {
    id: 'achievements',
    label: 'Achievements',
    icon: GraduationCap,
    submodules: [
      { id: 'notable-alumni', label: 'Notable Alumni', path: '/achievements/alumni' },
      { id: 'awards', label: 'Awards', path: '/achievements/awards' },
    ],
  },
  {
    id: 'contribute',
    label: 'Contribute',
    icon: FileText,
    submodules: [
      { id: 'donate', label: 'Donate', path: '/contribute/donate' },
      { id: 'volunteer', label: 'Volunteer', path: '/contribute/volunteer' },
    ],
  },
  {
    id: 'career',
    label: 'Career',
    icon: Briefcase,
    submodules: [
      { id: 'jobs', label: 'Jobs', path: '/career/jobs' },
      { id: 'mentorship', label: 'Mentorship', path: '/career/mentorship' },
    ],
  },
  {
    id: 'contact',
    label: 'Contact',
    icon: FileText,
    submodules: [
      { id: 'info', label: 'Contact Info', path: '/contact/info' },
      { id: 'feedback', label: 'Feedback', path: '/contact/feedback' },
    ],
  },
];
