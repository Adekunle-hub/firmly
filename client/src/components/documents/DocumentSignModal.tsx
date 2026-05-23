// components/documents/DocuSignModal.tsx
"use client";

import React, { useState } from "react";
import { X, Upload, FileText } from "lucide-react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DocuSignModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type SigneeRole = "Lawyer" | "Client";

export default function DocuSignModal({ isOpen, onClose }: DocuSignModalProps) {
  const [role, setRole] = useState<SigneeRole>("Lawyer");
  const [signerName, setSignerName] = useState("");
  const [email, setEmail] = useState("");
  const [caseLink, setCaseLink] = useState("");
  const [hasFileUploaded, setHasFileUploaded] = useState(false);

  const handleExecute = () => {
    toast.success("Document executed successfully");

    console.log({ role, signerName, email, caseLink });
    onClose();
  };

  const handleExecuteAndShare = () => {
    toast.success("Document executed and shared successfully");
    console.log("Executing & Sharing:", { role, signerName, email, caseLink });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-md w-full p-6 h-[80vh] overflow-y-auto bg-white no-scrollbar rounded-2xl border border-slate-100 shadow-2xl gap-0 block">
        {/* Header Labeling Block */}
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-50">
          <DialogTitle className="text-xs font-bold text-slate-800">
            Execute Document with DocuSign
          </DialogTitle>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-6 w-6 text-slate-400 rounded-full"
          >
            <X size={14} />
          </Button>
        </div>

        <form  className="space-y-4">
          {/* Custom Radio Tabs Element Matrix */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
              Signee
            </label>
            <div className="flex items-center gap-4">
              {(["Lawyer", "Client"] as const).map((targetRole) => (
                <label
                  key={targetRole}
                  className="flex items-center gap-2 text-xs font-bold text-slate-800 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="signee-role"
                    checked={role === targetRole}
                    onChange={() => {
                      setRole(targetRole);
                      // Toggle simulated upload attachment for visualization
                      setHasFileUploaded(targetRole === "Client");
                    }}
                    className="h-4 w-4 text-emerald-600 border-slate-300 focus:ring-emerald-600"
                  />
                  {targetRole}
                </label>
              ))}
            </div>
          </div>

          {/* Context Dynamic Input Elements */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-800">Name</label>
            <Input
              type="text"
              placeholder="Enter name"
              value={signerName}
              onChange={(e) => setSignerName(e.target.value)}
              className="h-10 border-slate-200 text-xs rounded-lg"
            />
          </div>

          {/* Multi-Format Upload Context Dropzone Layer */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-800">
              Upload Signature
            </label>

            {!hasFileUploaded ? (
              <div className="border border-dashed border-slate-200 rounded-xl p-6 flex flex-col items-center justify-center text-center cursor-pointer bg-slate-50/50 hover:bg-slate-50">
                <Upload size={18} className="text-slate-400 mb-1" />
                <p className="text-[11px] font-bold text-slate-700">
                  Drag and drop files here
                </p>
                <p className="text-[9px] text-slate-400 font-semibold mt-0.5">
                  or browse down files
                </p>
                <Button
                  type="button"
                  variant="outline"
                  className="h-6 text-[9px] font-bold px-2.5 mt-2 border-emerald-600 text-emerald-700 hover:bg-emerald-50 rounded-md"
                >
                  Browse File
                </Button>
              </div>
            ) : (
              /* Attached State Render Block (Triggered when 'Client' context active) */
              <div className="border border-slate-100 rounded-xl p-3 flex items-center justify-between bg-slate-50/60">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="p-2 bg-red-50 text-red-600 rounded-lg">
                    <FileText size={16} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[11px] font-bold text-slate-800 truncate">
                      Signature_Preview.png
                    </p>
                    <p className="text-[9px] text-slate-400 font-semibold">
                      DocuSign Attached
                    </p>
                  </div>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => setHasFileUploaded(false)}
                  className="h-6 w-6 text-slate-400 hover:text-red-500 rounded-full"
                >
                  <X size={12} />
                </Button>
              </div>
            )}
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-800">
              Email/Link for Signature
            </label>
            <Input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-10 border-slate-200 text-xs rounded-lg"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-800">
              Link to Case
            </label>
            <Select value={caseLink} onValueChange={setCaseLink}>
              <SelectTrigger className="h-10 border-slate-200 text-xs rounded-lg text-slate-600 font-medium">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent className="bg-white border text-xs font-medium rounded-lg">
                <SelectItem value="case-1">Case: LD/142/2025</SelectItem>
                <SelectItem value="case-2">Case: LD/078/2025</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </form>
        {/* Dual Multi-Action Executions Row */}
        <div className="pt-2 space-y-2">
          <Button
            type="button"
            onClick={handleExecute}
            className="w-full h-10 bg-[#1A6341] hover:bg-[#134D32] text-white text-xs font-bold rounded-lg shadow-sm"
          >
            Execute
          </Button>
          <Button
            type="button"
            onClick={handleExecuteAndShare}
            variant="outline"
            className="w-full cursor-pointer h-10 border-slate-200 text-slate-700 text-xs font-bold rounded-lg hover:bg-slate-50"
          >
            Execute and Share
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
