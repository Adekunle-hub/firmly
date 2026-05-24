"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ShieldCheck, AlertCircle, FileSpreadsheet, UserCheck } from "lucide-react";
import { cn } from "@/lib/utils";

interface StrategicGrowthCardProps {
  onViewMetrics: () => void;
}

const mockChecks = [
  {
    icon: ShieldCheck,
    label: "Conflict check",
    status: "Passed",
    badgeStyle: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  },
  {
    icon: UserCheck,
    label: "AML Check",
    status: "Verified",
    badgeStyle: "bg-teal-500/20 text-teal-300 border-teal-500/30",
  },
  {
    icon: AlertCircle,
    label: "Compliance Alerts",
    status: "Active",
    badgeStyle: "bg-amber-500/20 text-amber-300 border-amber-500/30",
  },
  {
    icon: FileSpreadsheet,
    label: "Trust Account Audit",
    status: "Audited",
    badgeStyle: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  },
  {
    icon: CheckCircle2,
    label: "Client onboarding",
    status: "Completed",
    badgeStyle: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  },
];

export default function StrategicGrowthCard({ onViewMetrics }: StrategicGrowthCardProps) {
  return (
    <div className="relative overflow-hidden rounded-xl bg-linear-to-br from-[#1A4331] to-[#0A1D15] text-white p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 min-h-55">
      {/* Background radial glow */}
      <div className="absolute right-0 top-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Left Column: Text & Actions */}
      <div className="flex-1 space-y-4 z-10">
        <div className="space-y-2">
          <h2 className="text-xl md:text-2xl font-bold tracking-tight">
            Q4 Strategic Growth
          </h2>
          <p className="text-sm md:text-sm text-emerald-100/80 leading-relaxed max-w-md">
            Our case resolution efficiency has increased by 14% this quarter. Explore the latest resource allocation reports for your team.
          </p>
        </div>

        <Button
          onClick={onViewMetrics}
          className="bg-white text-[#1A4331] hover:bg-emerald-50 h-10 px-5 text-sm font-semibold rounded-lg shadow-sm border border-transparent transition-all cursor-pointer"
        >
          View Performance Metrics
        </Button>
      </div>

      {/* Right Column: Floating Status Chips Mockup */}
      <div className="w-full md:w-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-2.5 z-10 shrink-0">
        {mockChecks.map((check, index) => {
          const Icon = check.icon;
          return (
            <div
              key={index}
              className={cn(
                "flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/10 backdrop-blur-xs text-[11px] font-medium min-w-32.5 transition-transform duration-300 hover:scale-[1.03]",
                index === 4 && "col-span-2 sm:col-span-1 md:col-span-2 lg:col-span-1"
              )}
            >
              <div className="flex h-5 w-5 items-center justify-center rounded-md bg-white/10 text-emerald-300">
                <Icon size={12} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-emerald-100/90 truncate leading-none text-[10px] mb-1">
                  {check.label}
                </p>
                <span
                  className={cn(
                    "inline-block px-1.5 py-0.5 rounded-sm text-[8px] font-bold border leading-none",
                    check.badgeStyle
                  )}
                >
                  {check.status}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
