# Task Page - Visual Layout Reference

## Page Structure

```
┌─────────────────────────────────────────────────────────────────────┐
│                         HEADER SECTION                              │
├─────────────────────────────────────────────────────────────────────┤
│                                                                       │
│  Calendar & Tasks                                    [Filter] [+ Create Task]
│  Manage and organize all case-related tasks.                        │
│                                                                       │
├─────────────────────────────────────────────────────────────────────┤
│                      KANBAN BOARD SECTION                           │
│                                                                       │
│  ┌─────────────────────┐  ┌─────────────────────┐  ┌─────────────┐ │
│  │      TO DO (2)      │  │  IN PROGRESS (2) 🟠 │  │  COMPLETED  │ │
│  │   [Light Slate]     │  │   [Light Amber]     │  │   (2) 🟢    │ │
│  └─────────────────────┘  └─────────────────────┘  └─────────────┘ │
│                                                                       │
│  ┌────────────────────────────────────────────────────────────────┐ │
│  │ 🔴 HIGH PRIORITY    │ 🔴 HIGH PRIORITY    │ 🔴 HIGH PRIORITY│ │
│  │ Draft Legal Opinion │ Review Case Files   │ Prepare Court  │ │
│  │ Smith v. Department │ Okonkwo v. ABD      │ Adewale v.     │ │
│  │ May 25  Atty. B.    │ May 23  Atty. K.    │ May 21 Atty. M.│ │
│  └────────────────────────────────────────────────────────────────┘ │
│                                                                       │
│  ┌────────────────────────────────────────────────────────────────┐ │
│  │ 🟠 MEDIUM PRIORITY  │ 🟠 MEDIUM PRIORITY  │ 🔵 LOW PRIORITY│ │
│  │ Update Case Mgmt    │ Research Precedent  │ Prepare Client │ │
│  │ Ibrahim v. Fidelity │ Estate of Balogun   │ ARB Ltd. Matter│ │
│  │ May 27  Atty. R.    │ May 26  Atty. O.    │ May 22 Atty. B.│ │
│  └────────────────────────────────────────────────────────────────┘ │
│                                                                       │
└─────────────────────────────────────────────────────────────────────┘
```

## Responsive Layouts

### Mobile View (< 768px)
```
┌────────────────────┐
│   PAGE HEADER      │
├────────────────────┤
│   TO DO (2)        │
│  ┌──────────────┐  │
│  │  Task Card   │  │
│  └──────────────┘  │
│  ┌──────────────┐  │
│  │  Task Card   │  │
│  └──────────────┘  │
├────────────────────┤
│  IN PROGRESS (2)   │
│  ┌──────────────┐  │
│  │  Task Card   │  │
│  └──────────────┘  │
│  ┌──────────────┐  │
│  │  Task Card   │  │
│  └──────────────┘  │
├────────────────────┤
│  COMPLETED (2)     │
│  ┌──────────────┐  │
│  │  Task Card   │  │
│  └──────────────┘  │
│  ┌──────────────┐  │
│  │  Task Card   │  │
│  └──────────────┘  │
└────────────────────┘
```

### Tablet View (768px - 1024px)
```
┌──────────────────────────────────────┐
│      PAGE HEADER                     │
├──────────────────────────────────────┤
│ ┌─────────────┐  ┌─────────────────┐ │
│ │  TO DO (2)  │  │IN PROGRESS (2)  │ │
│ │ ┌─────────┐ │  │ ┌─────────────┐ │ │
│ │ │ Task 1  │ │  │ │ Task 2      │ │ │
│ │ └─────────┘ │  │ └─────────────┘ │ │
│ │ ┌─────────┐ │  │ ┌─────────────┐ │ │
│ │ │ Task 3  │ │  │ │ Task 4      │ │ │
│ │ └─────────┘ │  │ └─────────────┘ │ │
│ └─────────────┘  └─────────────────┘ │
│ ┌──────────────────────────────────┐ │
│ │      COMPLETED (2)               │ │
│ │ ┌──────────────┐ ┌────────────┐ │ │
│ │ │ Task 5       │ │ Task 6     │ │ │
│ │ └──────────────┘ └────────────┘ │ │
│ └──────────────────────────────────┘ │
└──────────────────────────────────────┘
```

### Desktop View (> 1024px)
```
┌─────────────────────────────────────────────────────────────────┐
│                      PAGE HEADER                                │
├─────────────────────────────────────────────────────────────────┤
│ ┌────────────────┐ ┌────────────────┐ ┌────────────────┐      │
│ │   TO DO (2)    │ │IN PROGRESS (2) │ │ COMPLETED (2)  │      │
│ │ ┌──────────┐   │ │ ┌──────────┐   │ │ ┌──────────┐   │      │
│ │ │ Task 1   │   │ │ │ Task 3   │   │ │ │ Task 5   │   │      │
│ │ └──────────┘   │ │ └──────────┘   │ │ └──────────┘   │      │
│ │ ┌──────────┐   │ │ ┌──────────┐   │ │ ┌──────────┐   │      │
│ │ │ Task 2   │   │ │ │ Task 4   │   │ │ │ Task 6   │   │      │
│ │ └──────────┘   │ │ └──────────┘   │ │ └──────────┘   │      │
│ └────────────────┘ └────────────────┘ └────────────────┘      │
└─────────────────────────────────────────────────────────────────┘
```

## Task Card Anatomy

```
┌──────────────────────────┐
│ 🔴 HIGH PRIORITY   ►     │  ← Priority badge (color-coded)
├──────────────────────────┤
│ Draft Legal Opinion -    │  ← Task title (max 2 lines)
│ Immigration Matter       │
├──────────────────────────┤
│ Smith v. Department      │  ← Linked case
├──────────────────────────┤
│ May 25    Atty. B.       │  ← Due date | Assignee
└──────────────────────────┘
```

## Color Scheme

### Priority Badges
```
🔴 HIGH     → bg-red-100      text-red-700       border-red-200
🟠 MEDIUM   → bg-amber-100    text-amber-700     border-amber-200
🔵 LOW      → bg-blue-100     text-blue-700      border-blue-200
```

### Column Backgrounds
```
TO DO           → bg-slate-50    text-slate-700
IN PROGRESS     → bg-amber-50    text-amber-700 (badge)
COMPLETED       → bg-emerald-50  text-emerald-700 (badge)
```

### Interactive Elements
```
Buttons     → bg-[#1A4331] (firm green)
            → hover: bg-[#133224]
            → text: white
Hover Cards → shadow-md, border-slate-300
```

## Modal Overlays

### Create Task Modal
```
┌─────────────────────────────────────┐
│  ✓ Create New Task          [X]     │
├─────────────────────────────────────┤
│                                     │
│ TASK TITLE                          │
│ [________________ e.g. Draft ...  ] │
│                                     │
│ ASSIGN TO        │ DUE DATE         │
│ [___________]    │ [_____________]  │
│                                     │
│ LINKED CASE (optional)              │
│ [________________ e.g. Case Name  ] │
│                                     │
│ DESCRIPTION                         │
│ [_________________________________  │
│  _________________________________  │
│  _________________________________]  │
│                                     │
│ PRIORITY                            │
│ [ Low ] [ Medium ] [ High ]         │
│                                     │
├─────────────────────────────────────┤
│         [Cancel]  [✓ Create Task]   │
└─────────────────────────────────────┘
```

### Task Detail Modal
```
┌─────────────────────────────────────────┐
│  🔴 High Priority                 [X]   │
├─────────────────────────────────────────┤
│                                         │
│ Draft Legal Opinion - Immigration...   │
│ Smith v. Department                     │
│                                         │
│ [ To Do ] [ In Progress ] [ Completed ]│
│                                         │
│ DESCRIPTION                             │
│ Prepare comprehensive legal opinion...  │
│                                         │
│ ┌─────────────┬──────────────┐          │
│ │ Priority    │ Due Date     │          │
│ │ High        │ May 25, 2026 │          │
│ └─────────────┴──────────────┘          │
│ ┌─────────────┬──────────────┐          │
│ │ Assignee    │ Linked Case  │          │
│ │ Atty. B.J.  │ Smith v. Dept│          │
│ └─────────────┴──────────────┘          │
│ ┌──────────────────────────────┐        │
│ │ Created On: May 20, 2026     │        │
│ └──────────────────────────────┘        │
│                                         │
├─────────────────────────────────────────┤
│         [Close]  [✓ Edit Task]          │
└─────────────────────────────────────────┘
```

## Spacing & Gaps

```
Page padding:       p-6
Column gap:         gap-4
Card padding:       p-3.5
Card gap:           gap-3
Section margin:     mb-4
Column min-height:  min-h-[500px]
```

## Responsive Breakpoints

```
Mobile       < 768px    →  1 column
Tablet      768-1024px  →  2 columns (md:)
Desktop     > 1024px    →  3 columns (lg:)
```

---

**All layouts are responsive and automatically adjust based on screen size.**
