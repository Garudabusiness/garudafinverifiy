"use client";

interface PriorityBadgeProps {
  priority: string;
}

const priorityConfig: Record<string, { bg: string; text: string; label: string }> = {
  LOW: { bg: "bg-green-100", text: "text-green-800", label: "Low" },
  NORMAL: { bg: "bg-blue-100", text: "text-blue-800", label: "Normal" },
  HIGH: { bg: "bg-orange-100", text: "text-orange-800", label: "High" },
  URGENT: { bg: "bg-red-100", text: "text-red-800", label: "Urgent" }
};

export const PriorityBadge = ({ priority }: PriorityBadgeProps) => {
  const config = priorityConfig[priority] || priorityConfig.NORMAL;

  return (
    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${config.bg} ${config.text}`}>
      {config.label}
    </span>
  );
};
