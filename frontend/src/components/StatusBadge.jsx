const STATUS_CLASSES = {
  Pending: 'bg-amber-100 text-amber-800',
  Approved: 'bg-green-100 text-green-800',
  Rejected: 'bg-red-100 text-red-800',
};

function StatusBadge({ status }) {
  const classes = STATUS_CLASSES[status] || 'bg-gray-100 text-gray-800';
  return (
    <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${classes}`}>
      {status}
    </span>
  );
}

export default StatusBadge;
