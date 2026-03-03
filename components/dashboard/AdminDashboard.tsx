import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import DashboardLayout from './DashboardLayout';
import {
  LayoutDashboard, BarChart3, Users, FileText, Network, MessageCircle,
  Image, Send, Bell, Calendar, FileBarChart2, Settings, Shield,
  ChevronRight, ChevronLeft, LogOut, Menu, Zap
} from 'lucide-react';
import { cn } from '@/lib/utils';

// ── Modules ──────────────────────────────────────────────────────────────────
import { OverviewModule } from '../admin/modules/OverviewModule';
import { AnalyticsModule } from '../admin/modules/AnalyticsModule';
import { AlumniModule } from '../admin/modules/AlumniModule';
import { PostManagementModule } from '../admin/modules/PostManagementModule';
import { ConnectionManagementModule } from '../admin/modules/ConnectionManagementModule';
import { ChatMonitoringModule } from '../admin/modules/ChatMonitoringModule';
import { MediaGalleryModule } from '../admin/modules/MediaGalleryModule';
import { PublishingModule } from '../admin/modules/PublishingModule';
import { NotificationModule } from '../admin/modules/NotificationModule';
import { EventsJobsModule } from '../admin/modules/EventsJobsModule';
import { ReportsModule } from '../admin/modules/ReportsModule';
import { SystemSettingsModule } from '../admin/modules/SystemSettingsModule';
import { SecurityModule } from '../admin/modules/SecurityModule';

// ── Types ─────────────────────────────────────────────────────────────────────
type ModuleId =
  | 'overview' | 'analytics' | 'alumni' | 'posts' | 'connections'
  | 'chat' | 'media' | 'publishing' | 'notifications' | 'events'
  | 'reports' | 'settings' | 'security';

interface NavItem {
  id: ModuleId;
  label: string;
  icon: React.ElementType;
  description: string;
  accent: string;   // tailwind text-color class
  glow: string;     // tailwind shadow/glow class
  dot?: string;     // optional status dot color
}

const navItems: NavItem[] = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard, description: 'Platform summary & activity', accent: 'text-sky-400', glow: 'shadow-sky-500/40' },
  { id: 'analytics', label: 'Analytics', icon: BarChart3, description: 'Charts & growth metrics', accent: 'text-violet-400', glow: 'shadow-violet-500/40' },
  { id: 'alumni', label: 'Alumni Management', icon: Users, description: 'Manage alumni accounts', accent: 'text-emerald-400', glow: 'shadow-emerald-500/40' },
  { id: 'posts', label: 'Post Management', icon: FileText, description: 'Approve & moderate posts', accent: 'text-amber-400', glow: 'shadow-amber-500/40', dot: 'bg-amber-400' },
  { id: 'connections', label: 'Connections', icon: Network, description: 'Monitor network activity', accent: 'text-cyan-400', glow: 'shadow-cyan-500/40' },
  { id: 'chat', label: 'Chat Monitoring', icon: MessageCircle, description: 'Moderate messages', accent: 'text-pink-400', glow: 'shadow-pink-500/40' },
  { id: 'media', label: 'Media & Gallery', icon: Image, description: 'Manage uploaded files', accent: 'text-rose-400', glow: 'shadow-rose-500/40' },
  { id: 'publishing', label: 'Publishing', icon: Send, description: 'Social media publishing', accent: 'text-blue-400', glow: 'shadow-blue-500/40' },
  { id: 'notifications', label: 'Notifications', icon: Bell, description: 'System notifications', accent: 'text-yellow-400', glow: 'shadow-yellow-500/40', dot: 'bg-red-400' },
  { id: 'events', label: 'Events & Jobs', icon: Calendar, description: 'Events & job listings', accent: 'text-teal-400', glow: 'shadow-teal-500/40' },
  { id: 'reports', label: 'Reports', icon: FileBarChart2, description: 'Analytics & export', accent: 'text-indigo-400', glow: 'shadow-indigo-500/40' },
  { id: 'settings', label: 'System Settings', icon: Settings, description: 'Platform configuration', accent: 'text-slate-400', glow: 'shadow-slate-500/40' },
  { id: 'security', label: 'Security & Access', icon: Shield, description: 'Roles & audit logs', accent: 'text-red-400', glow: 'shadow-red-500/40' },
];

const moduleMap: Record<ModuleId, React.ComponentType> = {
  overview: OverviewModule, analytics: AnalyticsModule, alumni: AlumniModule,
  posts: PostManagementModule, connections: ConnectionManagementModule,
  chat: ChatMonitoringModule, media: MediaGalleryModule, publishing: PublishingModule,
  notifications: NotificationModule, events: EventsJobsModule, reports: ReportsModule,
  settings: SystemSettingsModule, security: SecurityModule,
};

// ── Component ─────────────────────────────────────────────────────────────────
const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const [activeModule, setActiveModule] = useState<ModuleId>('overview');
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const ActiveComponent = moduleMap[activeModule];
  const activeItem = navItems.find(n => n.id === activeModule)!;
  const activeIndex = navItems.findIndex(n => n.id === activeModule) + 1;

  // ── Sidebar inner content ────────────────────────────────────────────────
  const SidebarContent = ({ mobile = false }: { mobile?: boolean }) => {
    const wide = !collapsed || mobile;
    return (
      <div className="flex flex-col h-full select-none bg-[#161a23]">

        {/* ── Logo ── */}
        <div className={cn(
          'flex items-center gap-3 px-6 py-6',
          !wide && 'justify-center px-0'
        )}>
          <div className="relative shrink-0">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center shadow-[0_0_20px_rgba(99,102,241,0.4)]">
              <Zap className="h-6 w-6 text-white" />
            </div>
            {/* live dot */}
            <span className="absolute top-0 right-0 w-3 h-3 bg-emerald-400 rounded-full border-[3px] border-[#161a23]" />
          </div>
          {wide && (
            <div className="overflow-hidden">
              <p className="font-bold text-white text-[15px] leading-tight tracking-wide">Admin Panel</p>
              <p className="text-[10px] text-slate-400 mt-0.5 tracking-[0.15em] uppercase font-semibold">Adhiyamaan Connects</p>
            </div>
          )}
        </div>

        {/* ── Section label ── */}
        {wide && (
          <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-slate-500/80 px-6 pt-2 pb-4">
            Navigation
          </p>
        )}

        {/* ── Nav ── */}
        <nav className={cn('flex-1 overflow-y-auto space-y-2 pb-4', wide ? 'px-4' : 'px-2 pt-4')}>
          {navItems.map((item, index) => {
            const isActive = activeModule === item.id;
            const num = index + 1;
            return (
              <motion.button
                key={item.id}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.025, type: 'spring', stiffness: 260, damping: 24 }}
                onClick={() => { setActiveModule(item.id); setMobileOpen(false); }}
                title={!wide ? item.label : undefined}
                className={cn(
                  'w-full flex items-center rounded-2xl transition-all duration-300 relative overflow-hidden text-left group',
                  wide ? 'gap-4 px-4 py-3' : 'justify-center p-3',
                  isActive
                    ? 'bg-[#2b2d42] shadow-lg'
                    : 'hover:bg-[#1e2230]'
                )}
              >
                {/* Active glow blob */}
                {isActive && (
                  <motion.div
                    layoutId="sidebarGlow"
                    className="absolute inset-0 rounded-2xl opacity-100"
                    style={{ background: 'linear-gradient(135deg, rgba(99,102,241,0.1) 0%, rgba(139,92,246,0.1) 100%)' }}
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}

                {/* Icon container */}
                <div className={cn(
                  'relative z-10 flex items-center justify-center rounded-xl shrink-0 transition-colors duration-300',
                  wide ? 'w-10 h-10' : 'w-10 h-10',
                  isActive
                    ? `bg-indigo-500/20 text-indigo-400`
                    : 'bg-[#1e2230] text-slate-400 group-hover:text-slate-200'
                )}>
                  <item.icon style={{ width: 18, height: 18 }} />
                  {item.dot && !wide && (
                    <span className={cn('absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full border-2 border-[#161a23]', item.dot)} />
                  )}
                </div>

                {wide && (
                  <>
                    {/* Label */}
                    <span className={cn(
                      'text-[14.5px] font-semibold truncate flex-1 z-10 transition-colors duration-300',
                      isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-200'
                    )}>
                      {item.label}
                    </span>

                    {/* Number badge */}
                    <span className={cn(
                      'z-10 text-[11px] font-medium tabular-nums px-2 py-0.5 rounded-md flex items-center justify-center shrink-0 transition-all duration-300',
                      isActive
                        ? 'bg-white/10 text-white'
                        : 'bg-[#1e2230] text-slate-500'
                    )}>
                      {num.toString().padStart(2, '0')}
                    </span>

                    {/* Status dot */}
                    {item.dot && (
                      <span className={cn('absolute right-3 top-3 w-1.5 h-1.5 rounded-full z-10', item.dot)} />
                    )}
                  </>
                )}
              </motion.button>
            );
          })}
        </nav>

        {/* ── User footer border separator ── */}
        <div className="h-px bg-white/[0.05] mx-4" />

        {/* ── User footer ── */}
        <div className={cn('p-4', !wide && 'flex justify-center')}>
          {wide ? (
            <div className="flex items-center gap-3 p-2 rounded-2xl hover:bg-[#1e2230] transition-colors cursor-pointer group">
              {user?.profileImage ? (
                <img src={user.profileImage} alt={user.name} className="w-10 h-10 rounded-full object-cover shrink-0 ring-2 ring-indigo-500/30" />
              ) : (
                <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold text-sm shrink-0 ring-2 ring-indigo-500/30">
                  {user?.name?.charAt(0)?.toUpperCase() ?? 'A'}
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="text-[14px] font-bold text-white truncate leading-tight">{user?.name ?? 'Admin User'}</p>
                <p className="text-[11px] text-slate-400 truncate mt-0.5">{user?.email}</p>
              </div>
              <button
                onClick={logout}
                className="p-2 rounded-xl opacity-0 group-hover:opacity-100 hover:bg-red-500/20 text-slate-500 hover:text-red-400 transition-all duration-200"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <button onClick={logout} className="p-3 rounded-xl hover:bg-red-500/20 text-slate-500 hover:text-red-400 transition-colors">
              <LogOut className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>
    );
  };

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <DashboardLayout>
      {/* Full-bleed layout wrapper */}
      <div className="flex h-[calc(100vh-64px)] -mx-4 md:-mx-6 lg:-mx-8 -mt-4 md:-mt-6 bg-[#f6f7fb] dark:bg-[#0b0e18]">

        {/* ──────── DESKTOP SIDEBAR ──────── */}
        <motion.aside
          animate={{ width: collapsed ? 80 : 256 }}
          transition={{ type: 'spring', stiffness: 320, damping: 32 }}
          className="hidden lg:flex flex-col shrink-0 overflow-hidden relative"
          style={{ background: '#161a23' }}
        >
          <SidebarContent />

          {/* Collapse toggle pill */}
          <button
            onClick={() => setCollapsed(c => !c)}
            className="absolute top-[76px] -right-3 z-30 w-6 h-6 rounded-full flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-110"
            style={{ background: 'linear-gradient(135deg,#6366f1,#7c3aed)', boxShadow: '0 0 12px rgba(99,102,241,0.5)' }}
          >
            {collapsed
              ? <ChevronRight className="h-3 w-3 text-white" />
              : <ChevronLeft className="h-3 w-3 text-white" />}
          </button>
        </motion.aside>

        {/* ──────── MOBILE SIDEBAR ──────── */}
        <AnimatePresence>
          {mobileOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
                onClick={() => setMobileOpen(false)}
              />
              <motion.aside
                initial={{ x: -268 }} animate={{ x: 0 }} exit={{ x: -268 }}
                transition={{ type: 'spring', stiffness: 320, damping: 32 }}
                className="lg:hidden fixed left-0 top-0 bottom-0 w-[256px] z-50 flex flex-col"
                style={{ background: '#161a23' }}
              >
                <SidebarContent mobile />
              </motion.aside>
            </>
          )}
        </AnimatePresence>

        {/* ──────── MAIN AREA ──────── */}
        <div className="flex-1 flex flex-col overflow-hidden">

          {/* ── Top bar ── */}
          <div
            className="flex items-center gap-3 px-5 py-3.5 shrink-0 border-b"
            style={{ background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(12px)', borderColor: 'rgba(0,0,0,0.06)' }}
          >
            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden p-2 rounded-xl bg-slate-100 hover:bg-slate-200 transition-colors mr-1"
            >
              <Menu className="h-4 w-4 text-slate-600" />
            </button>

            {/* Module number badge */}
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center text-white text-xs font-bold shrink-0"
              style={{ background: 'linear-gradient(135deg,#6366f1,#7c3aed)', boxShadow: '0 4px 12px rgba(99,102,241,0.35)' }}
            >
              {activeIndex.toString().padStart(2, '0')}
            </div>

            {/* Breadcrumb */}
            <div className="flex items-center gap-1.5 min-w-0">
              <span className="font-semibold text-slate-800 text-sm">{activeItem.label}</span>
              <ChevronRight className="h-3.5 w-3.5 text-slate-400 shrink-0" />
              <span className="text-slate-500 text-xs truncate">{activeItem.description}</span>
            </div>

            {/* Right – module icons quick-nav row */}
            <div className="ml-auto hidden xl:flex items-center gap-1">
              {navItems.slice(0, 6).map(n => (
                <button
                  key={n.id}
                  onClick={() => setActiveModule(n.id)}
                  title={n.label}
                  className={cn(
                    'p-1.5 rounded-lg transition-all duration-150',
                    activeModule === n.id
                      ? 'bg-indigo-100 text-indigo-700'
                      : 'text-slate-400 hover:bg-slate-100 hover:text-slate-700'
                  )}
                >
                  <n.icon style={{ width: 15, height: 15 }} />
                </button>
              ))}
              <div className="w-px h-5 bg-slate-200 mx-1" />
              {navItems.slice(6).map(n => (
                <button
                  key={n.id}
                  onClick={() => setActiveModule(n.id)}
                  title={n.label}
                  className={cn(
                    'p-1.5 rounded-lg transition-all duration-150',
                    activeModule === n.id
                      ? 'bg-indigo-100 text-indigo-700'
                      : 'text-slate-400 hover:bg-slate-100 hover:text-slate-700'
                  )}
                >
                  <n.icon style={{ width: 15, height: 15 }} />
                </button>
              ))}
            </div>
          </div>

          {/* ── Module Content ── */}
          <div className="flex-1 overflow-y-auto">
            {/* Background pattern */}
            <div
              className="min-h-full"
              style={{
                backgroundImage:
                  'radial-gradient(circle at 20% 20%, rgba(99,102,241,0.04) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(139,92,246,0.03) 0%, transparent 50%)',
              }}
            >
              <div className="p-6 max-w-7xl mx-auto">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeModule}
                    initial={{ opacity: 0, y: 18, scale: 0.99 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.99 }}
                    transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
                  >
                    <ActiveComponent />
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

export default AdminDashboard;
