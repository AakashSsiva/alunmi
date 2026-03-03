import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, MessageSquare } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const ContactInfo = () => {
  const contacts = [
    {
      icon: Mail,
      title: 'Email',
      details: 'principal@adhiyamaan.ac.in',
      subtext: 'office@adhiyamaan.ac.in',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Phone,
      title: 'Phone',
      details: '+91 4344 260570',
      subtext: 'Mon-Fri, 9 AM - 5 PM IST',
      color: 'from-green-500 to-teal-500',
    },
    {
      icon: MapPin,
      title: 'Address',
      details: 'Dr. M.G.R Nagar, Hosur',
      subtext: 'Tamil Nadu 635 109',
      color: 'from-red-500 to-pink-500',
    },
    {
      icon: Clock,
      title: 'Working Hours',
      details: '9 AM - 5 PM IST',
      subtext: 'Monday to Saturday',
      color: 'from-purple-500 to-pink-500',
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
        <img src="/icon.jpeg" alt="Logo" className="h-20 w-20 rounded-full shadow-lg border-2 border-indigo-600" />
      </motion.div>

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-4 mb-16"
      >
        <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
          Contact Us
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl">
          Get in touch with our team. We'd love to hear from you.
        </p>
      </motion.div>

      {/* Contact Info Cards */}
      <div className="container mx-auto px-4 mb-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {contacts.map((contact, index) => {
            const Icon = contact.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -8 }}
                className="group"
              >
                <Card className="h-full p-8 bg-gradient-to-br from-white to-slate-50 border-none shadow-md hover:shadow-xl transition-shadow overflow-hidden relative">
                  <motion.div
                    className={`absolute -right-12 -top-12 w-24 h-24 bg-gradient-to-r ${contact.color} rounded-full opacity-10 group-hover:opacity-20 transition-opacity`}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                  />

                  <div className="relative z-10">
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: 360 }}
                      transition={{ duration: 0.6 }}
                      className={`inline-block p-4 bg-gradient-to-r ${contact.color} text-white rounded-lg mb-4`}
                    >
                      <Icon className="h-8 w-8" />
                    </motion.div>

                    <h3 className="text-xl font-bold mb-2 text-gray-900">{contact.title}</h3>
                    <p className="text-lg font-semibold text-gray-800 mb-1">{contact.details}</p>
                    <p className="text-sm text-gray-600">{contact.subtext}</p>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Contact Form Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="container mx-auto px-4 mb-20"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Form */}
          <motion.div
            initial={{ x: -30, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <Card className="p-8 bg-white border-none shadow-xl">
              <h2 className="text-3xl font-bold mb-6">Get In Touch</h2>

              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Name</label>
                  <Input
                    type="text"
                    placeholder="Your name"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-indigo-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                  <Input
                    type="email"
                    placeholder="your.email@example.com"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-indigo-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Subject</label>
                  <Input
                    type="text"
                    placeholder="How can we help?"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-indigo-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
                  <textarea
                    placeholder="Your message"
                    rows={5}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-indigo-600 focus:outline-none resize-none"
                  />
                </div>

                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 text-white hover:shadow-lg transition-all py-3">
                    Send Message
                  </Button>
                </motion.div>
              </form>
            </Card>
          </motion.div>

          {/* Info & Map Placeholder */}
          <motion.div
            initial={{ x: 30, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <Card className="h-80 rounded-xl overflow-hidden border-none shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1945.3138870344588!2d77.8282305!3d12.7214588!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae713f00000001%3A0xb7f85f549e7e4a1f!2sAdhiyamaan%20College%20of%20Engineering!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Maps Location"
              ></iframe>
            </Card>

            <Card className="p-8 bg-gradient-to-br from-white to-indigo-50 border-none shadow-lg">
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Quick Response</h3>
              <div className="space-y-4">
                <motion.div whileHover={{ x: 4 }} className="flex items-center gap-3">
                  <MessageSquare className="h-5 w-5 text-indigo-600 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">Email Support</p>
                    <p className="text-sm text-gray-600">Usually replies within 24 hours</p>
                  </div>
                </motion.div>
                <motion.div whileHover={{ x: 4 }} className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-indigo-600 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">Phone Support</p>
                    <p className="text-sm text-gray-600">Available 9 AM - 6 PM IST</p>
                  </div>
                </motion.div>
              </div>
            </Card>
          </motion.div>
        </div>
      </motion.div>

      {/* FAQ Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="bg-gradient-to-r from-indigo-50 to-blue-50 py-16 px-4 rounded-2xl"
      >
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto"
          >
            {[
              {
                q: 'Where is the college located?',
                a: 'The college is situated in Hosur, Krishnagiri district, Tamil Nadu, near the Karnataka border.',
              },
              {
                q: 'What are the office timings?',
                a: 'The administrative office works from 9:00 AM to 5:00 PM, Monday to Saturday.',
              },
              {
                q: 'How can alumni request transcripts?',
                a: 'Alumni can contact the Controller of Examinations or the administrative office via email.',
              },
              {
                q: 'Is there accommodation for visiting alumni?',
                a: 'Yes, the college offers guest house facilities for alumni. Please contact us in advance.',
              },
            ].map((faq, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow"
              >
                <h4 className="font-bold text-lg text-gray-900 mb-3">{faq.q}</h4>
                <p className="text-gray-600">{faq.a}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default ContactInfo;
