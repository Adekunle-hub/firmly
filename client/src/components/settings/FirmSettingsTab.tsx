// app/settings/_components/FirmSettingsTab.tsx
import React, { useState } from "react";
import { Upload, Trash2, Copy } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function FirmSettingsTab() {
  const [brandColor, setBrandColor] = useState("#055939");
  const [firmName, setFirmName] = useState("Adewale & Associates Law Firm");

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 ga gap-2 sm:gap-6 md:gap-8 items-start">
      {/* Profile Info Setup Card */}
      <div className="lg:col-span-2 bg-white border border-slate-100 rounded-2xl p-4 md:p-6 md:space-y-6 space-y-4 shadow-xs">
        <h3 className="text-sm font-bold text-slate-800 border-b border-slate-50 pb-2">Profile & Branding</h3>
        
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-400 font-bold text-2xl">
            A
          </div>
          <button className="text-sm font-bold text-emerald-700 hover:underline">Edit Picture</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
          <div className="space-y-1.5 md:col-span-2">
            <label className="text-[11px] font-bold text-slate-700">Firm Name</label>
            <Input value={firmName} onChange={(e) => setFirmName(e.target.value)} className="h-10 text-sm rounded-xl" />
          </div>
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-700">Primary Contact</label>
            <Input defaultValue="+234 801 234 5678" className="h-10 text-sm rounded-xl" />
          </div>
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-700">Primary Email</label>
            <Input defaultValue="info@adewalelaw.ng" className="h-10 text-sm rounded-xl" />
          </div>
          <div className="space-y-1.5 md:col-span-2">
            <label className="text-[11px] font-bold text-slate-700">Address</label>
            <Input placeholder="Enter Address" className="h-10 text-sm rounded-xl" />
          </div>
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-700">Default Currency</label>
            <Select defaultValue="ngn">
              <SelectTrigger className="h-10 text-sm rounded-xl"><SelectValue /></SelectTrigger>
              <SelectContent className="bg-white text-sm font-medium"><SelectItem value="ngn">NGN - Nigerian Naira</SelectItem></SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-700">VAT Number</label>
            <Input defaultValue="VAT-NG-12345678" className="h-10 text-sm rounded-xl" />
          </div>
        </div>
      </div>

      {/* Right Column Layout: Asset Graphics Upload & Live Theme Preview Container */}
      <div className="space-y-4 md:space-y-6">
        <div className="bg-white border border-slate-100 rounded-2xl p-4 md:p-6 space-y-5 shadow-xs">
          <h3 className="text-sm font-bold text-slate-800 flex items-center gap-1.5">🎨 Branding</h3>
          
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-500">Firm Logo (Icon)</label>
            <div className="border border-dashed border-slate-200 rounded-xl p-5 flex flex-col items-center text-center bg-slate-50/40">
              <Upload size={16} className="text-slate-400 mb-1" />
              <p className="text-[10px] font-bold text-slate-700">Click or drag logo</p>
              <p className="text-[9px] text-slate-400">SVG or PNG (Max 2MB)</p>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-500">Full Wordmark</label>
            <div className="border border-slate-100 bg-slate-50/50 rounded-xl p-2.5 flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-700 truncate max-w-[140px]">wordmark_lex.svg</span>
              <Button variant="ghost" size="icon" className="h-7 w-7 text-slate-400 hover:text-red-600 rounded-lg"><Trash2 size={13} /></Button>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-500">Brand Primary Color</label>
            <div className="flex items-center gap-2">
              <div className="h-9 w-9 rounded-xl border border-slate-100 shadow-inner" style={{ backgroundColor: brandColor }} />
              <div className="relative flex-1">
                <Input value={brandColor} onChange={(e) => setBrandColor(e.target.value)} className="h-9 text-sm pl-3 font-mono rounded-lg" />
                <Copy size={12} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 cursor-pointer" />
              </div>
            </div>
          </div>
        </div>

        {/* Live System Simulated Widget Interface Wrapper */}
        <div className="bg-white border border-slate-100 rounded-2xl p-5 space-y-3 shadow-xs">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">👁 Live UI Canvas Preview</p>
          <div className="border border-slate-100 bg-slate-50/60 rounded-xl p-4 space-y-3">
            <div className="flex items-center gap-2">
              <div className="h-5 w-5 rounded" style={{ backgroundColor: brandColor }} />
              <div className="h-3 w-28 bg-slate-200 rounded animate-pulse" />
            </div>
            <div className="h-2.5 w-full bg-slate-200 rounded" />
            <div className="h-2.5 w-3/4 bg-slate-200 rounded" />
            <Button size="sm" className="w-full text-[11px] font-bold text-white h-8 rounded-lg shadow-xs" style={{ backgroundColor: brandColor }}>
              Interactive Target Button
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}