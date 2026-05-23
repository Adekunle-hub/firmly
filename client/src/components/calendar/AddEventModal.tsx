"use client";

import React, { useState } from "react";
import { X, CalendarPlus, Clock, MapPin, FileText, Users, Gavel } from "lucide-react";
import { cn } from "@/lib/utils";
import type { CalendarEvent } from "./CalendarGrid";

interface AddEventModalProps {
  isOpen: boolean;
  defaultDate?: string;
  onClose: () => void;
  onAdd: (event: CalendarEvent) => void;
}

const EVENT_TYPES: { value: CalendarEvent["type"]; label: string; color: string }[] = [
  { value: "hearing", label: "Court Hearing", color: "bg-emerald-500" },
  { value: "deadline", label: "Deadline", color: "bg-red-500" },
  { value: "meeting", label: "Meeting", color: "bg-blue-500" },
  { value: "filing", label: "Filing", color: "bg-amber-500" },
  { value: "personal", label: "Personal", color: "bg-violet-500" },
];

export default function AddEventModal({ isOpen, defaultDate, onClose, onAdd }: AddEventModalProps) {
  const [form, setForm] = useState({
    title: "",
    type: "hearing" as CalendarEvent["type"],
    date: defaultDate ?? new Date().toISOString().split("T")[0],
    startTime: "09:00 AM",
    endTime: "10:00 AM",
    location: "",
    caseTitle: "",
    judge: "",
    participants: "",
    description: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!isOpen) return null;

  const set = (k: string, v: string) => {
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((e) => ({ ...e, [k]: "" }));
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.title.trim()) errs.title = "Title is required";
    if (!form.date) errs.date = "Date is required";
    if (!form.startTime) errs.startTime = "Start time is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    const newEvent: CalendarEvent = {
      id: `evt-${Date.now()}`,
      title: form.title.trim(),
      type: form.type,
      date: form.date,
      startTime: form.startTime,
      endTime: form.endTime,
      location: form.location || undefined,
      caseTitle: form.caseTitle || undefined,
      judge: form.judge || undefined,
      description: form.description || undefined,
      participants: form.participants
        ? form.participants.split(",").map((p) => p.trim()).filter(Boolean)
        : undefined,
    };
    onAdd(newEvent);
    onClose();
    setForm({
      title: "",
      type: "hearing",
      date: defaultDate ?? new Date().toISOString().split("T")[0],
      startTime: "09:00 AM",
      endTime: "10:00 AM",
      location: "",
      caseTitle: "",
      judge: "",
      participants: "",
      description: "",
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
        role="presentation"
      />

      {/* Modal */}
      <article className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <header className="bg-[#1A4331] px-6 py-5 flex items-center justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3 pointer-events-none" />
          
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                <CalendarPlus size={18} className="text-white" />
              </div>
            </div>
            <h2 className="text-lg font-bold text-white">Create Event</h2>
            <p className="text-xs text-emerald-100/70 font-medium mt-0.5">Add a hearing, deadline, or meeting</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer shrink-0 relative z-10"
            aria-label="Close modal"
          >
            <X size={16} />
          </button>
        </header>

        {/* Form Body */}
        <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} className="px-6 py-5 space-y-4 max-h-[70vh] overflow-y-auto">
          {/* Event Title */}
          <fieldset>
            <label htmlFor="event-title" className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
              Event Title <span className="text-red-500">*</span>
            </label>
            <input
              id="event-title"
              value={form.title}
              onChange={(e) => set("title", e.target.value)}
              placeholder="e.g. Hearing — Adewale v. Zenith"
              className={cn(
                "w-full h-10 px-3 rounded-lg border text-sm font-medium text-slate-900 placeholder:text-slate-400",
                "focus:outline-none focus:ring-2 focus:ring-[#1A4331]/20 focus:border-[#1A4331] transition-all",
                errors.title ? "border-red-300 bg-red-50" : "border-slate-300 bg-slate-50"
              )}
            />
            {errors.title && <p className="text-xs text-red-600 mt-1 font-medium">{errors.title}</p>}
          </fieldset>

          {/* Event Type */}
          <fieldset>
            <legend className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
              Event Type <span className="text-red-500">*</span>
            </legend>
            <div className="flex flex-wrap gap-2">
              {EVENT_TYPES.map((et) => (
                <button
                  key={et.value}
                  type="button"
                  onClick={() => set("type", et.value)}
                  className={cn(
                    "flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-bold transition-all cursor-pointer",
                    form.type === et.value
                      ? "border-[#1A4331] bg-emerald-50 text-[#1A4331]"
                      : "border-slate-300 bg-white text-slate-600 hover:border-slate-400"
                  )}
                >
                  <span className={cn("w-2 h-2 rounded-full", et.color)} />
                  {et.label}
                </button>
              ))}
            </div>
          </fieldset>

          {/* Date + Times */}
          <fieldset className="space-y-2">
            <legend className="text-xs font-bold text-slate-600 uppercase tracking-wider">Date &amp; Time</legend>
            <div className="grid grid-cols-3 gap-2">
              <div>
                <label htmlFor="event-date" className="sr-only">Date</label>
                <input
                  id="event-date"
                  type="date"
                  value={form.date}
                  onChange={(e) => set("date", e.target.value)}
                  className={cn(
                    "w-full h-10 px-2 rounded-lg border text-xs font-medium text-slate-900",
                    "focus:outline-none focus:ring-2 focus:ring-[#1A4331]/20 focus:border-[#1A4331]",
                    errors.date ? "border-red-300 bg-red-50" : "border-slate-300 bg-slate-50"
                  )}
                />
              </div>
              <div>
                <label htmlFor="event-start" className="sr-only">Start Time</label>
                <input
                  id="event-start"
                  type="time"
                  value={form.startTime}
                  onChange={(e) => set("startTime", e.target.value)}
                  className="w-full h-10 px-2 rounded-lg border border-slate-300 bg-slate-50 text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#1A4331]/20 focus:border-[#1A4331]"
                />
              </div>
              <div>
                <label htmlFor="event-end" className="sr-only">End Time</label>
                <input
                  id="event-end"
                  type="time"
                  value={form.endTime}
                  onChange={(e) => set("endTime", e.target.value)}
                  className="w-full h-10 px-2 rounded-lg border border-slate-300 bg-slate-50 text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#1A4331]/20 focus:border-[#1A4331]"
                />
              </div>
            </div>
          </fieldset>

          {/* Location */}
          <fieldset>
            <label htmlFor="event-location" className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
              Location
            </label>
            <input
              id="event-location"
              value={form.location}
              onChange={(e) => set("location", e.target.value)}
              placeholder="e.g. Federal High Court, Lagos · Court 3"
              className="w-full h-10 px-3 rounded-lg border border-slate-300 bg-slate-50 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1A4331]/20 focus:border-[#1A4331]"
            />
          </fieldset>

          {/* Case Title */}
          <fieldset>
            <label htmlFor="event-case" className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
              Related Case
            </label>
            <input
              id="event-case"
              value={form.caseTitle}
              onChange={(e) => set("caseTitle", e.target.value)}
              placeholder="e.g. Adewale v. Zenith Bank"
              className="w-full h-10 px-3 rounded-lg border border-slate-300 bg-slate-50 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1A4331]/20 focus:border-[#1A4331]"
            />
          </fieldset>

          {/* Judge */}
          <fieldset>
            <label htmlFor="event-judge" className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
              Presiding Judge
            </label>
            <input
              id="event-judge"
              value={form.judge}
              onChange={(e) => set("judge", e.target.value)}
              placeholder="e.g. Hon. Justice A. Okonkwo"
              className="w-full h-10 px-3 rounded-lg border border-slate-300 bg-slate-50 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1A4331]/20 focus:border-[#1A4331]"
            />
          </fieldset>

          {/* Participants */}
          <fieldset>
            <label htmlFor="event-participants" className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
              Attendees <span className="font-normal text-slate-500 normal-case">(comma-separated)</span>
            </label>
            <input
              id="event-participants"
              value={form.participants}
              onChange={(e) => set("participants", e.target.value)}
              placeholder="e.g. B. Johnson, M. Adeola, K. Obi"
              className="w-full h-10 px-3 rounded-lg border border-slate-300 bg-slate-50 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1A4331]/20 focus:border-[#1A4331]"
            />
          </fieldset>

          {/* Description / Notes */}
          <fieldset>
            <label htmlFor="event-notes" className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
              Notes
            </label>
            <textarea
              id="event-notes"
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
              placeholder="Add any additional context or preparation notes..."
              rows={3}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-slate-50 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1A4331]/20 focus:border-[#1A4331] resize-none"
            />
          </fieldset>
        </form>

        {/* Footer */}
        <footer className="px-6 py-4 border-t border-slate-100 flex items-center justify-between bg-slate-50">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-sm font-bold text-slate-700 hover:text-slate-900 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#1A4331] text-white text-sm font-bold hover:bg-[#133224] transition-colors cursor-pointer"
          >
            <CalendarPlus size={14} className="shrink-0" />
            Add Event
          </button>
        </footer>
      </article>
    </div>
  );
}
