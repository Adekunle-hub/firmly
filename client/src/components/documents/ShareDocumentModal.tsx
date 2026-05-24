
"use client";

import React, { useState } from "react";
import { X, Check } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  documentName: string;
}

export default function ShareDocumentModal({ isOpen, onClose, documentName }: ShareModalProps) {
  const [selectedPerson, setSelectedPerson] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleShare = () => {
    if (!selectedPerson) return;
    // Simulate API update logic
    setIsSuccess(true);
  };

  const handleCloseAll = () => {
    setIsSuccess(false);
    setSelectedPerson("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleCloseAll()}>
      <DialogContent className="max-w-md w-full p-6 bg-white rounded-2xl border border-slate-100 shadow-2xl gap-0 block overflow-visible">
        
        {!isSuccess ? (
          <>
            {/* Share Setup State */}
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-50">
              <DialogTitle className="text-sm font-bold text-slate-900 truncate max-w-[90%]">
                Share “{documentName}”
              </DialogTitle>
            
            </div>

            <p className="text-[11px] text-slate-400 font-medium mb-4 leading-relaxed">
              Sync your meetings and deadlines with Google Calendar for seamless scheduling.
            </p>

            {/* Document Indicator Row */}
            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl mb-5">
              <div className="bg-red-50 text-red-600 p-2 rounded-lg font-bold text-sm tracking-tight">
                PDF
              </div>
              <span className="text-sm font-bold text-slate-700 truncate">Case File</span>
            </div>

            {/* Selection Dropdown Input */}
            <div className="space-y-4">
              <div className="space-y-1">
                <Select value={selectedPerson} onValueChange={setSelectedPerson}>
                  <SelectTrigger className="h-11 border-slate-200 text-sm font-semibold text-slate-700 rounded-xl focus:ring-1 focus:ring-emerald-600">
                    <SelectValue placeholder="Select people" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border border-slate-100 rounded-xl shadow-xl text-sm font-semibold">
                    <SelectItem value="Barrister Alex">Barrister Alex</SelectItem>
                    <SelectItem value="Oluwaseun FBN">Oluwaseun FBN</SelectItem>
                    <SelectItem value="Dapo Admin">Dapo Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button
                onClick={handleShare}
                disabled={!selectedPerson}
                className="w-full h-11 bg-[#1A6341] hover:bg-[#134D32] disabled:bg-slate-100 disabled:text-slate-400 text-white font-bold text-sm rounded-xl transition-colors shadow-xs"
              >
                Share
              </Button>
            </div>
          </>
        ) : (
          /* Confetti Success Frame Layout */
          <div className="py-6 flex flex-col items-center text-center relative">
            {/* Custom Background Confetti Simulation Items */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl opacity-80">
              <span className="absolute top-2 left-12 w-2 h-2 bg-blue-400 rounded-full transform rotate-45" />
              <span className="absolute top-8 right-16 w-3 h-1.5 bg-yellow-400 transform -rotate-12" />
              <span className="absolute bottom-6 left-16 w-1.5 h-3 bg-pink-400 transform rotate-45" />
              <span className="absolute top-1/2 right-10 w-2 h-2 bg-purple-400 rounded-full" />
              <span className="absolute top-4 right-1/3 w-2 h-2 bg-emerald-400 transform rotate-12" />
            </div>

            {/* Shield Check Badge */}
            <div className="h-16 w-16 bg-[#E6F4EA] text-[#137333] rounded-2xl flex items-center justify-center mb-5 border-4 border-white shadow-md">
              <Check size={32} strokeWidth={3} />
            </div>

            <h3 className="text-sm font-bold text-slate-900 max-w-[240px] leading-snug">
              Document successfully shared with {selectedPerson}
            </h3>

            <Button 
              onClick={handleCloseAll}
              className="mt-6 bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-bold h-8 px-4 rounded-lg shadow-none"
            >
              Close Window
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}