// components/documents/NewTemplateModal.tsx
"use client";

import React, { useState } from "react";
import { X } from "lucide-react";
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

interface NewTemplateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NewTemplateModal({ isOpen, onClose }: NewTemplateModalProps) {
  const [templateName, setTemplateName] = useState("");
  const [caseLink, setCaseLink] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Template Created:", { templateName, caseLink });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-md w-full p-6 bg-white rounded-2xl border border-slate-100 shadow-2xl gap-0 block">
        
        <div className="flex items-center justify-between pb-4 mb-5 border-b border-slate-100">
          <DialogTitle className="text-sm font-bold text-slate-800">
            New Template
          </DialogTitle>
         
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-900 tracking-wide uppercase">Template Name</label>
            <Input
              value={templateName}
              onChange={(e) => setTemplateName(e.target.value)}
              placeholder="Enter name"
              className="h-11 border-slate-200 focus:ring-emerald-600 rounded-lg text-sm"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-900 tracking-wide uppercase">Link to Case</label>
            <Select value={caseLink} onValueChange={setCaseLink}>
              <SelectTrigger className="h-11 border-slate-200 text-sm font-semibold text-slate-700 rounded-lg">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent className="bg-white text-sm font-medium">
                <SelectItem value="case-1">Case: LD/142/2025</SelectItem>
                <SelectItem value="case-2">Case: LD/078/2025</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-900 tracking-wide uppercase">Sign with DocuSign</label>
            <Select defaultValue="no">
              <SelectTrigger className="h-11 border-slate-200 text-sm font-semibold text-slate-700 rounded-lg">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-white text-sm font-medium">
                <SelectItem value="yes">Yes, enable DocuSign</SelectItem>
                <SelectItem value="no">No</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button type="submit" className="w-full h-11 bg-[#1A6341] hover:bg-[#134D32] text-white font-bold text-sm rounded-xl mt-2">
            Create
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}