import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import {
  LayoutDashboard, FileText, Network, MessageCircle, Bell,
  Calendar, User, ChevronRight, ChevronLeft, LogOut, Menu,
  Upload, CheckCircle, Clock, AlertCircle, Loader2, Send, Zap,
  Users, Briefcase, TrendingUp, PlusCircle, X
} from 'lucide-react';
import { cn, apiFetch } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { connectionService } from '@/services/connection.service';

type ModuleId = 'overview' | 'posts' | 'network' | 'messages' | 'notifications' | 'events' | 'profile';

interface NavItem {
  id: ModuleId;
  label: string;
  icon: React.ElementType;
  description: string;
  accent: string;
  dot?: string;
}

const navItems: NavItem[] = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard, description: 'Your activity summary', accent: 'text-sky-400' },
  { id: 'posts', label: 'My Posts', icon: FileText, description: 'Manage your posts', accent: 'text-violet-400', dot: 'bg-amber-400' },
  { id: 'network', label: 'My Network', icon: Network, description: 'Connections & requests', accent: 'text-emerald-400' },
  { id: 'messages', label: 'Messages', icon: MessageCircle, description: 'Chat with your network', accent: 'text-pink-400' },
  { id: 'notifications', label: 'Notifications', icon: Bell, description: 'Platform alerts', accent: 'text-yellow-400', dot: 'bg-red-400' },
  { id: 'events', label: 'Events & Jobs', icon: Calendar, description: 'Upcoming events & jobs', accent: 'text-teal-400' },
  { id: 'profile', label: 'My Profile', icon: User, description: 'Edit your profile', accent: 'text-indigo-400' },
];

// ─────────────────────────── Module: Overview ────────────────────────────────
const OverviewModule = ({ user, posts, connections, notifications }: any) => {
  const navigate = useNavigate();
  const stats = [
    { label: 'My Posts', value: posts.length, icon: FileText, color: 'from-violet-500 to-violet-600', onClick: () => { } },
    { label: 'Connections', value: connections.length, icon: Users, color: 'from-emerald-500 to-emerald-600', onClick: () => navigate('/connections') },
    { label: 'Notifications', value: notifications.filter((n: any) => !n.isRead).length, icon: Bell, color: 'from-amber-500 to-amber-600', onClick: () => { } },
  ];
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Welcome back, {user?.name?.split(' ')[0]}! 👋</h2>
        <p className="text-slate-500 text-sm mt-1">Here's what's happening in your network today.</p>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {stats.map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }} whileHover={{ y: -4 }}>
            <Card onClick={s.onClick} className="border-0 shadow-md hover:shadow-xl transition-all cursor-pointer overflow-hidden">
              <div className={`h-1 bg-gradient-to-r ${s.color}`} />
              <CardContent className="p-5 flex items-center gap-4">
                <div className={`p-2.5 rounded-xl bg-gradient-to-br ${s.color} shadow-md`}><s.icon className="h-5 w-5 text-white" /></div>
                <div><p className="text-2xl font-bold text-slate-800 dark:text-white">{s.value}</p><p className="text-xs text-slate-500">{s.label}</p></div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Recent Activity */}
      <Card className="border-0 shadow-lg">
        <CardHeader><CardTitle className="text-sm font-semibold flex items-center gap-2"><TrendingUp className="h-4 w-4 text-indigo-500" />Recent Posts</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          {posts.slice(0, 5).map((p: any) => (
            <div key={p.id} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
              <div className="min-w-0"><p className="text-sm font-medium truncate">{p.title}</p><p className="text-xs text-slate-400">{p.platform} · {new Date(p.createdAt).toLocaleDateString()}</p></div>
              <Badge className={p.status === 'APPROVED' ? 'bg-emerald-100 text-emerald-700' : p.status === 'DENIED' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'} variant="outline">{p.status}</Badge>
            </div>
          ))}
          {posts.length === 0 && <p className="text-sm text-slate-400 text-center py-6">No posts yet. Create your first post!</p>}
        </CardContent>
      </Card>
    </div>
  );
};

// ─────────────────────────── Module: My Posts ────────────────────────────────
const PostsModule = () => {
  const { toast } = useToast();
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: '', content: '', platform: 'Announcement' });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    apiFetch<any[]>('/api/posts').then(d => setPosts(Array.isArray(d) ? d : [])).catch(() => setPosts([])).finally(() => setLoading(false));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.content) return;
    setSubmitting(true);
    try {
      await apiFetch('/api/posts', { method: 'POST', body: JSON.stringify(form) });
      toast({ title: 'Post submitted!', description: "It'll appear after admin approval." });
      setForm({ title: '', content: '', platform: 'Announcement' });
      setShowForm(false);
      const fresh = await apiFetch<any[]>('/api/posts');
      setPosts(Array.isArray(fresh) ? fresh : []);
    } catch { toast({ title: 'Error', description: 'Failed to create post', variant: 'destructive' }); }
    finally { setSubmitting(false); }
  };

  const statusIcon = { PENDING: <Clock className="h-4 w-4 text-amber-500" />, APPROVED: <CheckCircle className="h-4 w-4 text-emerald-500" />, DENIED: <AlertCircle className="h-4 w-4 text-red-500" /> };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div><h2 className="text-2xl font-bold text-slate-800 dark:text-white">My Posts</h2><p className="text-slate-500 text-sm mt-1">Create and manage your community posts</p></div>
        <Button onClick={() => setShowForm(true)} className="gap-2 bg-indigo-600 hover:bg-indigo-700 shadow-sm"><PlusCircle className="h-4 w-4" />New Post</Button>
      </div>

      {/* Create form */}
      <AnimatePresence>
        {showForm && (
          <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}>
            <Card className="border-indigo-200 dark:border-indigo-900 shadow-xl">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-semibold">Create New Post</CardTitle>
                  <Button variant="ghost" size="sm" onClick={() => setShowForm(false)}><X className="h-4 w-4" /></Button>
                </div>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-3">
                  <Select value={form.platform} onValueChange={v => setForm({ ...form, platform: v })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {['Announcement', 'Jobs', 'Events', 'Mentorship'].map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}
                    </SelectContent>
                  </Select>
                  <Input placeholder="Post title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required />
                  <Textarea placeholder="Write your post content…" value={form.content} onChange={e => setForm({ ...form, content: e.target.value })} rows={4} className="resize-none" required />
                  <div className="flex gap-2">
                    <Button type="submit" className="gap-2 bg-indigo-600 hover:bg-indigo-700" disabled={submitting}>
                      {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}Submit for Review
                    </Button>
                    <Button type="button" variant="outline" onClick={() => setShowForm(false)}>Cancel</Button>
                  </div>
                  <p className="text-xs text-slate-400">ℹ️ Posts are reviewed by admin before publishing</p>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {loading ? <div className="flex justify-center py-12"><Loader2 className="h-8 w-8 animate-spin text-indigo-500" /></div> : (
        <div className="space-y-3">
          {posts.length === 0 ? (
            <Card className="border-0 shadow-sm"><CardContent className="py-14 text-center"><FileText className="h-10 w-10 mx-auto mb-3 text-slate-300" /><p className="text-slate-400 text-sm">No posts yet</p></CardContent></Card>
          ) : posts.map((p, i) => (
            <motion.div key={p.id} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}>
              <Card className="border-0 shadow-sm hover:shadow-md transition-all">
                <CardContent className="p-4 flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 shrink-0">{(statusIcon as any)[p.status] ?? <Clock className="h-4 w-4" />}</div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm">{p.title}</p>
                    <p className="text-xs text-slate-400">{p.platform} · {new Date(p.createdAt).toLocaleDateString()}</p>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2">{p.content}</p>
                    {p.adminFeedback && <div className="mt-2 p-2 rounded-lg bg-red-50 border border-red-100 text-xs text-red-800"><span className="font-semibold">Admin: </span>{p.adminFeedback}</div>}
                  </div>
                  <Badge className={p.status === 'APPROVED' ? 'bg-emerald-100 text-emerald-700' : p.status === 'DENIED' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'} variant="outline">{p.status}</Badge>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

// ─────────────────────────── Module: Network ─────────────────────────────────
const NetworkModule = () => {
  const navigate = useNavigate();
  const [connections, setConnections] = useState<any[]>([]);
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    Promise.all([connectionService.getConnections(), connectionService.getPendingRequests()])
      .then(([c, r]) => { setConnections(Array.isArray(c) ? c : []); setRequests(Array.isArray(r) ? r : []); })
      .catch(console.error).finally(() => setLoading(false));
  }, []);

  const accept = async (id: number) => { await connectionService.acceptRequest(id); toast({ title: 'Accepted!' }); setRequests(prev => prev.filter(r => r.id !== id)); };
  const reject = async (id: number) => { await connectionService.rejectRequest(id); setRequests(prev => prev.filter(r => r.id !== id)); };

  if (loading) return <div className="flex justify-center py-16"><Loader2 className="h-8 w-8 animate-spin text-indigo-500" /></div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h2 className="text-2xl font-bold text-slate-800 dark:text-white">My Network</h2><p className="text-slate-500 text-sm mt-1">{connections.length} connections · {requests.length} pending requests</p></div>
        <Button onClick={() => navigate('/connections')} className="gap-2 bg-emerald-600 hover:bg-emerald-700"><Network className="h-4 w-4" />Find Alumni</Button>
      </div>

      {requests.length > 0 && (
        <Card className="border-amber-200 dark:border-amber-900 border shadow-lg">
          <CardHeader className="pb-2"><CardTitle className="text-sm font-semibold flex items-center gap-2"><Bell className="h-4 w-4 text-amber-500" />Pending Requests ({requests.length})</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            {requests.map((r, i) => (
              <motion.div key={r.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }}
                className="flex items-center justify-between p-3 rounded-xl bg-amber-50 dark:bg-amber-900/20">
                <p className="text-sm font-medium">{r.sender?.name}</p>
                <div className="flex gap-2">
                  <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 h-7 text-xs gap-1" onClick={() => accept(r.id)}><CheckCircle className="h-3 w-3" />Accept</Button>
                  <Button size="sm" variant="outline" className="h-7 text-xs text-red-600 border-red-200" onClick={() => reject(r.id)}>Decline</Button>
                </div>
              </motion.div>
            ))}
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {connections.length === 0 ? (
          <Card className="col-span-full border-0 shadow-sm"><CardContent className="py-14 text-center"><Users className="h-10 w-10 mx-auto mb-3 text-slate-300" /><p className="text-slate-400 text-sm">No connections yet</p><Button onClick={() => navigate('/connections')} className="mt-3 bg-indigo-600">Discover Alumni</Button></CardContent></Card>
        ) : connections.map((c: any, i) => {
          const partner = c.sender?.id === c.senderId ? c.receiver : c.sender;
          const pname = partner?.name ?? c.sender?.name ?? c.receiver?.name ?? 'Alumni';
          return (
            <motion.div key={c.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
              <Card className="border-0 shadow-sm hover:shadow-md transition-all">
                <CardContent className="p-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-400 to-violet-500 flex items-center justify-center text-white font-bold text-sm shrink-0">{pname.charAt(0)}</div>
                  <div className="flex-1 min-w-0"><p className="font-medium text-sm truncate">{pname}</p><p className="text-xs text-slate-400">{partner?.email}</p></div>
                  <Button size="sm" variant="outline" className="gap-1 text-xs text-violet-600 border-violet-200 hover:bg-violet-50" onClick={() => navigate(`/messages?to=${partner?.id}`)}>
                    <MessageCircle className="h-3.5 w-3.5" />Chat
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

// ─────────────────────────── Module: Notifications ───────────────────────────
const NotificationsModule = () => {
  const [notifs, setNotifs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    apiFetch<any>('/api/notifications').then(d => {
      const arr = Array.isArray(d) ? d : d?.notifications ?? [];
      setNotifs(arr);
    }).catch(() => setNotifs([])).finally(() => setLoading(false));
  }, []);

  const typeColors: Record<string, string> = { BROADCAST: 'bg-violet-100 text-violet-700', CONNECTION_ACCEPTED: 'bg-emerald-100 text-emerald-700', POST_APPROVED: 'bg-blue-100 text-blue-700', POST_DENIED: 'bg-red-100 text-red-700' };

  return (
    <div className="space-y-5">
      <div><h2 className="text-2xl font-bold text-slate-800 dark:text-white">Notifications</h2><p className="text-slate-500 text-sm mt-1">{notifs.filter(n => !n.isRead).length} unread</p></div>
      {loading ? <div className="flex justify-center py-12"><Loader2 className="h-8 w-8 animate-spin text-indigo-500" /></div> : (
        <div className="space-y-2">
          {notifs.length === 0 ? <Card className="border-0 shadow-sm"><CardContent className="py-14 text-center"><Bell className="h-10 w-10 mx-auto mb-3 text-slate-300" /><p className="text-slate-400 text-sm">No notifications</p></CardContent></Card>
            : notifs.map((n, i) => (
              <motion.div key={n.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.03 }}>
                <Card className={`border-0 shadow-sm transition-all ${!n.isRead ? 'ring-1 ring-indigo-200 dark:ring-indigo-800' : ''}`}>
                  <CardContent className="p-4 flex items-start gap-3">
                    {!n.isRead && <div className="w-2 h-2 bg-indigo-500 rounded-full mt-1.5 shrink-0" />}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-0.5">
                        <p className="font-semibold text-sm">{n.title}</p>
                        <Badge className={`text-[10px] ${typeColors[n.type] ?? 'bg-slate-100 text-slate-600'}`} variant="outline">{n.type?.replace(/_/g, ' ') ?? 'INFO'}</Badge>
                      </div>
                      <p className="text-xs text-slate-500">{n.message}</p>
                      <p className="text-[10px] text-slate-400 mt-1">{new Date(n.createdAt).toLocaleString()}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
        </div>
      )}
    </div>
  );
};

// ─────────────────────────── Module: Events & Jobs ─────────────────────────
const EventsJobsModule = () => {
  const navigate = useNavigate();
  return (
    <div className="space-y-5">
      <div><h2 className="text-2xl font-bold text-slate-800 dark:text-white">Events & Jobs</h2><p className="text-slate-500 text-sm mt-1">Explore upcoming events and career opportunities</p></div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="border-0 shadow-lg hover:shadow-xl transition-all cursor-pointer" onClick={() => navigate('/events')}>
          <CardContent className="p-6">
            <div className="p-3 rounded-2xl bg-teal-50 dark:bg-teal-950/30 w-fit mb-4"><Calendar className="h-6 w-6 text-teal-600" /></div>
            <h3 className="font-bold text-slate-800 dark:text-white mb-1">Upcoming Events</h3>
            <p className="text-sm text-slate-500">Reunions, workshops, and alumni gatherings.</p>
            <Button className="mt-4 bg-teal-600 hover:bg-teal-700 gap-2 text-sm w-full"><Calendar className="h-4 w-4" />View Events</Button>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-lg hover:shadow-xl transition-all cursor-pointer" onClick={() => navigate('/jobs')}>
          <CardContent className="p-6">
            <div className="p-3 rounded-2xl bg-blue-50 dark:bg-blue-950/30 w-fit mb-4"><Briefcase className="h-6 w-6 text-blue-600" /></div>
            <h3 className="font-bold text-slate-800 dark:text-white mb-1">Job Opportunities</h3>
            <p className="text-sm text-slate-500">Posted by fellow alumni and organizations.</p>
            <Button className="mt-4 bg-blue-600 hover:bg-blue-700 gap-2 text-sm w-full"><Briefcase className="h-4 w-4" />Browse Jobs</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// ─────────────────────────── Module: Profile ─────────────────────────────────
const ProfileModule = ({ user }: { user: any }) => {
  const navigate = useNavigate();
  return (
    <div className="space-y-5">
      <div><h2 className="text-2xl font-bold text-slate-800 dark:text-white">My Profile</h2><p className="text-slate-500 text-sm mt-1">Manage your alumni profile details</p></div>
      <Card className="border-0 shadow-lg">
        <CardContent className="p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center text-white font-bold text-2xl shadow-lg ring-2 ring-indigo-500/30 overflow-hidden shrink-0">
              {user?.profileImage ? (
                <img src={user?.profileImage} alt={user?.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center">
                  {user?.name?.charAt(0)?.toUpperCase() ?? 'A'}
                </div>
              )}
            </div>
            <div>
              <h3 className="font-bold text-lg text-slate-800 dark:text-white">{user?.name}</h3>
              <p className="text-sm text-slate-500">{user?.email}</p>
              <Badge className="mt-1 bg-indigo-100 text-indigo-700" variant="outline">{user?.role?.toUpperCase() ?? 'ALUMNI'}</Badge>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 mb-5">
            {[{ label: 'Department', value: user?.department ?? '—' }, { label: 'Graduation Year', value: user?.graduationYear ?? '—' }, { label: 'Batch', value: user?.batch ?? '—' }, { label: 'Phone', value: user?.phone ?? '—' }].map(f => (
              <div key={f.label} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide">{f.label}</p>
                <p className="text-sm font-medium mt-0.5 text-slate-700 dark:text-slate-300">{f.value}</p>
              </div>
            ))}
          </div>
          <Button onClick={() => navigate('/settings')} className="w-full gap-2 bg-indigo-600 hover:bg-indigo-700"><User className="h-4 w-4" />Edit Profile & Settings</Button>
        </CardContent>
      </Card>
    </div>
  );
};

// ─────────────────────────── Module Map ──────────────────────────────────────
const AlumniDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeModule, setActiveModule] = useState<ModuleId>('overview');
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [posts, setPosts] = useState<any[]>([]);
  const [connections, setConnections] = useState<any[]>([]);
  const [notifications, setNotifications] = useState<any[]>([]);

  useEffect(() => {
    Promise.all([
      apiFetch<any[]>('/api/posts').catch(() => []),
      connectionService.getConnections().catch(() => []),
      apiFetch<any>('/api/notifications').catch(() => ({ notifications: [] })),
    ]).then(([p, c, n]) => {
      setPosts(Array.isArray(p) ? p : []);
      setConnections(Array.isArray(c) ? c : []);
      const arr = Array.isArray(n) ? n : n?.notifications ?? [];
      setNotifications(arr);
    });
  }, []);

  const activeItem = navItems.find(n => n.id === activeModule)!;
  const activeIndex = navItems.findIndex(n => n.id === activeModule) + 1;

  const renderModule = () => {
    switch (activeModule) {
      case 'overview': return <OverviewModule user={user} posts={posts} connections={connections} notifications={notifications} />;
      case 'posts': return <PostsModule />;
      case 'network': return <NetworkModule />;
      case 'messages': return navigate('/messages'), null;
      case 'notifications': return <NotificationsModule />;
      case 'events': return <EventsJobsModule />;
      case 'profile': return <ProfileModule user={user} />;
      default: return null;
    }
  };

  const SidebarContent = ({ mobile = false }: { mobile?: boolean }) => {
    const wide = !collapsed || mobile;
    return (
      <div className="flex flex-col h-full select-none bg-[#161a23]">
        {/* Logo */}
        <div className={cn('flex items-center gap-3 px-6 py-6', !wide && 'justify-center px-0')}>
          <div className="relative shrink-0">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-600 flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.4)]">
              <Zap className="h-6 w-6 text-white" />
            </div>
            <span className="absolute top-0 right-0 w-3 h-3 bg-emerald-400 rounded-full border-[3px] border-[#161a23]" />
          </div>
          {wide && (
            <div className="overflow-hidden">
              <p className="font-bold text-white text-[15px] leading-tight tracking-wide">Alumni Portal</p>
              <p className="text-[10px] text-slate-400 mt-0.5 tracking-[0.15em] uppercase font-semibold">Adhiyamaan Connects</p>
            </div>
          )}
        </div>

        {wide && <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-slate-500/80 px-6 pt-2 pb-4">Navigation</p>}

        {/* Nav */}
        <nav className={cn('flex-1 overflow-y-auto space-y-2 pb-4', wide ? 'px-4' : 'px-2 pt-4')}>
          {navItems.map((item, index) => {
            const isActive = activeModule === item.id;
            const num = index + 1;
            return (
              <motion.button
                key={item.id}
                initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.03, type: 'spring', stiffness: 260, damping: 24 }}
                onClick={() => { setActiveModule(item.id); setMobileOpen(false); }}
                title={!wide ? item.label : undefined}
                className={cn(
                  'w-full flex items-center rounded-2xl transition-all duration-300 relative overflow-hidden text-left group',
                  wide ? 'gap-4 px-4 py-3' : 'justify-center p-3',
                  isActive ? 'bg-[#2b2d42] shadow-lg' : 'hover:bg-[#1e2230]'
                )}
              >
                {isActive && (
                  <motion.div layoutId="alumniGlow" className="absolute inset-0 rounded-2xl opacity-100"
                    style={{ background: 'linear-gradient(135deg, rgba(16,185,129,0.1) 0%, rgba(6,182,212,0.1) 100%)' }}
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <div className={cn(
                  'relative z-10 flex items-center justify-center rounded-xl shrink-0 transition-colors duration-300',
                  wide ? 'w-10 h-10' : 'w-10 h-10',
                  isActive ? `bg-teal-500/20 text-teal-400` : 'bg-[#1e2230] text-slate-400 group-hover:text-slate-200'
                )}>
                  <item.icon style={{ width: 18, height: 18 }} />
                  {item.dot && !wide && <span className={cn('absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full border-2 border-[#161a23]', item.dot)} />}
                </div>
                {wide && (
                  <>
                    <span className={cn('text-[14.5px] font-semibold truncate flex-1 z-10 transition-colors duration-300', isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-200')}>{item.label}</span>
                    <span className={cn('z-10 text-[11px] font-medium tabular-nums px-2 py-0.5 rounded-md flex items-center justify-center shrink-0 transition-all duration-300', isActive ? 'bg-white/10 text-white' : 'bg-[#1e2230] text-slate-500')}>{num.toString().padStart(2, '0')}</span>
                    {item.dot && <span className={cn('absolute right-3 top-3 w-1.5 h-1.5 rounded-full z-10', item.dot)} />}
                  </>
                )}
              </motion.button>
            );
          })}
        </nav>

        {/* User Footer Separator */}
        <div className="h-px bg-white/[0.05] mx-4" />

        {/* User Footer */}
        <div className={cn('p-4', !wide && 'flex justify-center')}>
          {wide ? (
            <div className="flex items-center gap-3 p-2 rounded-2xl hover:bg-[#1e2230] transition-colors cursor-pointer group">
              {user?.profileImage ? (
                <img src={user.profileImage} alt={user.name} className="w-10 h-10 rounded-full object-cover shrink-0 ring-2 ring-teal-500/30" />
              ) : (
                <div className="w-10 h-10 rounded-full bg-teal-500 flex items-center justify-center text-white font-bold text-sm shrink-0 ring-2 ring-teal-500/30">{user?.name?.charAt(0)?.toUpperCase() ?? 'A'}</div>
              )}
              <div className="flex-1 min-w-0"><p className="text-[13px] font-semibold text-white truncate leading-tight">{user?.name ?? 'Alumni'}</p><p className="text-[10px] text-slate-500 truncate">{user?.email}</p></div>
              <button onClick={logout} className="p-1.5 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-red-500/20 text-slate-500 hover:text-red-400 transition-all"><LogOut className="h-3.5 w-3.5" /></button>
            </div>
          ) : (
            <button onClick={logout} className="p-2.5 rounded-xl hover:bg-red-500/20 text-slate-500 hover:text-red-400 transition-colors"><LogOut className="h-4 w-4" /></button>
          )}
        </div>
      </div>
    );
  };

  return (
    <DashboardLayout>
      <div className="flex h-[calc(100vh-64px)] -mx-4 md:-mx-6 lg:-mx-8 -mt-4 md:-mt-6 bg-[#f8fafc] dark:bg-[#0b0e14]">

        {/* Desktop Sidebar */}
        <motion.aside
          animate={{ width: collapsed ? 80 : 280 }}
          transition={{ type: 'spring', stiffness: 320, damping: 32 }}
          className="hidden lg:flex flex-col shrink-0 overflow-hidden relative shadow-2xl z-20"
        >
          <SidebarContent />
          <button
            onClick={() => setCollapsed(c => !c)}
            className="absolute top-[76px] -right-3 z-30 w-6 h-6 rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110"
            style={{ background: 'linear-gradient(135deg,#10b981,#0d9488)', boxShadow: '0 0 12px rgba(16,185,129,0.5)' }}
          >
            {collapsed ? <ChevronRight className="h-3 w-3 text-white" /> : <ChevronLeft className="h-3 w-3 text-white" />}
          </button>
        </motion.aside>

        {/* Mobile Sidebar */}
        <AnimatePresence>
          {mobileOpen && (
            <>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40" onClick={() => setMobileOpen(false)} />
              <motion.aside initial={{ x: -268 }} animate={{ x: 0 }} exit={{ x: -268 }}
                transition={{ type: 'spring', stiffness: 320, damping: 32 }}
                className="lg:hidden fixed left-0 top-0 bottom-0 w-[280px] z-50 flex flex-col shadow-2xl"
              >
                <SidebarContent mobile />
              </motion.aside>
            </>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden bg-[#f8fafc] dark:bg-[#0b0e14] relative">

          {/* Topbar */}
          <div className="flex items-center gap-4 px-6 py-4 shrink-0 bg-white/60 dark:bg-[#0f111a]/80 backdrop-blur-xl border-b border-slate-200 dark:border-[#1e2230] z-10">
            <button onClick={() => setMobileOpen(true)} className="lg:hidden p-2.5 rounded-xl bg-white dark:bg-[#161a23] hover:bg-slate-50 dark:hover:bg-[#1e2230] border border-slate-200 dark:border-[#1e2230] transition-colors shadow-sm -ml-2 mr-1">
              <Menu className="h-4 w-4 text-slate-600 dark:text-slate-400" />
            </button>

            <div className="w-9 h-9 rounded-xl flex items-center justify-center text-teal-600 dark:text-teal-400 font-bold shrink-0 bg-teal-50 dark:bg-teal-500/10 border border-teal-100 dark:border-teal-500/20">
              {activeIndex.toString().padStart(2, '0')}
            </div>

            <div className="flex items-center gap-2 min-w-0">
              <span className="font-semibold text-slate-800 dark:text-slate-200 text-[15px]">{activeItem.label}</span>
              <ChevronRight className="h-4 w-4 text-slate-400 shrink-0" />
              <span className="text-slate-500 text-[13px] truncate">{activeItem.description}</span>
            </div>

            <div className="ml-auto hidden xl:flex items-center gap-1.5">
              {navItems.map(n => (
                <button
                  key={n.id} onClick={() => setActiveModule(n.id)} title={n.label}
                  className={cn(
                    'p-2 rounded-xl transition-all duration-200',
                    activeModule === n.id
                      ? 'bg-teal-50 dark:bg-teal-500/10 text-teal-600 dark:text-teal-400 shadow-sm ring-1 ring-teal-500/20'
                      : 'text-slate-500 dark:text-slate-400 hover:bg-white dark:hover:bg-[#161a23] hover:text-slate-700 dark:hover:text-slate-200 hover:shadow-sm'
                  )}
                >
                  <n.icon style={{ width: 16, height: 16 }} />
                </button>
              ))}
            </div>
          </div>

          {/* Module Content */}
          <div className="flex-1 overflow-y-auto">
            <div className="min-h-full" style={{ backgroundImage: 'radial-gradient(circle at 20% 20%, rgba(16,185,129,0.02) 0%, transparent 50%)' }}>
              <div className="p-6 max-w-5xl mx-auto">
                <AnimatePresence mode="wait">
                  <motion.div key={activeModule} initial={{ opacity: 0, y: 18, scale: 0.99 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -10, scale: 0.99 }} transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}>
                    {activeModule !== 'messages' && renderModule()}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AlumniDashboard;
