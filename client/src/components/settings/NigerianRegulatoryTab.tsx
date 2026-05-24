// app/settings/_components/NigerianRegulatoryTab.tsx
import React from "react";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";

export default function NigerianRegulatoryTab() {
  return (
    <div className="space-y-4 md:space-y-6 w-full">
      {/* Court Setup Hierarchy Mapping Block */}
      <div className="bg-white border border-slate-100 rounded-2xl p-4 md:p-6 space-y-4 shadow-xs">
        <div>
          <h3 className="text-sm font-bold text-slate-800">Court Hierarchy Configuration</h3>
          <p className="text-[11px] text-slate-400">Map active case tier filtering parameters</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {["Magistrate Court", "High Court", "Federal High Court", "Court of Appeal", "Supreme Court"].map((court) => (
            <div key={court} className="flex items-center justify-between p-3 border border-slate-100 rounded-xl bg-slate-50/30">
              <span className="text-sm font-bold text-slate-700">{court}</span>
              <Switch defaultChecked={court.includes("High")} />
            </div>
          ))}
        </div>
      </div>

      {/* NDPR Privacy Framework compliance Layer blocks */}
      <div className="bg-white border border-slate-100 rounded-2xl p-4 md:p-6 space-y-2 sm:space-y-4 shadow-xs">
        <div>
          <h3 className="text-sm font-bold text-slate-800">NDPR Privacy Compliance Alignment</h3>
          <p className="text-[11px] text-slate-400">Manage data protection regulations residency anchors</p>
        </div>
        
        <div className=" p-3 md:p-3.5 bg-emerald-50/60 text-emerald-900 rounded-xl border border-emerald-100 flex items-start md:items-center gap-2 flex-col md:flex-row justify-between text-sm font-bold shadow-xs">
          <span>📍 Confirmed Infrastructure Target: AWS af-south-1 (Cape Town)</span>
          <span className="bg-emerald-600 text-white text-[9px] px-2.5 py-1.5 rounded-full uppercase">Nigeria Compliant</span>
        </div>

        <div className="space-y-1.5">
          <label className="text-[11px] font-bold text-slate-700">NDPR Consent Language Template</label>
          <textarea 
            rows={2} 
            className="w-full border border-slate-200 rounded-xl p-3 text-sm font-medium focus:outline-none focus:ring-1 focus:ring-emerald-600"
            defaultValue="I consent to the collection and processing of my personal data in accordance with the Nigeria Data Protection Regulation (NDPR)."
          />
        </div>
      </div>

      {/* SCUML/AML Transaction Warning Triggers limit configuration parameters code blocks */}
      <div className="bg-white border border-slate-100 rounded-2xl p-4 md:p-6 space-y-2 sm:space-y-4 shadow-xs">
        <h3 className="text-sm font-bold text-slate-800">SCUML / AML Threshold Monitor</h3>
        <div className="space-y-1.5">
          <label className="text-[11px] font-bold text-slate-700">SCUML/AML Check Trigger Limit (NGN)</label>
          <div className="flex flex-col md:flex-row items-start md:items-center gap-3">
            <Input type="number" defaultValue="5000000" className="h-11 border-slate-200 text-sm font-mono rounded-xl max-w-sm" />
            <span className="text-sm font-bold text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-xl">₦5,000,000.00</span>
          </div>
          <p className="text-[10px] text-slate-400 font-semibold">Default: ₦5,000,000. Matters above this threshold trigger AML compliance checks.</p>
        </div>
      </div>


       <div className="bg-white border border-slate-100 rounded-2xl p-4 md:p-6 space-y-2 sm:space-y-4 shadow-xs">
        <h3 className="text-sm font-bold text-slate-800">SAN Designation Management</h3>
        <div className="space-y-1.5 flex flex-col">
          <span className="text-[11px] font-semibold text-slate-400">Manage Senior Advocate of Nigeria (SAN) designations for lawyers</span>
        <Button className="bg-[#E2E4E9] text-[#404942] cursor-pointer font-semibold text-[10px] w-[40vw] max-w-48">Configure SAN Settings</Button>
          
        </div>
      </div>
    </div>
  );
}