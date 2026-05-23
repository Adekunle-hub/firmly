import { AlertTriangle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function ConflictAlertBanner({ clientName }: { clientName: string }) {
  return (
    <Alert variant="destructive" className="bg-rose-50 border-rose-100 text-rose-900 rounded-xl p-4 flex items-start gap-3">
      <AlertTriangle className="text-rose-500 w-4 h-4 shrink-0 mt-0.5" />
      <div>
        <AlertTitle className="text-xs font-bold tracking-normal h-fit leading-none mb-1">Confirmed Conflict</AlertTitle>
        <AlertDescription className="text-xs text-rose-700/90 leading-normal">
          This case has been flagged for a potential conflict of interest for{" "}
          <span className="font-semibold text-rose-900">{clientName}</span>. Review the details below and select a resolution option.
        </AlertDescription>
      </div>
    </Alert>
  );
}