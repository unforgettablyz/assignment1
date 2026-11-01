import { Navigate, Route, Routes } from 'react-router-dom';
import Login from './pages/Login.jsx';
import StudentDashboard from './pages/StudentDashboard.jsx';
import AppointmentForm from './pages/AppointmentForm.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';
import RequireRole from './components/RequireRole.jsx';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={
          <RequireRole role="student">
            <StudentDashboard />
          </RequireRole>
        }
      />
      <Route
        path="/appointments/new"
        element={
          <RequireRole role="student">
            <AppointmentForm />
          </RequireRole>
        }
      />
      <Route
        path="/admin"
        element={
          <RequireRole role="admin">
            <AdminDashboard />
          </RequireRole>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
