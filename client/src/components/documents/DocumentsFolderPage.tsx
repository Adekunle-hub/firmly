
"use client";

import React, { useState } from "react";
import { FolderPlus, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import StatCard from "./StatCard";
import DocumentGridItem from "./DocumentGridItem";
import TemplatesContent from "./TemplatePage"; // ← import here

const INITIAL_FOLDERS = Array.from({ length: 14 }, (_, i) => ({
  id: `folder-${i + 1}`,
  name: "Case_Summary_Olu_FBN.pdf",
  size: "2.4 MB",
  date: "Apr 25.2025",
}));

type TabType = "case-documents" | "templates" | "executed";

export default function DocumentManagementPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabType>("case-documents");
  const [searchQuery, setSearchQuery] = useState("");
  const [folders, setFolders] = useState(INITIAL_FOLDERS);

  const handleFolderClick = (id: string) => {
    router.push(`/documents/${id}`);
  };

  const handleMenuClick = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    alert(`Options opened for folder item: ${id}`);
  };

  const filteredFolders = folders.filter((f) =>
    f.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#181D1A] font-sans">
      <main className="max-w-350 mx-auto sm:p-4 p-2 md:p-8 space-y-4 md:space-y-6">

        {/* Header — title and buttons change per tab */}
        <div className="flex gap-2 md:gap-0 md:flex-row flex-col items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              Document Management
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              {activeTab === "templates"
                ? "Manage and organize legal templates"
                : "Organize and manage your legal documents"}
            </p>
          </div>
          <div className="flex items-center gap-3">
            {activeTab === "case-documents" && (
              <>
                <Button className="bg-[#1A6341] text-white cursor-pointer hover:bg-[#134D32] h-9 px-4 text-xs font-semibold rounded-lg flex items-center gap-1.5 shadow-sm">
                  <FolderPlus size={14} /> New Folder
                </Button>
                <Button
                  variant="outline"
                  className="border-slate-200 cursor-pointer text-slate-700 hover:bg-slate-50 h-9 px-4 text-xs font-semibold rounded-lg flex items-center gap-1.5"
                >
                  <Upload size={14} /> Upload File
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4">
          <StatCard title="Total Documents" value={124} />
          <StatCard title="Templates" value={48} />
          <StatCard title="Active Cases" value={6} />
          <StatCard title="Closed Case" value={1} />
        </div>

        {/* Tab Bar — always visible */}
        <div className="flex justify-center border-b border-slate-200/60 pt-4">
          <div className="flex items-center gap-6 md:gap-8 text-xs font-bold tracking-wide">
            {(
              [
                { key: "case-documents", label: "Case Documents" },
                { key: "templates", label: "Templates" },
                { key: "executed", label: "Executed Documents" },
              ] as { key: TabType; label: string }[]
            ).map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`pb-1 md:pb-3  border-b-2 transition-all ${
                  activeTab === key
                    ? "border-[#1A6341] text-[#1A6341]"
                    : "border-transparent text-slate-500 hover:text-slate-800"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === "case-documents" && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3 md:gap-5 pt-2">
            {filteredFolders.map((folder) => (
              <DocumentGridItem
                key={folder.id}
                id={folder.id}
                name={folder.name}
                size={folder.size}
                date={folder.date}
                onClick={() => handleFolderClick(folder.id)}
                onMenuClick={(e) => handleMenuClick(folder.id, e)}
              />
            ))}
          </div>
        )}

        {activeTab === "templates" && <TemplatesContent />}

        {activeTab === "executed" && (
          <div className="pt-8 text-center text-slate-400 text-sm">
            No executed documents yet.
          </div>
        )}

      </main>
    </div>
  );
}