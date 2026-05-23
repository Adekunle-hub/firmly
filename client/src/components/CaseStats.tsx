"use client";

import { Card, CardContent } from "@/components/ui/card";
import { FolderOpen, Clock, FileText, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

const stats = [
  {
    label: "Total Case",
    value: "1,284",
    icon: FolderOpen,
    iconBg: "bg-emerald-50",
    iconColor: "text-[#1a7a4a]",
  },
  {
    label: "Active Cases",
    value: "452",
    icon: Clock,
    iconBg: "bg-emerald-50",
    iconColor: "text-[#1a7a4a]",
  },
  {
    label: "Draft",
    value: "12",
    icon: FileText,
    iconBg: "bg-emerald-50",
    iconColor: "text-[#1a7a4a]",
  },
  {
    label: "Completed Cases",
    value: "820",
    icon: CheckCircle2,
    iconBg: "bg-emerald-50",
    iconColor: "text-[#1a7a4a]",
  },
];

export default function CaseStats() {
  return (
    <div className="grid grid-cols-1  gap-4 md:grid-cols-3 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card
            key={stat.label}
            className="rounded-xl border border-slate-200 bg-white shadow-none transition-shadow hover:shadow-md"
          >
            <CardContent className="p-3 md:p-4 flex flex-col justify-between h-full">
              <div className="flex items-center justify-between mb-0 md:mb-3">
                <span className="text-sm font-semibold text-slate-500">{stat.label}</span>
                <div className={cn("flex h-8 w-8 items-center justify-center rounded-lg", stat.iconBg)}>
                  <Icon size={16} className={stat.iconColor} />
                </div>
              </div>

              <div className="text-3xl font-bold tracking-tight text-slate-900">
                {stat.value}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
