// app/settings/_components/AuthenticationTab.tsx
import React from "react";
import { KeyRound, ShieldAlert } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

export default function AuthenticationTab() {
  return (
    <div className="bg-white border border-slate-100 rounded-2xl p-4 space-y-4 md:p-6 md:space-y-6 w-full shadow-xs">
      <div>
        <h3 className="text-sm font-bold text-slate-800">Authentication Settings</h3>
        <p className="text-[11px] text-slate-400 mt-0.5">Manage secure identity checkpoints</p>
      </div>

      {/* Row: Email Access */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-slate-50/40 rounded-xl border border-slate-100">
        <div className="space-y-0.5">
          <p className="text-sm font-bold text-slate-800">Email Address</p>
          <p className="text-[11px] text-slate-400 font-medium">bankoleonafuwa@gmail.com</p>
        </div>
        <button className="text-sm font-bold text-indigo-600 hover:underline">Change Email?</button>
      </div>

      {/* Two-Factor Access Layer Nodes */}
      <div className="space-y-4 pt-4 border-t border-slate-50">
        <h4 className="text-sm font-bold text-slate-800 flex items-center gap-1.5"><KeyRound size={14} /> Two-Factor Authentication</h4>
        
        <div className="flex items-start justify-between gap-6 p-3 hover:bg-slate-50 rounded-xl">
          <div className="space-y-0.5">
            <p className="text-sm font-bold text-slate-800">Text Message (SMS)</p>
            <p className="text-[11px] text-slate-400 max-w-md font-medium">Receive secure authentication token text strings per system session entry sequence</p>
          </div>
          <Switch defaultChecked />
        </div>

        <div className="flex items-start justify-between gap-6 p-3 hover:bg-slate-50 rounded-xl">
          <div className="space-y-0.5">
            <p className="text-sm font-bold text-slate-800">Email Verification</p>
            <p className="text-[11px] text-slate-400 max-w-md font-medium">Secondary secure login verification link dispatcher fallback system</p>
          </div>
          <Switch />
        </div>
      </div>
    </div>
  );
}