import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import { appointmentService, PURPOSE_CATEGORIES } from '../services/appointmentService.js';

// v0.1: add mode only. Edit mode (FR4) is added in v0.2.
function AppointmentForm() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    preferred_date: '',
    preferred_time: '',
    purpose_category: '',
  });
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setSaving(true);
    try {
      await appointmentService.createAppointment(form);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to save the appointment.');
      setSaving(false);
    }
  };

  const inputClasses =
    'mb-4 w-full rounded-md border border-gray-300 px-3 py-2 focus:border-teal-600 focus:outline-none focus:ring-1 focus:ring-teal-600';

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <Header />
      <main className="mx-auto w-full max-w-lg flex-1 px-4 py-8">
        <Link to="/" className="mb-4 inline-block text-sm text-teal-700 hover:underline">
          ← Back to my appointments
        </Link>
        <form
          onSubmit={handleSubmit}
          className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm"
        >
          <h1 className="mb-6 text-2xl font-semibold text-gray-900">Request appointment</h1>

          {error && (
            <p className="mb-4 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>
          )}

          <label htmlFor="preferred_date" className="mb-1 block text-sm font-medium text-gray-700">
            Preferred date
          </label>
          <input
            id="preferred_date"
            name="preferred_date"
            type="date"
            required
            value={form.preferred_date}
            onChange={handleChange}
            className={inputClasses}
          />

          <label htmlFor="preferred_time" className="mb-1 block text-sm font-medium text-gray-700">
            Preferred time
          </label>
          <input
            id="preferred_time"
            name="preferred_time"
            type="time"
            required
            value={form.preferred_time}
            onChange={handleChange}
            className={inputClasses}
          />

          <label htmlFor="purpose_category" className="mb-1 block text-sm font-medium text-gray-700">
            Purpose category
          </label>
          <select
            id="purpose_category"
            name="purpose_category"
            required
            value={form.purpose_category}
            onChange={handleChange}
            className={`${inputClasses} bg-white`}
          >
            <option value="" disabled>
              Select a category
            </option>
            {PURPOSE_CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

          <button
            type="submit"
            disabled={saving}
            className="mt-2 w-full rounded-md bg-teal-700 px-4 py-2 font-medium text-white hover:bg-teal-600 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving ? 'Saving…' : 'Submit request'}
          </button>
        </form>
      </main>
      <Footer />
    </div>
  );
}

export default AppointmentForm;
