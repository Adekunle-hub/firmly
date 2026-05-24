import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { cn } from "@/lib/utils";

const upcoming = [
  {
    month: "OCT",
    day: "24",
    title: "Motion to Dismiss",
    detail: "2pm · Hill Court · Atty B. Johnson · Trial",
    type: "court",
  },
  {
    month: "OCT",
    day: "26",
    title: "Mediation Session",
    detail: "11am · Rm 4b, Mediation Centre · Ben K. Alex",
    type: "mediation",
  },
];

const borderColors: Record<string, string> = {
  court: "border-[#1a7a4a]",
  mediation: "border-indigo-500",
};

const textColors: Record<string, string> = {
  court: "text-[#1a7a4a]",
  mediation: "text-indigo-500",
};

export default function Next7Days() {
  return (
    <Card className="rounded-xl border border-slate-200 bg-white shadow-none">
      <CardHeader className="flex flex-row items-center justify-between pb-3 pt-5 px-5">
        <CardTitle className="text-[15px] font-semibold text-slate-900">
          Next 7 Days
        </CardTitle>
        <Link
          href="/dashboard/calendar"
          className="text-sm font-medium text-[#1a7a4a] hover:underline"
        >
          Calendar
        </Link>
      </CardHeader>

      <CardContent className="px-5 pb-5 flex flex-col gap-3">
        {upcoming.map((item, i) => (
          <div key={i} className="flex items-start gap-3">
            {/* Date box */}
            <div
              className={cn(
                "flex h-[42px] w-[42px] shrink-0 flex-col items-center justify-center rounded-lg border-2",
                borderColors[item.type]
              )}
            >
              <span className={cn("text-[8px] font-bold uppercase tracking-wider", textColors[item.type])}>
                {item.month}
              </span>
              <span className="text-[17px] font-bold leading-none text-slate-900">{item.day}</span>
            </div>

            {/* Info */}
            <div className="min-w-0 pt-0.5">
              <p className="text-[13px] font-semibold text-slate-900 leading-snug">
                {item.title}
              </p>
              <p className="mt-0.5 text-[11px] text-slate-400 leading-snug">{item.detail}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}