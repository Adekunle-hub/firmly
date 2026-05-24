// components/documents/TemplateCategory.tsx
import React from "react";
import { Button } from "@/components/ui/button";

interface TemplateItem {
  id: string;
  name: string;
  count: number;
}

interface TemplateCategoryProps {
  title: string;
  items: TemplateItem[];
}

export default function TemplateCategory({ title, items }: TemplateCategoryProps) {
  return (
    <div className="space-y-2 md:space-y-4 ">
      <h2 className="text-lg font-bold text-slate-900 tracking-tight">{title}</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {items.map((item) => (
          <div 
            key={item.id} 
            className="bg-white border border-slate-100 rounded-2xl p-3 md:p-5 flex items-center justify-between hover:shadow-sm transition-all flex-col sm:flex-row"
          >
            <div className="flex items-center gap-4">
              {/* Abstract Placeholder Image Container */}
              <div className="h-24 w-32 bg-[#F5F1EA] rounded-xl overflow-hidden border border-slate-50 relative">
                 <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-amber-900 to-transparent"></div>
                 <div className="absolute top-4 left-4 h-8 w-8 rounded-full border border-amber-900/10"></div>
              </div>
              
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-slate-800">{item.name}</h4>
                <p className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md inline-block">
                  {item.count} Files
                </p>
              </div>
            </div>

            <Button variant="ghost" className="text-sm cursor-pointer font-bold text-[#1A6341] hover:bg-emerald-50 h-8 px-1 md:px-4 rounded-lg">
              View Files
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}