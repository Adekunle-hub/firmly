
"use client";

import React, { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import NewTemplateModal from "./NewTemplateModal";
import TemplateCategory from "./TemplateCategory";


export default function TemplatesContent() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="space-y-4 md:space-y-8 pt-0 sm:pt-2">
      <div className="flex items-center justify-end">
        <Button
          onClick={() => setIsModalOpen(true)}
          className="bg-[#1A6341] text-white hover:bg-[#134D32] text-sm font-bold h-10 px-4 rounded-lg flex items-center gap-2"
        >
          <Plus size={16} /> New Template
        </Button>
      </div>

      <div className="space-y-6 sm:space-y-9 md:space-y-12">
        <TemplateCategory
          title="NDAs"
          items={[
            { id: "1", name: "Non-Disclosure Agreement", count: 8 },
            { id: "2", name: "Confidentiality Agreement", count: 3 },
          ]}
        />
        <TemplateCategory
          title="Contracts"
          items={[
            { id: "3", name: "Service Level Agreement", count: 12 },
            { id: "4", name: "Memorandum of Understanding", count: 5 },
          ]}
        />
        <TemplateCategory
          title="Consulting Agreements"
          items={[
            { id: "5", name: "Retainer Agreement", count: 4 },
            { id: "6", name: "Independent Contractor", count: 7 },
          ]}
        />
      </div>

      <NewTemplateModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}