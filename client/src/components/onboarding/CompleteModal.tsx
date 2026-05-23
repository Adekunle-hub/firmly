import React from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CompleteModalProps {
  isOpen: boolean;
  clientName: string;
  onReturn: () => void;
}

export default function CompleteModal({
  isOpen,
  clientName,
  onReturn,
}: CompleteModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" />

      {/* Modal Box */}
      <div className="relative bg-white rounded-2xl max-w-sm w-full p-6 text-center shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Animated Checkmark Circle */}
        <div className="mx-auto h-12 w-12 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 mb-4 animate-bounce">
          <Check className="w-6 h-6 stroke-[3]" />
        </div>

        <h3 className="text-base md:text-lg font-bold text-slate-800">Client Created!</h3>
        <p className="text-xs text-slate-500 mt-2 px-2">
          <span className="font-bold text-slate-800">{clientName || "The client"}</span> has been successfully added to your client list. Go to all client pages to view.
        </p>

        <Button
          onClick={onReturn}
          className="w-full mt-6 h-10 bg-[#055939] hover:bg-[#155e38] text-white font-semibold rounded-lg text-[13px] shadow-sm cursor-pointer"
        >
          Return to Client
        </Button>
      </div>
    </div>
  );
}
