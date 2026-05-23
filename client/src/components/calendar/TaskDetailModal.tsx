"use client";

import React, { useState } from "react";
import {
  X,
  Calendar,
  User,
  Link2,
  Clock,
  FileText,
  Pencil,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { TaskItem } from "./CreateTaskModal";

const PRIORITY_BADGE: Record<
  TaskItem["priority"],
  { label: string; bg: string; text: string }
> = {
  low: { label: "Low Priority", bg: "bg-blue-50 border-blue-100", text: "text-blue-700" },
  medium: { label: "Medium Priority", bg: "bg-amber-50 border-amber-100", text: "text-amber-700" },
  high: { label: "High Priority", bg: "bg-red-50 border-red-100", text: "text-red-700" },
};

const STATUS_TABS: { value: TaskItem["status"]; label: string }[] = [
  { value: "not-started", label: "Pending" },
  { value: "in-progress", label: "In Progress" },
  { value: "completed", label: "Completed" },
];

interface TaskDetailModalProps {
  task: TaskItem | null;
  isOpen: boolean;
  onClose: () => void;
  onStatusChange: (taskId: string, status: TaskItem["status"]) => void;
}

export default function TaskDetailModal({
  task,
  isOpen,
  onClose,
  onStatusChange,
}: TaskDetailModalProps) {
  const [activeStatus, setActiveStatus] = useState<TaskItem["status"] | null>(null);

  if (!isOpen || !task) return null;

  const currentStatus = activeStatus ?? task.status;
  const priorityInfo = PRIORITY_BADGE[task.priority];

  const formatDate = (dateStr: string) => {
    try {
      const [y, m, d] = dateStr.split("-").map(Number);
      const date = new Date(y, m - 1, d);
      return date.toLocaleDateString("en-US", {
        weekday: "short",
        month: "long",
        day: "numeric",
        year: "numeric",
      });
    } catch {
      return dateStr;
    }
  };

  const handleStatusChange = (status: TaskItem["status"]) => {
    setActiveStatus(status);
    onStatusChange(task.id, status);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full max-w-lg mx-4 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <span
            className={cn(
              "inline-flex items-center text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md border",
              priorityInfo.bg,
              priorityInfo.text
            )}
          >
            Task Details
          </span>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
          >
            <X size={16} />
          </button>
        </div>

        {/* Title + Priority */}
        <div className="px-6 pt-5 pb-3">
          <h2 className="text-[16px] font-bold text-slate-900 leading-snug">
            {task.title}
          </h2>
          {task.linkedCase && (
            <p className="text-[12px] text-slate-400 font-medium mt-1">
              {task.linkedCase}
            </p>
          )}

          <div className="flex items-center gap-2 mt-3">
            <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
              Status:
            </span>
            <span
              className={cn(
                "text-[10px] font-bold px-2 py-0.5 rounded-md border",
                priorityInfo.bg,
                priorityInfo.text
              )}
            >
              {priorityInfo.label}
            </span>
          </div>
        </div>

        {/* Status Tabs */}
        <div className="px-6 mb-4">
          <div className="flex rounded-xl border border-slate-200 overflow-hidden">
            {STATUS_TABS.map((tab) => (
              <button
                key={tab.value}
                onClick={() => handleStatusChange(tab.value)}
                className={cn(
                  "flex-1 py-2.5 text-[11px] font-bold transition-all cursor-pointer text-center border-r border-slate-200 last:border-r-0",
                  currentStatus === tab.value
                    ? tab.value === "not-started"
                      ? "bg-amber-50 text-amber-700"
                      : tab.value === "in-progress"
                      ? "bg-blue-50 text-blue-700"
                      : "bg-emerald-50 text-emerald-700"
                    : "bg-white text-slate-400 hover:bg-slate-50 hover:text-slate-600"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Details */}
        <div className="px-6 pb-5 space-y-3.5">
          {/* Description */}
          {task.description && (
            <div>
              <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider mb-1">
                Description
              </p>
              <p className="text-[12px] text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
                {task.description}
              </p>
            </div>
          )}

          {/* Info Grid */}
          <div className="grid grid-cols-2 gap-3">
            {/* Priority Level */}
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
              <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider mb-1 flex items-center gap-1">
                <FileText size={9} /> Priority Level
              </p>
              <p className="text-[12px] font-bold text-slate-800 capitalize">
                {task.priority}
              </p>
            </div>

            {/* Due Date */}
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
              <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider mb-1 flex items-center gap-1">
                <Calendar size={9} /> Due Date
              </p>
              <p className="text-[12px] font-bold text-slate-800">
                {formatDate(task.dueDate)}
              </p>
            </div>

            {/* Assignee */}
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
              <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider mb-1 flex items-center gap-1">
                <User size={9} /> Assignee
              </p>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="w-5 h-5 rounded-full bg-[#1A4331] text-white text-[9px] font-bold flex items-center justify-center">
                  {task.assignedTo.charAt(0)}
                </span>
                <p className="text-[12px] font-semibold text-slate-800">
                  {task.assignedTo}
                </p>
              </div>
            </div>

            {/* Linked Case */}
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
              <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider mb-1 flex items-center gap-1">
                <Link2 size={9} /> Linked Case
              </p>
              <p className="text-[12px] font-semibold text-slate-800 truncate">
                {task.linkedCase || "—"}
              </p>
            </div>
          </div>

          {/* Created On */}
          <div className="flex items-center gap-2 text-[10px] text-slate-400 font-medium pt-1">
            <Clock size={10} />
            Created On: {formatDate(task.createdOn)}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-end gap-2 bg-slate-50/50">
          <button
            onClick={onClose}
            className="text-[11px] font-semibold text-slate-500 hover:text-slate-700 px-4 py-2 rounded-lg transition-colors cursor-pointer border border-slate-200 bg-white"
          >
            Close
          </button>
          <button className="inline-flex items-center gap-1.5 text-[11px] font-bold text-white bg-[#1A4331] hover:bg-[#133224] px-4 py-2 rounded-lg transition-colors cursor-pointer">
            <Pencil size={11} />
            Edit Task
          </button>
        </div>
      </div>
    </div>
  );
}
