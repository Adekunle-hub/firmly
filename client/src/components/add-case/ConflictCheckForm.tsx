"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2, AlertTriangle, X } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ConflictCheckFormProps {
  onResolve: () => void;
  onDismiss: () => void;
}

export default function ConflictCheckForm({ onResolve, onDismiss }: ConflictCheckFormProps) {
  const [loading, setLoading] = useState(true);
  const [conflictFound, setConflictFound] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      setConflictFound(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-100 flex items-center justify-center">
      {/* Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/30 backdrop-blur-xs transition-opacity animate-in fade-in duration-200">
          <Card className="bg-white rounded-2xl border-none shadow-2xl p-8 flex flex-col items-center gap-4 max-w-xs w-full mx-4">
            <Loader2 size={36} className="text-[#1A4331] animate-spin" />
            <p className="text-sm font-bold text-slate-700 text-center leading-snug">
              Checking Conflict of Interest......
            </p>
            <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
              The lookup takes a moment
            </p>
          </Card>
        </div>
      )}

      {/* Conflict Found Modal */}
      {!loading && conflictFound && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs transition-opacity animate-in fade-in duration-200">
          <Card className="bg-white rounded-2xl border-none shadow-2xl p-2 sm:p-4 md:p-6 max-w-lg w-full mx-2 md:mx-4 space-y-3 md:space-y-5 animate-in zoom-in-95 duration-150">
            <div className="flex items-start justify-between">
              <div className="bg-amber-50 p-2 rounded-lg text-amber-500">
                <AlertTriangle size={24} />
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={onDismiss}
                className="h-7 w-7 text-slate-400 hover:text-slate-650 hover:bg-slate-50 cursor-pointer"
              >
                <X size={14} />
              </Button>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-xl p-3.5 flex items-start gap-2">
              <AlertTriangle size={15} className="text-red-700 shrink-0 mt-0.5" />
              <p className="text-sm font-bold text-red-700 leading-snug">
                A potential conflict was found with an existing client or case. Please review before proceeding
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider text-[10px]">Conflict Summary</h4>
              <p className="text-[11px] text-slate-500 leading-relaxed font-semibold">
                This case may prevent a conflict with an existing client or matter already associated with your firm.
              </p>

              <div className="border  border-slate-200 rounded-xl overflow-hidden shadow-xs">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200">
                      <th className="text-left p-3 font-bold text-slate-500 uppercase text-[9px] tracking-wider">Type</th>
                      <th className="text-left p-3 font-bold text-slate-500 uppercase text-[9px] tracking-wider">Name/Title</th>
                      <th className="text-left p-3 font-bold text-slate-500 uppercase text-[9px] tracking-wider">Role</th>
                      <th className="text-left p-3 font-bold text-slate-500 uppercase text-[9px] tracking-wider">Case ID / Client ID</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-slate-100 bg-white">
                      <td className="p-3 font-bold text-slate-700">Client</td>
                      <td className="p-3 text-slate-650 font-semibold">Adewale Holdings Ltd</td>
                      <td className="p-3 text-slate-600 font-semibold">Former Client</td>
                      <td className="p-3 text-slate-600 font-semibold">CL-2034</td>
                    </tr>
                    <tr className="bg-white">
                      <td className="p-3 font-bold text-slate-700">Case</td>
                      <td className="p-3 text-slate-650 font-semibold">Adewale v Zenith Bank</td>
                      <td className="p-3 text-slate-600 font-semibold">Opposing Party</td>
                      <td className="p-3 text-slate-600 font-semibold">CASE-1098</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Conflicting Records</p>

            <div className="flex gap-3 pt-2">
              <Button
                onClick={onResolve}
                className="flex-1 bg-[#1A4331] hover:bg-[#133224] text-white h-10 text-sm font-semibold rounded-lg cursor-pointer shadow-sm border border-[#1A4331]"
              >
                Resolve Conflict
              </Button>
              <Button
                variant="outline"
                onClick={onDismiss}
                className="flex-1 h-10 text-sm border-slate-200 hover:bg-slate-50 text-slate-600 font-semibold rounded-lg cursor-pointer shadow-none"
              >
                Dismiss and go back
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
