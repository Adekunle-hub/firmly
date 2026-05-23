"use client";

import React, { useState } from "react";
import { Plus, CalendarDays, ListTodo, Filter, X } from "lucide-react";
import Bounded from "@/components/Bounded";
import { cn } from "@/lib/utils";
import CalendarGrid, { type CalendarEvent } from "@/components/calendar/CalendarGrid";
import TaskSidebar from "@/components/calendar/TaskSidebar";
import EventDetailModal from "@/components/calendar/EventDetailModal";
import AddEventModal from "@/components/calendar/AddEventModal";
import LinkCalendarModal from "@/components/calendar/LinkCalendarModal";

// ─── Seed events ─────────────────────────────────────────────────────────────
const today = new Date();
const y = today.getFullYear();
const m = String(today.getMonth() + 1).padStart(2, "0");

const fmt = (day: number) => `${y}-${m}-${String(day).padStart(2, "0")}`;

const INITIAL_EVENTS: CalendarEvent[] = [
  {
    id: "e1",
    title: "Hearing: State vs. Okofor",
    date: fmt(today.getDate()),
    startTime: "10:00 AM",
    endTime: "12:00 PM",
    type: "hearing",
    caseTitle: "State v. Okofor",
    location: "Federal High Court Lagos · Court 3",
    judge: "Hon. Justice A. Okonkwo",
    participants: ["B. Johnson", "M. Adeola"],
    description: "Pre-trial conference for the State v. Okofor matter. Prepare all witness documentation.",
  },
  {
    id: "e2",
    title: "Filing Deadline — Motion",
    date: fmt(today.getDate() + 1),
    startTime: "2:00 PM",
    endTime: "2:30 PM",
    type: "deadline",
    caseTitle: "Adewale v. Zenith Bank",
    description: "Last day to file the Motion to Dismiss. Ensure all supporting affidavits are attached.",
  },
  {
    id: "e3",
    title: "Client Meeting — Estate",
    date: fmt(today.getDate() + 1),
    startTime: "11:00 AM",
    endTime: "12:00 PM",
    type: "meeting",
    caseTitle: "Probate Matter — Estate of Balogun",
    location: "Firm Conference Room B",
    participants: ["K. Obi", "A. Balogun"],
    description: "Review estate distribution with client family and beneficiaries.",
  },
  {
    id: "e4",
    title: "Mediation Session",
    date: fmt(today.getDate() + 3),
    startTime: "9:00 AM",
    endTime: "11:00 AM",
    type: "meeting",
    caseTitle: "Mojisola v. ARB Ltd",
    location: "Mediation Centre · Room 4B",
    judge: "Mediator P. Williams",
    participants: ["O. Mojisola", "ARB Legal Rep"],
  },
  {
    id: "e5",
    title: "Filing: FIRS Response",
    date: fmt(today.getDate() + 4),
    startTime: "3:00 PM",
    endTime: "3:30 PM",
    type: "filing",
    caseTitle: "Okonkwo vs. FIRS Tax",
    description: "Submit formal response to FIRS tax assessment dispute.",
  },
  {
    id: "e6",
    title: "Court Appearance",
    date: fmt(today.getDate() + 5),
    startTime: "10:30 AM",
    endTime: "12:30 PM",
    type: "hearing",
    caseTitle: "Ibrahim & Sons vs. Fidelity Insurance",
    location: "Lagos State High Court · Division 2",
    judge: "Hon. Justice R. Adegoke",
    participants: ["B. Johnson", "R. Ibrahim"],
  },
  {
    id: "e7",
    title: "Personal: Bar Meeting",
    date: fmt(today.getDate() + 7),
    startTime: "6:00 PM",
    endTime: "8:00 PM",
    type: "personal",
    location: "NBA Lagos Branch HQ",
    description: "Monthly branch meeting — agenda includes new SAN applications.",
  },
  {
    id: "e8",
    title: "Statutory Deadline",
    date: fmt(today.getDate() + 9),
    startTime: "12:00 PM",
    endTime: "12:30 PM",
    type: "deadline",
    caseTitle: "Probate Matter — Estate of Balogun",
    description: "Limitation period expires. Final date to file probate application.",
  },
  {
    id: "e9",
    title: "Team Strategy Session",
    date: fmt(today.getDate() + 2),
    startTime: "2:00 PM",
    endTime: "4:00 PM",
    type: "meeting",
    location: "Boardroom",
    participants: ["All Attorneys", "Paralegal Team"],
    description: "Quarterly case review and resource allocation planning.",
  },
  {
    id: "e10",
    title: "Deposition — Witness",
    date: fmt(today.getDate() + 6),
    startTime: "1:00 PM",
    endTime: "3:00 PM",
    type: "hearing",
    caseTitle: "State v. Okofor",
    location: "Virtual — Webex Room 12",
    participants: ["B. Johnson", "Prosecution Counsel"],
  },
];

type View = "calendar" | "tasks";
type CalendarMode = "month" | "week";

export default function CalendarPage() {
  const [events, setEvents] = useState<CalendarEvent[]>(INITIAL_EVENTS);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isLinkOpen, setIsLinkOpen] = useState(false);
  const [addDefaultDate, setAddDefaultDate] = useState<string | undefined>();
  const [activeView, setActiveView] = useState<View>("calendar");
  const [calendarMode, setCalendarMode] = useState<CalendarMode>("month");
  const [calendarFilter, setCalendarFilter] = useState("All Events");

  const handleEventClick = (event: CalendarEvent) => {
    setSelectedEvent(event);
    setIsDetailOpen(true);
  };

  const handleDateClick = (date: string) => {
    setAddDefaultDate(date);
    setIsAddOpen(true);
  };

  const handleAddEvent = (event: CalendarEvent) => {
    setEvents((prev) => [...prev, event]);
  };

  return (
    <Bounded>
      {/* ── Page Header ─────────────────────────────────────────── */}
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#181D1A]">
            Calendar &amp; Tasks
          </h1>
          <p className="text-sm text-[#404942] mt-1">
            Manage court dates, deadlines, meetings, and team tasks.
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setIsLinkOpen(true)}
            className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg border border-[#1A4331] bg-white text-[13px] font-bold text-[#1A4331] transition hover:bg-slate-50 active:bg-slate-100"
          >
            Link Calendar
          </button>
          <button
            onClick={() => { setAddDefaultDate(undefined); setIsAddOpen(true); }}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-[#1A4331] text-[13px] font-bold text-white shadow-sm transition hover:bg-[#133224] active:bg-[#0f2619]"
          >
            <Plus size={16} className="shrink-0" />
            Create New
          </button>
        </div>
      </header>

      <nav className="flex items-center gap-2 border-b border-slate-200 pb-4 mb-6">
        <button
          onClick={() => setActiveView("calendar")}
          className={cn(
            "inline-flex items-center gap-2 px-4 py-2 text-sm font-bold transition rounded-full",
            activeView === "calendar"
              ? "bg-[#1A4331] text-white"
              : "text-slate-600 hover:bg-slate-50"
          )}
        >
          <CalendarDays size={16} className="shrink-0" />
          Calendar
        </button>
        <button
          onClick={() => setActiveView("tasks")}
          className={cn(
            "inline-flex items-center gap-2 px-4 py-2 text-sm font-bold transition rounded-full",
            activeView === "tasks"
              ? "bg-[#1A4331] text-white"
              : "text-slate-600 hover:bg-slate-50"
          )}
        >
          <ListTodo size={16} className="shrink-0" />
          Tasks
        </button>
      </nav>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between mb-6">
          <div className="flex items-center gap-3">
            <button className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-600 transition hover:bg-slate-100 active:bg-slate-200">
              <CalendarDays size={18} className="shrink-0" />
            </button>
            <div className="flex gap-2 rounded-lg bg-slate-100 p-1">
              <button
                onClick={() => setCalendarMode("month")}
                className={cn(
                  "px-4 py-1.5 text-sm font-bold rounded-md transition",
                  calendarMode === "month"
                    ? "bg-[#1A4331] text-white"
                    : "text-slate-600 hover:text-slate-900"
                )}
              >
                Month
              </button>
              <button
                onClick={() => setCalendarMode("week")}
                className={cn(
                  "px-4 py-1.5 text-sm font-bold rounded-md transition",
                  calendarMode === "week"
                    ? "bg-[#1A4331] text-white"
                    : "text-slate-600 hover:text-slate-900"
                )}
              >
                Week
              </button>
            </div>
          </div>

          <button className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-600 transition hover:border-slate-300 hover:bg-slate-50 active:bg-slate-100">
            <Filter size={14} className="shrink-0" />
            {calendarFilter}
          </button>
        </div>

        <CalendarGrid
          events={events}
          onEventClick={handleEventClick}
          onDateClick={handleDateClick}
        />
      </section>

      {activeView === "tasks" && (
        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          < section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <TaskSidebar />
        </section>
        </div>
      )}
      {/* ── Modals ───────────────────────────────────────────────── */}
      <EventDetailModal
        event={selectedEvent}
        isOpen={isDetailOpen}
        onClose={() => { setIsDetailOpen(false); setSelectedEvent(null); }}
      />

      <AddEventModal
        isOpen={isAddOpen}
        defaultDate={addDefaultDate}
        onClose={() => setIsAddOpen(false)}
        onAdd={handleAddEvent}
      />

      <LinkCalendarModal isOpen={isLinkOpen} onClose={() => setIsLinkOpen(false)} />
    </Bounded>
  );
}