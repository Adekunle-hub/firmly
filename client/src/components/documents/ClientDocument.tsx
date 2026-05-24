// app/documents/[folderId]/page.tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Search, Bell, Plus, ChevronLeft, SlidersHorizontal, FileText, MoreVertical } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ClientDocumentCard from "./ClientDocumentCard";
import AddDocumentModal from "./AddDocumentModal";


// Mock data matrix mapping specific folder details
const MOCK_FILES_BY_FOLDER: Record<string, any[]> = {
  default: [
    { id: "f1", name: "Adewale_v_Zenith_Bank_Writ", type: "Writ & Summons", status: "Approved", size: "2.4 MB", caseNo: "Case: LD/142/2025" },
    { id: "f2", name: "Statement_of_Claim_Adewale", type: "Statement of Claim/Defence", status: "Under Review", size: "1.8 MB", caseNo: "Case: LD/142/2025" },
    { id: "f3", name: "Power_of_Attorney_Bakare_I", type: "Power of Attorney", status: "Locked", size: "890 KB", caseNo: "Case: LD/201/2025" },
    { id: "f4", name: "NDA_Tech_Solutions.pdf", type: "Non-Disclosure Agreement (NDA)", status: "Shared", size: "1.2 MB", caseNo: "Case: LD/104/2025" },
    { id: "f5", name: "Affidavit_Immigration_Case", type: "Affidavit", status: "Approved", size: "650 KB", caseNo: "Case: LD/089/2025" },
    { id: "f6", name: "Court_Order_Land_Dispute", type: "Court Order/Ruling", status: "Archived", size: "3.1 MB", caseNo: "Case: LD/078/2025" },
    { id: "f7", name: "Engagement_Letter_New_Client", type: "Engagement/Retainer Letter", status: "Approved", size: "420 KB", caseNo: "Case: LD/111/2025" },
    { id: "f8", name: "Tenancy_Agreement_Victoria_Is", type: "Tenancy Agreement", status: "Approved", size: "1.5 MB", caseNo: "Case: LD/165/2025" },
  ]
};

type ContextTab = "clients" | "case" | "evidence";

export default function ClientDocument() {
  const params = useParams();
  const folderId = (params?.folderId as string) || "default";
  
  // Simulated lookup fallback data 
  const filesData = MOCK_FILES_BY_FOLDER[folderId] || MOCK_FILES_BY_FOLDER["default"];
  
  const [activeTab, setActiveTab] = useState<ContextTab>("clients");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#181D1A]">
   
  

      <main className="max-w-350  mx-auto p-8 space-y-6">
        {/* Detail Title Header Bar */}
        <div className="flex items-center justify-between">
          <div className="space-y-1.5">
            <h1 className="text-lg font-bold text-slate-800">Case_Summary_Olu_FBN.pdf</h1>
            <Link href="/documents" className="inline-flex items-center gap-1 text-sm font-bold text-slate-900 hover:underline">
              <ChevronLeft size={16} strokeWidth={2.5} /> Back
            </Link>
          </div>
          <Button className="bg-[#1A6341] text-white hover:bg-[#134D32] h-10 px-4 text-sm font-bold rounded-lg flex items-center gap-1.5 shadow-xs"
          onClick={() => setIsAddModalOpen(true)}
          >
            Add Document
          </Button>
        </div>

        {/* Center Context Filters Tab Bar Switcher */}
        <div className="flex justify-center border-b border-slate-200/60 pt-2">
          <div className="flex items-center gap-8 text-sm font-bold tracking-wide">
            {(["clients", "case", "evidence"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-3 border-b-2 capitalize transition-all ${
                  activeTab === tab ? "border-[#1A6341] text-[#1A6341]" : "border-transparent text-slate-400 hover:text-slate-700"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Control Sub-Filter Layout Grid */}
        <div className="bg-white border border-slate-100 rounded-xl p-3 flex flex-wrap items-center gap-3">
          <Button variant="outline" className="h-9 bg-[#F8F9FA] border-none text-slate-600 font-semibold text-sm rounded-lg gap-2 shadow-none">
            <SlidersHorizontal size={13} /> All Status
          </Button>
          <Button variant="outline" className="h-9 bg-[#F8F9FA] border-none text-slate-600 font-semibold text-sm rounded-lg gap-2 shadow-none">
            <FileText size={13} /> All Document Types
          </Button>
        </div>

        {/* Outer Data Card Node Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {filesData
            .filter((f) => f.name.toLowerCase().includes(searchQuery.toLowerCase()))
            .map((file) => (
              <ClientDocumentCard key={file.id} file={file} />
            ))}
        </div>
      </main>
      <AddDocumentModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />
    </div>
  );
}