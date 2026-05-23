"use client";

import React, { useState } from "react";
import { Plus, Filter } from "lucide-react";
import Bounded from "@/components/Bounded";
import TaskKanban from "@/components/TaskKanban";
import CreateTaskModal from "@/components/calendar/CreateTaskModal";
import TaskDetailModal from "@/components/calendar/TaskDetailModal";
import type { TaskItem } from "@/components/calendar/CreateTaskModal";

// Mock data
const INITIAL_TASKS: TaskItem[] = [
  {
    id: "task-1",
    title: "Draft Legal Opinion - Immigration Matter",
    description: "Prepare comprehensive legal opinion on immigration matter",
    status: "not-started",
    priority: "high",
    dueDate: "2026-05-25",
    linkedCase: "Smith v. Department",
    assignedTo: "Atty. B. Johnson",
    createdOn: "2026-05-20",
  },
  {
    id: "task-2",
    title: "Review Case Files - Land Dispute",
    description: "Conduct thorough review of all case files",
    status: "in-progress",
    priority: "high",
    dueDate: "2026-05-23",
    linkedCase: "Okonkwo v. ABD",
    assignedTo: "Atty. K. Obi",
    createdOn: "2026-05-19",
  },
  {
    id: "task-3",
    title: "Prepare Court Bundle - Zenith Bank Case",
    description: "Compile and prepare all court documents",
    status: "completed",
    priority: "high",
    dueDate: "2026-05-21",
    linkedCase: "Adewale v. Zenith Bank",
    assignedTo: "Atty. M. Adeola",
    createdOn: "2026-05-18",
  },
  {
    id: "task-4",
    title: "Update Case Management System",
    description: "Input updated case information",
    status: "not-started",
    priority: "medium",
    dueDate: "2026-05-27",
    linkedCase: "Ibrahim v. Fidelity",
    assignedTo: "Atty. R. Ibrahim",
    createdOn: "2026-05-20",
  },
  {
    id: "task-5",
    title: "Research Precedent - Property Rights",
    description: "Legal research on property rights precedents",
    status: "in-progress",
    priority: "medium",
    dueDate: "2026-05-26",
    linkedCase: "Estate of Balogun",
    assignedTo: "Atty. O. Mojisola",
    createdOn: "2026-05-19",
  },
  {
    id: "task-6",
    title: "Prepare Client Presentation",
    description: "Create presentation for client meeting",
    status: "completed",
    priority: "low",
    dueDate: "2026-05-22",
    linkedCase: "ARB Ltd. Matter",
    assignedTo: "Atty. B. Johnson",
    createdOn: "2026-05-17",
  },
];

export default function TasksPage() {
  const [tasks, setTasks] = useState<TaskItem[]>(INITIAL_TASKS);
  const [selectedTask, setSelectedTask] = useState<TaskItem | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const handleCreateTask = (task: TaskItem) => {
    setTasks((prev) => [...prev, task]);
    setIsCreateOpen(false);
  };

  const handleUpdateTask = (taskId: string, status: TaskItem["status"]) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status } : t))
    );
    if (selectedTask?.id === taskId) {
      setSelectedTask({ ...selectedTask, status });
    }
  };

  const handleTaskClick = (task: TaskItem) => {
    setSelectedTask(task);
    setIsDetailOpen(true);
  };

  return (
    <Bounded>
      {/* ── Page Header ─────────────────────────────────────────── */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-[#181D1A]">
            Calendar &amp; Tasks
          </h1>
          <p className="text-[13px] text-[#404942] mt-0.5">
            Manage and organize all case-related tasks and workflows.
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0 flex-wrap sm:flex-nowrap">
          <button
            className="flex items-center gap-1.5 h-9 px-3 rounded-lg border border-slate-200 bg-white text-slate-600 hover:border-slate-300 text-[11px] font-semibold transition-colors cursor-pointer shadow-none"
          >
            <Filter size={12} /> Filter
          </button>

          <button
            onClick={() => setIsCreateOpen(true)}
            className="flex items-center gap-1.5 h-9 px-4 rounded-lg bg-[#1A4331] text-white hover:bg-[#133224] text-[11px] font-bold transition-colors cursor-pointer shadow-sm"
          >
            <Plus size={13} /> Create Task
          </button>
        </div>
      </div>

      {/* ── Kanban Board ────────────────────────────────────────── */}
      <TaskKanban tasks={tasks} onTaskClick={handleTaskClick} />

      {/* ── Modals ───────────────────────────────────────────────── */}
      <CreateTaskModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onCreateTask={handleCreateTask}
      />

      <TaskDetailModal
        task={selectedTask}
        isOpen={isDetailOpen}
        onClose={() => {
          setIsDetailOpen(false);
          setSelectedTask(null);
        }}
        onStatusChange={handleUpdateTask}
      />
    </Bounded>
  );
}
