import { motion } from 'framer-motion';
import { Heart, Users, Gift, HandshakeIcon } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const Donate = () => {
  const plans = [
    {
      id: 1,
      name: 'Bronze Donor',
      amount: '₹5,000',
      icon: Gift,
      benefits: ['Recognition on website', 'Annual newsletter', 'Supporter badge'],
      color: 'from-amber-400 to-orange-500',
    },
    {
      id: 2,
      name: 'Silver Sponsor',
      amount: '₹25,000',
      icon: Heart,
      benefits: ['All Bronze benefits', 'Name in newsletter', 'Annual meetup access', 'Certificate of appreciation'],
      color: 'from-gray-300 to-gray-400',
      featured: true,
    },
    {
      id: 3,
      name: 'Gold Benefactor',
      amount: '₹1,00,000+',
      icon: Users,
      benefits: ['All Silver benefits', 'Exclusive events', 'Logo placement', 'Named scholarship fund'],
      color: 'from-yellow-400 to-yellow-500',
    },
  ];

  const impacts = [
    { icon: '🎓', label: 'Scholarships', description: '50+ scholarships awarded annually' },
    { icon: '🏢', label: 'Infrastructure', description: 'Improved campus facilities' },
    { icon: '📚', label: 'Programs', description: 'Quality career development programs' },
    { icon: '🌍', label: 'Outreach', description: 'Global alumni network expansion' },
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
        <img src="/icon.jpeg" alt="Logo" className="h-20 w-20 rounded-full shadow-lg border-2 border-red-600" />
      </motion.div>

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-gradient-to-r from-red-600 to-pink-600 text-white py-16 px-4 mb-16 rounded-2xl"
      >
        <div className="container mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Make a Difference</h1>
          <p className="text-xl opacity-90 max-w-2xl">
            Your generous donation helps us support education, mentorship, and community development.
          </p>
        </div>
      </motion.div>

      {/* Donation Plans */}
      <div className="container mx-auto px-4 mb-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {plans.map((plan) => {
            const Icon = plan.icon;
            return (
              <motion.div
                key={plan.id}
                variants={itemVariants}
                whileHover={{ y: plan.featured ? -16 : -8, boxShadow: '0 30px 60px rgba(0,0,0,0.15)' }}
                className={plan.featured ? 'relative md:scale-105' : ''}
              >
                <Card
                  className={`h-full p-8 border-none overflow-hidden relative ${
                    plan.featured
                      ? 'bg-gradient-to-br from-white to-slate-50 border-2 border-yellow-400'
                      : 'bg-gradient-to-br from-white to-slate-50'
                  }`}
                >
                  {/* Featured Badge */}
                  {plan.featured && (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                      className="absolute -top-8 -right-8 w-32 h-32 bg-yellow-400/20 rounded-full"
                    />
                  )}

                  <div className="relative z-10">
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: 360 }}
                      transition={{ duration: 0.6 }}
                      className={`inline-block p-4 bg-gradient-to-r ${plan.color} text-white rounded-lg mb-4`}
                    >
                      <Icon className="h-8 w-8" />
                    </motion.div>

                    <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                    <div className="text-4xl font-bold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent mb-6">
                      {plan.amount}
                    </div>

                    <ul className="space-y-3 mb-8">
                      {plan.benefits.map((benefit, index) => (
                        <motion.li
                          key={index}
                          initial={{ x: -20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-center gap-3 text-gray-700"
                        >
                          <span className="text-green-500 font-bold">✓</span>
                          {benefit}
                        </motion.li>
                      ))}
                    </ul>

                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button
                        className={`w-full font-bold ${
                          plan.featured
                            ? 'bg-gradient-to-r from-red-600 to-pink-600 text-white hover:shadow-lg'
                            : 'bg-gradient-to-r from-red-600 to-pink-600 text-white hover:shadow-lg'
                        }`}
                      >
                        Donate Now
                      </Button>
                    </motion.div>
                  </div>
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
        className="bg-gradient-to-r from-red-50 to-pink-50 py-16 px-4 rounded-2xl mb-20"
      >
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Your Impact</h2>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {impacts.map((impact, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.1 }}
                className="text-center"
              >
                <div className="text-5xl mb-3">{impact.icon}</div>
                <h4 className="font-bold text-lg mb-2">{impact.label}</h4>
                <p className="text-sm text-gray-600">{impact.description}</p>
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
        className="bg-gradient-to-r from-red-600 to-pink-600 text-white py-16 px-4 rounded-2xl"
      >
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Every Contribution Counts</h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            Whether big or small, your donation makes a real difference in the lives of our alumni community.
          </p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button className="px-8 py-3 bg-white text-red-600 font-bold hover:shadow-xl transition-all">
              Start Your Contribution
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Donate;
