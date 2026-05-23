import React, { useRef, useState } from "react";
import { IconUpload, IconPdf, IconClose } from "../utils/Icons";

type Props = {
  label: string;
  hint?: string;
};

export default function UploadDocument({ label, hint }: Props) {

  const [file, setFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleFile = (f: File | null) => {
    if (f) setFile(f);
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="text-base text-white font-normal">{label}</label>

     
      <div
        onDrop={(e) => {
          e.preventDefault();
          handleFile(e.dataTransfer.files?.[0] || null);
        }}
        onDragOver={(e) => e.preventDefault()}
        className="rounded-xl border border-dashed border-white/20 bg-white/5 px-6 py-7 flex flex-col items-center gap-1"
      >
        <span className="text-white/40 mb-1">
          <IconUpload />
        </span>

        <p className="text-sm text-white/70 text-center">{hint}</p>

        <p className="text-sm text-white/40">
          Drag and drop or{" "}
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="text-orange-400 cursor-pointer hover:text-orange-300"
          >
            browse
          </button>{" "}
          to upload
        </p>

        <input
          ref={inputRef}
          type="file"
          className="hidden"
          onChange={(e) => handleFile(e.target.files?.[0] || null)}
        />
      </div>

     
      {file && (
        <div className="flex items-center gap-3 py-2 border-b border-white/10">
          <IconPdf />

          <div className="flex-1 min-w-0">
            <p className="text-sm text-white font-semibold truncate">
              {file.name}
            </p>

            <p className="text-xs text-white/50">
              {new Date().toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}{" "}
              · {(file.size / 1024 / 1024).toFixed(1)}MB
            </p>
          </div>

          <div className="text-xs text-white/50">25%</div>

          <button
            type="button"
            onClick={() => setFile(null)}
            className="text-white/40 hover:text-white transition-colors"
          >
            <IconClose />
          </button>
        </div>
      )}
    </div>
  );
}