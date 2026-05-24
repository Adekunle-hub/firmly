"use client";

import React from "react";
import Link from "next/link";
import { X, Calendar } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CalendarBookingFormProps {
  calendarClient: string;
  setCalendarClient: (val: string) => void;
  calendarStartDate: string;
  setCalendarStartDate: (val: string) => void;
  calendarStartTime: string;
  setCalendarStartTime: (val: string) => void;
  calendarStartPeriod: string;
  setCalendarStartPeriod: (val: string) => void;
  calendarEndDate: string;
  setCalendarEndDate: (val: string) => void;
  calendarEndTime: string;
  setCalendarEndTime: (val: string) => void;
  calendarEndPeriod: string;
  setCalendarEndPeriod: (val: string) => void;
  calendarLegalMatter: string;
  setCalendarLegalMatter: (val: string) => void;
  calendarNotes: string;
  setCalendarNotes: (val: string) => void;
  onBook: () => void;
  onCancel: () => void;
}

export default function CalendarBookingForm({
  calendarClient,
  setCalendarClient,
  calendarStartDate,
  setCalendarStartDate,
  calendarStartTime,
  setCalendarStartTime,
  calendarStartPeriod,
  setCalendarStartPeriod,
  calendarEndDate,
  setCalendarEndDate,
  calendarEndTime,
  setCalendarEndTime,
  calendarEndPeriod,
  setCalendarEndPeriod,
  calendarLegalMatter,
  setCalendarLegalMatter,
  calendarNotes,
  setCalendarNotes,
  onBook,
  onCancel,
}: CalendarBookingFormProps) {

  const FieldLabel = ({ children }: { children: React.ReactNode }) => (
    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
      {children}
    </label>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs transition-opacity animate-in fade-in duration-200">
      <Card className="bg-white rounded-2xl border-none shadow-2xl p-6 max-w-sm w-full mx-4 space-y-5 animate-in zoom-in-95 duration-150">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-base font-bold text-slate-900">Calendar Booking</h3>
            <p className="text-[11px] text-slate-400 font-semibold mt-0.5">
              Schedule your first consultation.
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onCancel}
            className="h-7 w-7 text-slate-400 hover:text-slate-650 hover:bg-slate-50 rounded-full cursor-pointer"
          >
            <X size={14} />
          </Button>
        </div>

        {/* Client Summary card */}
        <div className="bg-slate-50/70 border border-slate-100 p-3.5 rounded-xl space-y-1.5 text-sm">
          <p className="font-bold text-slate-700">
            {calendarClient} &bull; <span className="text-slate-400 font-semibold">jane.doe@gmail.com</span>
          </p>
          <div className="flex items-center gap-1 text-[11px] text-slate-500 font-medium">
            <span>Case:</span>
            <span className="text-[#1A4331] bg-emerald-50 px-2 py-0.5 rounded font-bold">
              Employment Dispute
            </span>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <FieldLabel>Start Date</FieldLabel>
            <div className="grid grid-cols-12 gap-2">
              <div className="col-span-6 relative">
                <Input
                  value={calendarStartDate}
                  onChange={(e) => setCalendarStartDate(e.target.value)}
                  className="h-9 text-sm border-slate-200 rounded-lg shadow-none focus-visible:ring-1 focus-visible:ring-[#1a7a4a] text-slate-700"
                />
              </div>
              <div className="col-span-3">
                <Input
                  value={calendarStartTime}
                  onChange={(e) => setCalendarStartTime(e.target.value)}
                  className="h-9 text-sm border-slate-200 rounded-lg shadow-none focus-visible:ring-1 focus-visible:ring-[#1a7a4a] text-slate-700 text-center"
                />
              </div>
              <div className="col-span-3">
                <Select value={calendarStartPeriod} onValueChange={setCalendarStartPeriod}>
                  <SelectTrigger className="h-9 text-sm border-slate-200 rounded-lg shadow-none focus:ring-1 focus:ring-[#1a7a4a]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    <SelectItem value="AM" className="text-sm">AM</SelectItem>
                    <SelectItem value="PM" className="text-sm">PM</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div>
            <FieldLabel>End Date</FieldLabel>
            <div className="grid grid-cols-12 gap-2">
              <div className="col-span-6 relative">
                <Input
                  value={calendarEndDate}
                  onChange={(e) => setCalendarEndDate(e.target.value)}
                  className="h-9 text-sm border-slate-200 rounded-lg shadow-none focus-visible:ring-1 focus-visible:ring-[#1a7a4a] text-slate-700"
                />
              </div>
              <div className="col-span-3">
                <Input
                  value={calendarEndTime}
                  onChange={(e) => setCalendarEndTime(e.target.value)}
                  className="h-9 text-sm border-slate-200 rounded-lg shadow-none focus-visible:ring-1 focus-visible:ring-[#1a7a4a] text-slate-700 text-center"
                />
              </div>
              <div className="col-span-3">
                <Select value={calendarEndPeriod} onValueChange={setCalendarEndPeriod}>
                  <SelectTrigger className="h-9 text-sm border-slate-200 rounded-lg shadow-none focus:ring-1 focus:ring-[#1a7a4a]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    <SelectItem value="AM" className="text-sm">AM</SelectItem>
                    <SelectItem value="PM" className="text-sm">PM</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div>
            <FieldLabel>Legal Matter</FieldLabel>
            <Select value={calendarLegalMatter} onValueChange={setCalendarLegalMatter}>
              <SelectTrigger className="w-full h-9 text-sm border-slate-200 rounded-lg shadow-none focus:ring-1 focus:ring-[#1a7a4a]">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent className="rounded-xl">
                <SelectItem value="consultation" className="text-sm">Initial Consultation</SelectItem>
                <SelectItem value="hearing" className="text-sm">Court Hearing</SelectItem>
                <SelectItem value="mediation" className="text-sm">Mediation</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <FieldLabel>Additional Notes</FieldLabel>
            <textarea
              value={calendarNotes}
              onChange={(e) => setCalendarNotes(e.target.value)}
              rows={2}
              placeholder="Enter details..."
              className="w-full p-2.5 text-sm border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-1 focus:ring-[#1a7a4a] resize-none shadow-none text-slate-800"
            />
          </div>
        </div>

        <Button
          onClick={onBook}
          className="w-full bg-[#1A4331] hover:bg-[#133224] text-white h-11 text-sm font-semibold rounded-lg cursor-pointer shadow-sm border border-[#1A4331]"
        >
          Book Calendar
        </Button>
      </Card>
    </div>
  );
}
