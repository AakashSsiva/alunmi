import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useState, useEffect } from 'react';
import { apiFetch } from '@/lib/utils';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, Users, TrendingUp, Plus, UserPlus, Award, Globe, Clock, MapPin, Building2, Star } from 'lucide-react';
import DashboardLayout from './DashboardLayout';

const AlumniDashboard = () => {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [dashboardData, setDashboardData] = useState({
    userJobs: { total: 0, active: 0, pending: 0 },
    userEvents: { total: 0, upcoming: 0 },
    userPosts: { total: 0 },
    connections: { total: 0 },
    suggestedConnections: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // Fetch user's jobs
      const jobs = await apiFetch<any[]>('/api/jobs');
      const userJobs = jobs.filter(job => job.status === 'APPROVED');
      const userJobsCount = userJobs.length;
      
      // Fetch user's events (registered events)
      const events = await apiFetch<any[]>('/api/events');
      const userEvents = events.filter(event => event.status === 'APPROVED');
      const userEventsCount = userEvents.length;
      
      // Fetch user's posts
      const posts = await apiFetch<any[]>('/api/posts');
      const userPostsCount = posts.length;
      
      // Fetch connections
      const sentRequests = await apiFetch<any[]>('/api/connections/sent');
      const receivedRequests = await apiFetch<any[]>('/api/connections/received');
      const acceptedConnections = [...sentRequests, ...receivedRequests].filter(req => req.status === 'ACCEPTED');
      
      // Fetch suggested connections (other alumni)
      const allAlumni = await apiFetch<any[]>('/api/directory');
      const suggestedConnections = allAlumni
        .filter(alumni => alumni.id !== user?.id)
        .slice(0, 3)
        .map(alumni => ({
          id: alumni.id,
          name: alumni.name,
          role: alumni.currentPosition || 'Alumni',
          department: `${alumni.department || 'Unknown'}, ${alumni.graduationYear || 'Unknown'}`,
          company: alumni.currentCompany
        }));

      setDashboardData({
        userJobs: { 
          total: userJobsCount, 
          active: userJobsCount, 
          pending: 0 
        },
        userEvents: { 
          total: userEventsCount, 
          upcoming: userEventsCount 
        },
        userPosts: { 
          total: userPostsCount 
        },
        connections: { 
          total: acceptedConnections.length 
        },
        suggestedConnections
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <motion.div 
        className="space-y-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Welcome Header */}
        <motion.div 
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <div>
            <motion.h1 
              className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            >
              Welcome back, {user?.name}!
            </motion.h1>
            <motion.p 
              className="text-muted-foreground text-lg mt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Manage your profile and stay connected with the ACE alumni network
            </motion.p>
          </div>
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 shadow-lg hover:shadow-xl transition-all duration-300">
                  <Plus className="h-4 w-4 mr-2" />
                  Quick Post
                </Button>
              </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create Quick Post</DialogTitle>
              </DialogHeader>
              <form onSubmit={async (e) => {
                e.preventDefault();
                const form = e.currentTarget as HTMLFormElement;
                const formData = new FormData(form);
                const title = String(formData.get('title') || '');
                const content = String(formData.get('content') || '');
                try {
                  await apiFetch('/api/posts', { method: 'POST', body: JSON.stringify({ title, content }) });
                  toast.success('Posted');
                  setOpen(false);
                } catch (err) {
                  toast.error('Failed to post');
                }
              }}>
                <div className="space-y-3">
                  <Input name="title" placeholder="Title" required />
                  <Textarea name="content" placeholder="What do you want to share?" rows={4} required />
                </div>
                <DialogFooter className="mt-4">
                  <Button type="submit">Post</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
          </motion.div>
        </motion.div>

        {/* Enhanced Profile Completion */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-purple-600/5 hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-500" />
                Complete Your Profile
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Profile Strength</span>
                  <span className="text-sm font-bold text-primary">75%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
                  <motion.div 
                    className="bg-gradient-to-r from-primary to-purple-600 h-full rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: '75%' }}
                    transition={{ delay: 0.7, duration: 1, ease: "easeOut" }}
                  />
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Award className="h-4 w-4 text-green-500" />
                    <span>Education verified</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Building2 className="h-4 w-4 text-blue-500" />
                    <span>Work experience needed</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Globe className="h-4 w-4 text-purple-500" />
                    <span>Social links needed</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Enhanced Quick Stats */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <h2 className="text-2xl font-bold mb-6">Your Dashboard Overview</h2>
          <div className="grid gap-6 md:grid-cols-3">
            <StatCard
              title="Available Jobs"
              value={loading ? "..." : dashboardData.userJobs.total.toString()}
              icon={<Briefcase className="h-6 w-6" />}
              sublabel={`${dashboardData.userJobs.active} active positions`}
              color="green"
            />
            <StatCard
              title="Upcoming Events"
              value={loading ? "..." : dashboardData.userEvents.total.toString()}
              icon={<Calendar className="h-6 w-6" />}
              sublabel={`${dashboardData.userEvents.upcoming} events this month`}
              color="blue"
            />
            <StatCard
              title="Network Growth"
              value={loading ? "..." : dashboardData.connections.total.toString()}
              icon={<Users className="h-6 w-6" />}
              sublabel={`${dashboardData.connections.total} connections`}
              color="purple"
            />
          </div>
        </motion.div>

        {/* Enhanced Quick Actions */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <h2 className="text-2xl font-bold mb-6">Quick Actions</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <motion.div
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card className="bg-gradient-to-br from-green-500/5 to-emerald-600/5 border-green-500/20 hover:shadow-xl transition-all duration-300 cursor-pointer">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-3">
                    <div className="p-2 bg-green-500/10 rounded-lg">
                      <Briefcase className="h-6 w-6 text-green-500" />
                    </div>
                    Post a Job Opportunity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Share exclusive job opportunities with your fellow alumni network
                  </p>
                  <Button className="w-full bg-green-500 hover:bg-green-600 text-white">
                    Create Job Posting
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card className="bg-gradient-to-br from-blue-500/5 to-cyan-600/5 border-blue-500/20 hover:shadow-xl transition-all duration-300 cursor-pointer">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-3">
                    <div className="p-2 bg-blue-500/10 rounded-lg">
                      <Calendar className="h-6 w-6 text-blue-500" />
                    </div>
                    Organize an Event
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Create virtual or in-person networking events and reunions
                  </p>
                  <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white">
                    Create Event
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>

        {/* Enhanced Suggested Connections */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                People You May Know
              </CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
                  <p className="text-muted-foreground">Finding connections...</p>
                </div>
              ) : dashboardData.suggestedConnections.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Users className="h-12 w-12 mx-auto mb-3 text-muted-foreground/50" />
                  <p>No connection suggestions available</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {dashboardData.suggestedConnections.map((connection, index) => (
                    <motion.div
                      key={connection.id}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.9 + index * 0.1 }}
                    >
                      <ConnectionCard
                        id={connection.id}
                        name={connection.name}
                        role={connection.role}
                        department={connection.department}
                        company={connection.company}
                      />
                    </motion.div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </DashboardLayout>
  );
};

const StatCard = ({ title, value, icon, sublabel, color }: { 
  title: string; 
  value: string; 
  icon: React.ReactNode; 
  sublabel: string;
  color?: string;
}) => {
  const colorClasses = {
    green: 'bg-gradient-to-br from-green-500/10 to-emerald-600/10 border-green-500/20 hover:border-green-500/40',
    blue: 'bg-gradient-to-br from-blue-500/10 to-cyan-600/10 border-blue-500/20 hover:border-blue-500/40',
    purple: 'bg-gradient-to-br from-purple-500/10 to-violet-600/10 border-purple-500/20 hover:border-purple-500/40',
    default: 'bg-card border-input hover:border-primary/20'
  };
  
  const selectedColor = colorClasses[color as keyof typeof colorClasses] || colorClasses.default;
  
  return (
    <motion.div
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.98 }}
    >
      <Card className={`${selectedColor} transition-all duration-300 hover:shadow-lg`}>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
          <div className="text-primary p-2 bg-primary/10 rounded-lg">
            {icon}
          </div>
        </CardHeader>
        <CardContent>
          <motion.div 
            className="text-3xl font-bold text-primary"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
          >
            {value}
          </motion.div>
          <p className="text-sm text-muted-foreground mt-2">{sublabel}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ConnectionCard = ({ id, name, role, department, company }: any) => {
  const [connecting, setConnecting] = useState(false);

  const handleConnect = async () => {
    try {
      setConnecting(true);
      await apiFetch('/api/connections/send', {
        method: 'POST',
        body: JSON.stringify({ receiverId: parseInt(id) }),
      });
      toast.success('Connection request sent!');
    } catch (error: any) {
      console.error('Error sending connection request:', error);
      toast.error(error.message || 'Failed to send connection request');
    } finally {
      setConnecting(false);
    }
  };

  return (
    <motion.div 
      className="flex items-center justify-between p-5 border rounded-xl bg-card hover:bg-muted/30 transition-all duration-300 group"
      whileHover={{ boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex items-center gap-4">
        <motion.div 
          className="relative"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="h-14 w-14 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-lg">
            {name.charAt(0)}
          </div>
          <div className="absolute bottom-0 right-0 h-4 w-4 bg-green-500 rounded-full border-2 border-white"></div>
        </motion.div>
        <div>
          <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">{name}</h3>
          <div className="flex items-center gap-2 mt-1">
            <Briefcase className="h-4 w-4 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">{role}</p>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <p className="text-xs text-muted-foreground">{department}</p>
          </div>
          {company && (
            <div className="flex items-center gap-2 mt-1">
              <Building2 className="h-4 w-4 text-muted-foreground" />
              <p className="text-xs text-muted-foreground">at {company}</p>
            </div>
          )}
        </div>
      </div>
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button 
          className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-md hover:shadow-lg transition-all duration-300"
          size="sm" 
          onClick={handleConnect}
          disabled={connecting}
        >
          <UserPlus className="h-4 w-4 mr-2" />
          {connecting ? (
            <>
              <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full mr-2" />
              Sending...
            </>
          ) : 'Connect'}
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default AlumniDashboard;
