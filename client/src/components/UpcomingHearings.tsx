"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const hearings = [
  {
    month: "OCT",
    day: "14",
    title: "Arasaka Corp Trial",
    location: "Keye 402 - Division Court",
    badgeColor: "bg-[#F0F9F4] text-[#1A4331]",
  },
  {
    month: "OCT",
    day: "18",
    title: "Client Deposition",
    location: "Webex room 12 - Virtual Link",
    badgeColor: "bg-[#F0F9F4] text-[#1A4331]",
  },
  {
    month: "NOV",
    day: "02",
    title: "Probate Mediation",
    location: "Chambers 2A",
    badgeColor: "bg-rose-50 text-rose-700",
  },
];

export default function UpcomingHearings() {
  return (
    <Card className="rounded-xl border border-slate-200 bg-white shadow-none h-full flex flex-col justify-between">
      <CardHeader className="pb-3 pt-5 px-5">
        <CardTitle className="text-sm font-bold tracking-wider text-slate-500 uppercase">
          Upcoming Hearings
        </CardTitle>
      </CardHeader>

      <CardContent className="px-5 pb-5 flex-1 flex flex-col justify-between gap-4">
        <div className="space-y-3.5">
          {hearings.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-2.5 rounded-lg border border-slate-50 hover:border-slate-100 hover:bg-slate-50/50 transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                {/* Date Badge */}
                <div
                  className={cn(
                    "flex flex-col items-center justify-center h-12 w-12 rounded-lg font-bold shrink-0 shadow-xs",
                    item.badgeColor
                  )}
                >
                  <span className="text-[10px] tracking-wide leading-none">{item.month}</span>
                  <span className="text-lg leading-none mt-1">{item.day}</span>
                </div>

                {/* Info */}
                <div className="flex flex-col min-w-0">
                  <h4 className="text-sm font-semibold text-slate-800 truncate">
                    {item.title}
                  </h4>
                  <p className="text-sm text-slate-500 truncate mt-0.5">
                    {item.location}
                  </p>
                </div>
              </div>

              {/* Action Chevron */}
              <ChevronRight
                size={16}
                className="text-slate-400 group-hover:text-slate-700 transition-colors shrink-0"
              />
            </div>
          ))}
        </div>

        <Button
          variant="outline"
          className="w-full h-10 border-slate-200 text-slate-700 hover:bg-slate-50 font-medium text-sm rounded-lg mt-2 shadow-none"
        >
          Full Schedule
        </Button>
      </CardContent>
    </Card>
  );
}
