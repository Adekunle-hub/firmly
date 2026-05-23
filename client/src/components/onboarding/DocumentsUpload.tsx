import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Upload, FileText, Trash2, CheckCircle2 } from "lucide-react";

interface DocumentsUploadProps {
  onComplete: (documents: any[]) => void;
}

export default function DocumentsUpload({ onComplete }: DocumentsUploadProps) {
  const [docs, setDocs] = useState<any[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files).map((f) => ({
        id: "doc_" + Date.now() + Math.random().toString(36).substr(2, 5),
        name: f.name,
        type: f.name.endsWith(".pdf") ? "Legal Document" : "Contract",
        dateUploaded: new Date().toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
        size: (f.size / (1024 * 1024)).toFixed(1) + " MB",
      }));
      setDocs((prev) => [...prev, ...newFiles]);
    }
  };

  const removeDoc = (id: string) => {
    setDocs((prev) => prev.filter((d) => d.id !== id));
  };

  const handleComplete = () => {
    onComplete(docs);
  };

  return (
    <div className="bg-white border border-slate-200/80 rounded-2xl p-6 md:p-8 flex flex-col gap-6 shadow-sm max-w-4xl mx-auto w-full">
      <div>
        <h2 className="text-lg md:text-xl font-bold text-slate-900">Document Organisation</h2>
        <p className="text-[13px] text-slate-400 mt-1">
          Upload and map client documents (ID, Agreement, etc. to project folders).
        </p>
      </div>

      {/* Upload Box */}
      <div className="relative border-2 border-dashed border-slate-200 rounded-2xl p-10 flex flex-col items-center justify-center bg-slate-50/50 hover:bg-slate-50 hover:border-slate-300 transition-colors group cursor-pointer">
        <input
          type="file"
          multiple
          onChange={handleFileChange}
          className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
        />
        <Upload className="w-9 h-9 text-slate-400 mb-2 group-hover:scale-105 transition-transform" />
        <span className="text-[13.5px] font-semibold text-slate-700">Upload client documents</span>
        <span className="text-[11.5px] text-slate-400 mt-1">
          Drag and drop or <span className="text-[#055939] font-bold hover:underline">browse</span> to select
        </span>
      </div>

      {/* Uploaded Documents List */}
      {docs.length > 0 && (
        <div className="flex flex-col gap-2 mt-2">
          <h3 className="text-[12px] font-bold text-slate-400 uppercase tracking-wide">Selected Documents ({docs.length})</h3>
          <div className="border border-slate-100 rounded-xl divide-y divide-slate-100 overflow-hidden bg-slate-50/20">
            {docs.map((doc) => (
              <div key={doc.id} className="flex items-center justify-between p-3 text-[13px] hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-2.5 min-w-0">
                  <FileText className="w-5 h-5 text-[#055939] shrink-0" />
                  <div className="truncate">
                    <p className="font-semibold text-slate-800 truncate">{doc.name}</p>
                    <p className="text-[11px] text-slate-400 font-mono">{doc.size} • {doc.type}</p>
                  </div>
                </div>
                <button
                  onClick={() => removeDoc(doc.id)}
                  className="text-slate-400 hover:text-red-600 p-1.5 rounded-lg hover:bg-red-50/50 transition-colors"
                  title="Remove document"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Action Button */}
      <div className="pt-4 border-t border-slate-100 mt-2">
        <Button
          onClick={handleComplete}
          className="w-full h-11 bg-[#055939] hover:bg-[#155e38] text-white font-semibold rounded-xl text-[14px] shadow-sm flex items-center justify-center gap-2 cursor-pointer"
        >
          <CheckCircle2 className="w-4.5 h-4.5" />
          Complete Client Setup
        </Button>
      </div>
    </div>
  );
}
