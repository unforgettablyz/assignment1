import StatusBadge from './StatusBadge.jsx';

// v0.1: no details link yet — AppointmentDetails is added in v0.2.
function AppointmentCard({ appointment }) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-sm font-medium text-teal-700">{appointment.purpose_category}</span>
        <StatusBadge status={appointment.status} />
      </div>
      <p className="text-lg font-semibold text-gray-900">{appointment.preferred_date}</p>
      <p className="text-gray-600">{appointment.preferred_time}</p>
    </div>
  );
}

export default AppointmentCard;
