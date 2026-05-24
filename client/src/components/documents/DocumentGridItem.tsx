// components/documents/DocumentGridItem.tsx
import React from "react";
import { MoreVertical } from "lucide-react";

interface DocumentGridItemProps {
  id: string;
  name: string;
  size: string;
  date: string;
  onClick: () => void;
  onMenuClick: (e: React.MouseEvent) => void;
}

export default function DocumentGridItem({
  name,
  size,
  date,
  onClick,
  onMenuClick,
}: DocumentGridItemProps) {
  return (
    <div
      onClick={onClick}
      className="bg-white border border-slate-100 rounded-2xl p-5 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-200 hover:shadow-md hover:border-slate-200/80 group relative select-none"
    >
      {/* Context Menu Button Pin */}
      <button
        onClick={onMenuClick}
        className="absolute top-3 right-3 p-1 rounded-md text-slate-400 hover:bg-slate-50 hover:text-slate-700 transition-colors"
      >
        <MoreVertical size={14} />
      </button>

      {/* Yellow Asset SVG Folder Icon representation */}
      <div className="w-16 h-16 my-2 flex items-center justify-center transition-transform duration-200 group-hover:scale-105">
        <svg
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-xs"
        >
          <path
            d="M4 10C4 7.79086 5.79086 6 8 6H18.3416C19.7573 6 21.0763 6.74837 21.8037 7.96068L24.1963 11.9493C24.5599 12.5555 25.2195 12.9297 25.9274 12.9297H40C42.2091 12.9297 44 14.7208 44 16.9297V40C44 42.2091 42.2091 44 40 44H8C5.79086 44 4 42.2091 4 40V10Z"
            fill="#F4C443"
          />
          <path
            d="M4 16H44V40C44 42.2091 42.2091 44 40 44H8C5.79086 44 4 42.2091 4 40V16Z"
            fill="#F5D061"
          />
        </svg>
      </div>

      {/* Metadata Typography Strings */}
      <div className="mt-2 w-full space-y-1">
        <p className="text-sm font-semibold text-slate-700 truncate px-1 group-hover:text-[#1A6341] transition-colors">
          {name}
        </p>
        <p className="text-[10px] text-slate-400 font-medium">
          {size} <span className="mx-1">•</span> {date}
        </p>
      </div>
    </div>
  );
}