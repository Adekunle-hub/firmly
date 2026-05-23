import { IconChevronDown } from "@/utils/Icons";
import { useState, useRef, useEffect } from "react";

interface SelectOption {
  value: string;
  label: string;
}

interface CustomSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
}

function CustomSelect({ value, onChange, options, placeholder = "Select" }: CustomSelectProps) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const selected = options.find((o) => o.value === value);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative cursor-pointer" ref={wrapperRef}>
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`flex items-center cursor-pointer justify-between w-full h-12 px-4 rounded-xl bg-white/8 border transition-colors text-sm ${
          open ? "border-[#5cab82]" : "border-white/10 hover:border-white/25"
        }`}
      >
        <span className={selected ? "text-white" : "text-[#72777a]"}>
          {selected ? selected.label : placeholder}
        </span>
        <span
          className={`text-white/50 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        >
          <IconChevronDown />
        </span>
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute top-[calc(100%+6px)] left-0 right-0 z-50 bg-[#1a2420] border border-white/12 rounded-xl overflow-hidden shadow-lg">
          {options.map((opt, i) => (
            <div key={opt.value}>
              {i > 0 && <div className="h-px  bg-white/8 mx-0" />}
              <button
                type="button"
                onClick={() => {
                  onChange(opt.value);
                  setOpen(false);
                }}
                className={`flex items-center justify-between cursor-pointer w-full px-4 py-3 text-sm text-left transition-colors hover:bg-white/7 ${
                  value === opt.value ? "text-[#5cab82]" : "text-white/75 hover:text-white"
                }`}
              >
                {opt.label}
                {value === opt.value && (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#5cab82" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CustomSelect