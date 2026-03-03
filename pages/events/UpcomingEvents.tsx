import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Users, ChevronRight, Sparkles } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const UpcomingEvents = () => {
  const events = [
    {
      id: 1,
      title: 'Annual Alumni Summit 2026',
      date: 'March 15-17, 2026',
      time: '9:00 AM - 6:00 PM',
      location: 'Convention Center, Mumbai',
      attendees: '500+',
      description: 'Connect with fellow alumni, network, and celebrate achievements',
      color: 'from-blue-500 to-cyan-500',
      image: '🎓',
    },
    {
      id: 2,
      title: 'Tech Talk Series: AI & Future',
      date: 'March 22, 2026',
      time: '2:00 PM - 4:00 PM',
      location: 'Virtual + Offline',
      attendees: '300+',
      description: 'Industry experts discussing AI trends and career opportunities',
      color: 'from-purple-500 to-pink-500',
      image: '💻',
    },
    {
      id: 3,
      title: 'Startup Pitch Competition',
      date: 'April 5, 2026',
      time: '10:00 AM - 5:00 PM',
      location: 'Innovation Hub, Bangalore',
      attendees: '100+',
      description: 'Alumni entrepreneurs pitch ideas for investment opportunities',
      color: 'from-orange-500 to-red-500',
      image: '🚀',
    },
    {
      id: 4,
      title: 'Career Fair 2026',
      date: 'April 18-19, 2026',
      time: '10:00 AM - 6:00 PM',
      location: 'Campus Grounds',
      attendees: '1000+',
      description: 'Meet top recruiters and explore exciting career opportunities',
      color: 'from-green-500 to-emerald-500',
      image: '💼',
    },
    {
      id: 5,
      title: 'Sports & Recreation Meet',
      date: 'May 10, 2026',
      time: '8:00 AM - 4:00 PM',
      location: 'Sports Complex',
      attendees: '200+',
      description: 'Athletic competitions and fun activities for all alumni',
      color: 'from-yellow-500 to-orange-500',
      image: '⚽',
    },
    {
      id: 6,
      title: 'Cultural Night Gala',
      date: 'May 25, 2026',
      time: '6:00 PM - 11:00 PM',
      location: 'Grand Ballroom, Delhi',
      attendees: '600+',
      description: 'Celebrate our diverse culture with performances and celebrations',
      color: 'from-indigo-500 to-purple-500',
      image: '🎭',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
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
        <img src="/icon.jpeg" alt="Logo" className="h-20 w-20 rounded-full shadow-lg border-2 border-cyan-600" />
      </motion.div>

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden px-6 py-12 mb-12"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-3xl"></div>
        <div className="relative container mx-auto max-w-5xl">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 mb-4"
          >
            <Sparkles className="h-8 w-8 text-blue-600" />
            <span className="text-sm font-semibold text-blue-600 uppercase tracking-wider">Upcoming Events</span>
          </motion.div>
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Join Us for Amazing Events
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Connect, celebrate, and grow with the alumni community through unforgettable experiences
          </p>
        </div>
      </motion.div>

      {/* Events Grid */}
      <div className="container mx-auto px-6 max-w-6xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {events.map((event) => (
            <motion.div
              key={event.id}
              variants={itemVariants}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
            >
              <Card className="overflow-hidden group cursor-pointer h-full border-0 shadow-lg hover:shadow-2xl transition-all duration-300 bg-white/50 backdrop-blur-sm">
                {/* Event Header with Gradient */}
                <div className={`h-32 bg-gradient-to-br ${event.color} relative overflow-hidden`}>
                  <div className="absolute inset-0 opacity-20 bg-pattern"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-6xl drop-shadow-lg">{event.image}</span>
                  </div>
                  <motion.div
                    className="absolute inset-0 bg-black/0 group-hover:bg-black/10"
                    transition={{ duration: 0.3 }}
                  ></motion.div>
                </div>

                {/* Event Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-blue-600 transition-colors">
                    {event.title}
                  </h3>

                  {/* Event Details */}
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4 text-blue-600" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4 text-purple-600" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4 text-red-600" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Users className="h-4 w-4 text-green-600" />
                      <span>{event.attendees} expected</span>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {event.description}
                  </p>

                  {/* CTA Button */}
                  <motion.div
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-lg">
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

      {/* Bottom CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="container mx-auto px-6 max-w-4xl mt-16 text-center"
      >
        <Card className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 border border-blue-200/30 p-8">
          <h2 className="text-3xl font-bold mb-3">Stay Updated</h2>
          <p className="text-muted-foreground mb-6">
            Subscribe to our newsletter to get notified about upcoming events and special opportunities
          </p>
          <Button className="bg-gradient-to-r from-blue-600 to-purple-600">
            Subscribe Now
          </Button>
        </Card>
      </motion.div>
    </div>
  );
};

export default UpcomingEvents;
