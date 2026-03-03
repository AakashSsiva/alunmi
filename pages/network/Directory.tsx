import { motion } from 'framer-motion';
import { Users, Search, Filter, MapPin, Briefcase, GraduationCap, ExternalLink, Sparkles, ChevronRight } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useState, useMemo } from 'react';

const DirectoryPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedYear, setSelectedYear] = useState('all');

  const alumni = [
    {
      id: 1,
      name: 'Rajesh Kumar',
      title: 'Founder & CEO',
      department: 'Computer Science',
      graduationYear: 2015,
      company: 'TechVenture Inc',
      location: 'San Francisco, CA',
      bio: 'Built a unicorn startup from scratch. 10+ years of experience.',
      image: '👨‍💼',
      connections: 245,
      rating: 4.9,
      skills: ['Entrepreneurship', 'Product', 'Fundraising'],
      linkedin: 'linkedin.com',
    },
    {
      id: 2,
      name: 'Priya Sharma',
      title: 'AI Research Lead',
      department: 'Electronics',
      graduationYear: 2016,
      company: 'Google AI Research',
      location: 'Mountain View, CA',
      bio: 'AI research pioneer. Published 50+ papers in top conferences.',
      image: '👩‍💻',
      connections: 189,
      rating: 4.95,
      skills: ['AI/ML', 'Research', 'Innovation'],
      linkedin: 'linkedin.com',
    },
    {
      id: 3,
      name: 'Amit Patel',
      title: 'VP Engineering',
      department: 'Mechanical Engineering',
      graduationYear: 2014,
      company: 'Microsoft',
      location: 'Seattle, WA',
      bio: 'VP Engineering at Fortune 500. Expert in team scaling.',
      image: '👨‍🔬',
      connections: 312,
      rating: 4.85,
      skills: ['Leadership', 'Engineering', 'Management'],
      linkedin: 'linkedin.com',
    },
    {
      id: 4,
      name: 'Neha Gupta',
      title: 'Founder, NGO',
      department: 'Humanities',
      graduationYear: 2017,
      company: 'Impact Foundation',
      location: 'New Delhi, India',
      bio: 'Social entrepreneur impacting 100k+ lives.',
      image: '👩‍🦰',
      connections: 198,
      rating: 5.0,
      skills: ['Social Impact', 'Community', 'Sustainability'],
      linkedin: 'linkedin.com',
    },
    {
      id: 5,
      name: 'Vikram Singh',
      title: 'CIO, Venture Capital',
      department: 'Finance',
      graduationYear: 2013,
      company: 'Capital Partners',
      location: 'Mumbai, India',
      bio: 'Chief Investment Officer managing 500M+ portfolio.',
      image: '👨‍💰',
      connections: 276,
      rating: 4.9,
      skills: ['Finance', 'Investment', 'Strategy'],
      linkedin: 'linkedin.com',
    },
    {
      id: 6,
      name: 'Ananya Verma',
      title: 'Growth Director',
      department: 'Business',
      graduationYear: 2016,
      company: 'Growth Ventures',
      location: 'Bangalore, India',
      bio: 'Growth marketing expert. Scaled 3 companies to unicorn status.',
      image: '👩‍💼',
      connections: 223,
      rating: 4.88,
      skills: ['Growth', 'Marketing', 'Leadership'],
      linkedin: 'linkedin.com',
    },
    {
      id: 7,
      name: 'Karthik Reddy',
      title: 'Product Manager',
      department: 'Computer Science',
      graduationYear: 2017,
      company: 'Amazon',
      location: 'Seattle, WA',
      bio: 'Building next-generation cloud products.',
      image: '👨‍💻',
      connections: 156,
      rating: 4.75,
      skills: ['Product', 'Analytics', 'Strategy'],
      linkedin: 'linkedin.com',
    },
    {
      id: 8,
      name: 'Sneha Desai',
      title: 'Senior Designer',
      department: 'Design',
      graduationYear: 2018,
      company: 'Apple Design',
      location: 'Cupertino, CA',
      bio: 'Designing interfaces for millions of users.',
      image: '👩‍🎨',
      connections: 142,
      rating: 4.92,
      skills: ['UX/UI', 'Design', 'Innovation'],
      linkedin: 'linkedin.com',
    },
    {
      id: 9,
      name: 'Rohan Gupta',
      title: 'Investment Banker',
      department: 'Finance',
      graduationYear: 2015,
      company: 'Goldman Sachs',
      location: 'New York, NY',
      bio: 'Advising Fortune 500 on strategic acquisitions.',
      image: '👨‍💼',
      connections: 198,
      rating: 4.8,
      skills: ['Finance', 'M&A', 'Strategy'],
      linkedin: 'linkedin.com',
    },
  ];

  const departments = ['all', ...new Set(alumni.map(a => a.department))];
  const years = (['all'] as const as any[]).concat([...new Set(alumni.map(a => a.graduationYear))].sort((a, b) => b - a));

  const filteredAlumni = useMemo(() => {
    return alumni.filter(person => {
      const matchesSearch = person.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        person.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        person.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesDept = selectedDepartment === 'all' || person.department === selectedDepartment;
      const matchesYear = selectedYear === 'all' || person.graduationYear === parseInt(selectedYear);
      return matchesSearch && matchesDept && matchesYear;
    });
  }, [searchQuery, selectedDepartment, selectedYear]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted pt-20 pb-12">
      {/* Logo Section */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
        className="flex justify-center mb-8"
      >
        <img src="/icon.jpeg" alt="Logo" className="h-20 w-20 rounded-full shadow-lg border-2 border-emerald-600" />
      </motion.div>

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden px-6 py-12 mb-12"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/10 to-teal-600/10 rounded-3xl"></div>
        <div className="relative container mx-auto max-w-5xl">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 mb-4"
          >
            <Users className="h-8 w-8 text-emerald-600" />
            <span className="text-sm font-semibold text-emerald-600 uppercase tracking-wider">Alumni Network</span>
          </motion.div>
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
            Alumni Directory
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Connect with {alumni.length}+ accomplished alumni across industries and locations worldwide
          </p>
        </div>
      </motion.div>

      {/* Search & Filter Section */}
      <div className="container mx-auto px-6 max-w-6xl mb-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="border-0 shadow-lg bg-white/50 backdrop-blur-sm p-6">
            {/* Search Bar */}
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-4 top-3.5 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Search by name, company, or role..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 py-2 h-11 border-emerald-200/30 bg-white/50 focus:border-emerald-400"
                />
              </div>
            </div>

            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-semibold text-foreground mb-2 block">Department</label>
                <div className="flex flex-wrap gap-2">
                  {departments.map((dept) => (
                    <button
                      key={dept}
                      onClick={() => setSelectedDepartment(dept)}
                      className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                        selectedDepartment === dept
                          ? 'bg-emerald-600 text-white shadow-lg'
                          : 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
                      }`}
                    >
                      {dept === 'all' ? 'All' : dept}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-semibold text-foreground mb-2 block">Graduation Year</label>
                <div className="flex flex-wrap gap-2">
                  {years.map((year) => (
                    <button
                      key={year}
                      onClick={() => setSelectedYear(String(year))}
                      className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                        selectedYear === String(year)
                          ? 'bg-teal-600 text-white shadow-lg'
                          : 'bg-teal-100 text-teal-700 hover:bg-teal-200'
                      }`}
                    >
                      {year === 'all' ? 'All' : year}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-4 text-sm text-muted-foreground">
              Found <span className="font-semibold text-foreground">{filteredAlumni.length}</span> alumni
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Alumni Grid */}
      <div className="container mx-auto px-6 max-w-6xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredAlumni.map((person) => (
            <motion.div key={person.id} variants={itemVariants}>
              <Card className="overflow-hidden group cursor-pointer border-0 shadow-lg hover:shadow-2xl transition-all duration-300 bg-white/50 backdrop-blur-sm h-full hover:scale-[1.02]">
                {/* Header Gradient */}
                <div className="h-20 bg-gradient-to-br from-emerald-400 to-teal-500 relative overflow-hidden flex items-center justify-center">
                  <span className="text-4xl drop-shadow-lg">{person.image}</span>
                  <motion.div
                    className="absolute inset-0 bg-black/0 group-hover:bg-black/10"
                    transition={{ duration: 0.3 }}
                  ></motion.div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Name & Title */}
                  <h3 className="text-lg font-bold text-foreground group-hover:text-emerald-600 transition-colors mb-1">
                    {person.name}
                  </h3>
                  <p className="text-sm text-emerald-600 font-semibold mb-3">{person.title}</p>

                  {/* Company & Location */}
                  <div className="space-y-2 mb-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Briefcase className="h-4 w-4 text-emerald-600" />
                      <span className="line-clamp-1">{person.company}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-teal-600" />
                      <span>{person.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <GraduationCap className="h-4 w-4 text-purple-600" />
                      <span>Batch {person.graduationYear}</span>
                    </div>
                  </div>

                  {/* Department */}
                  <div className="mb-3">
                    <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full font-medium">
                      {person.department}
                    </span>
                  </div>

                  {/* Skills Tags */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {person.skills.map((skill, idx) => (
                      <span key={idx} className="text-xs bg-teal-100 text-teal-700 px-2 py-0.5 rounded-full">
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* Connection Stats */}
                  <div className="flex items-center justify-between mb-4 p-2 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg">
                    <div className="text-center flex-1">
                      <div className="text-lg font-bold text-emerald-600">{person.connections}</div>
                      <div className="text-xs text-muted-foreground">Connections</div>
                    </div>
                    <div className="w-px h-8 bg-emerald-200"></div>
                    <div className="text-center flex-1">
                      <div className="flex items-center justify-center gap-1">
                        <span className="text-lg font-bold text-amber-600">{person.rating}</span>
                        <span className="text-yellow-400">★</span>
                      </div>
                      <div className="text-xs text-muted-foreground">Rating</div>
                    </div>
                  </div>

                  <motion.div whileHover={{ x: 4 }} whileTap={{ scale: 0.95 }}>
                    <Button className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:shadow-lg">
                      Connect
                      <ChevronRight className="h-4 w-4 ml-2" />
                    </Button>
                  </motion.div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {filteredAlumni.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-30" />
            <p className="text-muted-foreground">No alumni found matching your search criteria</p>
          </motion.div>
        )}
      </div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="container mx-auto px-6 max-w-4xl mt-16"
      >
        <Card className="bg-gradient-to-r from-emerald-600/10 to-teal-600/10 border border-emerald-200/30 p-8">
          <div className="flex items-center gap-3 mb-4">
            <Sparkles className="h-6 w-6 text-emerald-600" />
            <h2 className="text-3xl font-bold">Expand Your Network</h2>
          </div>
          <p className="text-muted-foreground mb-4">
            Connect with alumni, find mentors, explore career opportunities, and grow your professional network.
          </p>
          <Button className="bg-gradient-to-r from-emerald-600 to-teal-600">
            Browse Full Directory
          </Button>
        </Card>
      </motion.div>
    </div>
  );
};

export default DirectoryPage;
