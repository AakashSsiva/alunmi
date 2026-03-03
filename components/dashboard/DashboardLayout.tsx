import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import {
  LayoutDashboard,
  Users,
  Briefcase,
  Calendar,
  FileText,
  Settings,
  LogOut,
  Home,
  Menu,
} from 'lucide-react';
import { useState } from 'react';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navigationItems = user?.role === 'admin'
    ? [
      { icon: <LayoutDashboard className="h-5 w-5" />, label: 'Dashboard', path: '/dashboard' },
      { icon: <Users className="h-5 w-5" />, label: 'Alumni Directory', path: '/directory' },
      { icon: <Briefcase className="h-5 w-5" />, label: 'Jobs', path: '/jobs' },
      { icon: <Calendar className="h-5 w-5" />, label: 'Events', path: '/events' },
      { icon: <FileText className="h-5 w-5" />, label: 'News', path: '/news' },
      { icon: <Settings className="h-5 w-5" />, label: 'Settings', path: '/settings' },
    ]
    : [
      { icon: <LayoutDashboard className="h-5 w-5" />, label: 'Dashboard', path: '/dashboard' },
      { icon: <Users className="h-5 w-5" />, label: 'Directory', path: '/directory' },
      { icon: <Briefcase className="h-5 w-5" />, label: 'Jobs', path: '/jobs' },
      { icon: <Calendar className="h-5 w-5" />, label: 'Events', path: '/events' },
      { icon: <FileText className="h-5 w-5" />, label: 'News', path: '/news' },
      { icon: <Settings className="h-5 w-5" />, label: 'Settings', path: '/settings' },
    ];

  return (
    <div className="min-h-screen bg-background">
      {/* Top Navigation */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center px-4">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden mr-2"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <Menu className="h-5 w-5" />
          </Button>
          <Link to="/" className="flex items-center gap-2 font-bold text-xl">
            <img src="/icon.jpeg" alt="ACE Alumni" className="h-8 w-8 rounded-lg object-cover" />
          </Link>
          <div className="ml-auto flex items-center gap-4">
            <Link to="/">
              <Button variant="ghost" size="sm">
                <Home className="h-4 w-4 mr-2" />
                Home
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <div className="hidden sm:block text-sm">
                <p className="font-medium">{user?.name}</p>
                <p className="text-xs text-muted-foreground capitalize">{user?.role}</p>
              </div>
              <Button variant="ghost" size="icon" onClick={handleLogout}>
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
            } md:translate-x-0 fixed md:sticky top-16 z-40 h-[calc(100vh-4rem)] w-64 border-r bg-background transition-transform`}
        >
          <nav className="flex flex-col gap-2 p-4">
            {navigationItems.map((item) => (
              <Link key={item.path} to={item.path}>
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => setSidebarOpen(false)}
                >
                  {item.icon}
                  <span className="ml-3">{item.label}</span>
                </Button>
              </Link>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 md:p-8">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-background/80 backdrop-blur-sm md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default DashboardLayout;
