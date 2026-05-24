"use client";

import React, { useState } from "react";
import { X, CheckCircle2 } from "lucide-react";

interface LinkCalendarModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LinkCalendarModal({ isOpen, onClose }: LinkCalendarModalProps) {
  const [connected, setConnected] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
        role="presentation"
      />

      {/* Modal */}
      <article className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <header className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-white">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Link Google Calendar</h2>
            <p className="text-sm text-slate-500 mt-1">Sync hearings and deadlines automatically</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-500 hover:text-slate-700 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </header>

        {/* Content */}
        <div className="px-6 py-5">
          <div className="flex items-center justify-between p-4 rounded-xl border border-slate-200 bg-slate-50">
            <div className="flex items-center gap-3">
              <img
                src="https://www.gstatic.com/images/branding/product/1x/googleg_48dp.png"
                alt="Google"
                className="w-7 h-7"
              />
              <div>
                <p className="text-sm font-bold text-slate-900">Google Calendar</p>
                <p className="text-sm text-slate-500">Connect your Google account</p>
              </div>
            </div>

            <button
              onClick={() => setConnected((c) => !c)}
              className={`px-3 py-1.5 rounded-lg text-sm font-bold transition-colors cursor-pointer flex items-center gap-1.5 ${
                connected
                  ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                  : "bg-white text-slate-700 border border-slate-300 hover:border-slate-400"
              }`}
            >
              {connected && <CheckCircle2 size={14} className="shrink-0" />}
              {connected ? "Connected" : "Connect"}
            </button>
          </div>
        </div>

        {/* Footer */}
        <footer className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex items-center gap-2">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 rounded-lg border border-slate-300 bg-white text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            disabled={!connected}
            className={`flex-1 px-4 py-2 rounded-lg text-sm font-bold transition-colors cursor-pointer ${
              connected
                ? "bg-[#1A4331] text-white hover:bg-[#133224]"
                : "bg-slate-200 text-slate-400 cursor-not-allowed"
            }`}
          >
            Sync Now
          </button>
        </footer>
      </article>
    </div>
  );
}
