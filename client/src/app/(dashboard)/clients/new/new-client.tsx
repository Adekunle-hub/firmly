"use client";

import { toast } from "sonner";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import Bounded from "@/components/Bounded";
import StepIndicator from "@/components/onboarding/StepIndicator";
import ClientDetailsForm from "@/components/onboarding/ClientDetailsForm";
import ConflictCheckModal from "@/components/onboarding/ConflictCheckModal";
import EngagementLetterPreview from "@/components/onboarding/EngagementLetterPreview";
import CalendarBookingModal from "@/components/onboarding/CalendarBookingModal";
import DocumentsUpload from "@/components/onboarding/DocumentsUpload";
import CompleteModal from "@/components/onboarding/CompleteModal";
import { addClient } from "@/utils/clientStorage";
import { DetailedClient } from "@/utils/types";

export default function NewClientWorkflow() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Parse step and data parameters directly from the URL route context
  const urlStep = searchParams.get("step");
  const urlData = searchParams.get("formData");

  const [step, setStep] = useState(1);
  const [clientData, setClientData] = useState<any>(null);
  const [bookingDetails, setBookingDetails] = useState<any>(null);
  const [uploadedDocuments, setUploadedDocuments] = useState<any[]>([]);

  const [isConflictModalOpen, setIsConflictModalOpen] = useState(false);
  const [isCalendarModalOpen, setIsCalendarModalOpen] = useState(false);
  const [isCompleteModalOpen, setIsCompleteModalOpen] = useState(false);

  // Hydrate states if navigating back from external sub-routes
  useEffect(() => {
    if (urlStep) {
      setStep(parseInt(urlStep, 10));
    }
    if (urlData) {
      try {
        setClientData(JSON.parse(decodeURIComponent(urlData)));
      } catch (e) {
        console.error("Failed parsing hydrated form data from URL state context token", e);
      }
    }
  }, [urlStep, urlData]);

  const handleBackClick = () => {
    if (step === 1) {
      router.push("/clients");
    } else if (step === 2) {
      setIsConflictModalOpen(false);
      setStep(1);
    } else if (step === 4) {
      setIsCalendarModalOpen(false);
      setStep(3);
    } else if (step === 5) {
      setStep(3);
    } else {
      setStep((prev) => prev - 1);
    }
  };

  const handleDetailsSubmit = (data: any) => {
    setClientData(data);
    setStep(2);
    setIsConflictModalOpen(true);
  };

  const handleConflictProceed = () => {
    setIsConflictModalOpen(false);
    setStep(3);
  };

  const handleConflictCancel = () => {
    setIsConflictModalOpen(false);
    setStep(1);
  };

  const handleEngagementSend = () => {
    setStep(4);
    setIsCalendarModalOpen(true);
  };

  const handleEngagementSaveDraft = () => {
    setStep(4);
    setIsCalendarModalOpen(true);
  };

  const handleCalendarBook = (details: any) => {
    setBookingDetails(details);
    setIsCalendarModalOpen(false);
    setStep(5);
    toast.success("Event has been added to your calendar");
  };

  const handleCalendarCancel = () => {
    setIsCalendarModalOpen(false);
    setStep(3);
  };

  const handleDocumentsComplete = (docs: any[]) => {
    if (!clientData) return;
    setUploadedDocuments(docs);

    const newId = "client_" + Date.now();
    const clientRef = `#BD${Math.floor(1000000 + Math.random() * 9000000)}`;

    const newClient: DetailedClient = {
      id: newId,
      clientId: clientRef,
      name: clientData.name,
      caseType: clientData.legalMatter || "General Counsel",
      email: clientData.email,
      conflict: "No Conflict",
      phone: clientData.phone,
      clientType: clientData.clientType,
      conflictStatus: "Active",
      address: clientData.address ?? "N/A",
      state: clientData.state ?? "N/A",
      lga: clientData.lga ?? "N/A",
      nationality: clientData.nationality ?? "N/A",
      workplace: clientData.workplace ?? "N/A",
      preferredContact: "Email",
      dateRegistered: new Date().toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      }),
      linkedCases: clientData.linkedCase
        ? [
            {
              id: "case_" + Date.now(),
              title: clientData.linkedCase === "Create New" ? clientData.legalMatter || "New Onboarding Matter" : clientData.linkedCase,
              caseNumber: `LD/${Math.floor(100 + Math.random() * 900)}/2026`,
              status: "Active",
              caseType: clientData.legalMatter || "Civil Litigation",
              filingDate: new Date().toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              }),
              jurisdiction: "Lagos State High Court",
            },
          ]
        : [],
      documents: [
        ...(clientData.fileName ? [{ id: "doc_id_" + Date.now(), name: clientData.fileName, type: "Identification", dateUploaded: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }), size: clientData.fileSize || "1.2 MB" }] : []),
        ...docs,
      ],
    };

    addClient(newClient);
    setStep(6);
    setIsCompleteModalOpen(true);
  };

  const handleReturnToDirectory = () => {
    setIsCompleteModalOpen(false);
    router.push("/clients");
  };

  return (
    <Bounded>
      <div className="flex flex-col  gap-6 w-full max-w-7xl mx-auto pb-10">
        <button
          onClick={handleBackClick}
          className="flex items-center gap-1.5 text-sm font-bold text-slate-500 hover:text-slate-800 transition-colors w-fit cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
          Back
        </button>

        <StepIndicator currentStep={step} />

        <div className="">
          {step === 1 && <ClientDetailsForm onSubmit={handleDetailsSubmit} defaultValues={clientData} />}

          {step === 2 && (
            <div className="bg-white border border-slate-200/80 rounded-2xl p-20 text-center text-slate-400">
              Conflict Check is running...
            </div>
          )}

          {step === 3 && clientData && (
            <EngagementLetterPreview
              clientData={clientData}
              onNext={handleEngagementSend}
              onSaveDraft={handleEngagementSaveDraft}
            />
          )}

          {step === 4 && (
            <div className="bg-white border border-slate-200/80 rounded-2xl p-20 text-center text-slate-400">
              Calendar Booking is running...
            </div>
          )}

          {step === 5 && <DocumentsUpload onComplete={handleDocumentsComplete} />}

          {step === 6 && (
            <div className="bg-white border border-slate-200/80 rounded-2xl p-20 text-center text-slate-400">
              Client Creation Complete!
            </div>
          )}
        </div>

        <ConflictCheckModal
          isOpen={isConflictModalOpen}
          clientName={clientData?.name || ""}
          simulationMode={clientData?.name?.toLowerCase().includes("conflict") ? "conflict" : "clean"} 
          onProceed={handleConflictProceed}
          onCancel={handleConflictCancel}
          onViewDetails={() => {
            
            const payload = {
              clientName: clientData?.name || "",
              conflicts: [
                { type: "Client", name: "Adewale Holdings Ltd", role: "Former Client", id: "CL-2034" },
                { type: "Case", name: "Adewale v. Zenith Bank", role: "Opposing Party", id: "CASE-1098" },
              ],
              savedWorkflowForm: clientData 
            };
            const encodedData = encodeURIComponent(JSON.stringify(payload));
            router.push(`/clients/conflicts-review?data=${encodedData}`);
          }}
        />

        {isCalendarModalOpen && clientData && (
          <CalendarBookingModal
            isOpen={isCalendarModalOpen}
            clientData={clientData}
            onBook={handleCalendarBook}
            onCancel={handleCalendarCancel}
          />
        )}

        <CompleteModal
          isOpen={isCompleteModalOpen}
          clientName={clientData?.name || ""}
          onReturn={handleReturnToDirectory}
        />
      </div>
    </Bounded>
  );
}