"use client";

import React from "react";
import { cn } from "@/lib/utils";
import TaskCard from "./TaskCard";
import type { TaskItem } from "./calendar/CreateTaskModal";

interface TaskKanbanProps {
  tasks: TaskItem[];
  onTaskClick: (task: TaskItem) => void;
}

export default function TaskKanban({ tasks, onTaskClick }: TaskKanbanProps) {
  const statusColumns = [
    { value: "not-started" as const, label: "To Do", color: "bg-slate-50" },
    {
      value: "in-progress" as const,
      label: "In Progress",
      color: "bg-amber-50",
      badge: "bg-amber-100 text-amber-700",
    },
    {
      value: "completed" as const,
      label: "Completed",
      color: "bg-emerald-50",
      badge: "bg-emerald-100 text-emerald-700",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 overflow-x-auto pb-4">
      {statusColumns.map((column) => {
        const columnTasks = tasks.filter(
          (t) => t.status === column.value
        );
        const badgeColor =
          column.badge ||
          (column.value === "not-started"
            ? "bg-slate-100 text-slate-700"
            : "");

        return (
          <div key={column.value} className="flex flex-col gap-3">
            {/* Column Header */}
            <div className="flex items-center justify-between">
              <h2 className="text-[13px] font-semibold text-slate-700">
                {column.label}
              </h2>
              <span
                className={cn(
                  "text-[11px] font-bold px-2.5 py-0.5 rounded-md border",
                  badgeColor
                )}
              >
                {columnTasks.length}
              </span>
            </div>

            {/* Column Content */}
            <div
              className={cn(
                "flex flex-col gap-3 p-3 rounded-2xl border border-slate-200 min-h-[500px]",
                column.color
              )}
            >
              {columnTasks.length > 0 ? (
                columnTasks.map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onClick={() => onTaskClick(task)}
                  />
                ))
              ) : (
                <div className="flex items-center justify-center h-full text-center">
                  <p className="text-[12px] text-slate-400 font-medium">
                    No tasks
                  </p>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
