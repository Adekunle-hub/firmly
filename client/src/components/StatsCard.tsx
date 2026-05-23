import { Card, CardContent } from "@/components/ui/card";
import { Users, FolderOpen, Scale, Receipt, TrendingUp, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const stats = [
  {
    label: "Total Clients",
    value: "120",
    delta: "+12% vs last month",
    deltaType: "positive" as const,
    icon: Users,
    iconBg: "bg-emerald-50",
    iconColor: "text-[#1a7a4a]",
  },
  {
    label: "Active Cases",
    value: "46",
    delta: "+5% vs last month",
    deltaType: "positive" as const,
    icon: FolderOpen,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
  },
  {
    label: "Active Lawyers",
    value: "8",
    delta: "+3% vs last month",
    deltaType: "positive" as const,
    icon: Scale,
    iconBg: "bg-violet-50",
    iconColor: "text-violet-600",
  },
  {
    label: "Outstanding Invoices",
    value: "$18M",
    delta: "25 invoices overdue · 30+ days",
    deltaType: "warning" as const,
    icon: Receipt,
    iconBg: "bg-amber-50",
    iconColor: "text-amber-600",
  },
];

export default function StatsCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 md:gap-4 lg:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card
            key={stat.label}
            className="rounded-lg md:rounded-xl border border-slate-200 bg-[#F7FAF5] shadow-none transition-shadow hover:shadow-md"
          >
            <CardContent className="px-2 py-1 md:p-3 ">
              <div className="flex items-center justify-between ">
                <span className="text-xs font-medium text-slate-500">{stat.label}</span>
                <div className={cn("flex h-8 w-8 items-center justify-center rounded-lg", stat.iconBg)}>
                  <Icon size={15} className={stat.iconColor} />
                </div>
              </div>

              <div className="text-[28px] font-bold tracking-tight text-slate-900 mb-1">
                {stat.value}
              </div>

              <div
                className={cn(
                  "flex items-center gap-1 text-[11px] font-medium",
                  stat.deltaType === "positive" ? "text-[#1a7a4a]" : "text-amber-600"
                )}
              >
                {stat.deltaType === "positive" ? (
                  <TrendingUp size={11} />
                ) : (
                  <AlertCircle size={11} />
                )}
                {stat.delta}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}