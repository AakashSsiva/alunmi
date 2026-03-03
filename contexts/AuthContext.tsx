import React, { createContext, useContext, useState, useEffect } from 'react';
import { apiFetch } from '@/lib/utils';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'alumni';
  department?: string;
  graduationYear?: number;
  company?: string;
  position?: string;
  profileImage?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (data: Partial<User> & { email: string; password: string }) => Promise<void>;
  logout: () => void;
  updateUser: (fields: Partial<User>) => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Demo users for testing when backend is not available
const DEMO_USERS: Record<string, { password: string; user: User }> = {
  'admin@example.com': {
    password: 'admin123',
    user: {
      id: '1',
      email: 'admin@example.com',
      name: 'Admin User',
      role: 'admin',
    },
  },
  'alumni@example.com': {
    password: 'alumni123',
    user: {
      id: '2',
      email: 'alumni@example.com',
      name: 'John Alumni',
      role: 'alumni',
      department: 'Computer Science',
      graduationYear: 2020,
      company: 'Tech Corp',
      position: 'Software Engineer',
    },
  },
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('alumni_user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);

      // Verify token and fetch latest profile (including massive profileImage) on mount
      const token = localStorage.getItem('auth_token');
      if (token && !token.startsWith('demo_token_')) {
        apiFetch<any>('/api/auth/profile')
          .then(data => {
            if (data && data.email) {
              const freshUser = { ...parsedUser, ...data, id: String(data.id), role: data.role.toLowerCase() };
              setUser(freshUser);
            }
          })
          .catch(err => console.error('Failed to fetch profile on mount:', err));
      }
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      // Try API login first
      const res = await apiFetch<{ token: string; user: { id: number; name: string; email: string; role: string; profileImage?: string; } }>(
        '/api/auth/login',
        { method: 'POST', body: JSON.stringify({ email, password }) }
      );
      localStorage.setItem('auth_token', res.token);
      const mapped: User = {
        id: String(res.user.id),
        email: res.user.email,
        name: res.user.name,
        role: res.user.role.toLowerCase() as 'admin' | 'alumni',
        profileImage: res.user.profileImage,
      };
      setUser(mapped);

      // Don't store massive Base64 strings in localStorage
      const { profileImage, ...userForStorage } = mapped;
      localStorage.setItem('alumni_user', JSON.stringify(userForStorage));
    } catch (error) {
      // Fallback to demo login if API is not available
      const demoUser = DEMO_USERS[email.toLowerCase()];
      if (demoUser && demoUser.password === password) {
        setUser(demoUser.user);
        localStorage.setItem('alumni_user', JSON.stringify(demoUser.user));
        localStorage.setItem('auth_token', 'demo_token_' + Date.now());
        return;
      }
      throw new Error('Invalid credentials');
    }
  };

  const register = async (data: Partial<User> & { email: string; password: string }) => {
    try {
      await apiFetch('/api/auth/register', {
        method: 'POST',
        body: JSON.stringify({
          name: data.name || data.email.split('@')[0],
          email: data.email,
          password: data.password,
          role: 'ALUMNI',
        }),
      });
      await login(data.email, data.password);
    } catch (error) {
      // For demo, just create a mock user
      const mockUser: User = {
        id: String(Date.now()),
        email: data.email,
        name: data.name || data.email.split('@')[0],
        role: 'alumni',
      };
      setUser(mockUser);
      localStorage.setItem('alumni_user', JSON.stringify(mockUser));
      localStorage.setItem('auth_token', 'demo_token_' + Date.now());
    }
  };

  const updateUser = (fields: Partial<User>) => {
    if (user) {
      const newUser = { ...user, ...fields };
      setUser(newUser);

      // Store user without the profileImage to prevent QuotaExceededError
      const { profileImage, ...userForStorage } = newUser;
      localStorage.setItem('alumni_user', JSON.stringify(userForStorage));
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('alumni_user');
    localStorage.removeItem('auth_token');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, updateUser, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
