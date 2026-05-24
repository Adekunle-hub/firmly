"use client";

import React from "react";
import { AlertTriangle, Plus, X, Trash2, Upload } from "lucide-react";
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
import { cn } from "@/lib/utils";

interface WitnessRow {
  name: string;
  contact: string;
  relationship: string;
  opposingCounsel: string;
  statement: string;
}

interface UploadedFile {
  name: string;
  size: string;
  type: string;
}

interface CourtParticipantsFormProps {
  courtTier: string;
  setCourtTier: (val: string) => void;
  courtName: string;
  setCourtName: (val: string) => void;
  stateJurisdiction: string;
  setStateJurisdiction: (val: string) => void;
  presidingJudge: string;
  setPresidingJudge: (val: string) => void;
  showAddJudges: boolean;
  setShowAddJudges: (val: boolean) => void;
  additionalJudges: string[];
  setAdditionalJudges: React.Dispatch<React.SetStateAction<string[]>>;
  opposingParty: string;
  setOpposingParty: (val: string) => void;
  opposingCounsel: string;
  setOpposingCounsel: (val: string) => void;
  opposingCounselEmail: string;
  setOpposingCounselEmail: (val: string) => void;
  opposingCounselPhone: string;
  setOpposingCounselPhone: (val: string) => void;
  witnesses: WitnessRow[];
  setWitnesses: React.Dispatch<React.SetStateAction<WitnessRow[]>>;
  incidentDate: string;
  setIncidentDate: (val: string) => void;
  filingDate: string;
  setFilingDate: (val: string) => void;
  hearingDate: string;
  setHearingDate: (val: string) => void;
  evidenceFiles: UploadedFile[];
  setEvidenceFiles: React.Dispatch<React.SetStateAction<UploadedFile[]>>;
  saveAsDraft: boolean;
  setSaveAsDraft: (val: boolean) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function CourtParticipantsForm({
  courtTier,
  setCourtTier,
  courtName,
  setCourtName,
  stateJurisdiction,
  setStateJurisdiction,
  presidingJudge,
  setPresidingJudge,
  showAddJudges,
  setShowAddJudges,
  additionalJudges,
  setAdditionalJudges,
  opposingParty,
  setOpposingParty,
  opposingCounsel,
  setOpposingCounsel,
  opposingCounselEmail,
  setOpposingCounselEmail,
  opposingCounselPhone,
  setOpposingCounselPhone,
  witnesses,
  setWitnesses,
  incidentDate,
  setIncidentDate,
  filingDate,
  setFilingDate,
  hearingDate,
  setHearingDate,
  evidenceFiles,
  setEvidenceFiles,
  saveAsDraft,
  setSaveAsDraft,
  onNext,
  onBack,
}: CourtParticipantsFormProps) {

  const addWitness = () => {
    setWitnesses((prev) => [
      ...prev,
      { name: "", contact: "", relationship: "", opposingCounsel: "", statement: "" },
    ]);
  };

  const updateWitness = (index: number, field: keyof WitnessRow, value: string) => {
    setWitnesses((prev) => {
      const updated = [...prev];
      updated[index][field] = value;
      return updated;
    });
  };

  const removeWitness = (index: number) => {
    setWitnesses((prev) => prev.filter((_, i) => i !== index));
  };

  const addJudge = () => setAdditionalJudges((prev) => [...prev, ""]);

  const removeJudge = (index: number) => {
    setAdditionalJudges((prev) => prev.filter((_, i) => i !== index));
  };

  const updateJudge = (index: number, value: string) => {
    setAdditionalJudges((prev) => {
      const updated = [...prev];
      updated[index] = value;
      return updated;
    });
  };

  const handleEvidenceUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      setEvidenceFiles((prev) => [...prev, ...newFiles]);
    }
  };

  const removeEvidenceFile = (index: number) => {
    setEvidenceFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const FieldLabel = ({ children }: { children: React.ReactNode }) => (
    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
      {children}
    </label>
  );

  return (
    <section aria-labelledby="court-participants-heading" className="space-y-6">
      <h2 id="court-participants-heading" className="sr-only">Step 2: Court & Participant Information</h2>

      {/* Statute of Limitations Advisory */}
      <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
        <div className="bg-red-100 rounded-lg p-2 shrink-0">
          <AlertTriangle size={18} className="text-red-650" />
        </div>
        <div className="flex-1 space-y-2">
          <div className="flex items-center gap-2">
            <p className="text-sm font-bold text-red-800">
              Statute of Limitations Advisory
            </p>
            <span className="text-[8px] bg-red-100 text-red-700 border border-red-200 rounded-sm font-bold px-1.5 py-0.5 uppercase tracking-wide">
              Critical
            </span>
          </div>
          <p className="text-[11px] text-red-700 leading-relaxed font-medium">
            Based on the incident date provided, the filing deadline for this action is approaching.
          </p>
          <div className="flex gap-3 text-sm mt-1">
            <div className="bg-white border border-red-100 rounded-lg px-3 py-1.5 shadow-xs">
              <span className="text-[9px] text-red-500 font-bold uppercase block">Last Possible Date</span>
              <span className="font-bold text-red-800">Oct 24, 2027</span>
            </div>
            <div className="bg-white border border-red-100 rounded-lg px-3 py-1.5 shadow-xs">
              <span className="text-[9px] text-red-500 font-bold uppercase block">Days Remaining</span>
              <span className="font-bold text-red-800">612 Days</span>
            </div>
          </div>
        </div>
      </div>

      {/* Court Information */}
      <Card className="rounded-xl border border-slate-200 bg-white shadow-none p-3 md:p-5 space-y-2 md:space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-55 pb-0 md:pb-2">
          <span className="text-base" role="img" aria-hidden="true">⚖️</span>
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700">Court Information</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <FieldLabel>Court Tier</FieldLabel>
            <Select value={courtTier} onValueChange={setCourtTier}>
              <SelectTrigger className="w-full   text-sm border-slate-200 rounded-lg shadow-none focus:ring-1 focus:ring-[#1a7a4a]">
                <SelectValue className="bg-red-900!" placeholder="Select" />
              </SelectTrigger>
              <SelectContent className="rounded-xl">
                <SelectItem value="high-court" className="text-sm">High Court</SelectItem>
                <SelectItem value="magistrate" className="text-sm">Magistrate Court</SelectItem>
                <SelectItem value="appeal" className="text-sm">Court of Appeal</SelectItem>
                <SelectItem value="supreme" className="text-sm">Supreme Court</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <FieldLabel>Court Name</FieldLabel>
            <Input
              value={courtName}
              onChange={(e) => setCourtName(e.target.value)}
              placeholder="Enter Court Tier first"
              className="h-10 text-sm border-slate-200 rounded-lg shadow-none focus-visible:ring-1 focus-visible:ring-[#1a7a4a]"
            />
          </div>
        </div>

        <div>
          <FieldLabel>State / Jurisdiction</FieldLabel>
          <Input
            value={stateJurisdiction}
            onChange={(e) => setStateJurisdiction(e.target.value)}
            placeholder="Enter state"
            className="h-10 text-sm border-slate-200 rounded-lg shadow-none focus-visible:ring-1 focus-visible:ring-[#1a7a4a]"
          />
        </div>

        <div>
          <FieldLabel>Presiding Judge</FieldLabel>
          <Input
            value={presidingJudge}
            onChange={(e) => setPresidingJudge(e.target.value)}
            placeholder="Enter judge name"
            className="h-10 text-sm border-slate-200 rounded-lg shadow-none focus-visible:ring-1 focus-visible:ring-[#1a7a4a]"
          />
        </div>

        {/* Add other judges */}
        <div className="space-y-3 pt-1">
          <button
            type="button"
            onClick={() => setShowAddJudges(!showAddJudges)}
            className="flex items-center gap-2 text-sm font-bold text-slate-700 cursor-pointer hover:text-[#1A4331] transition-colors"
          >
            <div className="h-5 w-5 rounded bg-slate-100 flex items-center justify-center text-slate-500">
              {showAddJudges ? <X size={10} /> : <Plus size={10} />}
            </div>
            Add other judges on the panel
          </button>

          {showAddJudges && (
            <div className="space-y-2 pl-7 animate-in fade-in slide-in-from-top-1 duration-150">
              {additionalJudges.map((judge, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <Input
                    value={judge}
                    onChange={(e) => updateJudge(idx, e.target.value)}
                    placeholder="e.g., Hon. Justice Balogun"
                    className="h-10 text-sm border-slate-200 rounded-lg shadow-none flex-1 focus-visible:ring-1 focus-visible:ring-[#1a7a4a]"
                  />
                  {idx === additionalJudges.length - 1 ? (
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={addJudge}
                      className="h-10 w-10 border-slate-200 text-slate-500 hover:bg-slate-50 shrink-0 shadow-none cursor-pointer"
                    >
                      <Plus size={14} />
                    </Button>
                  ) : (
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => removeJudge(idx)}
                      className="h-10 w-10 border-red-250 text-red-650 hover:bg-red-50 shrink-0 shadow-none cursor-pointer"
                    >
                      <X size={14} />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </Card>

      {/* Participants */}
      <Card className="rounded-xl border border-slate-200 bg-white shadow-none p-3 md:p-5 space-y-2 md:space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-55 pb-2">
          <span className="text-base" role="img" aria-hidden="true">👥</span>
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700">Participants</h3>
        </div>

        <div>
          <FieldLabel>Opposing Party</FieldLabel>
          <Input
            value={opposingParty}
            onChange={(e) => setOpposingParty(e.target.value)}
            placeholder="Enter opposing party name"
            className="h-10 text-sm border-slate-200 rounded-lg shadow-none focus-visible:ring-1 focus-visible:ring-[#1a7a4a]"
          />
        </div>
        <div>
          <FieldLabel>Opposing Counsel</FieldLabel>
          <Input
            value={opposingCounsel}
            onChange={(e) => setOpposingCounsel(e.target.value)}
            placeholder="Enter opposing counsel name"
            className="h-10 text-sm border-slate-200 rounded-lg shadow-none focus-visible:ring-1 focus-visible:ring-[#1a7a4a]"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <FieldLabel>Opposing Counsel Email</FieldLabel>
            <Input
              type="email"
              value={opposingCounselEmail}
              onChange={(e) => setOpposingCounselEmail(e.target.value)}
              placeholder="e.g. counsel@opposing.com"
              className="h-10 text-sm border-slate-200 rounded-lg shadow-none focus-visible:ring-1 focus-visible:ring-[#1a7a4a]"
            />
          </div>
          <div>
            <FieldLabel>Opposing Counsel Phone Number</FieldLabel>
            <Input
              value={opposingCounselPhone}
              onChange={(e) => setOpposingCounselPhone(e.target.value)}
              placeholder="Enter phone number"
              className="h-10 text-sm border-slate-200 rounded-lg shadow-none focus-visible:ring-1 focus-visible:ring-[#1a7a4a]"
            />
          </div>
        </div>
      </Card>

      {/* Witnesses */}
      <Card className="rounded-xl border border-slate-200 bg-white shadow-none p-3 space-y-2 md:p-5 md:space-y-4">
        <div className="flex items-center justify-between border-b border-slate-55 pb-0 md:pb-2">
          <div className="flex items-center gap-2">
            <span className="text-base" role="img" aria-hidden="true">👤</span>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700">Witnesses</h3>
          </div>
          <span className="text-[10px] bg-slate-100 text-slate-500 font-bold px-2 py-0.5 rounded-full">
            Total: {witnesses.length}
          </span>
        </div>

        {witnesses.map((witness, idx) => (
          <div key={idx} className="space-y-4 pb-4 border-b border-slate-100 last:border-0 last:pb-0 relative">
            {witnesses.length > 1 && (
              <button
                type="button"
                onClick={() => removeWitness(idx)}
                className="absolute top-0 right-0 p-1 text-slate-400 hover:text-red-500 rounded-full"
                title="Remove Witness"
              >
                <X size={14} />
              </button>
            )}
            <div>
              <FieldLabel>Name</FieldLabel>
              <Input
                value={witness.name}
                onChange={(e) => updateWitness(idx, "name", e.target.value)}
                placeholder="Enter witness name"
                className="h-10 text-sm border-slate-200 rounded-lg shadow-none focus-visible:ring-1 focus-visible:ring-[#1a7a4a]"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <FieldLabel>Contact</FieldLabel>
                <Input
                  value={witness.contact}
                  onChange={(e) => updateWitness(idx, "contact", e.target.value)}
                  placeholder="Enter phone/email"
                  className="h-10 text-sm border-slate-200 rounded-lg shadow-none focus-visible:ring-1 focus-visible:ring-[#1a7a4a]"
                />
              </div>
              <div>
                <FieldLabel>Relationship to Case</FieldLabel>
                <Input
                  value={witness.relationship}
                  onChange={(e) => updateWitness(idx, "relationship", e.target.value)}
                  placeholder="e.g. Eyewitness, Supervisor"
                  className="h-10 text-sm border-slate-200 rounded-lg shadow-none focus-visible:ring-1 focus-visible:ring-[#1a7a4a]"
                />
              </div>
            </div>
            <div>
              <FieldLabel>Opposing Counsel</FieldLabel>
              <Input
                value={witness.opposingCounsel}
                onChange={(e) => updateWitness(idx, "opposingCounsel", e.target.value)}
                placeholder="Enter opposing counsel"
                className="h-10 text-sm border-slate-200 rounded-lg shadow-none focus-visible:ring-1 focus-visible:ring-[#1a7a4a]"
              />
            </div>
            <div>
              <FieldLabel>Witness Statement</FieldLabel>
              <textarea
                value={witness.statement}
                onChange={(e) => updateWitness(idx, "statement", e.target.value)}
                rows={3}
                placeholder="Enter witness statement details..."
                className="w-full p-3 text-sm border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-1 focus:ring-[#1a7a4a] resize-none shadow-none text-slate-800"
              />
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={addWitness}
          className="w-full border-2 border-dashed border-slate-200 rounded-lg py-2.5 text-sm font-semibold text-slate-500 hover:text-[#1A4331] hover:border-[#1A4331]/30 transition-colors cursor-pointer flex items-center justify-center gap-1.5"
        >
          <Plus size={13} /> Add Witness
        </button>
      </Card>

      {/* Important Dates */}
      <Card className="rounded-xl border border-slate-200 bg-white shadow-none p-3 space-y-2 md:p-5 md:space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-55 pb-1 md:pb-2">
          <span className="text-base" role="img" aria-hidden="true">📅</span>
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700">Important Dates</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 md:gap-4">
          <div>
            <FieldLabel>Incident Date</FieldLabel>
            <Input
              type="date"
              value={incidentDate}
              onChange={(e) => setIncidentDate(e.target.value)}
              className="h-10 text-sm border-slate-200 rounded-lg shadow-none focus-visible:ring-1 focus-visible:ring-[#1a7a4a] text-slate-650"
            />
          </div>
          <div>
            <FieldLabel>Filing Date</FieldLabel>
            <Input
              type="date"
              value={filingDate}
              onChange={(e) => setFilingDate(e.target.value)}
              className="h-10 text-sm border-slate-200 rounded-lg shadow-none focus-visible:ring-1 focus-visible:ring-[#1a7a4a] text-slate-650"
            />
          </div>
          <div>
            <FieldLabel>Hearing Date</FieldLabel>
            <Input
              type="date"
              value={hearingDate}
              onChange={(e) => setHearingDate(e.target.value)}
              className="h-10 text-sm border-slate-200 rounded-lg shadow-none focus-visible:ring-1 focus-visible:ring-[#1a7a4a] text-slate-650"
            />
          </div>
        </div>

        <button 
          type="button" 
          className="w-full border border-dashed border-slate-200 rounded-lg py-2.5 text-sm font-semibold text-slate-500 hover:text-[#1A4331] hover:border-[#1A4331]/30 transition-colors cursor-pointer flex items-center justify-center gap-1.5"
        >
          <Plus size={13} /> Add Date
        </button>
      </Card>

      {/* Evidence */}
      <Card className="rounded-xl border border-slate-200 bg-white shadow-none p-3 md:p-5 space-y-2 md:space-y-4">
        <div className="flex  md:flex-row flex-col  items-start md:items-center  justify-start md:justify-between border-b border-slate-55 pb-1 md:pb-2">
          <div className="flex items-center gap-2">
            <span className="text-base" role="img" aria-hidden="true">📂</span>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700">Evidence</h3>
          </div>
          <div className="flex items-center gap-2 text-[10px] text-slate-400">
            <span>Storage: {(evidenceFiles.length * 4.9).toFixed(1)} GB / 50 GB</span>
            <div className="w-20 h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-[#1A4331] rounded-full transition-all duration-300" 
                style={{ width: `${(evidenceFiles.length * 4.9 / 50) * 100}%` }} 
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {/* Upload drop zone */}
          <div className="relative border-2 border-dashed border-slate-200 rounded-xl p-3 md:p-4 flex flex-col items-center justify-center gap-1.5 bg-slate-50/30 hover:bg-slate-50 transition-colors group cursor-pointer min-h-[120px]">
            <input
              type="file"
              multiple
              onChange={handleEvidenceUpload}
              className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
            />
            <Upload size={18} className="text-slate-400 group-hover:scale-105 transition-transform" />
            <p className="text-[11px] font-semibold text-slate-650 text-center">
              Drag files to upload
            </p>
            <p className="text-[9px] text-slate-400">PDF, JPEG, PNG, CSV, MP4, XLSX</p>
            <Button className="bg-[#1A4331] hover:bg-[#133224] text-white h-7 px-3 text-[10px] rounded-md mt-1 cursor-pointer font-semibold shadow-xs">
              Browse Local
            </Button>
          </div>

          {/* Uploaded files */}
          {evidenceFiles.map((file, idx) => (
            <div
              key={idx}
              className="border border-slate-100 rounded-xl  p-3 flex items-start justify-between bg-white hover:bg-slate-50/50 transition-colors animate-in fade-in zoom-in-95 duration-150"
            >
              <div className="flex items-start gap-2.5 min-w-0">
                <div
                  className={cn(
                    "h-8 w-8 rounded-lg flex items-center justify-center shrink-0 text-white text-[9px] font-bold uppercase",
                    file.type === "pdf"
                      ? "bg-red-500"
                      : file.type === "jpg" || file.type === "jpeg"
                      ? "bg-blue-500"
                      : file.type === "mp4"
                      ? "bg-purple-500"
                      : "bg-emerald-600"
                  )}
                >
                  {file.type}
                </div>
                <div className="min-w-0 mt-0.5">
                  <p className="text-[11px] font-semibold text-slate-700 truncate">{file.name}</p>
                  <p className="text-[9px] text-slate-400 mt-0.5">{file.size}</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeEvidenceFile(idx)}
                className="h-6 w-6 text-slate-400 hover:text-red-500 hover:bg-transparent shrink-0 cursor-pointer"
              >
                <Trash2 size={12} />
              </Button>
            </div>
          ))}
        </div>
      </Card>

      {/* Footer controls */}
      <div className="flex items-center justify-between pt-6 border-t border-slate-100 mt-6">
        <div className="flex items-center gap-2">
          <input
            id="draft-checkbox-step2"
            type="checkbox"
            checked={saveAsDraft}
            onChange={(e) => setSaveAsDraft(e.target.checked)}
            className="h-4 w-4 rounded border-slate-300 text-[#1A4331] focus:ring-[#1A4331] accent-[#1A4331] cursor-pointer"
          />
          <label htmlFor="draft-checkbox-step2" className="text-sm text-slate-500 font-semibold cursor-pointer select-none">
            Save as Draft
          </label>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={onBack}
            className="h-9 px-4 text-sm border-slate-200 hover:bg-slate-50 shadow-none rounded-lg text-slate-650 cursor-pointer"
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
