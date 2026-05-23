import { FileDown } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface ConflictItem {
  type: string;
  name: string;
  role: string;
  id: string;
}

export default function ConflictingRecordsTable({ conflicts }: { conflicts: ConflictItem[] }) {
  const caseConflicts = conflicts.filter((c) => c.type === "Case");

  return (
    <section className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm flex flex-col gap-4">
      <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Conflicting Records</h2>

      <div className="border border-slate-100 rounded-xl overflow-hidden">
        <Table className="w-full text-xs">
          <TableHeader>
            <TableRow className="bg-slate-50 border-b border-slate-100 hover:bg-slate-50">
              <TableHead className="h-9 font-bold text-slate-400 uppercase tracking-wider px-3">Type</TableHead>
              <TableHead className="h-9 font-bold text-slate-400 uppercase tracking-wider px-3">Name / Title</TableHead>
              <TableHead className="h-9 font-bold text-slate-400 uppercase tracking-wider px-3">Role</TableHead>
              <TableHead className="h-9 font-bold text-slate-400 uppercase tracking-wider px-3">ID</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="text-slate-700">
            {conflicts.map((c, i) => (
              <TableRow key={i} className="hover:bg-slate-50/50 border-b border-slate-50">
                <TableCell className="py-3 px-3 text-slate-400">{c.type}</TableCell>
                <TableCell className="py-3 px-3 font-bold text-slate-900">{c.name}</TableCell>
                <TableCell className="py-3 px-3">{c.role}</TableCell>
                <TableCell className="py-3 px-3 font-mono text-[11px]">{c.id}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-semibold text-slate-500">Related Cases</label>
        <div className="border border-slate-100 rounded-xl bg-white divide-y divide-slate-50 overflow-hidden">
          {caseConflicts.map((c, i) => (
            <div key={i} className="flex items-center gap-2 px-4 py-3 text-xs text-slate-600 hover:bg-slate-50 cursor-pointer transition-colors">
              <FileDown className="w-3.5 h-3.5 text-slate-400" />
              {c.name}
            </div>
          ))}
          {caseConflicts.length === 0 && (
            <div className="px-4 py-3 text-xs text-slate-400">No related cases found.</div>
          )}
        </div>
      </div>
    </section>
  );
}