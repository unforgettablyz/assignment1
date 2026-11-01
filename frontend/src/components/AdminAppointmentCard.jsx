import StatusBadge from './StatusBadge.jsx';

// v0.1: list only. onApprove / onReject buttons are added in v0.2 (FR5).
function AdminAppointmentCard({ appointment }) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <span className="font-semibold text-gray-900">{appointment.student_name}</span>
        <StatusBadge status={appointment.status} />
      </div>
      <p className="text-sm font-medium text-teal-700">{appointment.purpose_category}</p>
      <p className="text-gray-700">
        {appointment.preferred_date} at {appointment.preferred_time}
      </p>
    </div>
  );
}

export default AdminAppointmentCard;
