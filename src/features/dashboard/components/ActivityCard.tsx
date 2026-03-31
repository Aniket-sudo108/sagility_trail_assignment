// src/features/dashboard/components/ActivityCard.tsx

interface ActivityCardProps {
  user: {
    name: string;
    initials?: string;
    status?: "Productive" | "Away" | "Idle";
    activity?: string;
    time?: string;
    progress?: number;
  };
}

export const ActivityCard = ({ user }: ActivityCardProps) => {
  // Map status → color
  const statusColor =
    user.status === "Productive"
      ? "bg-green-500"
      : user.status === "Away"
      ? "bg-yellow-500"
      : "bg-gray-400";

  return (
    <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm min-w-[220px]">
      {/* Header: Avatar + Name */}
      <div className="flex items-center gap-3 mb-3">
        <div className="w-9 h-9 bg-blue-500 text-white rounded-full flex items-center justify-center font-semibold">
          {user.initials || user.name[0]}
        </div>
        <div>
          <span className="font-medium text-[#1A2332]">{user.name}</span>
          {user.status && (
            <span
              className={`ml-2 px-2 py-0.5 text-xs rounded-full text-white ${statusColor}`}
            >
              {user.status}
            </span>
          )}
        </div>
      </div>

      {/* Activity */}
      {user.activity && (
        <p className="text-sm text-gray-600 mb-1">{user.activity}</p>
      )}

      {/* Time */}
      {user.time && (
        <p className="text-xs text-gray-400 mb-2">⏱ {user.time}</p>
      )}

      {/* Progress bar */}
      {typeof user.progress === "number" && (
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="h-2 rounded-full bg-blue-500"
            style={{ width: `${user.progress}%` }}
          />
        </div>
      )}
    </div>
  );
};
