import { Textarea } from "@/components/ui/textarea";

export default function ConflictAdminNote({ value, onChange }: { value: string; onChange: (val: string) => void }) {
  return (
    <section className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm flex flex-col gap-3">
      <div>
        <label className="text-xs font-bold text-slate-700">
          Admin Note <span className="text-rose-500">*</span>
        </label>
        <p className="text-[11px] text-slate-400 mt-0.5">
          This note is mandatory and will be logged with your decision.
        </p>
      </div>
      <Textarea
        rows={4}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Explain your decision and provide any relevant context..."
        required
        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs text-slate-800 placeholder:text-slate-400 focus-visible:ring-1 focus-visible:ring-[#055939] focus-visible:border-[#055939] resize-none"
      />
    </section>
  );
}