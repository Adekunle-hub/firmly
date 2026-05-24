// app/settings/_components/PublicProfileTab.tsx
import React from "react";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function PublicProfileTab() {
  const servicesList = [
    { id: "consult", label: "Consultation Services" },
    { id: "contract", label: "Document & Contract Work" },
    { id: "rep", label: "Representation" },
    { id: "corp", label: "Business & Corporate" },
    { id: "family", label: "Family & Personal Matters" },
    { id: "ip", label: "Intellectual Property" },
  ];

  return (
    <div className="bg-white border border-slate-100 rounded-2xl p-4 md:p-6 space-y-4 md:space-y-6 w-full shadow-xs">
      <div>
        <h3 className="text-sm font-bold text-slate-800">Public Profile Layout</h3>
        <p className="text-[11px] text-slate-400 mt-0.5">Control details published out onto directory lookups</p>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-1.5 md:col-span-2">
            <label className="text-[11px] font-bold text-slate-700">Full Name</label>
            <Input defaultValue="Adejoke Owolabi" className="h-10 text-sm rounded-xl" />
          </div>
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-700">Professional Title</label>
            <Input defaultValue="ESQ." className="h-10 text-sm rounded-xl" />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-[11px] font-bold text-slate-700">Bio / Professional Description</label>
          <textarea 
            rows={4} 
            className="w-full border border-slate-200 rounded-xl p-3 text-sm font-medium focus:outline-none focus:ring-1 focus:ring-emerald-600"
            defaultValue="Lorem ipsum dolor sit amet consectetur..."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-700">Practice Area</label>
            <Select defaultValue="litigation">
              <SelectTrigger className="h-10 text-sm rounded-xl"><SelectValue /></SelectTrigger>
              <SelectContent className="bg-white text-sm"><SelectItem value="litigation">Litigation</SelectItem></SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-700">City</label>
            <Select defaultValue="lekki">
              <SelectTrigger className="h-10 text-sm rounded-xl"><SelectValue /></SelectTrigger>
              <SelectContent className="bg-white text-sm"><SelectItem value="lekki">Lekki</SelectItem></SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-700">State</label>
            <Select defaultValue="lagos">
              <SelectTrigger className="h-10 text-sm rounded-xl"><SelectValue /></SelectTrigger>
              <SelectContent className="bg-white text-sm"><SelectItem value="lagos">Lagos</SelectItem></SelectContent>
            </Select>
          </div>
        </div>

        {/* Services Multi-Checkbox Layout Grid */}
        <div className="pt-4 border-t border-slate-50 space-y-3">
          <label className="text-[11px] font-bold text-slate-800 uppercase tracking-wider">Services Offered & Billable Rates</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {servicesList.map((service) => (
              <div key={service.id} className="flex items-center gap-3 p-3 border border-slate-100 rounded-xl hover:bg-slate-50/50">
                <Checkbox id={service.id} defaultChecked={service.id === "consult"} className="rounded border-slate-300" />
                <label htmlFor={service.id} className="text-sm font-semibold text-slate-700 cursor-pointer">{service.label}</label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}