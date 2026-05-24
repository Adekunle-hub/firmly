import React, { useState, useEffect } from "react";
import { Loader2, CheckCircle2, X, AlertTriangle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ConflictCheckModalProps {
  isOpen: boolean;
  clientName: string;
  simulationMode: "clean" | "conflict";
  onProceed: () => void;
  onCancel: () => void;
  onViewDetails: () => void;
}

export default function ConflictCheckModal({
  isOpen,
  clientName,
  simulationMode,
  onProceed,
  onCancel,
  onViewDetails,
}: ConflictCheckModalProps) {
  const [status, setStatus] = useState<"loading" | "resolved">("loading");

  useEffect(() => {
    if (isOpen) {
      setStatus("loading");
      const timer = setTimeout(() => {
        setStatus("resolved");
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 md:p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={onCancel} />

      {/* Modal Card */}
      <div className="relative bg-white rounded-2xl max-w-2xl w-full p-2 sm:p-4 md:p-6 shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {status === "loading" ? (
          <div className="flex flex-col items-center justify-center py-10 text-center max-w-sm mx-auto">
            <Loader2 className="w-12 h-12 text-[#055939] animate-spin mb-4" />
            <h3 className="text-base md:text-lg font-bold text-slate-800">Checking Conflict of interest...</h3>
            <p className="text-sm text-slate-400 mt-1">This will only take a moment.</p>
          </div>
        ) : simulationMode === "clean" ? (
          // Clean Path (No conflict detected)
          <div className="flex flex-col items-center text-center py-4 max-w-sm mx-auto">
            <button
              onClick={onCancel}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-50 p-1"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="h-12 w-12 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 mb-4 animate-bounce">
              <CheckCircle2 className="w-7 h-7" />
            </div>

            <h3 className="text-base md:text-lg font-bold text-slate-800">No Conflict of Interest Detected.</h3>
            <p className="text-sm text-slate-500 mt-2 px-2">
              You may proceed with <span className="font-semibold text-slate-800">{clientName || "this client"}</span>. No existing conflicts were found in the system.
            </p>

            <Button
              onClick={onProceed}
              className="w-full mt-6 h-10 bg-[#055939] hover:bg-[#155e38] text-white font-semibold rounded-lg text-[13px] shadow-sm cursor-pointer"
            >
              Proceed
            </Button>
          </div>
        ) : (
          // Conflict Flagged Warning (Screenshot 1)
          <div className="flex flex-col py-2">
            <button
              onClick={onCancel}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-50 p-1"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Warning Header */}
            <div className="flex items-start gap-2 md:gap-3.5 text-red-600 mb-2 md:mb-5">
              <div className="p-2 bg-red-50 rounded-xl shrink-0">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h3 className="text-sm md:text-base font-bold leading-snug">
                  A potential conflict was found with an existing client or case. Please review before proceeding
                </h3>
              </div>
            </div>

            {/* Conflict Summary */}
            <div className="mb-4">
              <h4 className="text-sm font-bo ld text-slate-700 uppercase tracking-wide">Conflict Summary</h4>
              <p className="text-[12.5px] text-slate-400 mt-1">
                This case may present a conflict with an existing client or matter already associated with your firm.
              </p>
            </div>

            {/* Conflicting Records Table */}
            <div className="border border-slate-100 rounded-xl overflow-hidden mb-6">
              <table className="w-full text-left text-sm border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100 font-bold text-slate-500 uppercase tracking-wider">
                    <th className="py-2.5 px-1 text-center md:text-start md:px-3">Type</th>
                    <th className="py-2.5 px-1  text-center md:text-start md:px-3">Name</th>
                    <th className="py-2.5  px-2 md:px-3">Role</th>
                    <th className="py-2.5 px-1 md:px-3 ">Client ID</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 font-medium text-slate-700">
                  <tr>
                    <td className="py-3 px-3 text-slate-500">Client</td>
                    <td className="py-3 px-3 font-bold text-slate-900">Adewale Holdings Ltd</td>
                    <td className="py-3 px-3">Former Client</td>
                    <td className="py-3 px-3 font-mono text-[11px]">CL-2034</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-3 text-slate-500">Case</td>
                    <td className="py-3 px-3 font-bold text-slate-900">Adewale v. Zenith Bank</td>
                    <td className="py-3 px-3">Opposing Party</td>
                    <td className="py-3 px-3 font-mono text-[11px]">CASE-1098</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Action Row */}
            <div className="flex flex-col md:flex-row items-center gap-3 justify-end border-t border-slate-100 pt-4 mt-1">
              <Button
                variant="outline"
                onClick={onViewDetails}
                className="h-10 border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold  px-2 md:px-4 text-sm rounded-lg cursor-pointer"
              >
                View Conflict Details and Resolve
              </Button>
              <Button
                variant="outline"
                onClick={onCancel}
                className="h-10 bg-red-600 hover:bg-slate-50 text-white font-semibold px-4 text-sm rounded-lg cursor-pointer"
              >
                Dismiss and go back
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
