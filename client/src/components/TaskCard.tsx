"use client";

import React from "react";
import { cn } from "@/lib/utils";
import type { TaskItem } from "./calendar/CreateTaskModal";

interface TaskCardProps {
  task: TaskItem;
  onClick: () => void;
}

// Fixed by explicitly typing the object keys to match TaskItem['priority']
const PRIORITY_STYLES: Record<TaskItem["priority"], { bg: string; text: string; badge: string }> = {
  low: {
    bg: "bg-blue-50 border-blue-100",
    text: "text-blue-700",
    badge: "bg-blue-100 text-blue-700",
  },
  medium: {
    bg: "bg-amber-50 border-amber-100",
    text: "text-amber-700",
    badge: "bg-amber-100 text-amber-700",
  },
  high: {
    bg: "bg-red-50 border-red-100",
    text: "text-red-700",
    badge: "bg-red-100 text-red-700",
  },
};

export default function TaskCard({ task, onClick }: TaskCardProps) {
  const priorityStyle = PRIORITY_STYLES[task.priority];

  const formatDate = (dateStr: string) => {
    try {
      const [y, m, d] = dateStr.split("-").map(Number);
      const date = new Date(y, m - 1, d);
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <button
      onClick={onClick}
      className={cn(
        "text-left p-3.5 rounded-xl border transition-all cursor-pointer group w-full",
        "hover:shadow-md hover:border-slate-300",
        "bg-white border-slate-200"
      )}
    >
      {/* Priority Badge */}
      <div className="flex items-start justify-between gap-2 mb-2">
        <span
          className={cn(
            "text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border",
            priorityStyle.badge
          )}
        >
          {task.priority} Priority
        </span>
      </div>

      {/* Title */}
      <h3 className="text-[12px] font-bold text-slate-900 leading-snug mb-2 line-clamp-2">
        {task.title}
      </h3>

      {/* Case Title */}
      {task.linkedCase && (
        <p className="text-[10px] text-slate-500 font-medium mb-2 truncate">
          {task.linkedCase}
        </p>
      )}

      {/* Footer: Date and Status */}
      <div className="flex items-center justify-between pt-2 border-t border-slate-100">
        <span className="text-[10px] text-slate-400 font-medium">
          {formatDate(task.dueDate)}
        </span>
        <span className="text-[9px] text-slate-400 font-medium">
          {task.assignedTo}
        </span>
      </div>
    </button>
  );
}