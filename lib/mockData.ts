export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: 'full-time' | 'part-time' | 'contract' | 'internship';
  domain: string;
  experience: string;
  salary?: string;
  description: string;
  postedBy: string;
  postedById: string;
  postedDate: string;
  status: 'pending' | 'approved' | 'rejected';
  applicants?: number;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  type: 'reunion' | 'webinar' | 'networking' | 'workshop';
  organizer: string;
  organizerId: string;
  maxAttendees?: number;
  currentAttendees: number;
  status: 'pending' | 'approved' | 'rejected';
  image?: string;
}

export interface NewsItem {
  id: string;
  title: string;
  content: string;
  category: 'achievement' | 'announcement' | 'spotlight' | 'general';
  author: string;
  publishedDate: string;
  image?: string;
  featured: boolean;
}

export interface Alumni {
  id: string;
  name: string;
  email: string;
  department: string;
  graduationYear: number;
  currentCompany?: string;
  currentPosition?: string;
  location?: string;
  bio?: string;
  skills?: string[];
  linkedin?: string;
  github?: string;
  twitter?: string;
  status: 'pending' | 'approved' | 'rejected';
}

export const mockJobs: Job[] = [
  {
    id: '1',
    title: 'Senior Software Engineer',
    company: 'Tech Giants Inc.',
    location: 'Bangalore, India',
    type: 'full-time',
    domain: 'Software Development',
    experience: '5+ years',
    salary: '₹20-30 LPA',
    description: 'Looking for an experienced software engineer with strong backend development skills.',
    postedBy: 'Rajesh Kumar',
    postedById: 'alumni-1',
    postedDate: '2025-09-15',
    status: 'approved',
    applicants: 12,
  },
  {
    id: '2',
    title: 'Data Scientist',
    company: 'Analytics Pro',
    location: 'Mumbai, India',
    type: 'full-time',
    domain: 'Data Science',
    experience: '3+ years',
    salary: '₹18-25 LPA',
    description: 'Join our data science team to work on cutting-edge ML projects.',
    postedBy: 'Priya Sharma',
    postedById: 'alumni-2',
    postedDate: '2025-09-20',
    status: 'approved',
    applicants: 8,
  },
  {
    id: '3',
    title: 'Frontend Developer',
    company: 'WebCraft Solutions',
    location: 'Remote',
    type: 'contract',
    domain: 'Web Development',
    experience: '2+ years',
    salary: '₹15-20 LPA',
    description: 'React and TypeScript expert needed for exciting projects.',
    postedBy: 'Arun Patel',
    postedById: 'alumni-3',
    postedDate: '2025-09-25',
    status: 'pending',
    applicants: 5,
  },
];

export const mockEvents: Event[] = [
  {
    id: '1',
    title: 'NEXORA\'25 National Symposium',
    description: 'The flagship national level technical symposium of ACE. Where ideas rise free and the nation stands strong.',
    date: '2025-10-14',
    time: '09:00 AM',
    location: 'ACE Main Block Auditorium',
    type: 'webinar',
    organizer: 'Technical Committee',
    organizerId: 'admin-1',
    maxAttendees: 500,
    currentAttendees: 342,
    status: 'approved',
  },
  {
    id: '2',
    title: 'Biotech Expo 2025',
    description: 'Showcasing sustainable and medical innovations developed by the Biotechnology department.',
    date: '2025-03-20',
    time: '10:00 AM',
    location: 'Bio-Science Block',
    type: 'workshop',
    organizer: 'Dept of Biotech',
    organizerId: 'admin-2',
    currentAttendees: 156,
    status: 'approved',
  },
  {
    id: '3',
    title: '23rd ISTE Tamil Nadu Convention',
    description: 'Annual students convention focusing on engineering development and innovation.',
    date: '2025-02-14',
    time: '09:30 AM',
    location: 'Silver Jubilee Block',
    type: 'reunion',
    organizer: 'ISTE Student Chapter',
    organizerId: 'admin-3',
    maxAttendees: 1000,
    currentAttendees: 850,
    status: 'approved',
  },
];

export const mockNews: NewsItem[] = [
  {
    id: '1',
    title: 'STEM Fest 2025: Igniting Innovation in Hosur!',
    content: 'The highly anticipated STEM Fest 2025 took place on January 24, focusing on innovation and technology for the next generation of engineers.',
    category: 'announcement',
    author: 'Admin',
    publishedDate: '2025-01-24',
    featured: true,
  },
  {
    id: '2',
    title: 'Lekha Sri K Receives ISTE Best Student Award 2024',
    content: 'Recognizing academic excellence and contribution to the student community, Lekha Sri K has been honored with the prestigious Best Student Award.',
    category: 'achievement',
    author: 'Principal Office',
    publishedDate: '2024-12-15',
    featured: true,
  },
  {
    id: '3',
    title: 'New Digital Library Milestone',
    content: 'The ACE Central Digital Library has surpassed 50,000 books and expanded its digital resource center for global access.',
    category: 'announcement',
    author: 'Librarian',
    publishedDate: '2024-11-20',
    featured: false,
  },
];

export const mockAlumni: Alumni[] = [
  {
    id: 'alumni-1',
    name: 'Akshay Shetty',
    email: 'akshay.shetty@zynthora.ai',
    department: 'Electronics & Communication',
    graduationYear: 2021,
    currentCompany: 'Zynthora.ai',
    currentPosition: 'Head of Innovation',
    location: 'Bangalore, India',
    bio: 'Proud ACE ECE Alumnus (2021 Batch). Currently leading innovation in AI and machine learning.',
    skills: ['AI', 'Innovation', 'Strategic Leadership', 'ECE'],
    linkedin: 'linkedin.com/in/akshayshetty',
    status: 'approved',
  },
  {
    id: 'alumni-2',
    name: 'Dr. G. Ranganath',
    email: 'principal@adhiyamaan.ac.in',
    department: 'Mechanical Engineering',
    graduationYear: 1995,
    currentCompany: 'ACE Hosur',
    currentPosition: 'Principal & HOD',
    location: 'Hosur, India',
    bio: 'Dedicated to empowering students to become global engineering leaders.',
    skills: ['Institutional Leadership', 'Mechanical Engineering', 'Education'],
    linkedin: 'linkedin.com/in/ranganath-g',
    status: 'approved',
  },
  {
    id: 'alumni-3',
    name: 'Dr. D. Thilagavathy',
    email: 'cse.hod@adhiyamaan.ac.in',
    department: 'Computer Science & Engineering',
    graduationYear: 2000,
    currentCompany: 'ACE Hosur',
    currentPosition: 'Professor & HOD',
    location: 'Hosur, India',
    bio: 'Leading the CSE department with a focus on cutting-edge research.',
    skills: ['Computer Science', 'Academic Management', 'Research'],
    status: 'approved',
  },
  {
    id: 'alumni-4',
    name: 'Lekha Sri K',
    email: 'lekhasri.k@email.com',
    department: 'Biotechnology',
    graduationYear: 2024,
    currentCompany: 'Research Scholar',
    currentPosition: 'Graduate Trainee',
    location: 'Chennai, India',
    bio: 'ISTE Best Student Award 2024 Recipient. Passionate about medical innovations.',
    skills: ['Biotechnology', 'Research', 'Medical Innovation'],
    status: 'approved',
  },
];
