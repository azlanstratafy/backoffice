export type TaskPriority = 'low' | 'medium' | 'high';
export type TaskStatus = 'todo' | 'in_progress' | 'completed';

export interface Task {
  id: string;
  title: string;
  description?: string;
  dueDate: string;
  priority: TaskPriority;
  status: TaskStatus;
  assignedTo?: string;
  relatedTo?: {
    type: 'contact' | 'company' | 'deal';
    id: string;
    name: string;
  };
  createdAt: string;
  updatedAt: string;
}