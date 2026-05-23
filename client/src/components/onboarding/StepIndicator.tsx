import React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface StepIndicatorProps {
  currentStep: number;
}

const STEPS = [
  "Client Details",
  "Conflict Check",
  "Engagement Letter",
  "Calendar Booking",
  "Documents",
  "Complete",
];

export default function StepIndicator({ currentStep }: StepIndicatorProps) {
  return (
    <div className="w-full   bg-slate-50/50 border border-slate-100 rounded-2xl py-0 md:p-4 flex md:items-center items-start justify-start md:justify-between flex-wrap md:flex-row flex-col gap-y-1  md:gap-y-4 md:gap-x-2">
      {STEPS.map((label, index) => {
        const stepNum = index + 1;
        const isActive = currentStep === stepNum;
        const isCompleted = currentStep > stepNum;

        return (
          <React.Fragment key={label}>
          
            <div className="flex items-center gap-2 select-none">
              <div
                className={cn(
                  "h-7 w-7 rounded-full flex items-center justify-center text-[12.5px] font-bold border transition-all duration-300",
                  isCompleted
                    ? "bg-[#055939] text-white border-[#055939]"
                    : isActive
                      ? "bg-[#055939] text-white border-[#055939] ring-4 ring-emerald-500/10 shadow-sm"
                      : "bg-white text-slate-400 border-slate-200"
                )}
              >
                {isCompleted ? (
                  <Check className="w-3.5 h-3.5 stroke-3" />
                ) : (
                  stepNum
                )}
              </div>
              <span
                className={cn(
                  "text-[12.5px] font-semibold transition-all duration-300",
                  isActive
                    ? "text-[#055939]"
                    : isCompleted
                      ? "text-slate-700"
                      : "text-slate-400/80"
                )}
              >
                {label}
              </span>
            </div>

            
            {index < STEPS.length - 1 && (
              <div
                className={cn(
                  "hidden lg:block h-[1.5px] flex-1 max-w-10 transition-colors duration-300",
                  currentStep > stepNum ? "bg-[#055939]" : "bg-slate-200"
                )}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
