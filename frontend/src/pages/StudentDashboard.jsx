import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import AppointmentCard from '../components/AppointmentCard.jsx';
import AppointmentCardSkeleton from '../components/AppointmentCardSkeleton.jsx';
import ErrorBoundary from '../components/ErrorBoundary.jsx';
import { appointmentService } from '../services/appointmentService.js';

function StudentDashboard() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let ignore = false;

    const load = async () => {
      try {
        const data = await appointmentService.getMyAppointments();
        if (!ignore) setAppointments(data.appointments);
      } catch (err) {
        if (!ignore) setError(err.response?.data?.message || 'Unable to load appointments.');
      } finally {
        if (!ignore) setLoading(false);
      }
    };

    load();
    return () => {
      ignore = true;
    };
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <Header />
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <h1 className="text-2xl font-semibold text-gray-900">My appointments</h1>
          <Link
            to="/appointments/new"
            className="rounded-md bg-teal-700 px-4 py-2 font-medium text-white hover:bg-teal-600"
          >
            Request appointment
          </Link>
        </div>

        {loading && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <AppointmentCardSkeleton />
            <AppointmentCardSkeleton />
            <AppointmentCardSkeleton />
          </div>
        )}

        {!loading && error && (
          <p className="rounded-md bg-red-50 px-4 py-3 text-red-700">{error}</p>
        )}

        {!loading && !error && appointments.length === 0 && (
          <div className="rounded-lg border border-dashed border-gray-300 bg-white p-8 text-center text-gray-500">
            You have no appointments yet.{' '}
            <Link to="/appointments/new" className="font-medium text-teal-700 hover:underline">
              Request one
            </Link>
            .
          </div>
        )}

        {!loading && !error && appointments.length > 0 && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {appointments.map((appointment) => (
              <ErrorBoundary key={appointment.id}>
                <AppointmentCard appointment={appointment} />
              </ErrorBoundary>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default StudentDashboard;
