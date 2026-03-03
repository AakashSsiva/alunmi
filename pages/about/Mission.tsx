import { motion } from 'framer-motion';
import { Target, Heart, Lightbulb, Users } from 'lucide-react';
import { Card } from '@/components/ui/card';

const Mission = () => {
  const missionValues = [
    {
      icon: Target,
      title: 'Vision',
      description: 'To emerge as a premier technical institution fostering innovation, research, and technical excellence to meet global industry needs.',
    },
    {
      icon: Heart,
      title: 'Mission',
      description: 'To impart quality education, promote industry-institute interaction, and instill ethical values and social responsibility in future engineers.',
    },
    {
      icon: Lightbulb,
      title: 'Innovation',
      description: 'Encouraging entrepreneurship and research among students to build a better tomorrow.',
    },
    {
      icon: Users,
      title: 'Empowerment',
      description: 'Supporting global career growth through our extensive network of alumni in top-tier tech and industrial firms.',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <div className="min-h-screen pt-24">
      {/* Logo Section */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
        className="flex justify-center mb-8"
      >
        <img src="/icon.jpeg" alt="Logo" className="h-20 w-20 rounded-full shadow-lg border-2 border-primary" />
      </motion.div>

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative overflow-hidden bg-gradient-to-r from-primary via-purple-600 to-pink-600 text-white py-20 px-4"
      >
        <div className="absolute inset-0 opacity-20">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full mix-blend-multiply filter blur-3xl"
          />
        </div>
        <div className="container mx-auto relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Our Mission</h1>
          <p className="text-xl md:text-2xl max-w-2xl opacity-90">
            Founded in 1987, Adhiyamaan College of Engineering has been a pioneer in technical education, connecting generations of engineers to global opportunities.
          </p>
        </div>
      </motion.div>

      {/* Mission Values Grid */}
      <div className="container mx-auto px-4 py-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {missionValues.map((value, index) => {
            const Icon = value.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
              >
                <Card className="p-8 bg-gradient-to-br from-slate-50 to-slate-100 border-none h-full">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 360 }}
                    transition={{ duration: 0.4 }}
                    className="inline-block p-4 bg-gradient-to-r from-primary to-purple-600 rounded-lg mb-4"
                  >
                    <Icon className="h-8 w-8 text-white" />
                  </motion.div>
                  <h3 className="text-2xl font-bold mb-3 text-gray-900">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Impact Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="bg-gradient-to-r from-blue-50 to-indigo-50 py-20 px-4"
      >
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Our Impact</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[
              { number: '25,000+', label: 'Global Graduates' },
              { number: '35+', label: 'Years of Excellence' },
              { number: 'NAAC A', label: 'Accredited Excellence' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ delay: index * 0.1, type: 'spring', stiffness: 100 }}
              >
                <div className="p-8 bg-white rounded-xl shadow-lg">
                  <div className="text-5xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent mb-2">
                    {stat.number}
                  </div>
                  <p className="text-gray-600 text-lg">{stat.label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Mission;
