
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function IntegrationsTab() {
  return (
    <div className="space-y-4 md:space-y-6 w-full">
      {/* Payment Rails Integration Configuration Containers */}
      <div className="bg-white border border-slate-100 rounded-2xl p-4 space-y-2 md:p-6 md:space-y-5 shadow-xs">
        <div>
          <h3 className="text-sm font-bold text-slate-800">Payment Gateways & Rails</h3>
          <p className="text-[11px] text-slate-400">Connect merchant clearance operations channels</p>
        </div>

        <div className="border border-slate-100 rounded-xl p-2 md:p-4 space-y-3 bg-slate-50/20">
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-slate-800">Paystack Transaction Handler</span>
            <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full">Connected</span>
          </div>
          <Input type="password" value="sk_test_••••••••••••••••••••••••" readOnly className="h-10 text-sm bg-white font-mono rounded-lg" />
          <button className="text-[10px] font-bold text-emerald-700 hover:underline">Configure Webhook Route Context</button>
        </div>

        <div className="border border-slate-100 rounded-xl p-2 md:p-4 space-y-3 bg-slate-50/20">
          <div className="flex items-center flex-wrap justify-between">
            <span className="text-sm font-bold text-slate-800">Flutterwave Merchant Gateway</span>
            <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full">Not Connected</span>
          </div>
          <div className="flex gap-2 flex-wrap">
            <Input type="password" placeholder="Enter Secret Key string hash" className="h-10 text-sm bg-white rounded-lg flex-1" />
            <Button size="sm" className="bg-slate-900 hover:bg-black text-white font-bold text-sm px-4 h-10 rounded-lg shadow-sm">Connect</Button>
          </div>
        </div>
      </div>

      {/* AI Orchestration Service Layer keys configuration container */}
      <div className="bg-white border border-slate-100 rounded-2xl p-4 md:p-6 space-y-3 shadow-xs">
        <h3 className="text-sm font-bold text-slate-800">OpenAI API Connection (AI Features)</h3>
        <p className="text-[11px] text-slate-400 font-medium">Powers automated document analysis and legal research summary discovery pipelines</p>
        <Input type="password" placeholder="sk-proj-••••••••••••" className="h-11 text-sm font-mono rounded-xl border-slate-200" />
      </div>
    </div>
  );
}