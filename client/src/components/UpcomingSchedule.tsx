"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { formatDateTime } from "@/utils/formatDateTime";
import { useState } from "react";


type TabStatus = "All" | "Approved" | "Pending" | "Rejected";
const tabs: TabStatus[] = ["All", "Approved", "Pending", "Rejected"];

type ScheduleItem = {
  title: string;
  time?: string;
  href?: string;
  status: "Approved" | "Pending" | "Rejected"; 
};


const scheduleItems: ScheduleItem[] = [
  {
    title: "Ogun State High Court - Adewale v. Zenith Bank",
    href: "#",
    status: "Approved",
  },
  {
    title: "Filing Deadline - Immigration Matter",
    time: "10:00 AM",
    status: "Pending",
  },
  {
    title: "Hearing - Mojisola v. ARB Ltd",
    href: "#",
    status: "Approved",
  },
  {
    title: "Ibrahim & Sons vs. Fidelity Insurance",
    href: "#",
    status: "Rejected",
  },
];

export default function UpcomingSchedule() {
  
  const [activeTab, setActiveTab] = useState<TabStatus>("All");

  const formattedDate = formatDateTime();
  const datePart = formattedDate.split(" • ")[0];

  const dateParts = datePart.split(" ");
  const month = dateParts[0];
  const day = dateParts[1].replace(",", "");

 
  const filteredItems = scheduleItems.filter((item) => {
    if (activeTab === "All") return true;
    return item.status === activeTab;
  });

 
  const getDotColor = (status: string) => {
    switch (status) {
      case "Approved": return "border-emerald-600";
      case "Pending": return "border-amber-500";
      case "Rejected": return "border-rose-500";
      default: return "border-slate-400";
    }
  };

  return (
    <Card className="rounded-xl border border-slate-200 bg-white shadow-none h-full flex flex-col">
      <CardHeader className="py-2 px-2 md:pb-4 md:pt-5 md:px-6">
        <div className="flex items-center gap-6 border-b border-slate-100 pb-3">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)} 
              className={cn(
                "text-sm cursor-pointer pb-2 transition-colors relative font-medium",
                tab === activeTab
                  ? "text-emerald-700 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-emerald-700 font-semibold"
                  : "text-slate-500 hover:text-slate-700",
              )}
            >
              {tab}
            </button>
          ))}
        </div>

        <h3 className="text-lg font-semibold text-slate-900 mt-2 md:mt-4">
          Today's Schedule
        </h3>
      </CardHeader>

      <CardContent className="px-6 pb-6 flex-1 flex flex-col">
        <div className="flex gap-6 items-start">
         
          <div className="text-center min-w-12 pt-1">
            <p className="text-sm text-slate-500">{month}</p>
            <p className="text-4xl font-semibold text-slate-900 tracking-tight">
              {day}
            </p>
          </div>
        
          <div className="flex-1 space-y-5 relative min-h-30">
         
            <div className="absolute left-0 top-1 bottom-4 w-0.5 bg-slate-100 rounded" />

            
            {filteredItems.length === 0 ? (
              <div className="pl-5 pt-2 text-slate-400 text-sm italic">
                No {activeTab.toLowerCase()} items scheduled for today.
              </div>
            ) : (
              filteredItems.map((item, index) => (
                <div key={index} className="relative pl-5 group animate-fadeIn">
                
                  <div className={cn(
                    "absolute -left-px top-2 w-2 h-2 rounded-full border-2 bg-white transition-colors",
                    getDotColor(item.status)
                  )} />

                  <div className="flex justify-between items-start">
                    <div>
                      {item.href ? (
                        <Link
                          href={item.href}
                          className="text-[#6670F5] hover:underline font-medium leading-snug"
                        >
                          {item.title}
                        </Link>
                      ) : (
                        <p className="text-slate-700 leading-snug font-medium">
                          {item.title}
                        </p>
                      )}

                      <div className="flex items-center gap-2 mt-0.5">
                        {item.time && (
                          <p className="text-sm text-emerald-600 font-medium">
                            {item.time}
                          </p>
                        )}
                   
                        {activeTab === "All" && (
                          <span className={cn(
                            "text-[10px] px-1.5 py-0.5 rounded-sm font-semibold tracking-wide uppercase",
                            item.status === "Approved" && "bg-emerald-50 text-emerald-700",
                            item.status === "Pending" && "bg-amber-50 text-amber-700",
                            item.status === "Rejected" && "bg-rose-50 text-rose-700"
                          )}>
                            {item.status}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="mt-auto pt-6">
          <Link
            href="/calendar"
            className="block text-center text-emerald-700 hover:text-emerald-800 text-sm font-semibold tracking-wide"
          >
            SEE ALL UPCOMING EVENTS →
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}