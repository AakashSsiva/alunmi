import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu,
  X,
  ChevronDown,
  User,
  Bell,
  Search,
  Settings
} from 'lucide-react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';
import { mainMenuItems, moduleMenuItems } from './MenuConfig';

// Mobile Module Menu Component
const MobileModuleMenu = ({ module, delay, onItemClick }: any) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay }}
    >
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between py-3 px-4 rounded-lg hover:bg-accent hover:text-accent-foreground transition-all"
      >
        <div className="flex items-center">
          <module.icon className="h-5 w-5 mr-3" />
          {module.label}
        </div>
        <ChevronDown
          className={cn(
            "h-4 w-4 transition-transform duration-200",
            isExpanded && "transform rotate-180"
          )}
        />
      </button>
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden ml-4"
          >
            {module.submodules.map((submodule: any) =>
              submodule.submodules ? (
                <MobileNestedSubmodule
                  key={submodule.id}
                  submodule={submodule}
                  onItemClick={onItemClick}
                />
              ) : (
                <Link
                  key={submodule.id}
                  to={submodule.path}
                  onClick={onItemClick}
                >
                  <div className="py-2 px-3 text-sm hover:bg-accent hover:text-accent-foreground rounded cursor-pointer">
                    {submodule.label}
                  </div>
                </Link>
              )
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// Mobile Nested Submodule Component
const MobileNestedSubmodule = ({ submodule, onItemClick }: any) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between py-2 px-3 text-sm hover:bg-accent hover:text-accent-foreground rounded transition-all"
      >
        <span>{submodule.label}</span>
        <ChevronDown
          className={cn(
            "h-3 w-3 transition-transform duration-200",
            isExpanded && "transform rotate-180"
          )}
        />
      </button>
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden ml-4"
          >
            {submodule.submodules.map((item: any) => (
              <div key={item.id} className="flex items-center justify-between">
                <Link
                  to={item.path}
                  onClick={onItemClick}
                >
                  <div className="py-1.5 px-3 text-sm hover:bg-accent hover:text-accent-foreground rounded cursor-pointer flex items-center">
                    {item.icon && <img src={item.icon} alt={item.label} className="h-4 w-4 mr-2 rounded-sm object-cover" />}
                    {item.label}
                  </div>
                </Link>
                {item.addPath && (
                  <Link to={item.addPath} onClick={onItemClick} className="px-2">
                    <Button variant="ghost" size="icon" className="h-7 w-7 p-0">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </Link>
                )}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};


const AdvancedMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
  };

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-gradient-to-r from-blue-600 to-purple-600 shadow-2xl"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          {/* Left icon (compact) */}
          <div className="flex items-center mr-3">
            <img src="/icon.jpeg" alt="logo" className="h-8 w-8 rounded-sm object-cover" />
          </div>
          {/* Desktop Navigation - Modules */}
          <div className="hidden lg:flex items-center gap-1">
            {/* Main Menu Items */}
            {mainMenuItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <motion.div
                  key={item.id}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link to={item.path}>
                    <Button
                      variant={isActive ? "default" : "ghost"}
                      className={cn(
                        "relative px-2 py-1 rounded text-xs transition-all duration-300 text-white hover:bg-white/20 h-auto",
                        isActive
                          ? "bg-white/30 text-white shadow-lg"
                          : "hover:bg-white/20"
                      )}
                    >
                      <item.icon className="h-3 w-3 mr-1" />
                      <span className="text-xs">{item.label}</span>
                    </Button>
                  </Link>
                </motion.div>
              );
            })}

            {/* Module Menu Items with Dropdowns */}
            {moduleMenuItems.map((module) => (
              <motion.div
                key={module.id}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="px-2 py-1 rounded text-xs transition-all duration-300 hover:bg-white/20 flex items-center text-white h-auto"
                    >
                      <module.icon className="h-3 w-3 mr-1" />
                      <span className="text-xs">{module.label}</span>
                      <ChevronDown className="h-3 w-3 ml-0.5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-56">
                    {module.submodules.map((submodule: any) =>
                      (submodule as any).submodules ? (
                        // Nested dropdown for gallery with icons and add actions
                        <div key={submodule.id} className="relative group">
                          <DropdownMenuLabel className="px-2 py-1.5 text-sm font-medium cursor-default flex items-center justify-between">
                            {submodule.label}
                            <ChevronDown className="h-3 w-3 ml-1" />
                          </DropdownMenuLabel>
                          <div className="absolute left-0 top-0 ml-56 hidden group-hover:block bg-background border rounded-md shadow-lg z-50">
                            {((submodule as any).submodules as any[]).map((nestedItem: any) => (
                              <div key={nestedItem.id} className="flex items-center justify-between px-2 py-1.5 hover:bg-accent cursor-pointer whitespace-nowrap">
                                <Link to={nestedItem.path} className="flex items-center">
                                  <img src={nestedItem.icon} alt={nestedItem.label} className="h-4 w-4 mr-2 rounded-sm object-cover" />
                                  <span className="text-sm">{nestedItem.label}</span>
                                </Link>
                                {nestedItem.addPath && (
                                  <Link to={nestedItem.addPath} className="ml-3">
                                    <Button variant="ghost" size="icon" className="h-6 w-6 p-0">
                                      <Plus className="h-4 w-4" />
                                    </Button>
                                  </Link>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <DropdownMenuItem key={submodule.id} asChild>
                          <Link to={submodule.path} className="cursor-pointer">
                            <span>{submodule.label}</span>
                          </Link>
                        </DropdownMenuItem>
                      )
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </motion.div>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-2">
            {/* Search */}
            <div className="hidden lg:block">
              <AnimatePresence>
                {searchOpen && (
                  <motion.div
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: 200, opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <Input
                      placeholder="Search..."
                      className="w-full bg-white/20 text-white placeholder:text-white/70"
                      autoFocus
                      onBlur={() => setSearchOpen(false)}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSearchOpen(!searchOpen)}
                className="text-white hover:bg-white/20"
              >
                <Search className="h-4 w-4" />
              </Button>
            </div>

            {/* Notifications */}
            <Button variant="ghost" size="icon" className="relative text-white hover:bg-white/20">
              <Bell className="h-4 w-4" />
              <span className="absolute top-0 right-0 h-2 w-2 bg-yellow-300 rounded-full"></span>
            </Button>

            {/* User Menu */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2 text-white hover:bg-white/20">
                    <div className="relative">
                      <User className="h-5 w-5" />
                      <span className="absolute -bottom-1 -right-1 h-2 w-2 bg-green-400 rounded-full"></span>
                    </div>
                    <span className="hidden sm:inline font-medium">{user.name}</span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="hidden md:flex items-center gap-3">
                <motion.div whileHover={{ scale: 1.05 }}>
                  <Button variant="ghost" asChild className="text-white hover:bg-white/20">
                    <Link to="/login">Sign In</Link>
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }}>
                  <Button asChild className="bg-white text-blue-600 hover:bg-gray-100">
                    <Link to="/register">Join Now</Link>
                  </Button>
                </motion.div>
              </div>
            )}

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden text-white hover:bg-white/20"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              className="fixed top-16 left-0 right-0 bg-background border-b z-50 md:hidden max-h-[80vh] overflow-y-auto"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="container mx-auto px-4 py-4">
                <div className="space-y-2">
                  {/* Main Menu Items */}
                  {mainMenuItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                      <motion.div
                        key={item.id}
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: mainMenuItems.indexOf(item) * 0.1 }}
                      >
                        <Link to={item.path} onClick={() => setIsOpen(false)}>
                          <Button
                            variant={isActive ? "default" : "ghost"}
                            className={cn(
                              "w-full justify-start py-3 px-4 rounded-lg",
                              isActive
                                ? "bg-primary text-primary-foreground"
                                : "hover:bg-accent"
                            )}
                          >
                            <item.icon className="h-5 w-5 mr-3" />
                            {item.label}
                          </Button>
                        </Link>
                      </motion.div>
                    );
                  })}

                  {/* Module Menu Items */}
                  {moduleMenuItems.map((module, index) => (
                    <MobileModuleMenu
                      key={module.id}
                      module={module}
                      delay={mainMenuItems.length * 0.1 + index * 0.1}
                      onItemClick={() => setIsOpen(false)}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default AdvancedMenu;