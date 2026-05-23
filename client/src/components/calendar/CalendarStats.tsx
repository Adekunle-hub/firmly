"use client";

import { CalendarCheck, ListTodo, AlertTriangle, Users } from "lucide-react";
import { cn } from "@/lib/utils";

const stats = [
  {
    label: "Upcoming Hearings",
    value: 8,
    change: "+2 this week",
    changeType: "positive" as const,
    icon: CalendarCheck,
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
  },
  {
    label: "Pending Tasks",
    value: 14,
    change: "5 overdue",
    changeType: "negative" as const,
    icon: ListTodo,
    iconBg: "bg-amber-50",
    iconColor: "text-amber-600",
  },
  {
    label: "Deadlines This Week",
    value: 6,
    change: "3 critical",
    changeType: "negative" as const,
    icon: AlertTriangle,
    iconBg: "bg-red-50",
    iconColor: "text-red-500",
  },
  {
    label: "Team Events",
    value: 3,
    change: "Next: Tomorrow",
    changeType: "neutral" as const,
    icon: Users,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
  },
];

export default function CalendarStats() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.label}
            className="rounded-2xl border border-slate-200 bg-white p-4 flex items-center gap-3.5 hover:border-slate-300 transition-colors"
          >
            <div
              className={cn(
                "flex items-center justify-center w-10 h-10 rounded-xl shrink-0",
                stat.iconBg
              )}
            >
              <Icon size={18} className={stat.iconColor} />
            </div>
            <div className="min-w-0">
              <p className="text-[11px] text-slate-500 font-medium uppercase tracking-wider">
                {stat.label}
              </p>
              <div className="flex items-baseline gap-2 mt-0.5">
                <span className="text-xl font-bold text-slate-900 leading-none">
                  {stat.value}
                </span>
                <span
                  className={cn(
                    "text-[10px] font-semibold",
                    stat.changeType === "positive" && "text-emerald-600",
                    stat.changeType === "negative" && "text-red-500",
                    stat.changeType === "neutral" && "text-slate-400"
                  )}
                >
                  {stat.change}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
