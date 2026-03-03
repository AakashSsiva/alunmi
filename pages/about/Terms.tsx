import { motion } from 'framer-motion';
import { FileText, Shield, AlertCircle, CheckCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';

const Terms = () => {
  const sections = [
    {
      icon: Shield,
      title: 'User Responsibility',
      content:
        'Users are responsible for maintaining the confidentiality of their account information and password. You agree to accept responsibility for all activities that occur under your account.',
    },
    {
      icon: FileText,
      title: 'Intellectual Property',
      content:
        'All content, features, and functionality on the platform are owned by Adhiyamaan Connects, protected by copyright and other intellectual property laws.',
    },
    {
      icon: AlertCircle,
      title: 'Disclaimer',
      content:
        'The platform is provided "as is" without warranties of any kind. We do not guarantee the accuracy, completeness, or usefulness of any content.',
    },
    {
      icon: CheckCircle,
      title: 'Acceptance',
      content: 'By using this platform, you acknowledge that you have read and agree to these terms and conditions.',
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
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="min-h-screen pt-24 bg-gradient-to-b from-gray-50 to-white">
      {/* Logo Section */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
        className="flex justify-center mb-8"
      >
        <img src="/icon.jpeg" alt="Logo" className="h-20 w-20 rounded-full shadow-lg border-2 border-primary" />
      </motion.div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-4 mb-16"
      >
        <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
          Terms & Conditions
        </h1>
        <p className="text-xl text-gray-600">Last updated: February 2026</p>
      </motion.div>

      {/* Sections */}
      <div className="container mx-auto px-4 pb-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          {sections.map((section, index) => {
            const Icon = section.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ x: 8 }}
                className="group"
              >
                <Card className="p-8 bg-white border-l-4 border-primary hover:shadow-xl transition-all duration-300">
                  <div className="flex items-start gap-6">
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: 10 }}
                      transition={{ type: 'spring', stiffness: 400 }}
                      className="flex-shrink-0"
                    >
                      <div className="flex items-center justify-center h-14 w-14 rounded-lg bg-gradient-to-br from-primary to-purple-600 text-white">
                        <Icon className="h-7 w-7" />
                      </div>
                    </motion.div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold mb-3 text-gray-900 group-hover:text-primary transition-colors">
                        {section.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed text-lg">{section.content}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Agreement Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="bg-gradient-to-r from-primary to-purple-600 text-white py-16 px-4"
      >
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Questions?</h2>
          <p className="text-lg opacity-90 mb-6">
            If you have any questions about our Terms & Conditions, please contact our support team.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-white text-primary font-bold rounded-lg hover:shadow-xl transition-all"
          >
            Contact Support
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default Terms;
