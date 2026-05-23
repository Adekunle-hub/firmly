import React from "react";
import { TaskColumn } from "./TaskColumn";
import type { TaskItem } from "./calendar/CreateTaskModal";

const tasks: { todo: TaskItem[]; inProgress: TaskItem[]; completed: TaskItem[] } = {
  todo: [
    {
      id: "task-1",
      title: "Draft Legal Opinion - Immigration Matter",
      dueDate: "2026-05-16",
      priority: "high",
      assignedTo: "Barrister B. Chen",
      description: "Review visa application requirements and formulate legal advisory opinion.",
      status: "not-started",
      createdOn: "2026-05-10",
    },
    {
      id: "task-2",
      title: "Client Follow-up - Bakare Estate",
      dueDate: "2026-05-18",
      priority: "high",
      assignedTo: "Barrister A. Adeola",
      description: "Contact executors regarding asset distribution schedules.",
      status: "not-started",
      createdOn: "2026-05-12",
    },
  ],
  inProgress: [
    {
      id: "task-3",
      title: "Review Case Files - Land Dispute",
      dueDate: "2026-05-14",
      priority: "high",
      assignedTo: "Barrister A. Robinson",
      description: "Analyze deed documents and survey maps for the upcoming hearing.",
      status: "in-progress",
      createdOn: "2026-05-08",
    },
  ],
  completed: [
    {
      id: "task-4",
      title: "Prepare Court Bundle - Zenith Bank Case",
      dueDate: "2026-05-10",
      priority: "medium",
      assignedTo: "Barrister A. Robinson",
      description: "Compile indices, core records, and authorities index bundles.",
      status: "completed",
      createdOn: "2026-05-01",
    },
    {
      id: "task-5",
      title: "Research Case Law - Property Dispute",
      dueDate: "2026-05-19",
      priority: "medium",
      assignedTo: "Associate Lawyer",
      description: "Collate supreme court judgments pertaining to tenancy defaults.",
      status: "completed",
      createdOn: "2026-05-11",
    },
  ],
};

export function TaskBoard() {
  return (
    <div className="grid grid-cols-3 gap-4">
      <TaskColumn title="To Do" tasks={tasks.todo} />
      <TaskColumn title="In Progress" tasks={tasks.inProgress} />
      <TaskColumn title="Completed" tasks={tasks.completed} />
    </div>
  );
}