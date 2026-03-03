import { motion } from 'framer-motion';
import { Users, Clock, Award, Heart } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const Volunteer = () => {
  const opportunities = [
    {
      id: 1,
      title: 'Event Organization',
      time: '4-8 hours/month',
      description: 'Help organize reunions, networking events, and community gatherings',
      skills: 'Organization, Communication',
      icon: Users,
    },
    {
      id: 2,
      title: 'Mentorship Program',
      time: '2-4 hours/week',
      description: 'Guide junior alumni in career development and personal growth',
      skills: 'Leadership, Experience',
      icon: Award,
    },
    {
      id: 3,
      title: 'Content Creator',
      time: '3-5 hours/week',
      description: 'Create content for newsletter, social media, and publications',
      skills: 'Writing, Creativity',
      icon: Heart,
    },
    {
      id: 4,
      title: 'Community Outreach',
      time: '4-6 hours/month',
      description: 'Connect with alumni globally and build community engagement',
      skills: 'Networking, Communication',
      icon: Users,
    },
    {
      id: 5,
      title: 'Workshop Conductor',
      time: '2-3 hours/week',
      description: 'Lead skill development workshops and training sessions',
      skills: 'Teaching, Expertise',
      icon: Award,
    },
    {
      id: 6,
      title: 'Program Coordinator',
      time: '5-8 hours/week',
      description: 'Coordinate alumni programs and strategic initiatives',
      skills: 'Project Management, Planning',
      icon: Clock,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="min-h-screen pt-24 bg-gradient-to-b from-slate-50 to-white">
      {/* Logo Section */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
        className="flex justify-center mb-8"
      >
        <img src="/icon.jpeg" alt="Logo" className="h-20 w-20 rounded-full shadow-lg border-2 border-green-600" />
      </motion.div>

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-gradient-to-r from-green-600 to-teal-600 text-white py-16 px-4 mb-16 rounded-2xl"
      >
        <div className="container mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Join Our Volunteers</h1>
          <p className="text-xl opacity-90 max-w-2xl">
            Give back to the community and make an impact. Your time and talents can change lives.
          </p>
        </div>
      </motion.div>

      {/* Volunteer Opportunities */}
      <div className="container mx-auto px-4 mb-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {opportunities.map((opportunity) => {
            const Icon = opportunity.icon;
            return (
              <motion.div
                key={opportunity.id}
                variants={itemVariants}
                whileHover={{ y: -12, boxShadow: '0 30px 60px rgba(0,0,0,0.15)' }}
                className="group"
              >
                <Card className="h-full p-8 bg-gradient-to-br from-white to-slate-50 border-none overflow-hidden relative">
                  {/* Background Accent */}
                  <motion.div
                    className="absolute -right-16 -top-16 w-32 h-32 bg-gradient-to-r from-green-300 to-teal-300 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                  />

                  <div className="relative z-10">
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: 360 }}
                      transition={{ duration: 0.6 }}
                      className="inline-block p-4 bg-gradient-to-br from-green-500 to-teal-600 text-white rounded-lg mb-4"
                    >
                      <Icon className="h-8 w-8" />
                    </motion.div>

                    <h3 className="text-2xl font-bold mb-2 text-gray-900">{opportunity.title}</h3>

                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="inline-flex items-center gap-2 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold mb-4"
                    >
                      <Clock className="h-4 w-4" />
                      {opportunity.time}
                    </motion.div>

                    <p className="text-gray-600 mb-4 leading-relaxed">{opportunity.description}</p>

                    <div className="mb-6 p-4 bg-gradient-to-r from-green-50 to-teal-50 rounded-lg">
                      <p className="text-sm font-semibold text-gray-700">
                        <span className="text-green-600">Skills needed:</span> {opportunity.skills}
                      </p>
                    </div>

                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button className="w-full bg-gradient-to-r from-green-600 to-teal-600 hover:shadow-lg transition-all">
                        Apply Now
                      </Button>
                    </motion.div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Benefits Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="bg-gradient-to-r from-green-50 to-teal-50 py-16 px-4 rounded-2xl mb-20"
      >
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Volunteer Benefits</h2>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {[
              { icon: '🏆', title: 'Recognition', desc: 'Featured in newsletter' },
              { icon: '🤝', title: 'Networking', desc: 'Build valuable connections' },
              { icon: '📈', title: 'Growth', desc: 'Develop new skills' },
              { icon: '❤️', title: 'Impact', desc: 'Make real difference' },
            ].map((benefit, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.1 }}
                className="text-center p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow"
              >
                <div className="text-4xl mb-3">{benefit.icon}</div>
                <h4 className="font-bold text-lg mb-2 text-gray-900">{benefit.title}</h4>
                <p className="text-gray-600">{benefit.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Success Stories */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="container mx-auto px-4 mb-20"
      >
        <h2 className="text-3xl font-bold text-center mb-12">Volunteer Stories</h2>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {[
            {
              name: 'Amit Kumar',
              role: 'Mentorship Program',
              story: 'Mentoring 5 junior alumni has been the most rewarding experience of my life.',
              quote: '⭐⭐⭐⭐⭐',
            },
            {
              name: 'Priya Singh',
              role: 'Event Organizer',
              story: 'Organizing events helped me reconnect with my batch and build lasting friendships.',
              quote: '⭐⭐⭐⭐⭐',
            },
          ].map((story, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -8 }}
              className="p-8 bg-gradient-to-br from-white to-green-50 rounded-xl border-l-4 border-green-600 shadow-lg hover:shadow-xl transition-shadow"
            >
              <p className="text-yellow-500 text-xl mb-3">{story.quote}</p>
              <p className="text-gray-600 italic mb-4">"{story.story}"</p>
              <p className="font-bold text-gray-900">{story.name}</p>
              <p className="text-sm text-green-600">{story.role}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="bg-gradient-to-r from-green-600 to-teal-600 text-white py-16 px-4 rounded-2xl"
      >
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Make a Difference?</h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            Join hundreds of volunteers making a real impact in our alumni community.
          </p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button className="px-8 py-3 bg-white text-green-600 font-bold hover:shadow-xl transition-all">
              Start Volunteering
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Volunteer;
