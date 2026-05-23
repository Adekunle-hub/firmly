// components/documents/StatCard.tsx
import React from "react";
import { FileText } from "lucide-react";

interface StatCardProps {
  title: string;
  value: number;
}

export default function StatCard({ title, value }: StatCardProps) {
  return (
    <div className="bg-white border border-slate-100 rounded-xl p-5 flex justify-between items-start shadow-xs">
      <div className="space-y-3">
        <span className="text-[11px] font-bold tracking-wide text-slate-500 uppercase">
          {title}
        </span>
        <h3 className="text-3xl font-extrabold text-[#1A6341] tracking-tight">
          {value}
        </h3>
      </div>
      <div className="p-2 bg-slate-50 rounded-lg text-slate-400">
        <FileText size={16} />
      </div>
    </div>
  );
}