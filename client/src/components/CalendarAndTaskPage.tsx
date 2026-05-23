"use client";

import React, { useState } from "react";
import { TaskBoard } from "./TaskBoard";
import CreateTaskModal, { TaskItem } from "./calendar/CreateTaskModal"; // 1. Imported TaskItem type
import LinkCalendarModal from "./calendar/LinkCalendarModal";

export default function CalendarAndTaskPage() {
  const [isCalendarModalOpen, setIsCalendarModalOpen] = useState(false);

  // 2. Set up visibility state for the task modal
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

  // 3. Optional: Define a handler to save or log the new task item
  const handleCreateTask = (newTask: TaskItem) => {
    console.log("New task created successfully:", newTask);
    // If you have a task list state locally or a state management hook/API context, 
    // you would append it here (e.g., setTasks(prev => [...prev, newTask]))
  };

  return (
    <div className="flex flex-col h-full">
      <header className="flex items-center justify-between p-4 border-b border-gray-200">
        <div>
          <h1 className="text-xl font-semibold">Calendar & Tasks</h1>
          <p className="text-sm text-gray-500">Manage court dates, deadlines, meetings, and team tasks.</p>
        </div>
        <div className="flex space-x-4">
          <button
            className="btn btn-secondary"
            onClick={() => setIsCalendarModalOpen(true)}
          >
            Link Calendar
          </button>

          {/* 4. Trigger the task modal state here */}
          <button
            className="btn btn-primary"
            onClick={() => setIsTaskModalOpen(true)}
          >
            Create New
          </button>
        </div>
      </header>

      <main className="flex-1 p-4">
        <div className="tabs">
          <button className="tab tab-active">Calendar</button>
          <button className="tab">Tasks</button>
        </div>

        <div className="mt-4">
          <TaskBoard />
        </div>
      </main>

      <LinkCalendarModal
        isOpen={isCalendarModalOpen}
        onClose={() => setIsCalendarModalOpen(false)}
      />

      {/* 5. Pass all required properties to satisfy CreateTaskModalProps */}
      <CreateTaskModal
        isOpen={isTaskModalOpen}
        onClose={() => setIsTaskModalOpen(false)}
        onCreateTask={handleCreateTask}
      />

    </div>
  );
}