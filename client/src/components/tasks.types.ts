export type Task = {
  id: string;
  title: string;
  description: string;
  status: "not-started" | "in-progress" | "completed";
  priority: "low" | "medium" | "high";
  dueDate: string;
  linkedCase?: string;
  assignedTo: string;
  createdOn: string;
};
