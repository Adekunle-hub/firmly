import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, FileCheck } from "lucide-react";
import { cn } from "@/lib/utils";

const alerts = [
  {
    title: "APC Expiring Soon",
    description: "Barris Williams: Practicing Certificate expires in 14 days",
    urgency: "high" as const,
   
  },
  {
    title: "Trust Account Audit",
    description: "Quarterly audit due in 38 days",
    urgency: "medium" as const,
   
  },
];

const urgencyStyles = {
  high: {
    wrapper: "bg-red-50 border-l-4 border-red-500",
    icon: "text-red-500",
    title: "text-red-700",
    desc: "text-red-400",
  },
  medium: {
    wrapper: "bg-amber-50 border-l-4 border-amber-400",
    icon: "text-amber-500",
    title: "text-amber-700",
    desc: "text-amber-400",
  },
};

export default function ComplianceAlerts() {
  return (
    <Card className="rounded-xl border border-slate-200 bg-white shadow-none">
      <CardHeader className="pb-3 pt-6 px-4">
        <CardTitle className="text-sm font-semibold text-[#181D1A] flex gap-1 items-center">
         <AlertTriangle size={14} className="text-[#BA1A1A] text-xs"/> Compliance Alerts
        </CardTitle>
      </CardHeader>
      <CardContent className="px-4 pb-1 flex flex-col gap-3">
        {alerts.map((alert, i) => {
          
          const s = urgencyStyles[alert.urgency];
          return (
            <div
              key={i}
              className={cn("flex items-start gap-3 rounded-r-lg p-3", s.wrapper)}
            >
              
              <div>
                <p className={cn("text-[12.5px] font-semibold leading-snug", s.title)}>
                  {alert.title}
                </p>
                <p className={cn("mt-0.5 text-[11px] leading-snug", s.desc)}>
                  {alert.description}
                </p>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}