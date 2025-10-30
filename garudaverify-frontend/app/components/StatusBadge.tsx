"use client";

interface StatusBadgeProps {
  status: string;
}

const statusConfig: Record<string, { bg: string; text: string; label: string }> = {
  DRAFT: { bg: "bg-gray-100", text: "text-gray-800", label: "Draft" },
  ASSIGNED: { bg: "bg-blue-100", text: "text-blue-800", label: "Assigned" },
  IN_PROGRESS: { bg: "bg-yellow-100", text: "text-yellow-800", label: "In Progress" },
  ON_HOLD: { bg: "bg-orange-100", text: "text-orange-800", label: "On Hold" },
  COMPLETED: { bg: "bg-green-100", text: "text-green-800", label: "Completed" },
  REJECTED: { bg: "bg-red-100", text: "text-red-800", label: "Rejected" }
};

export const StatusBadge = ({ status }: StatusBadgeProps) => {
  const config = statusConfig[status] || statusConfig.DRAFT;

  return (
    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${config.bg} ${config.text}`}>
      {config.label}
    </span>
  );
};
