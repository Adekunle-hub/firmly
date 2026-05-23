// components/documents/DocumentCard.tsx
import React, { useState } from "react";
import { MoreVertical, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DocuSignModal from "./DocumentSignModal";
import ShareDocumentModal from "./ShareDocumentModal";

interface DocumentCardProps {
  file: {
    id: string;
    name: string;
    type: string;
    status: "Approved" | "Under Review" | "Locked" | "Shared" | "Archived";
    size: string;
    caseNo: string;
  };
}

export default function DocumentCard({ file }: DocumentCardProps) {
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isDocuSignOpen, setIsDocuSignOpen] = useState(false);

  return (
    <>
      <div className="bg-white border border-slate-100 rounded-xl p-5 space-y-4 relative hover:shadow-md transition-all group">
        <div className="flex items-start justify-between">
          <div className="p-2 bg-slate-50 text-emerald-700 rounded-lg">
            <FileText size={18} />
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-7 w-7 text-slate-400">
                <MoreVertical size={14} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 bg-white border border-slate-100 p-1 rounded-xl shadow-xl">
              <DropdownMenuItem className="text-xs font-semibold text-slate-600 py-1.5 rounded-lg cursor-pointer">Open</DropdownMenuItem>
              <DropdownMenuItem className="text-xs font-semibold text-slate-600 py-1.5 rounded-lg cursor-pointer">Download</DropdownMenuItem>
              <DropdownMenuItem className="text-xs font-semibold text-slate-600 py-1.5 rounded-lg cursor-pointer">Rename</DropdownMenuItem>
              
              {/* TRIGGER SHARE MODAL STATE */}
              <DropdownMenuItem 
                onClick={() => setIsShareOpen(true)}
                className="text-xs font-semibold text-slate-600 py-1.5 rounded-lg cursor-pointer"
              >
                Share
              </DropdownMenuItem>
              
              <DropdownMenuSeparator className="bg-slate-50" />
              
              {/* TRIGGER DOCUSIGN MODAL STATE */}
              <DropdownMenuItem 
                onClick={() => setIsDocuSignOpen(true)}
                className="text-xs font-semibold text-slate-600 py-1.5 rounded-lg cursor-pointer"
              >
                Execute with Docusign
              </DropdownMenuItem>
              
              <DropdownMenuSeparator className="bg-slate-50" />
              <DropdownMenuItem className="text-xs font-bold text-red-600 py-1.5 rounded-lg cursor-pointer focus:bg-red-50 focus:text-red-600">Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Text Details Framework View Body */}
        <div>
          <h4 className="text-xs font-bold text-slate-900 truncate">{file.name}</h4>
          <p className="text-[10px] font-semibold text-slate-400 mt-0.5">{file.type}</p>
        </div>

        <div className="flex items-center justify-between pt-1 text-[10px] font-bold">
          <span className="bg-[#E6F4EA] text-[#137333] px-2 py-0.5 rounded-md">{file.status}</span>
          <span className="text-slate-400">{file.size}</span>
        </div>
      </div>

      {/* Embedded Action Workflow Portals overlay containers */}
      <ShareDocumentModal 
        isOpen={isShareOpen} 
        onClose={() => setIsShareOpen(false)} 
        documentName={file.name} 
      />
      
      <DocuSignModal 
        isOpen={isDocuSignOpen} 
        onClose={() => setIsDocuSignOpen(false)} 
      />
    </>
  );
}