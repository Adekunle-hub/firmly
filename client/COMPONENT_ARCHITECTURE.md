# Task Page - Component Architecture

## Component Hierarchy

```
TasksPage (research/page.tsx)
│
├── Bounded
│   └── Page Header
│       ├── Title & Description
│       ├── Filter Button
│       └── Create Task Button
│
├── TaskKanban
│   ├── Column: "To Do"
│   │   ├── Column Header (with count badge)
│   │   └── TaskCard[] (filtered by status="not-started")
│   │       ├── Priority Badge
│   │       ├── Task Title
│   │       ├── Linked Case
│   │       └── Footer (Date + Assignee)
│   │
│   ├── Column: "In Progress"
│   │   ├── Column Header (with count badge)
│   │   └── TaskCard[] (filtered by status="in-progress")
│   │       ├── Priority Badge
│   │       ├── Task Title
│   │       ├── Linked Case
│   │       └── Footer (Date + Assignee)
│   │
│   └── Column: "Completed"
│       ├── Column Header (with count badge)
│       └── TaskCard[] (filtered by status="completed")
│           ├── Priority Badge
│           ├── Task Title
│           ├── Linked Case
│           └── Footer (Date + Assignee)
│
├── CreateTaskModal
│   ├── Header with close button
│   ├── Form Fields
│   │   ├── Task Title (input)
│   │   ├── Assign To (input)
│   │   ├── Due Date (date picker)
│   │   ├── Linked Case (input, optional)
│   │   ├── Description (textarea)
│   │   └── Priority (button group: Low/Med/High)
│   └── Footer
│       ├── Cancel Button
│       └── Create Task Button
│
└── TaskDetailModal
    ├── Header with priority badge
    ├── Task Title
    ├── Status Tabs (To Do / In Progress / Completed)
    ├── Details Section
    │   ├── Description
    │   ├── Priority Level
    │   ├── Due Date
    │   ├── Assignee
    │   ├── Linked Case
    │   └── Created On
    └── Footer
        ├── Close Button
        └── Edit Task Button
```

## State Flow

```
TasksPage (Component State)
│
├── tasks: TaskItem[]
│   └── Updated by:
│       ├── handleCreateTask()
│       └── handleUpdateTask()
│
├── selectedTask: TaskItem | null
│   └── Set by: handleTaskClick()
│
├── isDetailOpen: boolean
├── isCreateOpen: boolean
│
└── Passed to children:
    ├── TaskKanban (tasks, onTaskClick)
    ├── CreateTaskModal (isOpen, onClose, onCreateTask)
    └── TaskDetailModal (task, isOpen, onClose, onStatusChange)
```

## Data Flow

```
1. User clicks task card
   └── onTaskClick(task)
       └── setSelectedTask(task)
           └── setIsDetailOpen(true)
               └── TaskDetailModal opens

2. User changes task status in modal
   └── onStatusChange(taskId, newStatus)
       └── handleUpdateTask(taskId, status)
           └── setTasks(prev => update status)
               └── Kanban re-renders with new status

3. User clicks "Create Task"
   └── setIsCreateOpen(true)
       └── CreateTaskModal opens

4. User submits new task
   └── onCreateTask(task)
       └── handleCreateTask(task)
           └── setTasks(prev => [...prev, task])
               └── Kanban re-renders with new task
```

## File Dependencies

```
research/page.tsx (Main Page)
├── imports Bounded
├── imports TaskKanban
│   └── imports TaskCard
│       └── imports type { TaskItem } from calendar/CreateTaskModal
├── imports CreateTaskModal (from calendar/)
└── imports TaskDetailModal (from calendar/)

TaskKanban.tsx
├── imports TaskCard
└── imports type { TaskItem } from calendar/CreateTaskModal

TaskCard.tsx
└── imports type { TaskItem } from calendar/CreateTaskModal

Sidebar.tsx (Updated)
├── Modified navigation entry for Tasks
└── No new dependencies
```

## Type System

```typescript
// Primary Type (from calendar/CreateTaskModal.ts)
type TaskItem = {
  id: string;
  title: string;
  assignedTo: string;
  dueDate: string; // YYYY-MM-DD
  description: string;
  priority: "low" | "medium" | "high";
  status: "not-started" | "in-progress" | "completed";
  linkedCase?: string;
  createdOn: string; // YYYY-MM-DD
};

// Component Props

interface TaskKanbanProps {
  tasks: TaskItem[];
  onTaskClick: (task: TaskItem) => void;
}

interface TaskCardProps {
  task: TaskItem;
  onClick: () => void;
}

interface CreateTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateTask: (task: TaskItem) => void;
}

interface TaskDetailModalProps {
  task: TaskItem | null;
  isOpen: boolean;
  onClose: () => void;
  onStatusChange: (taskId: string, status: TaskItem["status"]) => void;
}
```

## Styling Architecture

```
All Tailwind CSS classes organized by concern:

Layout:
- grid-cols-1 md:grid-cols-2 lg:grid-cols-3 (responsive kanban)
- flex flex-col gap-3 (vertical stacking)
- min-h-[500px] (minimum column height)

Colors:
- bg-[#1A4331] (primary green)
- bg-slate-50/100 (neutral backgrounds)
- bg-red-50/100 (high priority)
- bg-amber-50/100 (medium priority)
- bg-blue-50/100 (low priority)
- bg-emerald-50/100 (completed status)

Typography:
- text-[13px] font-semibold (headers)
- text-[12px] font-bold (card titles)
- text-[10px] text-slate-400 (metadata)
- text-[9px] font-bold uppercase (badges)

Interactions:
- hover:shadow-md (cards)
- hover:bg-[#133224] (buttons)
- focus:ring-1 focus:ring-[#1A4331] (inputs)
- transition-all (smooth animations)
```

## Performance Considerations

✅ Components use `React.memo` implicitly (functional)
✅ State updates use immutable patterns (map/spread)
✅ Filtering happens in render (tasks.filter)
✅ No unnecessary re-renders (proper prop drilling)
✅ Modal state separate from task state

---

**This architecture follows React best practices and maintains consistency with the existing Firmly codebase.**
