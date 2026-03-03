import { motion } from 'framer-motion';
import { Plus, Play, Search } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';

const Videos = () => {
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';
  const videos = [
    {
      id: 1,
      title: '34th Graduation Day - ACE Hosur',
      thumbnail: 'https://i.ytimg.com/vi/ZIPLlm1gZSw/maxresdefault.jpg',
      url: 'https://www.youtube.com/watch?v=ZIPLlm1gZSw',
      duration: '3:14:25',
      views: '5.2K',
      event: 'Academic'
    },
    {
      id: 2,
      title: 'Campus Highlight - Adhiyamaan College',
      thumbnail: 'https://i.ytimg.com/vi/z6DHQcdcgdQ/maxresdefault.jpg',
      url: 'https://www.youtube.com/watch?v=z6DHQcdcgdQ',
      duration: '4:52',
      views: '12K',
      event: 'Promotion'
    },
    {
      id: 3,
      title: 'Admission Promotion 2025',
      thumbnail: 'https://i.ytimg.com/vi/Vbt5i8_2LB0/maxresdefault.jpg',
      url: 'https://www.youtube.com/watch?v=Vbt5i8_2LB0',
      duration: '2:30',
      views: '2.1K',
      event: 'Promotion'
    },
    {
      id: 4,
      title: 'DETI-TBI @ Adhiyamaan College',
      thumbnail: 'https://i.ytimg.com/vi/5--KVbTjVQc/maxresdefault.jpg',
      url: 'https://www.youtube.com/watch?v=5--KVbTjVQc',
      duration: '5:10',
      views: '1.5K',
      event: 'Innovation'
    },
    {
      id: 5,
      title: '33rd Graduation Day Highlights',
      thumbnail: 'https://i.ytimg.com/vi/tLiOxvtcUgY/maxresdefault.jpg',
      url: 'https://www.youtube.com/watch?v=tLiOxvtcUgY',
      duration: '12:45',
      views: '3.8K',
      event: 'Academic'
    },
    {
      id: 6,
      title: 'Official Promotional Video',
      thumbnail: 'https://i.ytimg.com/vi/Heo5kBoJ8Dc/maxresdefault.jpg',
      url: 'https://www.youtube.com/watch?v=Heo5kBoJ8Dc',
      duration: '3:15',
      views: '4.2K',
      event: 'Promotion'
    }
  ];

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
        <img src="/icon.jpeg" alt="Logo" className="h-20 w-20 rounded-full shadow-lg border-2 border-red-600" />
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
            <h1 className="text-5xl md:text-6xl font-bold mb-2 bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
              Video Gallery
            </h1>
            <p className="text-xl text-gray-600">Watch our amazing events and moments at ACE Hosur</p>
          </div>
          {isAdmin && (
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button className="flex items-center gap-2 bg-gradient-to-r from-red-600 to-orange-600 hover:shadow-lg">
                <Plus className="h-5 w-5" />
                Add Video
              </Button>
            </motion.div>
          )}
        </div>

        {/* Search and Filter */}
        <div className="flex gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              placeholder="Search videos..."
              className="pl-10 py-3 rounded-lg border-2 border-gray-200 focus:border-primary"
            />
          </div>
          <Button variant="outline" className="px-6">
            Sort
          </Button>
        </div>
      </motion.div>

      {/* Videos Grid */}
      <div className="container mx-auto px-4 pb-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {videos.map((video) => (
            <motion.div
              key={video.id}
              variants={itemVariants}
              whileHover={{ y: -8 }}
              className="group cursor-pointer"
              onClick={() => window.open(video.url, '_blank')}
            >
              <Card className="overflow-hidden border-none shadow-md hover:shadow-2xl transition-shadow duration-300">
                {/* Video Thumbnail */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                  className="relative h-48 overflow-hidden bg-slate-200"
                >
                  <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover" />

                  {/* Duration Badge */}
                  <div className="absolute bottom-3 right-3 bg-black/80 text-white text-xs px-2 py-1 rounded">
                    {video.duration}
                  </div>

                  {/* Play Button Overlay */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/50 transition-colors"
                  >
                    <motion.div
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center cursor-pointer"
                    >
                      <Play className="h-8 w-8 text-red-600 ml-1" fill="currentColor" />
                    </motion.div>
                  </motion.div>
                </motion.div>

                {/* Info */}
                <div className="p-4 bg-white">
                  <h3 className="font-bold text-lg mb-2">{video.title}</h3>
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>{video.event}</span>
                    <span>{video.views} Views</span>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Featured Video Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="bg-gradient-to-r from-red-600 to-orange-600 text-white py-16 px-4 mb-20"
      >
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-4">Featured Video</h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="relative h-80 bg-slate-800 rounded-xl overflow-hidden cursor-pointer group"
              onClick={() => window.open('https://www.youtube.com/watch?v=z6DHQcdcgdQ', '_blank')}
            >
              <img src="https://i.ytimg.com/vi/z6DHQcdcgdQ/maxresdefault.jpg" alt="Campus Highlight" className="w-full h-full object-cover opacity-80" />
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                className="absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity"
              >
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                  <Play className="h-8 w-8 text-black ml-1" />
                </div>
              </motion.div>
            </motion.div>
            <div>
              <Badge className="mb-4">Official Highlight</Badge>
              <h2 className="text-3xl font-bold mb-4">Adhiyamaan Campus Showcase</h2>
              <p className="text-lg opacity-90 mb-6">
                Explore our sprawling 125-acre campus and world-class facilities through this official aerial showcase and student life highlights.
              </p>
              <Button
                className="px-8 py-3 bg-white text-red-600 font-bold hover:shadow-lg transition-all"
                onClick={() => window.open('https://www.youtube.com/watch?v=z6DHQcdcgdQ', '_blank')}
              >
                Watch Showcase
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Videos;
