import { motion } from 'framer-motion';
import { Briefcase, MapPin, DollarSign, Clock, Users, Search, Filter, ChevronRight, Zap } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const CareerJobs = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const jobs = [
    {
      id: 1,
      title: 'Senior Software Engineer',
      company: 'TechVenture Inc',
      location: 'San Francisco, CA',
      salary: '$150K - $180K',
      type: 'Full-time',
      category: 'engineering',
      description: 'Lead development of next-gen cloud infrastructure with our innovative team',
      skills: ['React', 'Node.js', 'AWS', 'TypeScript'],
      postedDays: 2,
      image: '💻',
    },
    {
      id: 2,
      title: 'Product Manager',
      company: 'Global Tech Corp',
      location: 'New York, NY',
      salary: '$120K - $150K',
      type: 'Full-time',
      category: 'management',
      description: 'Shape the future of AI-powered products for millions of users',
      skills: ['Product Strategy', 'Analytics', 'Leadership', 'Communication'],
      postedDays: 5,
      image: '📊',
    },
    {
      id: 3,
      title: 'Data Scientist',
      company: 'AI Innovations Ltd',
      location: 'Boston, MA',
      salary: '$140K - $170K',
      type: 'Full-time',
      category: 'engineering',
      description: 'Drive machine learning initiatives and build predictive models',
      skills: ['Python', 'TensorFlow', 'SQL', 'Statistics'],
      postedDays: 1,
      image: '🤖',
    },
    {
      id: 4,
      title: 'Business Development Manager',
      company: 'Growth Ventures',
      location: 'Chicago, IL',
      salary: '$100K - $130K',
      type: 'Full-time',
      category: 'sales',
      description: 'Expand market reach and build strategic partnerships',
      skills: ['Sales', 'Negotiation', 'Business Strategy', 'Networking'],
      postedDays: 3,
      image: '🤝',
    },
    {
      id: 5,
      title: 'UX/UI Designer',
      company: 'Creative Studio',
      location: 'Los Angeles, CA',
      salary: '$90K - $120K',
      type: 'Full-time',
      category: 'design',
      description: 'Design beautiful and intuitive user experiences for cutting-edge apps',
      skills: ['Figma', 'UI Design', 'User Research', 'Prototyping'],
      postedDays: 7,
      image: '🎨',
    },
    {
      id: 6,
      title: 'Solutions Architect',
      company: 'Enterprise Solutions',
      location: 'Remote',
      salary: '$130K - $160K',
      type: 'Full-time',
      category: 'management',
      description: 'Design scalable enterprise solutions for Fortune 500 companies',
      skills: ['Cloud Architecture', 'Java', 'AWS', 'Microservices'],
      postedDays: 4,
      image: '🏗️',
    },
  ];

  const categories = [
    { id: 'all', label: 'All Jobs', count: jobs.length },
    { id: 'engineering', label: 'Engineering', count: jobs.filter(j => j.category === 'engineering').length },
    { id: 'management', label: 'Management', count: jobs.filter(j => j.category === 'management').length },
    { id: 'design', label: 'Design', count: jobs.filter(j => j.category === 'design').length },
    { id: 'sales', label: 'Sales & BD', count: jobs.filter(j => j.category === 'sales').length },
  ];

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || job.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
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
        <img src="/icon.jpeg" alt="Logo" className="h-20 w-20 rounded-full shadow-lg border-2 border-blue-600" />
      </motion.div>

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden px-6 py-12 mb-12"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-cyan-600/10 rounded-3xl"></div>
        <div className="relative container mx-auto max-w-5xl">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 mb-4"
          >
            <Briefcase className="h-8 w-8 text-blue-600" />
            <span className="text-sm font-semibold text-blue-600 uppercase tracking-wider">Opportunities</span>
          </motion.div>
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
            Career Opportunities
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Discover exciting job opportunities with leading companies hiring from our alumni network
          </p>
        </div>
      </motion.div>

      {/* Search & Filter Section */}
      <div className="container mx-auto px-6 max-w-6xl mb-12">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search jobs by title or company..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-12 text-base border-blue-200/50 bg-white/50 backdrop-blur-sm"
            />
          </div>

          {/* Category Tabs */}
          <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
            <TabsList className="grid w-full grid-cols-5 bg-white/30 backdrop-blur-sm border border-white/20">
              {categories.map((cat) => (
                <TabsTrigger key={cat.id} value={cat.id} className="text-xs sm:text-sm">
                  <span className="hidden sm:inline">{cat.label}</span>
                  <span className="sm:hidden">{cat.label.split(' ')[0]}</span>
                  <span className="ml-1 text-xs font-bold">({cat.count})</span>
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </motion.div>
      </div>

      {/* Jobs List */}
      <div className="container mx-auto px-6 max-w-6xl">
        {filteredJobs.length > 0 ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-4"
          >
            {filteredJobs.map((job) => (
              <motion.div key={job.id} variants={itemVariants}>
                <Card className="overflow-hidden group cursor-pointer border-0 shadow-lg hover:shadow-2xl transition-all duration-300 bg-white/50 backdrop-blur-sm hover:scale-[1.02]">
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start gap-4">
                        <div className="h-16 w-16 rounded-lg bg-gradient-to-br from-blue-400 to-cyan-500 flex items-center justify-center text-3xl shadow-md">
                          {job.image}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-foreground group-hover:text-blue-600 transition-colors mb-1">
                            {job.title}
                          </h3>
                          <p className="text-sm font-semibold text-blue-600 mb-2">{job.company}</p>
                          <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <MapPin className="h-4 w-4" />
                              {job.location}
                            </div>
                            <div className="flex items-center gap-1">
                              <DollarSign className="h-4 w-4" />
                              {job.salary}
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              {job.postedDays}d ago
                            </div>
                          </div>
                        </div>
                      </div>
                      <motion.div whileHover={{ scale: 1.1 }}>
                        <span className="inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold">
                          {job.type}
                        </span>
                      </motion.div>
                    </div>

                    <p className="text-sm text-muted-foreground mb-4">
                      {job.description}
                    </p>

                    {/* Skills Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {job.skills.map((skill, idx) => (
                        <motion.span
                          key={idx}
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ delay: idx * 0.05 }}
                          className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-medium border border-blue-200"
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </div>

                    <motion.div whileHover={{ x: 4 }} whileTap={{ scale: 0.95 }}>
                      <Button className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:shadow-lg">
                        Apply Now
                        <ChevronRight className="h-4 w-4 ml-2" />
                      </Button>
                    </motion.div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <Zap className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
            <p className="text-lg text-muted-foreground">No jobs found matching your criteria</p>
          </motion.div>
        )}
      </div>

      {/* Bottom CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="container mx-auto px-6 max-w-4xl mt-16 text-center"
      >
        <Card className="bg-gradient-to-r from-blue-600/10 to-cyan-600/10 border border-blue-200/30 p-8">
          <h2 className="text-3xl font-bold mb-3">Post Your Job</h2>
          <p className="text-muted-foreground mb-6">
            Are you hiring? Connect with top talent from our alumni network
          </p>
          <Button className="bg-gradient-to-r from-blue-600 to-cyan-600">
            Post a Job Opening
          </Button>
        </Card>
      </motion.div>
    </div>
  );
};

export default CareerJobs;
