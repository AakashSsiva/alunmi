import { motion } from 'framer-motion';
import { Trophy, Medal, Zap, Users } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';

const Awards = () => {
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';
  const awards = {
    professional: [
      {
        id: 1,
        title: 'NAAC "A" Grade Accreditation',
        year: 2023,
        recipients: 'Academic Excellence',
        icon: Zap,
        description: 'Recognized by NAAC with an "A" Grade for maintaining high standards in technical education.',
      },
      {
        id: 2,
        title: 'NIRF Ranking (Top 300)',
        year: 2023,
        recipients: 'Engineering Category',
        icon: Trophy,
        description: 'Consistently placed in the NIRF ranking bands for quality engineering education in India.',
      },
      {
        id: 3,
        title: 'Rs 1.2 Crore NIDHI PRAYAS Grant',
        year: 2024,
        recipients: 'Innovation & Startup Cell',
        icon: Zap,
        description: 'Selected as a PRAYAS Center by DST, Govt of India, with a grant of 1.2 Crores to support innovators.',
      },
      {
        id: 4,
        title: 'Global Strategic MoU',
        year: 2023,
        recipients: 'Tunku Abdul Rahman University',
        icon: Users,
        description: 'Signed a strategic partnership for faculty and student exchange with the prestigious Malaysia university.',
      },
      {
        id: 5,
        title: 'Zonal Sports Championship',
        year: 2024,
        recipients: 'ACE Sports Division',
        icon: Medal,
        description: 'Anna University Zonal Leaders in multiple sports categories for over a decade.',
      },
    ],
    community: [
      {
        id: 6,
        title: 'Best Alumni Outreach',
        year: 2024,
        recipients: 'Connects Platform',
        icon: Users,
        description: 'Recognized for building one of the largest private alumni networks in Tamil Nadu.',
      },
      {
        id: 7,
        title: 'CSR Leadership Award',
        year: 2023,
        recipients: 'Social Welfare Cell',
        icon: Users,
        description: 'Honoring our commitment to rural development and student scholarships.',
      },
    ],
  };

  const winners = [
    { year: 2024, category: 'Sports', name: 'Anna University Zonal Champions' },
    { year: 2024, category: 'Academic', name: 'Lekha Sri K - ISTE Best Student' },
    { year: 2024, category: 'Innovation', name: 'DST NIDHI PRAYAS Innovation Center' },
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
        <img src="/icon.jpeg" alt="Logo" className="h-20 w-20 rounded-full shadow-lg border-2 border-yellow-600" />
      </motion.div>

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-4 mb-16"
      >
        <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
          Awards & Recognition
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl">
          Celebrating the achievements and contributions of our outstanding alumni.
        </p>
      </motion.div>

      {/* Awards Categories */}
      <div className="container mx-auto px-4 pb-20">
        <Tabs defaultValue="professional" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto mb-8 bg-gradient-to-r from-slate-100 to-slate-200 p-1">
            <TabsTrigger value="professional" className="data-[state=active]:bg-yellow-500 data-[state=active]:text-white">
              Professional
            </TabsTrigger>
            <TabsTrigger value="community" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white">
              Community
            </TabsTrigger>
          </TabsList>

          {/* Professional Awards */}
          <TabsContent value="professional">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
            >
              {awards.professional.map((award) => {
                const Icon = award.icon;
                return (
                  <motion.div
                    key={award.id}
                    variants={itemVariants}
                    whileHover={{ y: -12 }}
                    className="group"
                  >
                    <Card className="h-full p-8 bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-200 hover:border-yellow-400 transition-colors">
                      <motion.div
                        whileHover={{ rotate: 360, scale: 1.2 }}
                        transition={{ duration: 0.6 }}
                        className="inline-block p-4 bg-gradient-to-br from-yellow-400 to-orange-500 text-white rounded-full mb-4"
                      >
                        <Icon className="h-8 w-8" />
                      </motion.div>

                      <h3 className="text-2xl font-bold mb-2 text-gray-900">{award.title}</h3>
                      <p className="text-sm text-gray-600 mb-4">{award.year}</p>
                      <p className="text-gray-700 mb-4 leading-relaxed">{award.description}</p>

                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="inline-block px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-lg text-sm font-bold"
                      >
                        {award.recipients}
                      </motion.div>
                    </Card>
                  </motion.div>
                );
              })}
            </motion.div>
          </TabsContent>

          {/* Community Awards */}
          <TabsContent value="community">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12"
            >
              {awards.community.map((award) => {
                const Icon = award.icon;
                return (
                  <motion.div
                    key={award.id}
                    variants={itemVariants}
                    whileHover={{ y: -12 }}
                    className="group"
                  >
                    <Card className="h-full p-8 bg-gradient-to-br from-orange-50 to-red-50 border-2 border-orange-200 hover:border-orange-400 transition-colors">
                      <motion.div
                        whileHover={{ rotate: 360, scale: 1.2 }}
                        transition={{ duration: 0.6 }}
                        className="inline-block p-4 bg-gradient-to-br from-orange-400 to-red-500 text-white rounded-full mb-4"
                      >
                        <Icon className="h-8 w-8" />
                      </motion.div>

                      <h3 className="text-2xl font-bold mb-2 text-gray-900">{award.title}</h3>
                      <p className="text-sm text-gray-600 mb-4">{award.year}</p>
                      <p className="text-gray-700 mb-4 leading-relaxed">{award.description}</p>

                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="inline-block px-4 py-2 bg-gradient-to-r from-orange-400 to-red-500 text-white rounded-lg text-sm font-bold"
                      >
                        {award.recipients}
                      </motion.div>
                    </Card>
                  </motion.div>
                );
              })}
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Past Winners */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="bg-gradient-to-r from-slate-100 to-slate-200 py-16 px-4"
      >
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Recent Winners</h2>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {winners.map((winner, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ x: 8 }}
                className="p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow"
              >
                <div className="flex items-center gap-4">
                  <motion.div
                    whileHover={{ scale: 1.2 }}
                    className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-2xl"
                  >
                    🏆
                  </motion.div>
                  <div className="flex-1">
                    <p className="font-bold text-lg text-gray-900">{winner.name}</p>
                    <p className="text-sm text-gray-600">{winner.category}</p>
                    <p className="text-xs text-gray-500">{winner.year}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="bg-gradient-to-r from-yellow-600 to-orange-600 text-white py-16 px-4"
      >
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Nominate Someone Special</h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            Know someone who deserves recognition? Nominate them for one of our prestigious awards.
          </p>
          {isAdmin && (
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button className="px-8 py-3 bg-white text-yellow-600 font-bold hover:shadow-xl transition-all">
                Nominate Now
              </Button>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Awards;
