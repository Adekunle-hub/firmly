"use client";

import React from "react";
import Link from "next/link";
import { Upload, Info, AlertTriangle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface UploadedFile {
  name: string;
  size: string;
  type: string;
}

interface CaseDetailsFormProps {
  clientLink: string;
  setClientLink: (val: string) => void;
  caseTitle: string;
  setCaseTitle: (val: string) => void;
  suitNumber1: string;
  setSuitNumber1: (val: string) => void;
  caseType: string;
  setCaseType: (val: string) => void;
  description: string;
  setDescription: (val: string) => void;
  priorityLevel: string;
  setPriorityLevel: (val: string) => void;
  startDate: string;
  setStartDate: (val: string) => void;
  endDate: string;
  setEndDate: (val: string) => void;
  suitNumber2: string;
  setSuitNumber2: (val: string) => void;
  step1Files: UploadedFile[];
  setStep1Files: React.Dispatch<React.SetStateAction<UploadedFile[]>>;
  saveAsDraft: boolean;
  setSaveAsDraft: (val: boolean) => void;
  onNext: () => void;
  onCancel: () => void;
}

export default function CaseDetailsForm({
  clientLink,
  setClientLink,
  caseTitle,
  setCaseTitle,
  suitNumber1,
  setSuitNumber1,
  caseType,
  setCaseType,
  description,
  setDescription,
  priorityLevel,
  setPriorityLevel,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  suitNumber2,
  setSuitNumber2,
  step1Files,
  setStep1Files,
  saveAsDraft,
  setSaveAsDraft,
  onNext,
  onCancel,
}: CaseDetailsFormProps) {

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles: UploadedFile[] = [];
      for (let i = 0; i < e.target.files.length; i++) {
        const file = e.target.files[i];
        newFiles.push({
          name: file.name,
          size: (file.size / (1024 * 1024)).toFixed(1) + " MB",
          type: file.name.split(".").pop() || "txt",
        });
      }
      setStep1Files((prev) => [...prev, ...newFiles]);
    }
  };

  const FieldLabel = ({ children }: { children: React.ReactNode }) => (
    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
      {children}
    </label>
  );

  const isClientConflict = clientLink === "zara-johnson";

  return (
    <section aria-labelledby="case-details-heading" className="space-y-3 md:space-y-6">
      <h2 id="case-details-heading" className="sr-only">Step 1: Case Details</h2>

      {/* Link to Client */}
      <div>
        <FieldLabel>Link to Client</FieldLabel>
        <div className="relative">
          <Select value={clientLink} onValueChange={setClientLink}>
            <SelectTrigger 
              className={`w-full h-10 text-sm rounded-lg shadow-none focus:ring-1 focus:ring-[#1a7a4a] ${
                isClientConflict 
                  ? "border-red-500 bg-red-50/10 focus:ring-red-500" 
                  : "border-slate-200 bg-white"
              }`}
            >
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="zara-johnson" className="text-sm">
                Zara Johnson – Property Lease Review
              </SelectItem>
              <SelectItem value="michael-johnson" className="text-sm">
                Michael Johnson – Employment Dispute
              </SelectItem>
              <SelectItem value="techcorp" className="text-sm">
                TechCorp Inc. – IP Litigation
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        {isClientConflict && (
          <p className="text-[11px] text-red-650 font-semibold mt-1.5 flex items-start gap-1">
            <AlertTriangle size={13} className="shrink-0 mt-0.5" />
            <span>
              We couldn&apos;t find any case matching &ldquo;Zara Johnson &ndash; Property Lease Review&rdquo;, please{" "}
              <Link href="/clients/new" className="font-bold text-[#1A4331] underline hover:text-[#133224]">
                Create New Client
              </Link>
            </span>
          </p>
        )}
      </div>

      {/* Case Details Card 1 */}
      <Card className="rounded-xl border border-slate-200 bg-white shadow-none p-2 md:p-5 space-y-2 md:space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-50 pb-2">
          <span className="text-base" role="img" aria-hidden="true">📋</span>
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700">Case Details</h3>
        </div>

        <div className="space-y-2 md:space-y-4">
          <div>
            <FieldLabel>Case Title</FieldLabel>
            <Input
              value={caseTitle}
              onChange={(e) => setCaseTitle(e.target.value)}
              placeholder="e.g. Ojo vs. Lagos State Government"
              className="h-10 text-sm border-slate-200 rounded-lg shadow-none focus-visible:ring-1 focus-visible:ring-[#1a7a4a]"
            />
          </div>

          <div>
            <FieldLabel>Suit Number</FieldLabel>
            <Input
              value={suitNumber1}
              onChange={(e) => setSuitNumber1(e.target.value)}
              placeholder="e.g LD/123/456"
              className="h-10 text-sm border-slate-200 rounded-lg shadow-none focus-visible:ring-1 focus-visible:ring-[#1a7a4a]"
            />
          </div>

          <div>
            <FieldLabel>Case Type</FieldLabel>
            <Select value={caseType} onValueChange={setCaseType}>
              <SelectTrigger className="w-full h-10 text-sm border-slate-200 rounded-lg shadow-none focus:ring-1 focus:ring-[#1a7a4a]">
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent className="rounded-xl">
                <SelectItem value="criminal" className="text-sm">Criminal Defense</SelectItem>
                <SelectItem value="civil" className="text-sm">Civil Litigation</SelectItem>
                <SelectItem value="family" className="text-sm">Family Law</SelectItem>
                <SelectItem value="corporate" className="text-sm">Corporate Dispute</SelectItem>
                <SelectItem value="employment" className="text-sm">Employment Law</SelectItem>
                <SelectItem value="property" className="text-sm">Property Dispute</SelectItem>
                <SelectItem value="immigration" className="text-sm">Immigration</SelectItem>
                <SelectItem value="commercial" className="text-sm">Commercial Litigation</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <FieldLabel>Description</FieldLabel>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              placeholder="Enter matter scope, objectives, or case summary..."
              className="w-full p-3 text-sm border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-1 focus:ring-[#1a7a4a] resize-none shadow-none text-slate-800"
            />
          </div>
        </div>
      </Card>

      {/* Case Details Card 2 */}
      <Card className="rounded-xl border border-slate-200 bg-white shadow-none p-2 md:p-5 space-y-2 md:space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-50 pb-2">
          <span className="text-base" role="img" aria-hidden="true">📋</span>
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700">Case Details</h3>
        </div>

        <div className="space-y-4 ">
          <div>
            <FieldLabel>Priority Level</FieldLabel>
            <Select value={priorityLevel} onValueChange={setPriorityLevel}>
              <SelectTrigger className="w-full h-8 md:h-10 text-sm border-slate-200 rounded-lg shadow-none focus:ring-1 focus:ring-[#1a7a4a]">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent className="rounded-xl">
                <SelectItem value="high" className="text-sm">High</SelectItem>
                <SelectItem value="medium" className="text-sm">Medium</SelectItem>
                <SelectItem value="low" className="text-sm">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <FieldLabel>Start Date</FieldLabel>
              <Input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="h-10 text-sm border-slate-200 rounded-lg shadow-none  focus-visible:ring-1 focus-visible:ring-[#1a7a4a] text-slate-600"
              />
            </div>
            <div>
              <FieldLabel>End Date</FieldLabel>
              <Input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="h-10 text-sm border-slate-200 rounded-lg shadow-none focus-visible:ring-1 focus-visible:ring-[#1a7a4a] text-slate-600"
              />
            </div>
          </div>

          <div>
            <FieldLabel>Suit Number</FieldLabel>
            <Input
              value={suitNumber2}
              onChange={(e) => setSuitNumber2(e.target.value)}
              placeholder="e.g LD/123/456"
              className="h-10 text-sm border-slate-200 rounded-lg shadow-none focus-visible:ring-1 focus-visible:ring-[#1a7a4a]"
            />
          </div>

          <div>
            <FieldLabel>Supporting Documents</FieldLabel>
            <div className="relative border border-dashed border-slate-200 rounded-lg p-6 flex flex-col items-center justify-center gap-2 bg-slate-50/30 hover:bg-slate-50 transition-colors cursor-pointer group">
              <input
                type="file"
                multiple
                onChange={handleFileChange}
                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
              />
              <Upload size={20} className="text-slate-400 group-hover:scale-105 transition-transform" />
              <p className="text-sm font-semibold text-slate-600">Choose Files</p>
              <p className="text-[10px] text-slate-400">PDF, DOC, Images up to 12MB</p>
            </div>
            {step1Files.length > 0 && (
              <div className="mt-3 space-y-1.5">
                {step1Files.map((file, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2 bg-slate-50 border border-slate-100 rounded-lg text-sm">
                    <span className="text-slate-700 truncate max-w-[80%] font-medium">{file.name}</span>
                    <span className="text-[10px] text-slate-400 shrink-0">{file.size}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </Card>

      {/* Footer controls */}
      <div className="flex items-center justify-between pt-6 border-t border-slate-100 mt-6">
        <div className="flex items-center gap-2">
          <input
            id="draft-checkbox"
            type="checkbox"
            checked={saveAsDraft}
            onChange={(e) => setSaveAsDraft(e.target.checked)}
            className="h-4 w-4 rounded border-slate-300 text-[#1A4331] focus:ring-[#1A4331] accent-[#1A4331] cursor-pointer"
          />
          <label htmlFor="draft-checkbox" className="text-sm text-slate-500 font-semibold cursor-pointer select-none">
            Save as Draft
          </label>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={onCancel}
            className="h-9 px-4 text-sm border-slate-200 hover:bg-slate-50 shadow-none rounded-lg text-slate-600 cursor-pointer"
          >
            Cancel
          </Button>
          <Button
            onClick={onNext}
            className="h-9 px-4 text-sm bg-[#1A4331] hover:bg-[#133224] text-white rounded-lg shadow-sm cursor-pointer gap-1.5 font-semibold"
          >
            Next <span className="text-[10px]">→</span>
          </Button>
        </div>
      </div>
    </section>
  );
}
