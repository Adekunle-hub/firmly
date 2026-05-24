import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Pencil, FileText, Send, Check } from "lucide-react";
import { Input } from "@/components/ui/input";

interface EngagementLetterPreviewProps {
  clientData: any;
  onNext: () => void;
  onSaveDraft: () => void;
}

export default function EngagementLetterPreview({
  clientData,
  onNext,
  onSaveDraft,
}: EngagementLetterPreviewProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [scopeOfService, setScopeOfService] = useState([
    "Review of immigration denial document",
    "Preparation of appeal documentation",
    "Court representation",
    "Liaising with immigration officers",
  ]);
  const [fees, setFees] = useState([
    "Initial consultation: ₦50,000 (Already paid)",
    "Flat fee for appeal filing & representation: ₦450,000",
    "Additional court appearance (if required): ₦100,000 per sitting",
  ]);

  const clientName = clientData?.name || "Client Name";
  const clientEmail = clientData?.email || "client@email.com";
  const clientAddress = clientData?.address || "Lagos, Nigeria";
  const clientPhone = clientData?.phone || "";
  const legalMatter = clientData?.legalMatter || "Employment Dispute";

  const currentDate = new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="flex flex-col gap-3 md:gap-6 w-full max-w-4xl mx-auto font-sans">
      {/* Edit Header */}
      <div className=" flex-col md:flex-row items-start border border-slate-200/80 rounded-2xl p-3 md:p-5 flex md:items-center justify-start gap-2 md:gap-0 md:justify-between shadow-sm">
        <div >
          <h2 className="text-base font-bold text-slate-800 flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#055939]" />
            Engagement Letter Preview
          </h2>
          <p className="text-sm text-slate-400 mt-0.5">Draft agreement based on client details</p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsEditing(!isEditing)}
          className="h-8 border-slate-200 text-slate-700 text-sm rounded-lg flex items-center gap-1.5 hover:bg-slate-50 cursor-pointer"
        >
          {isEditing ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-600" /> Done Editing
            </>
          ) : (
            <>
              <Pencil className="w-3.5 h-3.5" /> Edit Letter
            </>
          )}
        </Button>
      </div>

     
      <main className="bg-[#F5F5F5] border border-slate-200 rounded-2xl shadow-sm p-4 md:p-12 relative overflow-hidden font-sans text-slate-800 text-[13px] leading-relaxed">
        {/* Letter Head */}
        <div className="flex justify-between items-start border-b border-slate-100 pb-0 md:pb-6 mb-6 font-sans">
          <div>
            <h1 className="text-base font-bold text-slate-900 tracking-tight">Firmly Legal LLP</h1>
            <p className="text-[11px] text-slate-400 mt-1">125 Justice Avenue, Lagos, Nigeria</p>
            <p className="text-[11px] text-slate-400">contact@firmlylegal.com | +234 700 123 4567</p>
          </div>
          <div className="text-right">
            <p className="text-[11.5px] font-semibold text-slate-500 uppercase tracking-wide">Draft Agreement</p>
            <p className="text-[11px] text-slate-400 mt-0.5">{currentDate}</p>
          </div>
        </div>

        {/* Client Address */}
        <div className="mb-4 md:mb-6 font-sans">
          <p className="text-[11px] text-slate-400 uppercase font-bold tracking-wider mb-1">Prepared For</p>
          <p className="font-bold text-slate-900">{clientName}</p>
          <p className="text-slate-500 mt-0.5">{clientAddress}</p>
          <p className="text-slate-500">{clientEmail}</p>
          {clientPhone && <p className="text-slate-500">{clientPhone}</p>}
        </div>

        {/* Contract Title */}
        <div className="text-center font-sans my-8">
          <h2 className="text-base font-bold font-sans text-slate-900 uppercase tracking-wider border-b border-slate-200 pb-2 inline-block">
            Engagement letter
          </h2>
        </div>

        {/* Salutation */}
        <p className="mb-4">Dear {clientName},</p>
        <p className="mb-6">
          This letter confirms our agreement for Firmly Legal LLP to represent you in the matter of: <span className="font-bold font-sans text-slate-900">{legalMatter}</span>.
        </p>

        {/* Section: Scope */}
        <div className="mb-6">
          <h3 className="text-[13.5px] font-bold text-slate-900 mb-2 font-sans">Scope of Legal Service</h3>
          {isEditing ? (
            <div className="flex flex-col gap-2 font-sans">
              {scopeOfService.map((item, idx) => (
                <Input
                  key={idx}
                  value={item}
                  onChange={(e) => {
                    const newScope = [...scopeOfService];
                    newScope[idx] = e.target.value;
                    setScopeOfService(newScope);
                  }}
                  className="h-8 rounded-lg text-sm"
                />
              ))}
            </div>
          ) : (
            <ul className="list-disc pl-5 flex flex-col gap-1 text-slate-700">
              {scopeOfService.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          )}
        </div>

        {/* Section: Fee Structure */}
        <div className="mb-6">
          <h3 className="text-[13.5px] font-bold text-slate-900 mb-2 font-sans">Fee Structure</h3>
          {isEditing ? (
            <div className="flex flex-col gap-2 font-sans">
              {fees.map((fee, idx) => (
                <Input
                  key={idx}
                  value={fee}
                  onChange={(e) => {
                    const newFees = [...fees];
                    newFees[idx] = e.target.value;
                    setFees(newFees);
                  }}
                  className="h-8 rounded-lg text-sm"
                />
              ))}
            </div>
          ) : (
            <ul className="list-disc pl-5 flex flex-col gap-1 text-slate-700">
              {fees.map((fee, idx) => (
                <li key={idx}>{fee}</li>
              ))}
            </ul>
          )}
        </div>

        {/* Section: Confidentiality */}
        <div className="mb-6">
          <h3 className="text-[13.5px] font-bold text-slate-900 mb-1.5 font-sans">Confidentiality</h3>
          <p className="text-slate-700 leading-relaxed">
            All information provided during this engagement will remain strictly confidential and protected under attorney-client privilege.
          </p>
        </div>

        {/* Section: Termination */}
        <div className="mb-8">
          <h3 className="text-[13.5px] font-bold text-[#111] mb-1.5 font-sans">Termination of Service</h3>
          <p className="text-slate-700 leading-relaxed">
            Either party may terminate this agreement at any time, subject to outstanding fees and a formal written notice.
          </p>
        </div>

        {/* Signature Box */}
        <div className="border-t border-slate-100 pt-6 mt-8 font-sans flex flex-col sm:flex-row justify-between gap-6">
          <div className="flex flex-col gap-1.5">
            <p className="text-[11.5px] font-bold text-slate-400 uppercase tracking-wider">Accepted and Agreed:</p>
            <div className="border-b border-slate-300 w-48 h-8 mt-2" />
            <p className="text-[12.5px] font-bold text-slate-800 mt-1">{clientName}</p>
            <p className="text-[11px] text-slate-400">Client Signature</p>
          </div>
          <div className="flex flex-col gap-1.5">
            <p className="text-[11.5px] font-bold text-slate-400 uppercase tracking-wider">Date:</p>
            <div className="border-b border-slate-300 w-48 h-8 mt-2" />
            <p className="text-[11px] text-slate-400 mt-1">Signature Date</p>
          </div>
        </div>
      </main>

      {/* Draft/Send Action Row */}
      <div className="flex items-center justify-between sm:justify-end gap-3">
        <Button
          onClick={onSaveDraft}
          variant="outline"
          className="h-11 border-slate-200 hover:bg-slate-50 text-slate-700 px-6 font-semibold rounded-xl text-[13.5px] shadow-sm cursor-pointer"
        >
          Save to draft
        </Button>
        <Button
          onClick={onNext}
          className="h-11 bg-[#055939] hover:bg-[#155e38] text-white px-4 md:px-6 font-semibold rounded-xl text-[13.5px] flex items-center gap-2 shadow-sm cursor-pointer"
        >
          <Send className="w-4 h-4" />
          Send To Client
        </Button>
      </div>
    </div>
  );
}
