import { motion } from 'framer-motion';
import { Award, Trophy, Star, Medal, Zap, Target } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const EventsAwards = () => {
  const awardCategories = [
    {
      id: 'excellence',
      name: 'Excellence',
      icon: Trophy,
      awards: [
        {
          id: 1,
          title: 'Outstanding Achievement Award',
          description: 'Recognizing exceptional contributions to society',
          recipients: ['Rajesh Kumar', 'Priya Sharma', 'Amit Patel'],
          year: '2025',
          image: '🏆',
        },
        {
          id: 2,
          title: 'Leadership Excellence',
          description: 'Honoring visionary leaders from our alumni',
          recipients: ['Vikram Singh', 'Ananya Verma'],
          year: '2025',
          image: '👑',
        },
      ],
    },
    {
      id: 'innovation',
      name: 'Innovation',
      icon: Zap,
      awards: [
        {
          id: 3,
          title: 'Tech Innovation Award',
          description: 'Celebrating technological breakthroughs',
          recipients: ['Neha Gupta', 'Rohan Desai'],
          year: '2025',
          image: '⚡',
        },
        {
          id: 4,
          title: 'Startup Excellence',
          description: 'Recognizing successful startups founded by alumni',
          recipients: ['Sanya Sharma', 'Kunal Verma'],
          year: '2025',
          image: '🚀',
        },
      ],
    },
    {
      id: 'social',
      name: 'Social Impact',
      icon: Target,
      awards: [
        {
          id: 5,
          title: 'Social Change Award',
          description: 'Honoring social entrepreneurs and changemakers',
          recipients: ['Deepak Kumar', 'Meera Singh'],
          year: '2025',
          image: '❤️',
        },
        {
          id: 6,
          title: 'Community Service Award',
          description: 'Recognizing service to communities',
          recipients: ['Pooja Nair', 'Arjun Menon'],
          year: '2025',
          image: '🤝',
        },
      ],
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
        <img src="/icon.jpeg" alt="Logo" className="h-20 w-20 rounded-full shadow-lg border-2 border-amber-600" />
      </motion.div>

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden px-6 py-12 mb-12"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-amber-600/10 to-orange-600/10 rounded-3xl"></div>
        <div className="relative container mx-auto max-w-5xl">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 mb-4"
          >
            <Trophy className="h-8 w-8 text-amber-600" />
            <span className="text-sm font-semibold text-amber-600 uppercase tracking-wider">Recognition</span>
          </motion.div>
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
            Event Awards & Recognition
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Celebrating outstanding achievements and contributions from our alumni community
          </p>
        </div>
      </motion.div>

      {/* Awards Tabs */}
      <div className="container mx-auto px-6 max-w-6xl">
        <Tabs defaultValue="excellence" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8 bg-white/30 backdrop-blur-sm border border-white/20">
            {awardCategories.map((category) => {
              const Icon = category.icon;
              return (
                <TabsTrigger key={category.id} value={category.id} className="flex items-center gap-2">
                  <Icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{category.name}</span>
                </TabsTrigger>
              );
            })}
          </TabsList>

          {awardCategories.map((category) => (
            <TabsContent key={category.id} value={category.id}>
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                {category.awards.map((award) => (
                  <motion.div key={award.id} variants={itemVariants}>
                    <Card className="overflow-hidden group cursor-pointer border-0 shadow-lg hover:shadow-2xl transition-all duration-300 bg-white/50 backdrop-blur-sm h-full">
                      {/* Award Header */}
                      <div className="h-24 bg-gradient-to-br from-amber-400 to-orange-500 relative overflow-hidden flex items-center justify-center">
                        <span className="text-6xl drop-shadow-lg">{award.image}</span>
                        <motion.div
                          className="absolute inset-0 bg-black/0 group-hover:bg-black/10"
                          transition={{ duration: 0.3 }}
                        ></motion.div>
                      </div>

                      {/* Award Content */}
                      <div className="p-6">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="text-xl font-bold text-foreground group-hover:text-amber-600 transition-colors">
                              {award.title}
                            </h3>
                            <p className="text-xs text-amber-600 font-semibold mt-1">{award.year}</p>
                          </div>
                          <Medal className="h-5 w-5 text-amber-600 flex-shrink-0" />
                        </div>

                        <p className="text-sm text-muted-foreground mb-4">
                          {award.description}
                        </p>

                        {/* Recipients */}
                        <div className="mb-4">
                          <p className="text-xs font-semibold text-foreground mb-2">Recipients:</p>
                          <div className="space-y-1">
                            {award.recipients.map((recipient, idx) => (
                              <motion.div
                                key={idx}
                                initial={{ x: -10, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: idx * 0.1 }}
                                className="flex items-center gap-2"
                              >
                                <Star className="h-3 w-3 text-amber-500" />
                                <span className="text-sm text-muted-foreground">{recipient}</span>
                              </motion.div>
                            ))}
                          </div>
                        </div>

                        <motion.div whileHover={{ x: 4 }} whileTap={{ scale: 0.95 }}>
                          <Button className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:shadow-lg">
                            View Details
                          </Button>
                        </motion.div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </TabsContent>
          ))}
        </Tabs>
      </div>

      {/* Bottom CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="container mx-auto px-6 max-w-4xl mt-16 text-center"
      >
        <Card className="bg-gradient-to-r from-amber-600/10 to-orange-600/10 border border-amber-200/30 p-8">
          <h2 className="text-3xl font-bold mb-3">Nominate an Achiever</h2>
          <p className="text-muted-foreground mb-6">
            Know someone who deserves recognition? Submit a nomination for our upcoming awards ceremony
          </p>
          <Button className="bg-gradient-to-r from-amber-600 to-orange-600">
            Submit Nomination
          </Button>
        </Card>
      </motion.div>
    </div>
  );
};

export default EventsAwards;
