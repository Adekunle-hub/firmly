"use client";

import React from "react";
import {
  X,
  MapPin,
  Clock,
  Gavel,
  Users,
  FileText,
  CalendarCheck,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { CalendarEvent } from "./CalendarGrid";

const EVENT_TYPE_CONFIG: Record<
  CalendarEvent["type"],
  { label: string; color: string; bg: string; icon: React.ElementType }
> = {
  hearing: {
    label: "Court Hearing",
    color: "text-emerald-700",
    bg: "bg-emerald-50 border-emerald-100",
    icon: Gavel,
  },
  deadline: {
    label: "Deadline",
    color: "text-red-700",
    bg: "bg-red-50 border-red-100",
    icon: Clock,
  },
  meeting: {
    label: "Meeting",
    color: "text-blue-700",
    bg: "bg-blue-50 border-blue-100",
    icon: Users,
  },
  personal: {
    label: "Personal",
    color: "text-violet-700",
    bg: "bg-violet-50 border-violet-100",
    icon: CalendarCheck,
  },
  filing: {
    label: "Filing",
    color: "text-amber-700",
    bg: "bg-amber-50 border-amber-100",
    icon: FileText,
  },
};

interface EventDetailModalProps {
  event: CalendarEvent | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function EventDetailModal({
  event,
  isOpen,
  onClose,
}: EventDetailModalProps) {
  if (!isOpen || !event) return null;

  const config = EVENT_TYPE_CONFIG[event.type];
  const TypeIcon = config.icon;

  const formatDate = (dateStr: string) => {
    try {
      const [y, m, d] = dateStr.split("-").map(Number);
      const date = new Date(y, m - 1, d);
      return date.toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="event-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <article className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <header className="bg-[#1A4331] px-6 py-6 relative overflow-hidden">
          <div
            className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3 pointer-events-none"
            aria-hidden="true"
          />
          <div
            className="absolute bottom-0 left-1/2 w-20 h-20 bg-white/5 rounded-full translate-y-1/2 pointer-events-none"
            aria-hidden="true"
          />

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <span
                className={cn(
                  "inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider px-2.5 py-1.5 rounded-md border",
                  config.bg,
                  config.color
                )}
              >
                <TypeIcon size={12} aria-hidden="true" />
                {config.label}
              </span>
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X size={16} aria-hidden="true" />
              </button>
            </div>

            <h2
              id="event-modal-title"
              className="text-xl font-bold text-white leading-tight"
            >
              {event.title}
            </h2>
            {event.caseTitle && (
              <p className="text-emerald-100/70 text-[12px] font-medium mt-2">
                {event.caseTitle}
              </p>
            )}
          </div>
        </header>

        {/* Content */}
        <div className="px-6 py-5 space-y-4 max-h-[60vh] overflow-y-auto">
          {/* Date & Time */}
          <div className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 border border-slate-100">
            <div
              className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center shrink-0"
              aria-hidden="true"
            >
              <CalendarCheck size={18} className="text-[#1A4331]" />
            </div>
            <div className="flex-1">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Date &amp; Time
              </h3>
              <p className="text-sm font-semibold text-slate-900 mt-1">
                {formatDate(event.date)}
              </p>
              <p className="text-xs text-slate-600 font-medium mt-0.5">
                {event.startTime} — {event.endTime}
              </p>
            </div>
          </div>

          {/* Location */}
          {event.location && (
            <div className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 border border-slate-100">
              <div
                className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center shrink-0"
                aria-hidden="true"
              >
                <MapPin size={18} className="text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Location
                </h3>
                <p className="text-sm font-semibold text-slate-900 mt-1">
                  {event.location}
                </p>
              </div>
            </div>
          )}

          {/* Judge */}
          {event.judge && (
            <div className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 border border-slate-100">
              <div
                className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center shrink-0"
                aria-hidden="true"
              >
                <Gavel size={18} className="text-amber-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Presiding Judge
                </h3>
                <p className="text-sm font-semibold text-slate-900 mt-1">
                  {event.judge}
                </p>
              </div>
            </div>
          )}

          {/* Participants */}
          {event.participants && event.participants.length > 0 && (
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
              <div className="flex items-center gap-2 mb-3">
                <Users size={14} className="text-slate-500 shrink-0" aria-hidden="true" />
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Attendees
                </h3>
              </div>
              <ul className="flex flex-wrap gap-2" aria-label="Attendees list">
                {event.participants.map((p, i) => (
                  <li
                    key={i}
                    className="inline-flex items-center gap-2 text-xs font-semibold text-slate-700 bg-white px-2.5 py-1.5 rounded-lg border border-slate-200"
                  >
                    <span
                      className="w-5 h-5 rounded-full bg-[#1A4331] text-white text-[9px] font-bold flex items-center justify-center shrink-0"
                      aria-hidden="true"
                    >
                      {p.charAt(0).toUpperCase()}
                    </span>
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Description */}
          {event.description && (
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
              <div className="flex items-center gap-2 mb-3">
                <FileText size={14} className="text-slate-500 shrink-0" aria-hidden="true" />
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Notes
                </h3>
              </div>
              <blockquote className="text-sm text-slate-700 leading-relaxed italic border-l-4 border-slate-300 pl-3">
                {event.description}
              </blockquote>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <footer className="px-6 py-4 border-t border-slate-100 flex items-center justify-between bg-slate-50/50 gap-2">
          <button
            onClick={onClose}
            className="text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <div className="flex items-center gap-2">
            <button className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 bg-white border border-slate-300 hover:border-slate-400 px-3 py-2 rounded-lg transition-colors cursor-pointer">
              <FileText size={13} className="shrink-0" aria-hidden="true" />
              View Case
            </button>
            <button className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-[#1A4331] hover:bg-[#133224] px-3 py-2 rounded-lg transition-colors cursor-pointer">
              <ExternalLink size={13} className="shrink-0" aria-hidden="true" />
              Edit Event
            </button>
          </div>
        </footer>
      </article>
    </div>
  );
}