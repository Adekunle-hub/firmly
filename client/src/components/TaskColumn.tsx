import React from "react";
import TaskCard from "./TaskCard";
// 1. Import the same unified type your card uses
import type { TaskItem } from "./calendar/CreateTaskModal";

interface TaskColumnProps {
  title: string;
  tasks: TaskItem[]; // 2. Use the imported type here instead of local 'Task[]'
  onTaskClick?: (task: TaskItem) => void; // Added an optional click handler
}

export function TaskColumn({ title, tasks, onTaskClick }: TaskColumnProps) {
  return (
    <div className="bg-gray-100 p-4 rounded-md shadow-md">
      <h2 className="text-lg font-semibold mb-4">{title}</h2>
      <div className="space-y-4">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onClick={() => onTaskClick?.(task)} // 3. Satisfies TaskCard's required onClick prop
          />
        ))}
      </div>
    </div>
  );
}