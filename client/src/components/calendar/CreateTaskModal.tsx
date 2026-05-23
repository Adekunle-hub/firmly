"use client";

import React, { useState } from "react";
import { X, ClipboardList, CalendarDays, User, AlignLeft } from "lucide-react";
import { cn } from "@/lib/utils";

export type TaskItem = {
  id: string;
  title: string;
  assignedTo: string;
  dueDate: string;
  description: string;
  priority: "low" | "medium" | "high";
  status: "not-started" | "in-progress" | "completed";
  linkedCase?: string;
  createdOn: string;
};

interface CreateTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateTask: (task: TaskItem) => void;
}

const PRIORITY_OPTIONS: { value: TaskItem["priority"]; label: string; color: string; activeBg: string; activeText: string }[] = [
  { value: "low", label: "Low", color: "border-slate-200", activeBg: "bg-blue-50 border-blue-300", activeText: "text-blue-700" },
  { value: "medium", label: "Medium", color: "border-slate-200", activeBg: "bg-amber-50 border-amber-300", activeText: "text-amber-700" },
  { value: "high", label: "High", color: "border-slate-200", activeBg: "bg-red-50 border-red-300", activeText: "text-red-700" },
];

export default function CreateTaskModal({ isOpen, onClose, onCreateTask }: CreateTaskModalProps) {
  const [form, setForm] = useState({
    title: "",
    assignedTo: "",
    dueDate: "",
    description: "",
    priority: "medium" as TaskItem["priority"],
    linkedCase: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!isOpen) return null;

  const set = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.title.trim()) errs.title = "Task title is required";
    if (!form.assignedTo.trim()) errs.assignedTo = "Assignee is required";
    if (!form.dueDate) errs.dueDate = "Due date is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    const task: TaskItem = {
      id: `task-${Date.now()}`,
      title: form.title.trim(),
      assignedTo: form.assignedTo.trim(),
      dueDate: form.dueDate,
      description: form.description.trim(),
      priority: form.priority,
      status: "not-started",
      linkedCase: form.linkedCase.trim() || undefined,
      createdOn: new Date().toISOString().split("T")[0],
    };
    onCreateTask(task);
    onClose();
    setForm({
      title: "",
      assignedTo: "",
      dueDate: "",
      description: "",
      priority: "medium",
      linkedCase: "",
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full max-w-md mx-4 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#F0F9F4] flex items-center justify-center">
              <ClipboardList size={16} className="text-[#1A4331]" />
            </div>
            <h2 className="text-[14px] font-bold text-slate-900">Create New Task</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
          >
            <X size={16} />
          </button>
        </div>

        {/* Form */}
        <div className="px-6 py-5 space-y-4">
          {/* Task Title */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
              Task Title
            </label>
            <input
              value={form.title}
              onChange={(e) => set("title", e.target.value)}
              placeholder="e.g. Draft Settlement for Balogun Matter..."
              className={cn(
                "w-full h-10 px-3 rounded-xl border text-[12px] font-medium text-slate-800 placeholder:text-slate-300",
                "focus:outline-none focus:ring-1 focus:ring-[#1A4331] transition-shadow",
                errors.title ? "border-red-300 bg-red-50" : "border-slate-200 bg-slate-50"
              )}
            />
            {errors.title && <p className="text-[10px] text-red-500 mt-1">{errors.title}</p>}
          </div>

          {/* Assigned To + Due Date */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                <User size={9} className="inline mr-1" />Assign To
              </label>
              <input
                value={form.assignedTo}
                onChange={(e) => set("assignedTo", e.target.value)}
                placeholder="Atty B. Johnson"
                className={cn(
                  "w-full h-10 px-3 rounded-xl border text-[12px] font-medium text-slate-800 placeholder:text-slate-300",
                  "focus:outline-none focus:ring-1 focus:ring-[#1A4331]",
                  errors.assignedTo ? "border-red-300 bg-red-50" : "border-slate-200 bg-slate-50"
                )}
              />
              {errors.assignedTo && <p className="text-[10px] text-red-500 mt-1">{errors.assignedTo}</p>}
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                <CalendarDays size={9} className="inline mr-1" />Due Date
              </label>
              <input
                type="date"
                value={form.dueDate}
                onChange={(e) => set("dueDate", e.target.value)}
                className={cn(
                  "w-full h-10 px-3 rounded-xl border text-[12px] font-medium text-slate-800",
                  "focus:outline-none focus:ring-1 focus:ring-[#1A4331]",
                  errors.dueDate ? "border-red-300 bg-red-50" : "border-slate-200 bg-slate-50"
                )}
              />
              {errors.dueDate && <p className="text-[10px] text-red-500 mt-1">{errors.dueDate}</p>}
            </div>
          </div>

          {/* Linked Case */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
              Linked Case <span className="font-normal text-slate-300 normal-case">(optional)</span>
            </label>
            <input
              value={form.linkedCase}
              onChange={(e) => set("linkedCase", e.target.value)}
              placeholder="e.g. Adewale v. Zenith Bank"
              className="w-full h-10 px-3 rounded-xl border border-slate-200 bg-slate-50 text-[12px] font-medium text-slate-800 placeholder:text-slate-300 focus:outline-none focus:ring-1 focus:ring-[#1A4331]"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
              <AlignLeft size={9} className="inline mr-1" />Description
            </label>
            <textarea
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
              placeholder="Task details or delivery expectations..."
              rows={3}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-[12px] font-medium text-slate-800 placeholder:text-slate-300 focus:outline-none focus:ring-1 focus:ring-[#1A4331] resize-none"
            />
          </div>

          {/* Priority */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-2">
              Priority
            </label>
            <div className="flex gap-2">
              {PRIORITY_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => set("priority", opt.value)}
                  className={cn(
                    "flex-1 py-2 rounded-xl border text-[11px] font-bold transition-all cursor-pointer text-center",
                    form.priority === opt.value
                      ? cn(opt.activeBg, opt.activeText)
                      : "border-slate-200 bg-white text-slate-400 hover:border-slate-300"
                  )}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-end gap-2 bg-slate-50/50">
          <button
            onClick={onClose}
            className="text-[11px] font-semibold text-slate-500 hover:text-slate-700 px-4 py-2 rounded-lg transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="inline-flex items-center gap-1.5 text-[11px] font-bold text-white bg-[#1A4331] hover:bg-[#133224] px-4 py-2 rounded-lg transition-colors cursor-pointer"
          >
            <ClipboardList size={12} />
            Create Task
          </button>
        </div>
      </div>
    </div>
  );
}
