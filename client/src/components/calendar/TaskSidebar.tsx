"use client";

import React from "react";
import {
  AlertTriangle,
  Clock,
  CheckCircle2,
  Circle,
  ArrowUpRight,
  Gavel,
  FileText,
  CalendarClock,
} from "lucide-react";
import { cn } from "@/lib/utils";

export type Task = {
  id: string;
  title: string;
  caseTitle?: string;
  dueDate: string;
  dueTime?: string;
  priority: "urgent" | "high" | "medium" | "low";
  status: "pending" | "in-progress" | "completed";
  type: "filing" | "review" | "preparation" | "follow-up" | "research";
};

export type Deadline = {
  id: string;
  title: string;
  caseTitle: string;
  dueDate: string;
  daysLeft: number;
  type: "court" | "filing" | "statutory";
};

const PRIORITY_STYLES = {
  urgent: {
    bg: "bg-red-50",
    text: "text-red-700",
    border: "border-red-200",
    dot: "bg-red-500",
    label: "Urgent",
  },
  high: {
    bg: "bg-amber-50",
    text: "text-amber-700",
    border: "border-amber-200",
    dot: "bg-amber-500",
    label: "High",
  },
  medium: {
    bg: "bg-blue-50",
    text: "text-blue-700",
    border: "border-blue-200",
    dot: "bg-blue-500",
    label: "Medium",
  },
  low: {
    bg: "bg-slate-50",
    text: "text-slate-600",
    border: "border-slate-200",
    dot: "bg-slate-400",
    label: "Low",
  },
};

const STATUS_ICONS = {
  pending: Circle,
  "in-progress": Clock,
  completed: CheckCircle2,
};

const DEADLINE_TYPE_ICONS = {
  court: Gavel,
  filing: FileText,
  statutory: CalendarClock,
};

const mockTasks: Task[] = [
  {
    id: "t1",
    title: "File Motion to Dismiss",
    caseTitle: "Adewale v. Zenith Bank",
    dueDate: "2026-05-22",
    dueTime: "2:00 PM",
    priority: "urgent",
    status: "pending",
    type: "filing",
  },
  {
    id: "t2",
    title: "Prepare Witness Statement",
    caseTitle: "State v. Okofor",
    dueDate: "2026-05-23",
    dueTime: "10:00 AM",
    priority: "high",
    status: "in-progress",
    type: "preparation",
  },
  {
    id: "t3",
    title: "Review Settlement Offer",
    caseTitle: "Mojisola v. ARB Ltd",
    dueDate: "2026-05-24",
    priority: "high",
    status: "pending",
    type: "review",
  },
  {
    id: "t4",
    title: "Client Follow-up Call",
    caseTitle: "Ibrahim & Sons vs. Fidelity",
    dueDate: "2026-05-25",
    dueTime: "3:00 PM",
    priority: "medium",
    status: "pending",
    type: "follow-up",
  },
  {
    id: "t5",
    title: "Legal Research - Precedent",
    caseTitle: "Okonkwo vs. FIRS Tax",
    dueDate: "2026-05-26",
    priority: "low",
    status: "pending",
    type: "research",
  },
];

const mockDeadlines: Deadline[] = [
  {
    id: "d1",
    title: "Filing Deadline",
    caseTitle: "Adewale v. Zenith Bank",
    dueDate: "2026-05-22",
    daysLeft: 1,
    type: "filing",
  },
  {
    id: "d2",
    title: "Court Appearance",
    caseTitle: "State v. Okofor",
    dueDate: "2026-05-23",
    daysLeft: 2,
    type: "court",
  },
  {
    id: "d3",
    title: "Statutory Limitation",
    caseTitle: "Probate Matter - Estate of Balogun",
    dueDate: "2026-05-28",
    daysLeft: 7,
    type: "statutory",
  },
  {
    id: "d4",
    title: "Response Deadline",
    caseTitle: "Mojisola v. ARB Ltd",
    dueDate: "2026-05-30",
    daysLeft: 9,
    type: "filing",
  },
];

interface TaskSidebarProps {
  onTaskClick?: (task: Task) => void;
}

export default function TaskSidebar({ onTaskClick }: TaskSidebarProps) {
  return (
    <div className="flex flex-col gap-5">
      {/* Urgent Tasks */}
      <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden">
        <div className="px-4 py-3.5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-amber-50 flex items-center justify-center">
              <AlertTriangle size={12} className="text-amber-600" />
            </div>
            <h3 className="text-[13px] font-bold text-slate-900">Urgent Tasks</h3>
          </div>
          <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-100">
            {mockTasks.filter((t) => t.priority === "urgent" || t.priority === "high").length} pending
          </span>
        </div>

        <div className="p-3 space-y-2 max-h-[340px] overflow-y-auto no-scrollbar">
          {mockTasks.map((task) => {
            const priorityStyle = PRIORITY_STYLES[task.priority];
            const StatusIcon = STATUS_ICONS[task.status];
            return (
              <button
                key={task.id}
                onClick={() => onTaskClick?.(task)}
                className={cn(
                  "w-full text-left p-3 rounded-xl border transition-all cursor-pointer",
                  "hover:shadow-sm hover:border-slate-200",
                  task.status === "completed"
                    ? "bg-slate-50/50 border-slate-100 opacity-60"
                    : "bg-white border-slate-100"
                )}
              >
                <div className="flex items-start gap-2.5">
                  <StatusIcon
                    size={14}
                    className={cn(
                      "mt-0.5 shrink-0",
                      task.status === "completed" ? "text-emerald-500" : "text-slate-300",
                      task.status === "in-progress" && "text-blue-500"
                    )}
                  />
                  <div className="flex-1 min-w-0">
                    <p
                      className={cn(
                        "text-[12px] font-semibold leading-snug",
                        task.status === "completed"
                          ? "text-slate-400 line-through"
                          : "text-slate-800"
                      )}
                    >
                      {task.title}
                    </p>
                    {task.caseTitle && (
                      <p className="text-[10px] text-slate-400 mt-0.5 truncate font-medium">
                        {task.caseTitle}
                      </p>
                    )}
                    <div className="flex items-center gap-2 mt-1.5">
                      <span
                        className={cn(
                          "text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-md border",
                          priorityStyle.bg,
                          priorityStyle.text,
                          priorityStyle.border
                        )}
                      >
                        {priorityStyle.label}
                      </span>
                      {task.dueTime && (
                        <span className="text-[9px] text-slate-400 font-medium flex items-center gap-0.5">
                          <Clock size={8} />
                          {task.dueTime}
                        </span>
                      )}
                    </div>
                  </div>
                  <ArrowUpRight
                    size={12}
                    className="text-slate-300 shrink-0 mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Critical Deadlines */}
      <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden">
        <div className="px-4 py-3.5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-red-50 flex items-center justify-center">
              <AlertTriangle size={12} className="text-red-500" />
            </div>
            <h3 className="text-[13px] font-bold text-slate-900">Critical Deadlines</h3>
          </div>
        </div>

        <div className="p-3 space-y-2">
          {mockDeadlines.map((deadline) => {
            const DeadlineIcon = DEADLINE_TYPE_ICONS[deadline.type];
            const isUrgent = deadline.daysLeft <= 2;
            const isWarning = deadline.daysLeft <= 5 && deadline.daysLeft > 2;

            return (
              <div
                key={deadline.id}
                className={cn(
                  "p-3 rounded-xl border transition-all",
                  isUrgent
                    ? "bg-red-50/50 border-red-100"
                    : isWarning
                    ? "bg-amber-50/30 border-amber-100"
                    : "bg-white border-slate-100"
                )}
              >
                <div className="flex items-start gap-2.5">
                  <div
                    className={cn(
                      "w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5",
                      isUrgent ? "bg-red-100" : isWarning ? "bg-amber-100" : "bg-slate-100"
                    )}
                  >
                    <DeadlineIcon
                      size={13}
                      className={cn(
                        isUrgent
                          ? "text-red-600"
                          : isWarning
                          ? "text-amber-600"
                          : "text-slate-500"
                      )}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[12px] font-semibold text-slate-800 leading-snug">
                      {deadline.title}
                    </p>
                    <p className="text-[10px] text-slate-400 mt-0.5 truncate font-medium">
                      {deadline.caseTitle}
                    </p>
                    <div className="flex items-center justify-between mt-1.5">
                      <span className="text-[9px] text-slate-400 font-medium">
                        {deadline.dueDate}
                      </span>
                      <span
                        className={cn(
                          "text-[9px] font-bold px-1.5 py-0.5 rounded-md",
                          isUrgent
                            ? "text-red-700 bg-red-100"
                            : isWarning
                            ? "text-amber-700 bg-amber-100"
                            : "text-slate-500 bg-slate-100"
                        )}
                      >
                        {deadline.daysLeft === 0
                          ? "Today!"
                          : deadline.daysLeft === 1
                          ? "Tomorrow"
                          : `${deadline.daysLeft} days left`}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Active Court Dates Banner */}
      <div className="rounded-2xl bg-[#1A4331] p-4 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/4" />
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <Gavel size={14} className="text-emerald-300" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-300">
              Active Court Dates
            </span>
          </div>
          <p className="text-2xl font-bold leading-none">12</p>
          <p className="text-[10px] text-emerald-200/70 mt-1 font-medium">
            Across 8 active matters this quarter
          </p>
          <button className="mt-3 text-[10px] font-bold bg-white/10 hover:bg-white/20 rounded-lg px-3 py-1.5 transition-colors cursor-pointer">
            View All Court Dates →
          </button>
        </div>
      </div>
    </div>
  );
}
