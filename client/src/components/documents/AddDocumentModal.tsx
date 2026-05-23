"use client";

import React, { useState } from "react";
import { Upload, X } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface AddDocumentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddDocumentModal({
  isOpen,
  onClose,
}: AddDocumentModalProps) {
  const [docName, setDocName] = useState("");
  const [caseLink, setCaseLink] = useState("");
  const [docType, setDocType] = useState("affidavit");

const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  
  
  toast.success("Document uploaded successfully");
  
  console.log({ docName, caseLink, docType });
  
  
  onClose();
};

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        className="max-w-xl h-auto max-h-[85vh] no-scrollbar overflow-y-auto w-full  p-4 rounded-2xl border border-slate-100 shadow-2xl gap-0"
        onPointerDownOutside={(e) => e.preventDefault()}
        onInteractOutside={(e) => e.preventDefault()}
      >
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <DialogTitle className="text-base font-bold text-[#14532d]">
            Add Document
          </DialogTitle>
        </div>

        <form onSubmit={handleSubmit} className=" space-y-3 md:space-y-5 mt-2">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-900 tracking-wide">
              Document Name
            </label>
            <Input
              type="text"
              value={docName}
              onChange={(e) => setDocName(e.target.value)}
              placeholder="Enter document name"
              className="h-11 border-slate-200 focus-visible:ring-1 focus-visible:ring-emerald-600 rounded-lg text-xs placeholder:text-slate-400 font-medium"
            />
          </div>

          <div className="border-2 border-dashed border-slate-200 hover:border-emerald-600/50 transition-colors rounded-xl p-8 flex flex-col items-center justify-center text-center cursor-pointer group bg-white">
            <div className="p-3 bg-slate-50 rounded-full text-slate-400 group-hover:text-emerald-700 group-hover:bg-emerald-50 transition-all mb-3">
              <Upload size={22} strokeWidth={2} />
            </div>
            <p className="text-xs font-bold text-slate-800">
              Click to upload or drag and drop
            </p>
            <p className="text-[10px] text-slate-400 font-semibold mt-1">
              PDF, DOC, DOCX up to 10MB
            </p>
          </div>

          {/* Tiny Status Tracker Accent pill */}
          <div>
            <span className="inline-block text-[10px] bg-slate-50 text-slate-700 font-bold px-1 md:px-3  py-1 md:py-1.5  rounded-full">
              Upload File (Max 4MB)
            </span>
          </div>

          {/* Form Node: Case Selection Connection */}
          <div className="space-y-1.5 w-full">
            <label className="text-[11px] font-bold text-slate-900 tracking-wide">
              Link to Case
            </label>
            <Select value={caseLink} onValueChange={setCaseLink}>
              <SelectTrigger className=" border-slate-200 text-xs font-semibold text-slate-700 rounded-lg focus:ring-1 focus:ring-emerald-600 w-full">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent className="bg-white border border-slate-100 rounded-lg shadow-xl text-xs font-medium">
                <SelectItem value="ld-142">
                  Case: LD/142/2025 — Adewale v. Zenith
                </SelectItem>
                <SelectItem value="ld-201">
                  Case: LD/201/2025 — Bakare
                </SelectItem>
                <SelectItem value="ld-089">
                  Case: LD/089/2025 — Immigration Case
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Form Node: Document Category Class Selection */}
          <div className="space-y-1.5 w-full ">
            <label className="text-[11px] font-bold text-slate-900 tracking-wide">
              Document Type
            </label>
            <Select value={docType} onValueChange={setDocType}>
              <SelectTrigger className=" border-slate-200 text-xs font-semibold text-slate-700 rounded-lg focus:ring-1 focus:ring-emerald-600 w-full! ">
                <SelectValue placeholder="Select Type" />
              </SelectTrigger>
              <SelectContent className="bg-white border border-slate-100 rounded-lg shadow-xl text-xs font-medium">
                <SelectItem value="affidavit">Affidavit</SelectItem>
                <SelectItem value="writ">Writ & Summons</SelectItem>
                <SelectItem value="statement">
                  Statement of Claim/Defence
                </SelectItem>
                <SelectItem value="nda">
                  Non-Disclosure Agreement (NDA)
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Primary Submit CTA Command Execution Button */}
          <Button
            type="submit"
            className="w-full mx-auto flex items-center justify-center h-11 cursor-pointer bg-[#1A6341] hover:bg-[#134D32] text-white font-bold text-sm rounded-xl transition-all shadow-xs mt-2"
          >
            Add Document
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
