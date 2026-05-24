import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function ConflictDetailsCard({ clientName, conflictPartner }: { clientName: string; conflictPartner?: string }) {
  return (
    <section className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm flex flex-col gap-4">
      <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wider">Conflict Details</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <ReadonlyField label="Client Name" value={clientName} />
        <ReadonlyField label="Conflict Type" value="Direct" />
        <ReadonlyField label="Relationship with client/case" value="Lawyer previously represented opposing party" className="sm:col-span-2" />
        <ReadonlyField label="Role" value="Former legal rep (conflict of prior representation)" className="sm:col-span-2" />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-semibold text-slate-500">Conflict Note</label>
        <Textarea
          readOnly
          rows={2}
          value={`Lawyer previously advised ${conflictPartner ?? "a related party"} in a prior matter.`}
          className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-600 focus-visible:ring-0 resize-none min-h-0"
        />
      </div>
    </section>
  );
}

function ReadonlyField({ label, value, className = "" }: { label: string; value: string; className?: string }) {
  return (
    <div className={className}>
      <label className="block text-sm font-semibold text-slate-500 mb-1.5">{label}</label>
      <Input
        type="text"
        readOnly
        value={value}
        className="w-full h-9 bg-slate-50 border-slate-200 rounded-lg px-3 text-sm text-slate-700 focus-visible:ring-0"
      />
    </div>
  );
}