function AppointmentCardSkeleton() {
  return (
    <div className="animate-pulse rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <div className="h-4 w-20 rounded bg-gray-200" />
        <div className="h-5 w-16 rounded-full bg-gray-200" />
      </div>
      <div className="mb-2 h-6 w-32 rounded bg-gray-200" />
      <div className="h-4 w-16 rounded bg-gray-200" />
    </div>
  );
}

export default AppointmentCardSkeleton;
