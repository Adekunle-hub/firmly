"use client";

import React, { useState, useMemo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export type CalendarEvent = {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD
  startTime: string;
  endTime: string;
  type: "hearing" | "deadline" | "meeting" | "personal" | "filing";
  caseTitle?: string;
  location?: string;
  judge?: string;
  description?: string;
  participants?: string[];
};

const EVENT_COLORS: Record<CalendarEvent["type"], { bg: string; text: string; border: string; dot: string }> = {
  hearing: { bg: "bg-emerald-50", text: "text-emerald-800", border: "border-l-emerald-500", dot: "bg-emerald-500" },
  deadline: { bg: "bg-red-50", text: "text-red-800", border: "border-l-red-500", dot: "bg-red-500" },
  meeting: { bg: "bg-blue-50", text: "text-blue-800", border: "border-l-blue-500", dot: "bg-blue-500" },
  personal: { bg: "bg-violet-50", text: "text-violet-800", border: "border-l-violet-500", dot: "bg-violet-500" },
  filing: { bg: "bg-amber-50", text: "text-amber-800", border: "border-l-amber-500", dot: "bg-amber-500" },
};

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

interface CalendarGridProps {
  events: CalendarEvent[];
  onEventClick: (event: CalendarEvent) => void;
  onDateClick: (date: string) => void;
}

export default function CalendarGrid({ events, onEventClick, onDateClick }: CalendarGridProps) {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  const calendarDays = useMemo(() => {
    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    const startDayOfWeek = firstDay.getDay();
    const daysInMonth = lastDay.getDate();

    const days: { date: number; month: number; year: number; isCurrentMonth: boolean }[] = [];

    // Previous month trailing days
    const prevMonthLastDay = new Date(currentYear, currentMonth, 0).getDate();
    for (let i = startDayOfWeek - 1; i >= 0; i--) {
      days.push({
        date: prevMonthLastDay - i,
        month: currentMonth - 1,
        year: currentMonth === 0 ? currentYear - 1 : currentYear,
        isCurrentMonth: false,
      });
    }

    // Current month days
    for (let d = 1; d <= daysInMonth; d++) {
      days.push({ date: d, month: currentMonth, year: currentYear, isCurrentMonth: true });
    }

    // Fill remaining slots to complete the grid (6 rows)
    const remaining = 42 - days.length;
    for (let i = 1; i <= remaining; i++) {
      days.push({
        date: i,
        month: currentMonth + 1,
        year: currentMonth === 11 ? currentYear + 1 : currentYear,
        isCurrentMonth: false,
      });
    }

    return days;
  }, [currentMonth, currentYear]);

  const getEventsForDate = (dateStr: string) => {
    return events.filter((e) => e.date === dateStr);
  };

  const formatDateStr = (year: number, month: number, date: number) => {
    const m = (month + 1).toString().padStart(2, "0");
    const d = date.toString().padStart(2, "0");
    return `${year}-${m}-${d}`;
  };

  const goToPrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const goToNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const goToToday = () => {
    setCurrentMonth(today.getMonth());
    setCurrentYear(today.getFullYear());
  };

  const todayStr = formatDateStr(today.getFullYear(), today.getMonth(), today.getDate());

  return (
    <div className="rounded-2xl border border-slate-200 bg-white flex flex-col overflow-hidden">
      {/* Calendar Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <h2 className="text-lg font-bold text-slate-900">
            {MONTHS[currentMonth]} {currentYear}
          </h2>
          <button
            onClick={goToToday}
            className="text-[10px] font-bold uppercase tracking-wider text-[#1A4331] bg-[#F0F9F4] hover:bg-emerald-100 px-2.5 py-1 rounded-md transition-colors cursor-pointer"
          >
            Today
          </button>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={goToPrevMonth}
            className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={goToNextMonth}
            className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Day Headers */}
      <div className="grid grid-cols-7 border-b border-slate-100">
        {DAYS.map((day) => (
          <div
            key={day}
            className="py-2.5 text-center text-[10px] font-bold uppercase tracking-wider text-slate-400"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 flex-1">
        {calendarDays.map((day, idx) => {
          const dateStr = formatDateStr(day.year, day.month, day.date);
          const dayEvents = getEventsForDate(dateStr);
          const isToday = dateStr === todayStr;
          const isWeekend = idx % 7 === 0 || idx % 7 === 6;

          return (
            <div
              key={idx}
              onClick={() => day.isCurrentMonth && onDateClick(dateStr)}
              className={cn(
                "min-h-[100px] border-b border-r border-slate-50 p-1.5 transition-colors group",
                day.isCurrentMonth
                  ? "bg-white hover:bg-slate-50/50 cursor-pointer"
                  : "bg-slate-50/40",
                isWeekend && day.isCurrentMonth && "bg-slate-25",
                idx % 7 === 0 && "border-l-0",
              )}
            >
              {/* Date Number */}
              <div className="flex justify-end mb-0.5">
                <span
                  className={cn(
                    "text-[11px] font-semibold w-6 h-6 flex items-center justify-center rounded-full transition-colors",
                    !day.isCurrentMonth && "text-slate-300",
                    day.isCurrentMonth && !isToday && "text-slate-600 group-hover:text-slate-900",
                    isToday && "bg-[#1A4331] text-white font-bold"
                  )}
                >
                  {day.date}
                </span>
              </div>

              {/* Events */}
              <div className="space-y-0.5">
                {dayEvents.slice(0, 3).map((evt) => {
                  const colors = EVENT_COLORS[evt.type];
                  return (
                    <button
                      key={evt.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        onEventClick(evt);
                      }}
                      className={cn(
                        "w-full text-left px-1.5 py-0.5 rounded-[4px] border-l-2 cursor-pointer",
                        "transition-all hover:shadow-sm",
                        colors.bg,
                        colors.text,
                        colors.border
                      )}
                    >
                      <p className="text-[9px] font-semibold truncate leading-tight">
                        {evt.title}
                      </p>
                      <p className="text-[8px] opacity-70 truncate leading-tight">
                        {evt.startTime}
                      </p>
                    </button>
                  );
                })}
                {dayEvents.length > 3 && (
                  <p className="text-[8px] text-slate-400 font-semibold text-center">
                    +{dayEvents.length - 3} more
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
