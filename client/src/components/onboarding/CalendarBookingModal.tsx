import React, { useState } from "react";
import { X, Calendar, Clock, Upload, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface CalendarBookingModalProps {
  isOpen: boolean;
  clientData: any;
  onBook: (details: any) => void;
  onCancel: () => void;
}

export default function CalendarBookingModal({
  isOpen,
  clientData,
  onBook,
  onCancel,
}: CalendarBookingModalProps) {
  // Calendar fields state
  const [startDate, setStartDate] = useState("2026-05-21");
  const [startTime, setStartTime] = useState("10:00");
  const [startPeriod, setStartPeriod] = useState("AM");
  const [endDate, setEndDate] = useState("2026-05-21");
  const [endTime, setEndTime] = useState("11:30");
  const [endPeriod, setEndPeriod] = useState("AM");
  const [additionalNotes, setAdditionalNotes] = useState("");
  const [uploadedFile, setUploadedFile] = useState<{ name: string } | null>(null);

  const clientName = clientData?.name || "Client Name";
  const clientEmail = clientData?.email || "client@email.com";
  const clientAddress = clientData?.address || "Lagos, Nigeria";
  const legalMatter = clientData?.legalMatter || "Employment Dispute";

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFile({ name: e.target.files[0].name });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onBook({
      startDate,
      startTime: `${startTime} ${startPeriod}`,
      endDate,
      endTime: `${endTime} ${endPeriod}`,
      additionalNotes,
      fileName: uploadedFile ? uploadedFile.name : null,
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={onCancel} />

      {/* Modal Box */}
      <div className="relative bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={onCancel}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-50 p-1"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="mb-4">
          <h3 className="text-base md:text-lg font-bold text-slate-900 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-[#055939]" />
            Calendar Booking
          </h3>
          <p className="text-sm text-slate-400 mt-0.5">Schedule your first consultation</p>
        </div>

        {/* Client details card */}
        <div className="bg-[#FAF7F6] border border-slate-100 rounded-xl p-4 mb-4 flex flex-col gap-1.5 text-sm text-slate-600">
          <div className="flex justify-between font-bold text-slate-800 text-[13px]">
            <span>{clientName}</span>
            <span className="font-normal text-slate-400 break-all">{clientEmail}</span>
          </div>
          <p className="truncate">{clientAddress}</p>
          <p className="mt-1 font-semibold text-[#055939]">
            <span className="text-slate-400 font-normal">Legal Matter:</span> {legalMatter}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Start Date & Time */}
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">Start Date</label>
              <Input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
                className="h-9 text-sm rounded-xl"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">Start Time</label>
              <div className="flex gap-1.5">
                <Input
                  type="text"
                  placeholder="10:00"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  required
                  className="h-9 text-sm rounded-xl flex-1 text-center"
                />
                <select
                  value={startPeriod}
                  onChange={(e) => setStartPeriod(e.target.value)}
                  className="h-9 rounded-xl border border-slate-200 bg-white px-2 text-sm text-slate-700 focus:outline-none"
                >
                  <option value="AM">AM</option>
                  <option value="PM">PM</option>
                </select>
              </div>
            </div>
          </div>

          {/* End Date & Time */}
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">End Date</label>
              <Input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                required
                className="h-9 text-sm rounded-xl"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">End Time</label>
              <div className="flex gap-1.5">
                <Input
                  type="text"
                  placeholder="11:30"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  required
                  className="h-9 text-sm rounded-xl flex-1 text-center"
                />
                <select
                  value={endPeriod}
                  onChange={(e) => setEndPeriod(e.target.value)}
                  className="h-9 rounded-xl border border-slate-200 bg-white px-2 text-sm text-slate-700 focus:outline-none"
                >
                  <option value="AM">AM</option>
                  <option value="PM">PM</option>
                </select>
              </div>
            </div>
          </div>

          {/* Drag & Drop File */}
          <div className="relative border-2 border-dashed border-slate-200 rounded-xl p-4 flex flex-col items-center justify-center bg-slate-50/50 hover:bg-slate-50 transition-colors group cursor-pointer">
            <input
              type="file"
              onChange={handleFileChange}
              className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
            />
            <Upload className="w-5 h-5 text-slate-400 mb-1 group-hover:scale-105 transition-transform" />
            <span className="text-[11.5px] font-semibold text-slate-600">Drag and drop or <span className="text-[#055939] underline">browse</span> to upload</span>
          </div>

          {uploadedFile && (
            <div className="flex items-center gap-2 p-2 bg-emerald-50 border border-emerald-100 rounded-xl">
              <FileText className="w-4 h-4 text-[#055939]" />
              <span className="text-[11px] font-medium text-slate-800 truncate">{uploadedFile.name}</span>
            </div>
          )}

          {/* Additional Notes */}
          <div className="flex flex-col gap-1">
            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">Additional Notes</label>
            <textarea
              rows={3}
              placeholder="E.g. Agenda, special requests..."
              value={additionalNotes}
              onChange={(e) => setAdditionalNotes(e.target.value)}
              className="w-full rounded-xl border border-slate-200 p-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#1a7a4a] focus:border-[#1a7a4a]"
            />
          </div>

          {/* Submit */}
          <Button
            type="submit"
            className="w-full h-10 mt-2 bg-[#055939] hover:bg-[#155e38] text-white font-semibold rounded-lg text-[13px] shadow-sm cursor-pointer"
          >
            Book Calendar
          </Button>
        </form>
      </div>
    </div>
  );
}
