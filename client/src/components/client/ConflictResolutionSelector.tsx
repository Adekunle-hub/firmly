import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const RESOLUTIONS = [
  { id: "false-positive", title: "No Conflict (False Positive)", description: "Mark this as a false alarm and proceed with the case normally." },
  { id: "waiver", title: "Proceed with Waiver", description: "Send a conflict waiver to the client for signature." },
  { id: "reassign", title: "Reassign Client", description: "Assign this case to a different lawyer without conflicts." },
  { id: "reject", title: "Reject Case", description: "Decline the case due to unresolvable conflict of interest." },
];

export default function ConflictResolutionSelector({ value, onChange }: { value: string; onChange: (val: string) => void }) {
  return (
    <section className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm flex flex-col gap-4">
      <h2 className="text-sm font-bold text-slate-900">Select Resolution</h2>
      <RadioGroup value={value} onValueChange={onChange} className="flex flex-col gap-2">
        {RESOLUTIONS.map((option) => {
          const isSelected = value === option.id;
          return (
            <label
              key={option.id}
              className={`flex items-start gap-3 p-4 rounded-xl border transition-all cursor-pointer ${
                isSelected ? "border-[#055939] bg-emerald-50/40" : "border-slate-200 bg-white hover:border-slate-300"
              }`}
            >
              <RadioGroupItem
                value={option.id}
                className="mt-0.5 h-4 w-4 text-[#055939] border-slate-300 focus:ring-[#055939]"
              />
              <div className="select-none">
                <span className="block text-sm font-bold text-slate-900">{option.title}</span>
                <span className="block text-sm text-slate-400 mt-0.5">{option.description}</span>
              </div>
            </label>
          );
        })}
      </RadioGroup>
    </section>
  );
}