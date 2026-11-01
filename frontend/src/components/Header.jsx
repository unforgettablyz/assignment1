import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore.js';
import { authService } from '../services/authService.js';

function Header() {
  const user = useAuthStore((state) => state.user);
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await authService.logout();
    } catch {
      // Logout is stateless; the token is discarded locally either way.
    }
    clearAuth();
    navigate('/login');
  };

  return (
    <header className="bg-teal-700 text-white">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3">
        <Link to={user?.role === 'admin' ? '/admin' : '/'} className="text-lg font-semibold">
          Counselling Appointments
        </Link>
        {user && (
          <div className="flex items-center gap-3 text-sm">
            <span className="hidden sm:inline">
              {user.name} <span className="text-teal-200">({user.role})</span>
            </span>
            <button
              type="button"
              onClick={handleLogout}
              className="rounded-md bg-white px-3 py-1.5 font-medium text-teal-700 hover:bg-teal-50"
            >
              Log out
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
