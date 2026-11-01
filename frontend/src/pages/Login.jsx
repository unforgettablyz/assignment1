import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import { authService } from '../services/authService.js';
import { useAuthStore } from '../store/useAuthStore.js';

function Login() {
  const user = useAuthStore((state) => state.user);
  const setAuth = useAuthStore((state) => state.setAuth);
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (user) {
    return <Navigate to={user.role === 'admin' ? '/admin' : '/'} replace />;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      const data = await authService.login(email, password);
      setAuth(data.user, data.token);
      navigate(data.user.role === 'admin' ? '/admin' : '/');
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to log in. Please try again.');
      setSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <Header />
      <main className="flex flex-1 items-center justify-center px-4 py-10">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-sm rounded-lg border border-gray-200 bg-white p-6 shadow-sm"
        >
          <h1 className="mb-1 text-2xl font-semibold text-gray-900">Log in</h1>
          <p className="mb-6 text-sm text-gray-500">Use your authorised student or administrator account.</p>

          {error && (
            <p className="mb-4 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>
          )}

          <label htmlFor="email" className="mb-1 block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="mb-4 w-full rounded-md border border-gray-300 px-3 py-2 focus:border-teal-600 focus:outline-none focus:ring-1 focus:ring-teal-600"
          />

          <label htmlFor="password" className="mb-1 block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            id="password"
            type="password"
            required
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="mb-6 w-full rounded-md border border-gray-300 px-3 py-2 focus:border-teal-600 focus:outline-none focus:ring-1 focus:ring-teal-600"
          />

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-md bg-teal-700 px-4 py-2 font-medium text-white hover:bg-teal-600 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? 'Logging in…' : 'Log in'}
          </button>
        </form>
      </main>
      <Footer />
    </div>
  );
}

export default Login;
