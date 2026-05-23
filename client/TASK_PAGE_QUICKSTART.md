# Task Page - Quick Start Guide

## 📍 Access the Page
- **Route**: `/dashboard/research` or just `/research`
- **Sidebar Link**: Click "Tasks" in the main navigation

## 🎯 What You See

### Header
```
Calendar & Tasks
Manage and organize all case-related tasks and workflows.
```

With buttons:
- **Filter** - Placeholder for filtering (ready to implement)
- **Create Task** - Opens modal to add new task

### Kanban Board
Three columns displayed:
1. **To Do** - Light slate background
2. **In Progress** - Light amber background (yellow-ish)
3. **Completed** - Light emerald background (green-ish)

Each column shows task count and contains task cards.

## 🎫 Task Cards

Each task shows:
- **Priority Badge** (top-left) - Color-coded:
  - 🔴 Red = High Priority
  - 🟠 Amber = Medium Priority
  - 🔵 Blue = Low Priority
- **Task Title** - Truncated to 2 lines
- **Linked Case** - Name of related case
- **Due Date** - Short format (e.g., "May 25")
- **Assignee** - Attorney name

## 🖱️ Interactions

### Click Task Card
Opens a modal showing:
- Full task details
- Status buttons to change status
- Description
- Priority, due date, case, assignee info
- Edit/close options

### Click "Create Task"
Opens modal with form fields:
- Task Title (required)
- Assign To (required)
- Due Date (required)
- Linked Case (optional)
- Description
- Priority (Low/Medium/High buttons)

## 📊 Sample Data

Page comes pre-loaded with 6 tasks:

| To Do | In Progress | Completed |
|-------|-------------|-----------|
| Draft Legal Opinion | Review Case Files | Prepare Court Bundle |
| Update Case Mgmt | Research Precedent | Prepare Presentation |

## 🔄 Features

✅ Add tasks via modal
✅ Change task status
✅ View task details
✅ See task count per column
✅ Filter button (placeholder)
✅ Responsive design (mobile/tablet/desktop)
✅ Smooth hover effects
✅ Color-coded priorities

## 💾 Current State

All tasks are stored in React state at the page level. When you:
- Create a task → It appears in the "To Do" column
- Change status → It moves to appropriate column
- Changes are in-memory (will reset on page reload)

## 🚀 Future Enhancements Ready For

- Backend integration to persist data
- Filter implementation
- Drag-and-drop between columns
- Search/sort functionality
- Team member avatars
- Task attachment support

---

**Everything is ready to use! Start by clicking "Create Task" to add new items.**
