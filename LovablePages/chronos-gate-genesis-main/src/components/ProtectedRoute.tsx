import { useAuth } from '@/contexts/AuthContext';
import { Navigate, useLocation } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen bg-hackathon-dark flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-hackathon-orange border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-hackathon-orange font-mono">AUTHENTICATING...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
