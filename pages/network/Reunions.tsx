import { motion } from 'framer-motion';
import { Handshake, MapPin, Calendar, Users, Clock, Zap, MapPin as LocationIcon, Star, Sparkles, ChevronRight } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Reunions = () => {
  const upcomingReunions = [
    {
      year: '2024',
      batch: 'Batch 2024',
      date: 'February 15-17, 2026',
      location: 'Mumbai, India',
      attendees: 520,
      registrations: 340,
      featured: true,
      description: 'Annual grand reunion celebration with networking, awards, and cultural programs.',
      image: '🎉',
      highlights: ['Networking Cocktail', 'Awards Ceremony', 'Cultural Program', 'Sports'],
      speakers: ['Rajesh Kumar', 'Priya Sharma'],
    },
    {
      year: '2022',
      batch: 'Batch 2022',
      date: 'March 15-17, 2026',
      location: 'Bangalore, India',
      attendees: 480,
      registrations: 290,
      featured: false,
      description: 'Career summit with industry leaders and skill development workshops.',
      image: '💼',
      highlights: ['Career Talks', 'Workshops', 'Networking', 'Mentorship'],
      speakers: ['Amit Patel', 'Vikram Singh'],
    },
    {
      year: '2020',
      batch: 'Batch 2020',
      date: 'April 22-24, 2026',
      location: 'Delhi, India',
      attendees: 450,
      registrations: 250,
      featured: false,
      description: 'Alumni meet focused on mentorship and career guidance.',
      image: '🚀',
      highlights: ['Mentorship', 'Career Fair', 'Networking', 'Success Stories'],
      speakers: ['Neha Gupta', 'Ananya Verma'],
    },
    {
      year: '2018',
      batch: 'Batch 2018',
      date: 'May 10-12, 2026',
      location: 'Hyderabad, India',
      attendees: 420,
      registrations: 220,
      featured: false,
      description: 'Entrepreneurship summit for aspiring startup founders.',
      image: '🎯',
      highlights: ['Startup Pitches', 'Investor Meet', 'Workshops', 'Networking'],
      speakers: ['Karthik Reddy', 'Sneha Desai'],
    },
  ];

  const pastEvents = [
    { year: '2025', location: 'Chennai', attendees: 410, highlight: 'Digital Transformation Talk' },
    { year: '2024', location: 'Pune', attendees: 395, highlight: 'Innovation Summit' },
    { year: '2023', location: 'Kolkata', attendees: 380, highlight: 'Leadership Conference' },
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
        <img src="/icon.jpeg" alt="Logo" className="h-20 w-20 rounded-full shadow-lg border-2 border-orange-600" />
      </motion.div>

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden px-6 py-12 mb-12"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-orange-600/10 to-rose-600/10 rounded-3xl"></div>
        <div className="relative container mx-auto max-w-5xl">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 mb-4"
          >
            <Handshake className="h-8 w-8 text-orange-600" />
            <span className="text-sm font-semibold text-orange-600 uppercase tracking-wider">Alumni Reunions</span>
          </motion.div>
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-orange-600 to-rose-600 bg-clip-text text-transparent">
            Alumni Reunions
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Connect, celebrate, and network with fellow alumni at our spectacular reunion events
          </p>
        </div>
      </motion.div>

      {/* Featured Reunion */}
      {upcomingReunions[0] && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="container mx-auto px-6 max-w-6xl mb-12"
        >
          <Card className="border-0 shadow-2xl bg-gradient-to-r from-orange-500/10 to-rose-500/10 overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
              {/* Content */}
              <div>
                <div className="inline-block px-4 py-2 bg-gradient-to-r from-orange-600 to-rose-600 text-white font-bold rounded-lg mb-4">
                  ⭐ Featured Event
                </div>
                <h2 className="text-3xl font-bold mb-3">{upcomingReunions[0].batch} Reunion</h2>
                <p className="text-muted-foreground mb-6">{upcomingReunions[0].description}</p>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 text-foreground">
                    <Calendar className="h-5 w-5 text-orange-600" />
                    <span>{upcomingReunions[0].date}</span>
                  </div>
                  <div className="flex items-center gap-3 text-foreground">
                    <LocationIcon className="h-5 w-5 text-rose-600" />
                    <span>{upcomingReunions[0].location}</span>
                  </div>
                  <div className="flex items-center gap-3 text-foreground">
                    <Users className="h-5 w-5 text-orange-600" />
                    <span>{upcomingReunions[0].registrations} Registered • {upcomingReunions[0].attendees} Expected</span>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold mb-2">Event Highlights:</h4>
                  <div className="flex flex-wrap gap-2">
                    {upcomingReunions[0].highlights.map((h, idx) => (
                      <span key={idx} className="text-xs bg-orange-100 text-orange-700 px-3 py-1 rounded-full">
                        {h}
                      </span>
                    ))}
                  </div>
                </div>

                <motion.div whileHover={{ x: 4 }} whileTap={{ scale: 0.95 }}>
                  <Button className="bg-gradient-to-r from-orange-600 to-rose-600 hover:shadow-lg">
                    Register Now
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </Button>
                </motion.div>
              </div>

              {/* Stats */}
              <div className="flex flex-col justify-center">
                <div className="text-5xl font-bold mb-8">{upcomingReunions[0].image}</div>
                <div className="grid grid-cols-2 gap-4">
                  <Card className="p-6 bg-white/50 backdrop-blur-sm border-0">
                    <div className="text-3xl font-bold text-orange-600">{upcomingReunions[0].registrations}</div>
                    <div className="text-sm text-muted-foreground">Registrations</div>
                  </Card>
                  <Card className="p-6 bg-white/50 backdrop-blur-sm border-0">
                    <div className="text-3xl font-bold text-rose-600">{upcomingReunions[0].attendees}</div>
                    <div className="text-sm text-muted-foreground">Expected</div>
                  </Card>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      )}

      {/* Upcoming Reunions */}
      <div className="container mx-auto px-6 max-w-6xl mb-12">
        <h2 className="text-3xl font-bold mb-8">Upcoming Reunions</h2>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {upcomingReunions.slice(1).map((reunion) => (
            <motion.div key={reunion.year} variants={itemVariants}>
              <Card className="overflow-hidden group cursor-pointer border-0 shadow-lg hover:shadow-2xl transition-all duration-300 bg-white/50 backdrop-blur-sm h-full hover:scale-[1.02]">
                {/* Header */}
                <div className="h-16 bg-gradient-to-r from-orange-400 to-rose-500 flex items-center justify-between px-6">
                  <span className="text-2xl">{reunion.image}</span>
                  <span className="text-white font-bold text-sm">{reunion.batch}</span>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-lg font-bold text-foreground mb-3">{reunion.batch} Reunion</h3>
                  <p className="text-sm text-muted-foreground mb-4">{reunion.description}</p>

                  <div className="space-y-2 mb-4 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="h-4 w-4 text-orange-600" />
                      <span>{reunion.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="h-4 w-4 text-rose-600" />
                      <span>{reunion.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Users className="h-4 w-4 text-orange-600" />
                      <span>{reunion.registrations} Registered</span>
                    </div>
                  </div>

                  <div className="mb-4 p-3 bg-orange-50 rounded-lg">
                    <h4 className="text-xs font-semibold text-orange-700 mb-2">Highlights:</h4>
                    <div className="flex flex-wrap gap-1">
                      {reunion.highlights.map((h, idx) => (
                        <span key={idx} className="text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded">
                          {h}
                        </span>
                      ))}
                    </div>
                  </div>

                  <motion.div whileHover={{ x: 4 }} whileTap={{ scale: 0.95 }}>
                    <Button className="w-full bg-gradient-to-r from-orange-600 to-rose-600 hover:shadow-lg">
                      Learn More
                      <ChevronRight className="h-4 w-4 ml-2" />
                    </Button>
                  </motion.div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Past Events */}
      <div className="container mx-auto px-6 max-w-6xl mb-12">
        <h2 className="text-3xl font-bold mb-8">Past Events</h2>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {pastEvents.map((event, idx) => (
            <motion.div key={idx} variants={itemVariants}>
              <Card className="p-6 border-0 shadow-lg hover:shadow-xl transition-all bg-white/50 backdrop-blur-sm">
                <div className="text-3xl font-bold text-orange-600 mb-3">{event.year}</div>
                <h3 className="font-bold text-lg mb-2">{event.location} Reunion</h3>
                <p className="text-sm text-muted-foreground mb-3">{event.highlight}</p>
                <div className="flex items-center gap-2 text-sm text-foreground">
                  <Users className="h-4 w-4 text-orange-600" />
                  <span>{event.attendees} Alumni Attended</span>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Benefits Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="container mx-auto px-6 max-w-4xl"
      >
        <Card className="bg-gradient-to-r from-orange-600/10 to-rose-600/10 border border-orange-200/30 p-8">
          <div className="flex items-center gap-3 mb-4">
            <Sparkles className="h-6 w-6 text-orange-600" />
            <h2 className="text-3xl font-bold">Why Attend?</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <Clock className="h-8 w-8 text-orange-600 mb-3" />
              <h3 className="font-bold mb-2">Reconnect & Celebrate</h3>
              <p className="text-sm text-muted-foreground">Celebrate achievements and relive cherished memories with classmates</p>
            </div>
            <div>
              <Users className="h-8 w-8 text-rose-600 mb-3" />
              <h3 className="font-bold mb-2">Networking Opportunities</h3>
              <p className="text-sm text-muted-foreground">Build meaningful connections with successful alumni across industries</p>
            </div>
            <div>
              <Zap className="h-8 w-8 text-orange-600 mb-3" />
              <h3 className="font-bold mb-2">Career Growth</h3>
              <p className="text-sm text-muted-foreground">Explore opportunities and find mentorship from industry leaders</p>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default Reunions;
