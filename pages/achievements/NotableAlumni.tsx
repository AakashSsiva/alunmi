import { motion } from 'framer-motion';
import { Award, Star, Sparkles, Trophy } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const NotableAlumni = () => {
  const alumni = [
    {
      id: 1,
      name: 'Dr. Subramanian R',
      batch: '1995',
      achievement: 'Principal Architect, Global Design Studio',
      description: 'One of the early graduates of the Architecture program, now leading sustainable urban projects across Asia.',
      category: 'Architecture',
    },
    {
      id: 2,
      name: 'Senthil Kumar',
      batch: '2002',
      achievement: 'Engineering Manager, Major Tech Hub',
      description: 'Leading a team of 100+ developers at a top-tier software firm in Bangalore, specializing in scalable cloud infrastructure.',
      category: 'Technology',
    },
    {
      id: 3,
      name: 'Deepika Rao',
      batch: '2010',
      achievement: 'Operations Head, Hosur Industrial Corridor',
      description: 'Managing large-scale manufacturing operations for a global automotive leader, optimizing supply chains through AI.',
      category: 'Industry',
    },
    {
      id: 4,
      name: 'Meera Krishnan',
      batch: '2012',
      achievement: 'Serial Entrepreneur, EdTech Pioneer',
      description: 'Founded a successful startup focused on vocational training for rural engineers, impacting thousands of lives.',
      category: 'Entrepreneurship',
    },
    {
      id: 5,
      name: 'Arjun Venkatesh',
      batch: '2008',
      achievement: 'Research Lead, Space Exploration Agency',
      description: 'Contributing to satellite communication systems and deep space research initiatives.',
      category: 'Research',
    },
    {
      id: 6,
      name: 'Anvitha S',
      batch: '2015',
      achievement: 'Lead Product Designer, Fintech Unicorn',
      description: 'Revolutionizing digital payment experiences for millions of users across the globe.',
      category: 'Design',
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
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
        <img src="/icon.jpeg" alt="Logo" className="h-20 w-20 rounded-full shadow-lg border-2 border-purple-600" />
      </motion.div>

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-4 mb-16"
      >
        <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Notable Alumni
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl">
          Meet our distinguished alumni who are making an impact across the world.
        </p>
      </motion.div>

      {/* Alumni Grid */}
      <div className="container mx-auto px-4 pb-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {alumni.map((person) => (
            <motion.div
              key={person.id}
              variants={itemVariants}
              whileHover={{ y: -12, boxShadow: '0 30px 60px rgba(0,0,0,0.15)' }}
              className="group"
            >
              <Card className="h-full p-8 bg-gradient-to-br from-white via-slate-50 to-slate-100 border-none overflow-hidden relative">
                {/* Background Accent */}
                <motion.div
                  className="absolute -right-16 -top-16 w-32 h-32 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                />

                <div className="relative z-10">
                  {/* Category Badge */}
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full text-sm font-bold mb-4"
                  >
                    <Sparkles className="h-4 w-4" />
                    {person.category}
                  </motion.div>

                  {/* Avatar Placeholder */}
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="w-20 h-20 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-3xl mb-4"
                  >
                    🎓
                  </motion.div>

                  {/* Info */}
                  <h3 className="text-2xl font-bold mb-1 text-gray-900">{person.name}</h3>
                  <p className="text-sm text-gray-600 mb-3">Batch of {person.batch}</p>

                  <h4 className="font-bold text-lg text-primary mb-3">{person.achievement}</h4>
                  <p className="text-gray-600 mb-6 leading-relaxed">{person.description}</p>

                  {/* Stats */}
                  <div className="flex gap-2 mb-6">
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                      >
                        <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      </motion.div>
                    ))}
                  </div>

                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:shadow-lg transition-all">
                      View Profile
                    </Button>
                  </motion.div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-16 px-4"
      >
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Share Your Success Story</h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            Are you making an impact? Share your achievements and inspire the next generation.
          </p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button className="px-8 py-3 bg-white text-purple-600 font-bold hover:shadow-xl transition-all">
              Submit Your Story
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default NotableAlumni;
