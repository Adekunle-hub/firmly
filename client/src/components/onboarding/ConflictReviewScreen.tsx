import React, { useState } from "react";
import { AlertCircle, FileText, ChevronLeft, Calendar, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface ConflictReviewScreenProps {
  clientName: string;
  onResolve: (resolution: "false_positive" | "waiver" | "reject", adminNote: string) => void;
  onCancel: () => void;
}

export default function ConflictReviewScreen({
  clientName,
  onResolve,
  onCancel,
}: ConflictReviewScreenProps) {
  const [resolution, setResolution] = useState<"false_positive" | "waiver" | "reject">("false_positive");
  const [adminNote, setAdminNote] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminNote.trim()) return;
    onResolve(resolution, adminNote);
  };

  return (
    <div className="bg-white border border-slate-200/80 rounded-2xl p-6 md:p-8 flex flex-col gap-6 shadow-sm max-w-4xl mx-auto w-full animate-in fade-in duration-300">
      
      {/* Header back link */}
      <button
        type="button"
        onClick={onCancel}
        className="flex items-center gap-1.5 text-sm font-bold text-slate-500 hover:text-slate-800 transition-colors w-fit cursor-pointer"
      >
        <ChevronLeft className="w-4 h-4" />
        Go back
      </button>

      {/* Title */}
      <div>
        <h2 className="text-lg md:text-xl font-bold text-slate-900">Conflict Review</h2>
        <p className="text-[13px] text-slate-400 mt-0.5">Adewale v. Zenith Bank</p>
      </div>

      {/* Confirmed Conflict banner */}
      <div className="bg-rose-50 border border-rose-100 rounded-xl p-4 flex gap-3 text-rose-800 animate-slide-in">
        <AlertCircle className="w-5 h-5 shrink-0 text-rose-600 mt-0.5" />
        <div>
          <p className="text-[13px] font-bold">Confirmed Conflict</p>
          <p className="text-sm text-rose-700/90 mt-1 leading-relaxed">
            This case has been flagged for a potential conflict of interest. Please review the details below and select a resolution option.
          </p>
        </div>
      </div>

      {/* Form Details (2 cols) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="flex flex-col gap-1">
          <label className="text-[11.5px] font-bold text-slate-400 uppercase tracking-wide">Relationship with client/case</label>
          <Input value="Lawyer previously represented Zenith Bank" disabled className="bg-slate-50 text-slate-600 font-semibold text-sm h-9 rounded-xl border-slate-100" />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-[11.5px] font-bold text-slate-400 uppercase tracking-wide">Role</label>
          <Input value="Former legal rep (conflict of prior representation)" disabled className="bg-slate-50 text-slate-600 font-semibold text-sm h-9 rounded-xl border-slate-100" />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-[11.5px] font-bold text-slate-400 uppercase tracking-wide">Conflict Type</label>
          <Input value="Direct" disabled className="bg-slate-50 text-slate-600 font-semibold text-sm h-9 rounded-xl border-slate-100" />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-[11.5px] font-bold text-slate-400 uppercase tracking-wide">Client Name</label>
          <Input value={clientName} disabled className="bg-slate-50 text-slate-600 font-semibold text-sm h-9 rounded-xl border-slate-100" />
        </div>

        <div className="md:col-span-2 flex flex-col gap-1">
          <label className="text-[11.5px] font-bold text-slate-400 uppercase tracking-wide">Conflict Note</label>
          <textarea
            rows={2}
            value="Lawyer previously advised Zenith Bank in a debt restructuring case in 2024."
            disabled
            className="w-full rounded-xl border border-slate-100 bg-slate-50 p-2.5 text-sm text-slate-600 font-semibold resize-none"
          />
        </div>

        {/* Related Cases */}
        <div className="md:col-span-2 flex flex-col gap-1.5">
          <label className="text-[11.5px] font-bold text-slate-400 uppercase tracking-wide">Related Cases</label>
          <div className="border border-slate-100 rounded-xl bg-slate-50/30 p-3 flex flex-col gap-2">
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <FileText className="w-4 h-4 text-slate-400 shrink-0" />
              <span>Zenith Bank v. Lagos State (2024)</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <FileText className="w-4 h-4 text-slate-400 shrink-0" />
              <span>Zenith Bank Debt Restructuring (2023)</span>
            </div>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5 border-t border-slate-100 pt-5 mt-2">
        {/* Select Resolution Option cards */}
        <div className="flex flex-col gap-3">
          <h3 className="text-[13px] font-bold text-slate-800">Select Resolution</h3>

          {/* Option 1: No Conflict */}
          <div
            onClick={() => setResolution("false_positive")}
            className={cn(
              "border rounded-xl p-3.5 flex items-start gap-3 cursor-pointer transition-all hover:bg-slate-50/50",
              resolution === "false_positive" ? "border-emerald-500 bg-emerald-50/20" : "border-slate-200"
            )}
          >
            <div className="mt-1 h-4.5 w-4.5 rounded-full border border-slate-300 flex items-center justify-center bg-white shrink-0">
              {resolution === "false_positive" && <span className="h-2.5 w-2.5 rounded-full bg-emerald-600" />}
            </div>
            <div>
              <p className="text-sm font-bold text-slate-800">No Conflict (False Positive)</p>
              <p className="text-[11px] text-slate-400 mt-0.5">Mark this as a false alarm and proceed with the case normally.</p>
            </div>
          </div>

          {/* Option 2: Waiver */}
          <div
            onClick={() => setResolution("waiver")}
            className={cn(
              "border rounded-xl p-3.5 flex items-start gap-3 cursor-pointer transition-all hover:bg-slate-50/50",
              resolution === "waiver" ? "border-emerald-500 bg-emerald-50/20" : "border-slate-200"
            )}
          >
            <div className="mt-1 h-4.5 w-4.5 rounded-full border border-slate-300 flex items-center justify-center bg-white shrink-0">
              {resolution === "waiver" && <span className="h-2.5 w-2.5 rounded-full bg-emerald-600" />}
            </div>
            <div>
              <p className="text-sm font-bold text-slate-800">Proceed with Waiver</p>
              <p className="text-[11px] text-slate-400 mt-0.5">Send a conflict waiver to the client for signature.</p>
            </div>
          </div>

          {/* Option 3: Reject */}
          <div
            onClick={() => setResolution("reject")}
            className={cn(
              "border rounded-xl p-3.5 flex items-start gap-3 cursor-pointer transition-all hover:bg-slate-50/50",
              resolution === "reject" ? "border-emerald-500 bg-emerald-50/20" : "border-slate-200"
            )}
          >
            <div className="mt-1 h-4.5 w-4.5 rounded-full border border-slate-300 flex items-center justify-center bg-white shrink-0">
              {resolution === "reject" && <span className="h-2.5 w-2.5 rounded-full bg-emerald-600" />}
            </div>
            <div>
              <p className="text-sm font-bold text-slate-800">Reject Client</p>
              <p className="text-[11px] text-slate-400 mt-0.5">Decline the Client due to unresolvable conflict of interest.</p>
            </div>
          </div>
        </div>

        {/* Admin Note */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-bold text-slate-800">
            Admin Note <span className="text-red-500">*</span>
          </label>
          <textarea
            rows={3}
            placeholder="Explain your decision and provide any relevant context..."
            value={adminNote}
            onChange={(e) => setAdminNote(e.target.value)}
            required
            className="w-full rounded-xl border border-slate-200 p-3 text-[12.5px] focus:outline-none focus:ring-1 focus:ring-[#1a7a4a] focus:border-[#1a7a4a]"
          />
          <p className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5">
            <Info className="w-3.5 h-3.5 shrink-0" />
            This note is mandatory and will be logged with your decision.
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
          <Button
            type="button"
            variant="ghost"
            onClick={onCancel}
            className="h-10 text-[13px] font-semibold text-slate-600 hover:bg-slate-50"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={!adminNote.trim()}
            className="h-10 bg-[#055939] hover:bg-[#155e38] text-white font-semibold px-6 text-[13px] rounded-lg shadow-sm disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
          >
            Resolve Conflict
          </Button>
        </div>
      </form>
    </div>
  );
}
