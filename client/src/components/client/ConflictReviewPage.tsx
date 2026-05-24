"use client";

import React, { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { ArrowLeft, ShieldAlert } from "lucide-react";

import Bounded from "@/components/Bounded";
import { Button } from "@/components/ui/button";
import ConflictAdminNote from "./ConflictAdminNote";
import ConflictAlertBanner from "./ConflictAlertBanner";
import ConflictDetailsCard from "./ConflictDetailsCard";
import ConflictingRecordsTable from "./ConflictRecordsTable";
import ConflictResolutionSelector from "./ConflictResolutionSelector";

export default function ConflictReviewPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center p-20 text-sm text-slate-400">
          Loading review parameters...
        </div>
      }
    >
      <ConflictReviewContent />
    </Suspense>
  );
}

function ConflictReviewContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const raw = searchParams.get("data");
  const parsed = raw ? JSON.parse(decodeURIComponent(raw)) : null;
  const clientName: string = parsed?.clientName || "Unknown Client";


  const savedWorkflowForm = parsed?.savedWorkflowForm || null;

  const conflicts = parsed?.conflicts || [
    {
      type: "Client",
      name: "Adewale Holdings Ltd",
      role: "Former Client",
      id: "CL-2034",
    },
    {
      type: "Case",
      name: "Adewale v. Zenith Bank",
      role: "Opposing Party",
      id: "CASE-1098",
    },
  ];

  const [selectedResolution, setSelectedResolution] = useState("");
  const [adminNote, setAdminNote] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const canSubmit = selectedResolution && adminNote.trim();

  const handleRedirectBackToWorkflowStep = (targetStep: number) => {
    if (savedWorkflowForm) {
      const encodedForm = encodeURIComponent(JSON.stringify(savedWorkflowForm));

      router.push(`/clients/new?step=${targetStep}&formData=${encodedForm}`);
    } else {
      router.push("/clients");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      const labels: Record<string, string> = {
        "false-positive": "marked as false positive",
        waiver: "flagged for waiver",
        reassign: "queued for reassignment",
        reject: "rejected",
      };

      toast.success(
        `Conflict resolved — case ${labels[selectedResolution] ?? "updated"}.`,
      );

      handleRedirectBackToWorkflowStep(3);
    }, 1000);
  };

  const caseTitle =
    conflicts.find((c: any) => c.type === "Case")?.name ||
    conflicts[0]?.name ||
    "Conflict Review";

  return (
    <Bounded>
      <div className="flex flex-col gap-6 w-full max-w-3xl  pb-10">
        <button
          type="button"
          onClick={() => handleRedirectBackToWorkflowStep(1)}
          className="flex items-center gap-1.5 text-sm font-bold text-slate-500 hover:text-slate-800 transition-colors w-fit cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          Cancel and return to form
        </button>

        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-rose-50 border border-rose-100 flex items-center justify-center shrink-0">
            <ShieldAlert className="w-5 h-5 text-rose-600" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900">
              Conflict Review
            </h1>
            <p className="text-sm text-slate-400 mt-0.5">{caseTitle}</p>
          </div>
        </div>

        <ConflictAlertBanner clientName={clientName} />

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <ConflictDetailsCard
            clientName={clientName}
            conflictPartner={conflicts[0]?.name}
          />

          <ConflictingRecordsTable conflicts={conflicts} />

          <ConflictResolutionSelector
            value={selectedResolution}
            onChange={setSelectedResolution}
          />

          <ConflictAdminNote value={adminNote} onChange={setAdminNote} />

          <div className="flex items-center gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => handleRedirectBackToWorkflowStep(1)}
              className="flex-1 h-11 border-slate-200 text-slate-700 font-bold text-sm rounded-xl"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!canSubmit || isSubmitting}
              className={`flex-1 h-11 text-white text-sm font-bold rounded-xl transition-colors ${
                canSubmit && !isSubmitting
                  ? "bg-[#055939] hover:bg-[#044c30]"
                  : "bg-slate-200 text-slate-400"
              }`}
            >
              {isSubmitting ? "Submitting..." : "Submit Resolution"}
            </Button>
          </div>
        </form>
      </div>
    </Bounded>
  );
}
