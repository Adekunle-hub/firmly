"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Check, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

// Import step components
import CaseDetailsForm from "./add-case/CaseDetailsForm";
import CourtParticipantsForm from "./add-case/CourtParticipantsForm";
import ConflictCheckForm from "./add-case/ConflictCheckForm";
import CalendarBookingForm from "./add-case/CalendarBookingForm";
import InvoiceForm from "./add-case/InvoiceForm";

/* ─── Types ─── */
interface WitnessRow {
  name: string;
  contact: string;
  relationship: string;
  opposingCounsel: string;
  statement: string;
}

interface InvoiceItem {
  item: string;
  unitPrice: string;
  quantity: string;
}

interface UploadedFile {
  name: string;
  size: string;
  type: string;
}

const STEPS = [
  "Case Details",
  "Court & Participant Information",
  "Conflict Check",
  "Calendar Booking",
  "Invoice",
];

export default function AddCaseWizard() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);

  /* Step 1 state */
  const [clientLink, setClientLink] = useState("");
  const [caseTitle, setCaseTitle] = useState("");
  const [suitNumber1, setSuitNumber1] = useState("");
  const [caseType, setCaseType] = useState("");
  const [description, setDescription] = useState("");
  const [priorityLevel, setPriorityLevel] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [suitNumber2, setSuitNumber2] = useState("");
  const [step1Files, setStep1Files] = useState<UploadedFile[]>([]);
  const [saveAsDraft, setSaveAsDraft] = useState(false);

  /* Step 2 state */
  const [courtTier, setCourtTier] = useState("");
  const [courtName, setCourtName] = useState("");
  const [stateJurisdiction, setStateJurisdiction] = useState("");
  const [presidingJudge, setPresidingJudge] = useState("");
  const [showAddJudges, setShowAddJudges] = useState(false);
  const [additionalJudges, setAdditionalJudges] = useState<string[]>([""]);
  const [opposingParty, setOpposingParty] = useState("");
  const [opposingCounsel, setOpposingCounsel] = useState("");
  const [opposingCounselEmail, setOpposingCounselEmail] = useState("");
  const [opposingCounselPhone, setOpposingCounselPhone] = useState("");
  const [witnesses, setWitnesses] = useState<WitnessRow[]>([
    {
      name: "",
      contact: "",
      relationship: "",
      opposingCounsel: "",
      statement: "",
    },
  ]);
  const [incidentDate, setIncidentDate] = useState("");
  const [filingDate, setFilingDate] = useState("");
  const [hearingDate, setHearingDate] = useState("");
  const [evidenceFiles, setEvidenceFiles] = useState<UploadedFile[]>([
    { name: "Contract_A_Revised.pdf", size: "2.4 MB", type: "pdf" },
    { name: "CCTV_Front_Discovery.jpg", size: "1.8 MB", type: "jpg" },
    { name: "Interview_Recording_01.mp4", size: "12.4 MB", type: "mp4" },
    { name: "Financial_Audit_2023.csv", size: "3.1 MB", type: "csv" },
  ]);

  /* Step 4 state */
  const [calendarClient, setCalendarClient] = useState("Jane Doe");
  const [calendarStartDate, setCalendarStartDate] = useState("05/05/2025");
  const [calendarStartTime, setCalendarStartTime] = useState("05:55");
  const [calendarStartPeriod, setCalendarStartPeriod] = useState("AM");
  const [calendarEndDate, setCalendarEndDate] = useState("05/05/2025");
  const [calendarEndTime, setCalendarEndTime] = useState("06:00");
  const [calendarEndPeriod, setCalendarEndPeriod] = useState("AM");
  const [calendarLegalMatter, setCalendarLegalMatter] = useState("");
  const [calendarNotes, setCalendarNotes] = useState("");

  /* Step 5 state */
  const [invoiceClientName, setInvoiceClientName] = useState("");
  const [invoiceClientEmail, setInvoiceClientEmail] = useState("");
  const [invoiceSuitNumber, setInvoiceSuitNumber] = useState("");
  const [invoiceClientPhone, setInvoiceClientPhone] = useState("");
  const [invoiceClientAddress, setInvoiceClientAddress] = useState("");
  const [invoiceCaseTitle, setInvoiceCaseTitle] = useState("");
  const [billingTrigger, setBillingTrigger] = useState("");
  const [invoiceIssuedDate, setInvoiceIssuedDate] = useState("");
  const [invoiceDueDate, setInvoiceDueDate] = useState("");
  const [contingencyFee, setContingencyFee] = useState("");
  const [invoiceItems, setInvoiceItems] = useState<InvoiceItem[]>([
    {
      item: "Legal Consultation & Case Analysis",
      unitPrice: "350000",
      quantity: "1",
    },
    {
      item: "Drafting of Originating Processes",
      unitPrice: "1200000",
      quantity: "1",
    },
  ]);
  const [paymentStructure, setPaymentStructure] = useState<
    "full" | "installment"
  >("full");
  const [installmentCount, setInstallmentCount] = useState("3");
  const [includeVat, setIncludeVat] = useState(true);

  const handleNext = () => {
    if (currentStep < 5) setCurrentStep(currentStep + 1);
  };

  const onCalenderBook = () => {
    toast.success("Event set on calendar successfully");
    setCurrentStep((currentStep) => currentStep + 1);
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleCancel = () => {
    router.push("/cases");
  };

  const handleCreateInvoice = () => {
    toast.dismiss();
    toast.success("Invoice created successfully", {
      className: "z-[99999]", 
    });

    setTimeout(() => {
      router.push("/cases");
    }, 350);
  };

  /* Stepper UI */
  const renderStepper = () => (
    <nav
      aria-label="Progress Stepper"
      className="flex items-center gap-1.5 flex-wrap mb-6 border-b border-slate-100 pb-5"
    >
      {STEPS.map((label, idx) => {
        const stepNum = idx + 1;
        const isCompleted = currentStep > stepNum;
        const isActive = currentStep === stepNum;
        return (
          <React.Fragment key={label}>
            <div
              className="flex items-center gap-1.5"
              aria-current={isActive ? "step" : undefined}
            >
              <div
                className={cn(
                  "h-6 w-6 rounded-full flex items-center justify-center text-[10px] font-bold transition-all shrink-0 select-none",
                  isCompleted
                    ? "bg-[#1A4331] text-white"
                    : isActive
                      ? "bg-[#1A4331] text-white ring-4 ring-[#1A4331]/10"
                      : "bg-slate-150 text-slate-400",
                )}
              >
                {isCompleted ? (
                  <Check size={12} className="stroke-3" />
                ) : (
                  stepNum
                )}
              </div>
              <span
                className={cn(
                  "text-[11px] font-semibold whitespace-nowrap hidden sm:inline select-none",
                  isActive
                    ? "text-[#1A4331]"
                    : isCompleted
                      ? "text-slate-700"
                      : "text-slate-400",
                )}
              >
                {label}
              </span>
            </div>
            {idx < STEPS.length - 1 && (
              <div
                className={cn(
                  "h-px w-5 lg:w-8 transition-colors duration-200",
                  isCompleted ? "bg-[#1A4331]" : "bg-slate-200",
                )}
                role="presentation"
              />
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );

  return (
    <div className="w-full m-full  py-2">
      <header className="flex items-center justify-between mb-5">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-1.5">
            Case Details
          </h1>
          <p className="text-[11px] text-slate-400 font-semibold mt-0.5">
            Step {currentStep} of {STEPS.length} &ndash;{" "}
            {STEPS[currentStep - 1]}
          </p>
        </div>
        {/* <div className="flex items-center gap-2">
          <Info size={14} className="text-slate-400 cursor-pointer" />
          <Button
            asChild
            className="bg-[#1A4331] hover:bg-[#133224] text-white h-9 px-3.5 text-[11px] font-bold rounded-lg shadow-sm cursor-pointer"
          >
            <Link href="/clients/new">+ Create New Client</Link>
          </Button>
        </div> */}
      </header>

      {/* Stepper progress */}
      {renderStepper()}

      {/* Main step forms container */}
      <main className="mt-4">
        {currentStep === 1 && (
          <CaseDetailsForm
            clientLink={clientLink}
            setClientLink={setClientLink}
            caseTitle={caseTitle}
            setCaseTitle={setCaseTitle}
            suitNumber1={suitNumber1}
            setSuitNumber1={setSuitNumber1}
            caseType={caseType}
            setCaseType={setCaseType}
            description={description}
            setDescription={setDescription}
            priorityLevel={priorityLevel}
            setPriorityLevel={setPriorityLevel}
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
            suitNumber2={suitNumber2}
            setSuitNumber2={setSuitNumber2}
            step1Files={step1Files}
            setStep1Files={setStep1Files}
            saveAsDraft={saveAsDraft}
            setSaveAsDraft={setSaveAsDraft}
            onNext={handleNext}
            onCancel={handleCancel}
          />
        )}
        {currentStep === 2 && (
          <CourtParticipantsForm
            courtTier={courtTier}
            setCourtTier={setCourtTier}
            courtName={courtName}
            setCourtName={setCourtName}
            stateJurisdiction={stateJurisdiction}
            setStateJurisdiction={setStateJurisdiction}
            presidingJudge={presidingJudge}
            setPresidingJudge={setPresidingJudge}
            showAddJudges={showAddJudges}
            setShowAddJudges={setShowAddJudges}
            additionalJudges={additionalJudges}
            setAdditionalJudges={setAdditionalJudges}
            opposingParty={opposingParty}
            setOpposingParty={setOpposingParty}
            opposingCounsel={opposingCounsel}
            setOpposingCounsel={setOpposingCounsel}
            opposingCounselEmail={opposingCounselEmail}
            setOpposingCounselEmail={setOpposingCounselEmail}
            opposingCounselPhone={opposingCounselPhone}
            setOpposingCounselPhone={setOpposingCounselPhone}
            witnesses={witnesses}
            setWitnesses={setWitnesses}
            incidentDate={incidentDate}
            setIncidentDate={setIncidentDate}
            filingDate={filingDate}
            setFilingDate={setFilingDate}
            hearingDate={hearingDate}
            setHearingDate={setHearingDate}
            evidenceFiles={evidenceFiles}
            setEvidenceFiles={setEvidenceFiles}
            saveAsDraft={saveAsDraft}
            setSaveAsDraft={setSaveAsDraft}
            onNext={handleNext}
            onBack={handleBack}
          />
        )}

        {currentStep === 3 && (
          <ConflictCheckForm
            onResolve={() => {
              const conflictData = encodeURIComponent(
                JSON.stringify({
                  clientName: clientLink || "Unknown Client",
                  conflicts: [
                    {
                      type: "Client",
                      name: "Adewale Holdings Ltd",
                      role: "Former Client",
                      id: `CL-${Math.floor(1000 + Math.random() * 9000)}`,
                    },
                    {
                      type: "Case",
                      name: "Adewale v. Zenith Bank",
                      role: "Opposing Party",
                      id: `CASE-${Math.floor(1000 + Math.random() * 9000)}`,
                    },
                  ],
                }),
              );
              router.push(`/cases/conflicts-review?data=${conflictData}`);
            }}
            onDismiss={() => setCurrentStep(4)} // ← explicitly go to step 2
          />
        )}
        {currentStep === 4 && (
          <CalendarBookingForm
            calendarClient={calendarClient}
            setCalendarClient={setCalendarClient}
            calendarStartDate={calendarStartDate}
            setCalendarStartDate={setCalendarStartDate}
            calendarStartTime={calendarStartTime}
            setCalendarStartTime={setCalendarStartTime}
            calendarStartPeriod={calendarStartPeriod}
            setCalendarStartPeriod={setCalendarStartPeriod}
            calendarEndDate={calendarEndDate}
            setCalendarEndDate={setCalendarEndDate}
            calendarEndTime={calendarEndTime}
            setCalendarEndTime={setCalendarEndTime}
            calendarEndPeriod={calendarEndPeriod}
            setCalendarEndPeriod={setCalendarEndPeriod}
            calendarLegalMatter={calendarLegalMatter}
            setCalendarLegalMatter={setCalendarLegalMatter}
            calendarNotes={calendarNotes}
            setCalendarNotes={setCalendarNotes}
            onBook={onCalenderBook}
            onCancel={handleBack}
          />
        )}
        {currentStep === 5 && (
          <InvoiceForm
            invoiceClientName={invoiceClientName}
            setInvoiceClientName={setInvoiceClientName}
            invoiceClientEmail={invoiceClientEmail}
            setInvoiceClientEmail={setInvoiceClientEmail}
            invoiceSuitNumber={invoiceSuitNumber}
            setInvoiceSuitNumber={setInvoiceSuitNumber}
            invoiceClientPhone={invoiceClientPhone}
            setInvoiceClientPhone={setInvoiceClientPhone}
            invoiceClientAddress={invoiceClientAddress}
            setInvoiceClientAddress={setInvoiceClientAddress}
            invoiceCaseTitle={invoiceCaseTitle}
            setInvoiceCaseTitle={setInvoiceCaseTitle}
            billingTrigger={billingTrigger}
            setBillingTrigger={setBillingTrigger}
            invoiceIssuedDate={invoiceIssuedDate}
            setInvoiceIssuedDate={setInvoiceIssuedDate}
            invoiceDueDate={invoiceDueDate}
            setInvoiceDueDate={setInvoiceDueDate}
            contingencyFee={contingencyFee}
            setContingencyFee={setContingencyFee}
            invoiceItems={invoiceItems}
            setInvoiceItems={setInvoiceItems}
            paymentStructure={paymentStructure}
            setPaymentStructure={setPaymentStructure}
            installmentCount={installmentCount}
            setInstallmentCount={setInstallmentCount}
            includeVat={includeVat}
            setIncludeVat={setIncludeVat}
            onCreate={handleCreateInvoice}
            onCancel={handleBack}
          />
        )}
      </main>
    </div>
  );
}
