import React from "react";
import { TaskBoard } from "./TaskBoard";
import { LinkCalendarModal } from "./LinkCalendarModal";
import { CreateTaskModal } from "./CreateTaskModal";
import { CreateEventModal } from "./CreateEventModal";

export default function CalendarAndTaskPage() {
  return (
    <div className="flex flex-col h-full">
      <header className="flex items-center justify-between p-4 border-b border-gray-200">
        <div>
          <h1 className="text-xl font-semibold">Calendar & Tasks</h1>
          <p className="text-sm text-gray-500">Manage court dates, deadlines, meetings, and team tasks.</p>
        </div>
        <div className="flex space-x-4">
          <button className="btn btn-secondary">Link Calendar</button>
          <button className="btn btn-primary">Create New</button>
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

      <LinkCalendarModal />
      <CreateTaskModal />
      <CreateEventModal />
    </div>
  );
}