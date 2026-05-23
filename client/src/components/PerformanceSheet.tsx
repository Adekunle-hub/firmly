"use client";

import React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

interface PerformanceSheetProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const pieData = [
  { name: "Litigation", value: 65, color: "#1A4331" },
  { name: "Advisory", value: 35, color: "#34D399" },
];

const utilizationData = [
  { label: "Corporate", value: 88 },
  { label: "Probate", value: 82 },
  { label: "Criminal Defense", value: 84 },
  { label: "Intellectual Property", value: 79 },
];

export default function PerformanceSheet({
  isOpen,
  onOpenChange,
}: PerformanceSheetProps) {
  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-md md:max-w-lg border-l border-slate-200 bg-white p-6 flex flex-col justify-between overflow-y-auto h-full"
      >
        <div className="space-y-6">
          {/* Header */}
          <SheetHeader className="p-0 border-b border-slate-100 pb-4">
            <SheetTitle className="text-xl font-bold text-slate-900 leading-none">
              Performance Metrics
            </SheetTitle>
            <SheetDescription className="text-xs text-slate-500 font-medium mt-1.5">
              Q4 Strategic Growth
            </SheetDescription>
          </SheetHeader>

          {/* Mini Cards Row */}
          <div className="grid grid-cols-3 gap-3">
            <div className="border border-slate-100 rounded-lg p-2.5 bg-slate-50/50 flex flex-col justify-between">
              <span className="text-[10px] font-semibold text-slate-500 leading-tight">
                Resource Efficiency
              </span>
              <div className="flex items-baseline gap-1 mt-2.5">
                <span className="text-lg font-bold text-slate-900">84%</span>
                <span className="text-[9px] font-semibold text-[#1a7a4a] bg-emerald-50 px-1 py-0.5 rounded-sm">
                  +16%
                </span>
              </div>
            </div>

            <div className="border border-slate-100 rounded-lg p-2.5 bg-slate-50/50 flex flex-col justify-between">
              <span className="text-[10px] font-semibold text-slate-500 leading-tight">
                Time to Disposition
              </span>
              <div className="flex items-baseline gap-1 mt-2.5">
                <span className="text-lg font-bold text-slate-900">112</span>
                <span className="text-[9px] font-medium text-slate-400">
                  Avg. Days
                </span>
              </div>
            </div>

            <div className="border border-slate-100 rounded-lg p-2.5 bg-slate-50/50 flex flex-col justify-between">
              <span className="text-[10px] font-semibold text-slate-500 leading-tight">
                Realization Rate
              </span>
              <div className="flex items-baseline gap-1 mt-2.5">
                <span className="text-lg font-bold text-slate-900">92.4%</span>
                <span className="text-[9px] font-semibold text-[#1a7a4a] bg-emerald-50 px-1 py-0.5 rounded-sm">
                  Stable
                </span>
              </div>
            </div>
          </div>

          {/* Donut Chart (Case by Status) */}
          <div className="border border-slate-100 rounded-xl p-4 bg-white space-y-4">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Case by Status
            </h3>
            <div className="relative h-44 w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={52}
                    outerRadius={68}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-2xl font-bold text-slate-900 leading-none">
                  342
                </span>
                <span className="text-[10px] text-slate-400 font-bold mt-1">
                  Active
                </span>
              </div>
            </div>

            {/* Legend */}
            <div className="flex justify-center gap-6 pt-1">
              {pieData.map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-xs font-semibold text-slate-700">
                    {item.name}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">
                    {item.value}%
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Case Utilization (HTML Progress Bars) */}
          <div className="border border-slate-100 rounded-xl p-4 bg-white space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Case Utilization
              </h3>
              <span className="text-[9px] font-bold text-[#1a7a4a] bg-[#10B98122] px-1.5 py-0.5 rounded-sm uppercase tracking-wide">
                Optimized
              </span>
            </div>

            <div className="space-y-3 pt-1">
              {utilizationData.map((item) => (
                <div key={item.label} className="space-y-1.5">
                  <div className="flex justify-between text-xs font-semibold text-slate-700">
                    <span>{item.label}</span>
                    <span>{item.value}%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                    <div
                      className="bg-[#1A4331] h-full rounded-full transition-all duration-500"
                      style={{ width: `${item.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action Button */}
        <Button className="w-full bg-[#1A4331] text-white hover:bg-[#133224] h-11 text-xs font-semibold rounded-lg mt-6 shadow-sm cursor-pointer">
          Export Detailed Report
        </Button>
      </SheetContent>
    </Sheet>
  );
}
