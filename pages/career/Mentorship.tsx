import { motion } from 'framer-motion';
import { Users, Zap, Target, MessageSquare, Star, Award, ChevronRight, Sparkles } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const MentorshipProgram = () => {
  const mentors = [
    {
      id: 1,
      name: 'Rajesh Kumar',
      title: 'Founder & CEO',
      expertise: 'Entrepreneurship',
      batch: '2015',
      bio: 'Built a unicorn startup from scratch. 10+ years of experience in scaling businesses.',
      availability: '2 hours/month',
      students: 5,
      rating: 4.9,
      image: '👨‍💼',
      specialization: ['Startup', 'Product', 'Fundraising'],
    },
    {
      id: 2,
      name: 'Priya Sharma',
      title: 'AI Research Lead',
      expertise: 'Technology & AI',
      batch: '2016',
      bio: 'AI research pioneer. Published 50+ papers in top-tier conferences.',
      availability: '3 hours/week',
      students: 8,
      rating: 4.95,
      image: '👩‍💻',
      specialization: ['AI/ML', 'Research', 'Tech Innovation'],
    },
    {
      id: 3,
      name: 'Amit Patel',
      title: 'VP Engineering',
      expertise: 'Leadership & Management',
      batch: '2014',
      bio: 'VP Engineering at Fortune 500. Expert in team scaling and org strategy.',
      availability: '2 hours/week',
      students: 6,
      rating: 4.85,
      image: '👨‍🔬',
      specialization: ['Leadership', 'Engineering', 'Team Building'],
    },
    {
      id: 4,
      name: 'Neha Gupta',
      title: 'NGO Founder',
      expertise: 'Social Impact',
      batch: '2017',
      bio: 'Social entrepreneur impacting 100k+ lives. Sustainability and social good expert.',
      availability: '4 hours/week',
      students: 10,
      rating: 5.0,
      image: '👩‍🦰',
      specialization: ['Social Impact', 'Sustainability', 'Community'],
    },
    {
      id: 5,
      name: 'Vikram Singh',
      title: 'CIO, Venture Capital',
      expertise: 'Finance & Investing',
      batch: '2013',
      bio: 'Chief Investment Officer managing 500M+ portfolio. Investment strategy expert.',
      availability: '2 hours/week',
      students: 7,
      rating: 4.9,
      image: '👨‍💰',
      specialization: ['Finance', 'Investment', 'Business Strategy'],
    },
    {
      id: 6,
      name: 'Ananya Verma',
      title: 'Marketing Director',
      expertise: 'Brand & Growth',
      batch: '2016',
      bio: 'Growth marketing expert. Scaled 3 companies to unicorn status.',
      availability: '3 hours/week',
      students: 9,
      rating: 4.88,
      image: '👩‍💼',
      specialization: ['Growth', 'Marketing', 'Brand Building'],
    },
  ];

  const steps = [
    {
      number: 1,
      icon: '📝',
      title: 'Create Profile',
      description: 'Share your background, goals, and career aspirations',
    },
    {
      number: 2,
      icon: '🔍',
      title: 'Browse Mentors',
      description: 'Find mentors with expertise matching your interests',
    },
    {
      number: 3,
      icon: '🤝',
      title: 'Send Request',
      description: 'Connect with your ideal mentor and introduce yourself',
    },
    {
      number: 4,
      icon: '📅',
      title: 'Schedule Sessions',
      description: 'Meet regularly to discuss goals and career growth',
    },
  ];

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
        <img src="/icon.jpeg" alt="Logo" className="h-20 w-20 rounded-full shadow-lg border-2 border-indigo-600" />
      </motion.div>

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden px-6 py-12 mb-12"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/10 to-purple-600/10 rounded-3xl"></div>
        <div className="relative container mx-auto max-w-5xl">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 mb-4"
          >
            <Users className="h-8 w-8 text-indigo-600" />
            <span className="text-sm font-semibold text-indigo-600 uppercase tracking-wider">Mentorship</span>
          </motion.div>
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Mentorship Program
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Get guidance from industry leaders and successful alumni to accelerate your career growth
          </p>
        </div>
      </motion.div>

      {/* How It Works Section */}
      <div className="container mx-auto px-6 max-w-6xl mb-16">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-8"
        >
          <h2 className="text-3xl font-bold mb-8 text-center">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {steps.map((step, idx) => (
              <motion.div
                key={step.number}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: idx * 0.1 }}
              >
                <Card className="p-6 text-center border-0 shadow-lg bg-white/50 backdrop-blur-sm h-full hover:shadow-2xl transition-all duration-300">
                  <div className="text-4xl mb-4">{step.icon}</div>
                  <div className="text-lg font-semibold text-indigo-600 mb-2">{step.number}</div>
                  <h3 className="font-bold text-lg mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Featured Mentors Section */}
      <div className="container mx-auto px-6 max-w-6xl">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-8"
        >
          <h2 className="text-3xl font-bold mb-8 text-center">Meet Our Mentors</h2>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {mentors.map((mentor) => (
              <motion.div key={mentor.id} variants={itemVariants}>
                <Card className="overflow-hidden group cursor-pointer border-0 shadow-lg hover:shadow-2xl transition-all duration-300 bg-white/50 backdrop-blur-sm h-full hover:scale-[1.02]">
                  {/* Mentor Header */}
                  <div className="h-24 bg-gradient-to-br from-indigo-400 to-purple-500 relative overflow-hidden flex items-center justify-center">
                    <span className="text-5xl drop-shadow-lg">{mentor.image}</span>
                    <motion.div
                      className="absolute inset-0 bg-black/0 group-hover:bg-black/10"
                      transition={{ duration: 0.3 }}
                    ></motion.div>
                  </div>

                  {/* Mentor Info */}
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-lg font-bold text-foreground group-hover:text-indigo-600 transition-colors">
                          {mentor.name}
                        </h3>
                        <p className="text-sm text-indigo-600 font-semibold">{mentor.title}</p>
                      </div>
                      <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-lg">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs font-bold text-yellow-700">{mentor.rating}</span>
                      </div>
                    </div>

                    <div className="mb-3">
                      <p className="text-xs text-muted-foreground font-semibold mb-2">Batch {mentor.batch} • {mentor.expertise}</p>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                        {mentor.bio}
                      </p>
                    </div>

                    {/* Specialization Tags */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {mentor.specialization.map((spec, idx) => (
                        <span key={idx} className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full font-medium">
                          {spec}
                        </span>
                      ))}
                    </div>

                    {/* Availability & Students */}
                    <div className="text-xs text-muted-foreground mb-4 space-y-1">
                      <div className="flex items-center gap-2">
                        <Target className="h-3 w-3 text-purple-600" />
                        <span>{mentor.availability}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-3 w-3 text-purple-600" />
                        <span>{mentor.students} mentees</span>
                      </div>
                    </div>

                    <motion.div whileHover={{ x: 4 }} whileTap={{ scale: 0.95 }}>
                      <Button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:shadow-lg">
                        Request Mentorship
                        <ChevronRight className="h-4 w-4 ml-2" />
                      </Button>
                    </motion.div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Benefits Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="container mx-auto px-6 max-w-4xl mt-16"
      >
        <Card className="bg-gradient-to-r from-indigo-600/10 to-purple-600/10 border border-indigo-200/30 p-8">
          <div className="flex items-center gap-3 mb-4">
            <Sparkles className="h-6 w-6 text-indigo-600" />
            <h2 className="text-3xl font-bold">Why Join Our Program?</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <Award className="h-8 w-8 text-indigo-600 mb-3" />
              <h3 className="font-bold mb-2">Learn from Leaders</h3>
              <p className="text-sm text-muted-foreground">Get guidance from successful alumni and industry veterans</p>
            </div>
            <div>
              <Target className="h-8 w-8 text-purple-600 mb-3" />
              <h3 className="font-bold mb-2">Career Growth</h3>
              <p className="text-sm text-muted-foreground">Accelerate your career with personalized guidance and insights</p>
            </div>
            <div>
              <Users className="h-8 w-8 text-pink-600 mb-3" />
              <h3 className="font-bold mb-2">Networking</h3>
              <p className="text-sm text-muted-foreground">Build meaningful connections within the alumni community</p>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default MentorshipProgram;
