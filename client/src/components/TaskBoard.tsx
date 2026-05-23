import React from "react";
import { TaskColumn } from "./TaskColumn";

const tasks = {
  todo: [
    { id: 1, title: "Draft Legal Opinion - Immigration Matter", dueDate: "May 16", priority: "High", assignedTo: "Barrister B. Chen" },
    { id: 2, title: "Client Follow-up - Bakare Estate", dueDate: "May 18", priority: "High", assignedTo: "Barrister A. Adeola" },
  ],
  inProgress: [
    { id: 3, title: "Review Case Files - Land Dispute", dueDate: "May 14", priority: "High", assignedTo: "Barrister A. Robinson" },
  ],
  completed: [
    { id: 4, title: "Prepare Court Bundle - Zenith Bank Case", dueDate: "May 10", priority: "Medium", assignedTo: "Barrister A. Robinson" },
    { id: 5, title: "Research Case Law - Property Dispute", dueDate: "May 19", priority: "Medium", assignedTo: "Associate Lawyer" },
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