import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { GraduationCap, Users, Briefcase, Calendar, Bell, ArrowRight, TrendingUp, Globe, Award, Clock, MapPin, Building, LayoutDashboard, FileText, Settings, Phone } from 'lucide-react';
import { motion } from 'framer-motion';
import AdvancedMenu from '@/components/layout/AdvancedMenu';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      <AdvancedMenu />

      {/* Hero Section with Dashboard Integration */}
      <section className="relative pt-24 pb-16 px-4">
        <div className="container max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              className="text-center lg:text-left"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-6">
                <GraduationCap className="h-5 w-5 text-primary" />
                <span className="text-primary font-medium">ACE Alumni Network</span>
              </div>

              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                  Connect, Grow,
                </span>
                <br />
                <span className="text-foreground">Succeed Together</span>
              </h1>

              <p className="text-xl text-muted-foreground mb-8 max-w-2xl">
                Join our vibrant alumni community to network, discover opportunities,
                and stay connected with fellow ACE graduates worldwide.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button asChild size="lg" className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 shadow-lg">
                  <Link to="/register">
                    Join Network <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-2 hover:shadow-md">
                  <Link to="/login">Sign In</Link>
                </Button>
              </div>
            </motion.div>

            <motion.div
              className="relative rounded-2xl overflow-hidden shadow-2xl border-8 border-white"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <img src="https://upload.wikimedia.org/wikipedia/commons/c/c4/ACE_-_Main.jpg" alt="ACE Main Administrative Block" className="w-full h-[400px] object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                <div className="text-white">
                  <p className="text-sm font-medium opacity-80 mb-2">Main Campus, Hosur</p>
                  <h3 className="text-2xl font-bold">Excellence in Engineering since 1987</h3>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <section className="py-16 px-4">
        <div className="container max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Academic Leaders</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Guided by visionaries dedicated to excellence in technical education
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <LeadershipCard
              name="Dr. G. Ranganath"
              role="Principal & HOD (Mech)"
              quote="Empowering students to become global engineering leaders through innovation and discipline."
            />
            <LeadershipCard
              name="Dr. D. Thilagavathy"
              role="HOD - CSE"
              quote="Leading the next generation of computer scientists with cutting-edge research and industry focus."
            />
            <LeadershipCard
              name="Dr. G. Fathima"
              role="HOD - IT"
              quote="Bridging the gap between academic theory and practical information technology excellence."
            />
            <LeadershipCard
              name="Dr. S. Sumathi"
              role="HOD - ECE"
              quote="Fostering an environment where electronic innovation meets global communication standards."
            />
          </div>
        </div>
      </section>
      {/* Dashboard Menu Preview */}
      <section className="py-16 px-4 bg-muted/50">
        <div className="container max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Explore Our Platform</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Access all alumni services through our intuitive dashboard
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <DashboardCard
              icon={<LayoutDashboard className="h-8 w-8" />}
              title="Dashboard"
              description="Your personalized alumni hub with analytics and insights"
              path="/dashboard"
              color="primary"
            />
            <DashboardCard
              icon={<Users className="h-8 w-8" />}
              title="Alumni Directory"
              description="Search and connect with fellow graduates worldwide"
              path="/directory"
              color="blue"
            />
            <DashboardCard
              icon={<Briefcase className="h-8 w-8" />}
              title="Career Hub"
              description="Discover job opportunities and post openings"
              path="/jobs"
              color="green"
            />
            <DashboardCard
              icon={<Calendar className="h-8 w-8" />}
              title="Events & Reunions"
              description="RSVP to events and reconnect with classmates"
              path="/events"
              color="purple"
            />
            <DashboardCard
              icon={<FileText className="h-8 w-8" />}
              title="News & Updates"
              description="Stay informed with college news and announcements"
              path="/news"
              color="orange"
            />
            <DashboardCard
              icon={<Settings className="h-8 w-8" />}
              title="Settings"
              description="Manage your profile and notification preferences"
              path="/settings"
              color="gray"
            />
          </div>
        </div>
      </section>

      {/* Visit Us Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-6">Visit Our Campus</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Located in the industrial hub of Hosur, our campus is a sprawling 125-acre park-like setting designed for innovation and excellence.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold">Address</h4>
                    <p className="text-muted-foreground">Dr. M.G.R Nagar, Hosur</p>
                    <p className="text-muted-foreground">Krishnagiri Dist, Tamil Nadu 635 109</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold">Contact</h4>
                    <p className="text-muted-foreground">Office: (04344) 260570</p>
                    <p className="text-muted-foreground">Email: office@adhiyamaan.ac.in</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="h-[400px] rounded-2xl overflow-hidden shadow-2xl border-4 border-white"
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1945.3138870344588!2d77.8282305!3d12.7214588!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae713f00000001%3A0xb7f85f549e7e4a1f!2sAdhiyamaan%20College%20of%20Engineering!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                title="ACE Hosur Campus Map"
              ></iframe>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Community Highlights */}
      <section className="py-20 px-4">
        <div className="container max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Alumni Voices</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Hear what our successful graduates have to say about their journey at ACE
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <HighlightCard
              title="Alumni Success Stories"
              items={[
                { name: "Akshay Shetty", achievement: "Head of Innovation, Zynthora.ai", time: "ACE shaped my technical foundation and character. Proud ECE 2021 Alumnus." },
                { name: "Lekha Sri K", achievement: "ISTE Best Student 2024", time: "Supportive faculty and labs helped me secure a successful career in Biotech." },
                { name: "Vimalraj", achievement: "Biomedical Systems Engineer", time: "ACE Connects gave me the network to reach my dream company in Chennai." }
              ]}
              icon={<Award className="h-6 w-6 text-yellow-500" />}
              footer={
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full text-primary hover:text-primary/80 mt-2"
                  onClick={() => window.open('https://www.youtube.com/@acehosur', '_blank')}
                >
                  Watch Alumni Spotlights <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              }
            />

            <HighlightCard
              title="Recent & Upcoming Events"
              items={[
                { name: "STEM Fest 2025", achievement: "Innovation Meet", time: "Igniting innovation in Hosur (Jan 24)" },
                { name: "NEXORA'25", achievement: "Technical Symposium", time: "Flagship National Level Event (Oct 14)" },
                { name: "ISTE Convention", achievement: "23rd Tamil Nadu Meet", time: "Engineering Excellence (Feb 14-15)" }
              ]}
              icon={<Calendar className="h-6 w-6 text-blue-500" />}
            />

            <HighlightCard
              title="Strategic Milestones"
              items={[
                { name: "Digital Library Expansion", achievement: "50,000+ Books", time: "New Digital Resource Milestone" },
                { name: "NIDHI PRAYAS Grant", achievement: "Startup Funding", time: "Rs. 1.2 Crore for innovation" },
                { name: "Global Exchange", achievement: "Malaysia MoU", time: "Strategic Partnership with TAR UMT" }
              ]}
              icon={<Briefcase className="h-6 w-6 text-green-500" />}
            />
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary to-purple-600 text-primary-foreground">
        <div className="container max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Join the ACE Family?</h2>
            <p className="text-lg md:text-xl mb-8 text-primary-foreground/90 max-w-2xl mx-auto">
              Connect with industry leaders, discover career opportunities, and be part of a global network of successful alumni.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="secondary" className="bg-white text-primary hover:bg-gray-100 shadow-lg">
                <Link to="/register">
                  Create Free Account <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <Link to="/login">Already a Member?</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

const DashboardCard = ({ icon, title, description, path, color }: {
  icon: React.ReactNode;
  title: string;
  description: string;
  path: string;
  color: string;
}) => {
  const colorClasses = {
    primary: 'hover:border-primary hover:bg-primary/5',
    blue: 'hover:border-blue-500 hover:bg-blue-500/5',
    green: 'hover:border-green-500 hover:bg-green-500/5',
    purple: 'hover:border-purple-500 hover:bg-purple-500/5',
    orange: 'hover:border-orange-500 hover:bg-orange-500/5',
    gray: 'hover:border-gray-500 hover:bg-gray-500/5'
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.98 }}
    >
      <Link to={path}>
        <Card className={`h-full transition-all duration-300 ${colorClasses[color as keyof typeof colorClasses] || colorClasses.primary}`}>
          <CardHeader>
            <div className="mb-3">{icon}</div>
            <CardTitle>{title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{description}</p>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
};

const HighlightCard = ({ title, items, icon, footer }: {
  title: string;
  items: { name: string; achievement: string; time: string }[];
  icon: React.ReactNode;
  footer?: React.ReactNode;
}) => (
  <Card className="flex flex-col">
    <CardHeader>
      <div className="flex items-center gap-2">
        {icon}
        <CardTitle>{title}</CardTitle>
      </div>
    </CardHeader>
    <CardContent className="flex-1">
      <div className="space-y-4">
        {items.map((item, index) => (
          <div key={index} className="flex items-start gap-3 pb-3 border-b last:border-0 last:pb-0">
            <div className="mt-1">
              <div className="h-2 w-2 bg-primary rounded-full"></div>
            </div>
            <div className="flex-1">
              <h4 className="font-medium">{item.name}</h4>
              <p className="text-sm text-muted-foreground">{item.achievement}</p>
              <p className="text-xs text-muted-foreground mt-1">{item.time}</p>
            </div>
          </div>
        ))}
      </div>
    </CardContent>
    {footer && (
      <div className="p-6 pt-0 border-t mt-auto">
        {footer}
      </div>
    )}
  </Card>
);

const LeadershipCard = ({ name, role, quote }: { name: string; role: string; quote: string }) => (
  <Card className="hover:shadow-lg transition-all duration-300">
    <CardHeader className="text-center">
      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
        <Users className="h-8 w-8 text-primary" />
      </div>
      <CardTitle className="text-xl">{name}</CardTitle>
      <CardDescription className="font-medium text-primary">{role}</CardDescription>
    </CardHeader>
    <CardContent className="text-center italic text-muted-foreground">
      "{quote}"
    </CardContent>
  </Card>
);

export default Home;
