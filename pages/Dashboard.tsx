import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import AdminDashboard from '@/pages/AdminDashboard';
import AlumniDashboard from '@/pages/AlumniDashboard';

const Dashboard = () => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return user?.role === 'admin' ? <AdminDashboard /> : <AlumniDashboard />;
};

export default Dashboard;
