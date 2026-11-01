import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore.js';

function RequireRole({ role, children }) {
  const user = useAuthStore((state) => state.user);

  if (!user) {
    return <Navigate to="/login" replace />;
  }
  if (user.role !== role) {
    return <Navigate to={user.role === 'admin' ? '/admin' : '/'} replace />;
  }
  return children;
}

export default RequireRole;
