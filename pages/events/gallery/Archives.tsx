import { motion } from 'framer-motion';
import { Plus, Archive, Calendar, Users } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const Archives = () => {
  const archives = [
    {
      id: 1,
      year: 2025,
      title: '2025 Annual Celebration',
      photos: 234,
      videos: 18,
      attendees: 450,
      highlights:
        'The most successful reunion yet with networking across multiple countries and exciting announcements.',
    },
    {
      id: 2,
      year: 2024,
      title: '2024 Career Summit',
      photos: 189,
      videos: 12,
      attendees: 380,
      highlights: 'Industry leaders shared insights on emerging technologies and career opportunities.',
    },
    {
      id: 3,
      year: 2023,
      title: '2023 Homecoming',
      photos: 156,
      videos: 9,
      attendees: 320,
      highlights: 'Celebrated 5 years of the alumni network with special awards and recognitions.',
    },
    {
      id: 4,
      year: 2022,
      title: '2022 Virtual Summit',
      photos: 142,
      videos: 15,
      attendees: 520,
      highlights: 'Historic first virtual event connecting alumni globally during unprecedented times.',
    },
    {
      id: 5,
      year: 2021,
      title: '2021 Online Mentorship Program',
      photos: 98,
      videos: 24,
      attendees: 280,
      highlights: 'Launched mentorship connections between senior and junior alumni.',
    },
    {
      id: 6,
      year: 2020,
      title: '2020 Inaugural Event',
      photos: 176,
      videos: 8,
      attendees: 350,
      highlights: 'The beginning of our incredible alumni community journey.',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="min-h-screen pt-24 bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-4 mb-12"
      >
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-5xl md:text-6xl font-bold mb-2 bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
              Event Archives
            </h1>
            <p className="text-xl text-gray-600">Relive memories from past events</p>
          </div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button className="flex items-center gap-2 bg-gradient-to-r from-amber-600 to-orange-600 hover:shadow-lg">
              <Plus className="h-5 w-5" />
              Archive Event
            </Button>
          </motion.div>
        </div>
      </motion.div>

      {/* Archives Timeline */}
      <div className="container mx-auto px-4 pb-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative"
        >
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-amber-400 to-orange-400 hidden lg:block" />

          <div className="space-y-12">
            {archives.map((archive, index) => (
              <motion.div
                key={archive.id}
                variants={itemVariants}
                className={`grid grid-cols-1 md:grid-cols-2 gap-8 items-center ${
                  index % 2 === 1 ? 'md:grid-cols-2 md:direction-rtl' : ''
                }`}
              >
                {/* Content */}
                <div className={index % 2 === 1 ? 'order-2' : 'order-1'}>
                  <motion.div
                    whileHover={{ y: -4 }}
                    className="group"
                  >
                    <Card className="p-8 bg-gradient-to-br from-white to-slate-50 border-none hover:shadow-2xl transition-shadow duration-300">
                      {/* Year Badge */}
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="inline-block px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold rounded-lg mb-4"
                      >
                        {archive.year}
                      </motion.div>

                      <h3 className="text-2xl font-bold mb-3 text-gray-900">{archive.title}</h3>
                      <p className="text-gray-600 mb-6 leading-relaxed">{archive.highlights}</p>

                      {/* Stats */}
                      <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg">
                        <motion.div whileHover={{ scale: 1.1 }} className="text-center">
                          <div className="text-2xl font-bold text-amber-600">{archive.photos}</div>
                          <p className="text-sm text-gray-600">Photos</p>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.1 }} className="text-center">
                          <div className="text-2xl font-bold text-orange-600">{archive.videos}</div>
                          <p className="text-sm text-gray-600">Videos</p>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.1 }} className="text-center">
                          <div className="text-2xl font-bold text-red-600">{archive.attendees}</div>
                          <p className="text-sm text-gray-600">Attendees</p>
                        </motion.div>
                      </div>

                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:shadow-lg transition-all">
                          View Full Archive
                        </Button>
                      </motion.div>
                    </Card>
                  </motion.div>
                </div>

                {/* Image Placeholder */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className={`relative h-80 rounded-xl overflow-hidden bg-gradient-to-br from-amber-300 via-orange-300 to-red-400 flex items-center justify-center ${
                    index % 2 === 1 ? 'order-1' : 'order-2'
                  }`}
                >
                  <div className="text-6xl">📸</div>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                    className="absolute -top-10 -right-10 w-32 h-32 bg-white/20 rounded-full"
                  />
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="bg-gradient-to-r from-amber-600 to-orange-600 text-white py-16 px-4"
      >
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Browse Our Complete Archives</h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            Explore photos, videos, and memories from all our past events and reunions.
          </p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button className="px-8 py-3 bg-white text-amber-600 font-bold hover:shadow-xl transition-all">
              Explore Archives
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Archives;
