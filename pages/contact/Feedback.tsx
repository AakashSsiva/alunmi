import { motion } from 'framer-motion';
import { MessageSquare, Send, Star, CheckCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Feedback = () => {
  const feedbackTypes = [
    { id: 1, label: 'Bug Report', icon: '🐛', color: 'from-red-500 to-pink-500' },
    { id: 2, label: 'Feature Request', icon: '💡', color: 'from-yellow-500 to-orange-500' },
    { id: 3, label: 'General Feedback', icon: '💬', color: 'from-blue-500 to-cyan-500' },
    { id: 4, label: 'Suggestions', icon: '⭐', color: 'from-purple-500 to-pink-500' },
  ];

  const testimonials = [
    {
      author: 'Rajesh Kumar',
      feedback: 'The platform has made it easy to stay connected with my batch mates. Great job!',
      rating: 5,
    },
    {
      author: 'Priya Sharma',
      feedback: 'Excellent design and user experience. Keep up the good work!',
      rating: 5,
    },
    {
      author: 'Amit Patel',
      feedback: 'The events section is very helpful for networking. Very impressed!',
      rating: 4,
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
        className="container mx-auto px-4 mb-16"
      >
        <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
          Share Your Feedback
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl">
          We value your opinions and suggestions to improve our platform and services.
        </p>
      </motion.div>

      {/* Feedback Types */}
      <div className="container mx-auto px-4 mb-20">
        <h2 className="text-3xl font-bold text-center mb-12">What's on your mind?</h2>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {feedbackTypes.map((type) => (
            <motion.div
              key={type.id}
              variants={itemVariants}
              whileHover={{ y: -8, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="cursor-pointer"
            >
              <Card className={`p-6 bg-gradient-to-br ${type.color} text-white text-center shadow-lg hover:shadow-xl transition-all`}>
                <div className="text-4xl mb-3">{type.icon}</div>
                <p className="font-bold text-sm">{type.label}</p>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Feedback Form */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="container mx-auto px-4 mb-20"
      >
        <div className="max-w-2xl mx-auto">
          <Card className="p-12 bg-white border-none shadow-xl">
            <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
              <MessageSquare className="h-8 w-8 text-green-600" />
              Send Your Feedback
            </h2>

            <form className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Feedback Type</label>
                <select className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-green-600 focus:outline-none">
                  <option>Select feedback type...</option>
                  <option>Bug Report</option>
                  <option>Feature Request</option>
                  <option>General Feedback</option>
                  <option>Suggestions</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Your Name</label>
                <Input
                  type="text"
                  placeholder="Full name"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-green-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                <Input
                  type="email"
                  placeholder="your.email@example.com"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-green-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Subject</label>
                <Input
                  type="text"
                  placeholder="Brief subject"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-green-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Detailed Feedback</label>
                <textarea
                  placeholder="Please share your detailed feedback, suggestions, or bug report..."
                  rows={6}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-green-600 focus:outline-none resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Rating (Optional)</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <motion.button
                      key={star}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.95 }}
                      type="button"
                      className="text-3xl cursor-pointer"
                    >
                      ⭐
                    </motion.button>
                  ))}
                </div>
              </div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 hover:shadow-lg transition-all flex items-center justify-center gap-2">
                  <Send className="h-5 w-5" />
                  Submit Feedback
                </Button>
              </motion.div>
            </form>

            {/* Success Message */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="mt-8 p-6 bg-green-50 border-l-4 border-green-600 rounded-lg flex items-center gap-3"
            >
              <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0" />
              <div>
                <p className="font-semibold text-green-900">Thank you for your feedback!</p>
                <p className="text-sm text-green-700">We'll review your submission and respond within 48 hours.</p>
              </div>
            </motion.div>
          </Card>
        </div>
      </motion.div>

      {/* Testimonials */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="bg-gradient-to-r from-green-50 to-emerald-50 py-16 px-4 rounded-2xl mb-20"
      >
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Users Say</h2>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -8 }}
                className="p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 italic">"{testimonial.feedback}"</p>
                <p className="font-bold text-gray-900">{testimonial.author}</p>
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
        className="bg-gradient-to-r from-green-600 to-emerald-600 text-white py-16 px-4 rounded-2xl"
      >
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Your Voice Matters</h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            Every piece of feedback helps us improve and serve you better.
          </p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button className="px-8 py-3 bg-white text-green-600 font-bold hover:shadow-xl transition-all">
              Give Feedback Now
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Feedback;
