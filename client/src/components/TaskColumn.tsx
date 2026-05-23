import React from "react";
import { TaskCard } from "./TaskCard";

interface Task {
  id: number;
  title: string;
  dueDate: string;
  priority: string;
  assignedTo: string;
}

interface TaskColumnProps {
  title: string;
  tasks: Task[];
}

export function TaskColumn({ title, tasks }: TaskColumnProps) {
  return (
    <div className="bg-gray-100 p-4 rounded-md shadow-md">
      <h2 className="text-lg font-semibold mb-4">{title}</h2>
      <div className="space-y-4">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}