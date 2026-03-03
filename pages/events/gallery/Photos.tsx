import { motion } from 'framer-motion';
import { Plus, Grid, Search } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';

const Photos = () => {
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';
  const photos = Array.from({ length: 12 }).map((_, i) => ({
    id: i,
    title: [
      'Symphony Cultural Fest 2025',
      'NCFCSPS Technical Conference',
      '34th Annual Graduation Day',
      'Anna University Zonal Sports',
      'Main Administrative Block',
      'Central Digital Library',
      'Advanced Computing Labs',
      'Alumni Reunion 2025',
      'Organizational Placement Drive',
      'Digital Learning Center',
      'B.Arch Design Studio',
      'Precision Mechanical Workshop'
    ][i % 12],
    image: [
      'https://upload.wikimedia.org/wikipedia/commons/c/c4/ACE_-_Main.jpg',
      'https://i.ytimg.com/vi/F4J_3bfwDYA/maxresdefault.jpg',
      'https://i.ytimg.com/vi/8kAfx7HMgGY/maxresdefault.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/c/c4/ACE_-_Main.jpg',
      'https://i.ytimg.com/vi/F4J_3bfwDYA/hqdefault.jpg',
      'https://i.ytimg.com/vi/F4J_3bfwDYA/maxresdefault.jpg',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFTlBj732tQQ9-44AUByMPxaRQvZId2mxMjQ&s',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQau6tsDsPrfNz3utVapwhGPpGi6QwikcUcOw&s',
      'https://upload.wikimedia.org/wikipedia/commons/c/c4/ACE_-_Main.jpg',
      'https://i.ytimg.com/vi/F4J_3bfwDYA/maxresdefault.jpg',
      'https://i.ytimg.com/vi/8kAfx7HMgGY/maxresdefault.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/c/c4/ACE_-_Main.jpg'
    ][i % 12],
    date: `2025-${String((i % 12) + 1).padStart(2, '0')}-${String((i % 28) + 1).padStart(2, '0')}`,
    event: [
      'Cultural Excellence',
      'Academic Research',
      'Convocation Ceremony',
      'Athletics & Sports',
      'Campus View',
      'Infrastructure',
      'Technical Symposium',
      'Alumni Gathering',
      'Career Development',
      'Technology Center',
      'B.Arch Excellence',
      'Practical Engineering'
    ][i % 12],
  }));

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4 },
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
        <img src="/icon.jpeg" alt="Logo" className="h-20 w-20 rounded-full shadow-lg border-2 border-pink-600" />
      </motion.div>

      {/* Header with Add Button */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-4 mb-12"
      >
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-5xl md:text-6xl font-bold mb-2 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              Photo Gallery
            </h1>
            <p className="text-xl text-gray-600">Capturing our best moments at ACE Hosur</p>
          </div>
          {isAdmin && (
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button className="flex items-center gap-2 bg-gradient-to-r from-pink-600 to-purple-600 hover:shadow-lg">
                <Plus className="h-5 w-5" />
                Add Photos
              </Button>
            </motion.div>
          )}
        </div>

        {/* Search and Filter */}
        <div className="flex gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              placeholder="Search photos..."
              className="pl-10 py-3 rounded-lg border-2 border-gray-200 focus:border-primary"
            />
          </div>
          <Button variant="outline" className="flex items-center gap-2">
            <Grid className="h-5 w-5" />
            Filter
          </Button>
        </div>
      </motion.div>

      {/* Photos Grid */}
      <div className="container mx-auto px-4 pb-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {photos.map((photo) => (
            <motion.div
              key={photo.id}
              variants={itemVariants}
              whileHover={{ y: -8 }}
              className="group cursor-pointer"
            >
              <Card className="overflow-hidden border-none shadow-md hover:shadow-2xl transition-shadow duration-300">
                {/* Image Placeholder with Gradient */}
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                  className="relative h-48 overflow-hidden bg-slate-200"
                >
                  <img src={photo.image} alt={photo.title} className="w-full h-full object-cover" />

                  {/* Overlay */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    className="absolute inset-0 bg-black/50 flex items-center justify-center gap-3"
                  >
                    <Button size="sm" className="bg-white text-pink-600 hover:bg-gray-100">
                      View
                    </Button>
                    <Button size="sm" variant="outline" className="border-white text-white hover:bg-white/20">
                      Like
                    </Button>
                  </motion.div>
                </motion.div>

                {/* Info */}
                <div className="p-4 bg-white">
                  <h3 className="font-bold text-lg mb-1">{photo.title}</h3>
                  <p className="text-sm text-pink-600 font-medium mb-1">{photo.event}</p>
                  <p className="text-xs text-gray-500">{photo.date}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
      {/* Load More */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="flex justify-center pb-20"
      >
        <Button variant="outline" className="px-8 py-3 border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all">
          Load More Photos
        </Button>
      </motion.div>
    </div>
  );
};

export default Photos;
