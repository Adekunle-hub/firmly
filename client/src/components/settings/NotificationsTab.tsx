// app/settings/_components/NotificationsTab.tsx
import React from "react";
import { Switch } from "@/components/ui/switch";

export default function NotificationsTab() {
  const channelsConfig = [
    { key: "invoice", label: "Invoice Sent", triggers: ["Email", "SMS"] },
    { key: "court", label: "Court Hearing Reminder", triggers: ["Email", "SMS", "In-App", "Whatsapp"] },
    { key: "apc", label: "APC Expiry Warning", triggers: ["Email", "In-App"] },
    { key: "signed", label: "Document Signed", triggers: ["Email", "In-App", "Whatsapp"] },
  ];

  return (
    <div className="bg-white border border-slate-100 rounded-2xl p-4 md:p-6 space-y-2 sm:space-y-4 md:space-y-6 shadow-xs w-full">
      <div>
        <h3 className="text-sm font-bold text-slate-800">Notification Routing Matrices</h3>
        <p className="text-[11px] text-slate-400 mt-0.5">Manage custom alerting infrastructure channels</p>
      </div>

      {/* General Toggle Controls list block */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-b border-slate-50 pb-5">
        {["Transaction Emails", "Project Tracking Email", "Reminder Emails", "Promotional Emails"].map((topic, idx) => (
          <div key={idx} className="flex items-center justify-between p-3 bg-slate-50/40 border border-slate-100 rounded-xl">
            <span className="text-sm font-bold text-slate-700">{topic}</span>
            <Switch defaultChecked={idx !== 3} />
          </div>
        ))}
      </div>

      {/* Structured Channels Matrix Control Block */}
      <div className="space-y-3">
        <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Channel Strategy Map</h4>
        <div className="space-y-2">
          {channelsConfig.map((row) => (
            <div key={row.key} className="flex flex-wrap items-center justify-between p-4 border border-slate-100 rounded-xl gap-4 hover:shadow-xs transition-all">
              <span className="text-sm font-bold text-slate-800 min-w-[160px]">{row.label}</span>
              <div className="flex flex-wrap items-center gap-2">
                {["Email", "SMS", "In-App", "Whatsapp"].map((mode) => {
                  const active = row.triggers.includes(mode);
                  return (
                    <span 
                      key={mode} 
                      className={`text-[10px] font-bold px-3 py-1 rounded-full border transition-all ${
                        active 
                          ? "bg-emerald-50 text-emerald-800 border-emerald-200/60 shadow-xs" 
                          : "bg-slate-50/50 text-slate-400 border-slate-100"
                      }`}
                    >
                      {mode}
                    </span>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}