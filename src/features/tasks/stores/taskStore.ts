import { create } from 'zustand';
import { Task, TaskStatus, TaskPriority } from '../types';

interface TaskStore {
  tasks: Task[];
  addTask: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  updateTaskStatus: (id: string, status: TaskStatus) => void;
}

const initialTasks: Task[] = [
  {
    id: '1',
    title: 'Follow up with potential clients',
    description: 'Send follow-up emails to leads from the tech conference',
    dueDate: '2024-03-20',
    priority: 'high',
    status: 'todo',
    assignedTo: 'John Doe',
    relatedTo: {
      type: 'deal',
      id: '1',
      name: 'Enterprise Deal'
    },
    createdAt: '2024-03-15',
    updatedAt: '2024-03-15'
  },
  {
    id: '2',
    title: 'Prepare presentation for meeting',
    description: 'Create slides for the quarterly review',
    dueDate: '2024-03-21',
    priority: 'medium',
    status: 'in_progress',
    assignedTo: 'Jane Smith',
    createdAt: '2024-03-16',
    updatedAt: '2024-03-16'
  },
  {
    id: '3',
    title: 'Update client documentation',
    description: 'Review and update implementation guides',
    dueDate: '2024-03-22',
    priority: 'low',
    status: 'completed',
    assignedTo: 'Mike Johnson',
    createdAt: '2024-03-14',
    updatedAt: '2024-03-17'
  }
];

export const useTaskStore = create<TaskStore>((set) => ({
  tasks: initialTasks,
  addTask: (task) => set((state) => ({
    tasks: [
      ...state.tasks,
      {
        ...task,
        id: Math.random().toString(36).substr(2, 9),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ]
  })),
  updateTask: (id, updates) => set((state) => ({
    tasks: state.tasks.map((task) =>
      task.id === id
        ? { ...task, ...updates, updatedAt: new Date().toISOString() }
        : task
    )
  })),
  deleteTask: (id) => set((state) => ({
    tasks: state.tasks.filter((task) => task.id !== id)
  })),
  updateTaskStatus: (id, status) => set((state) => ({
    tasks: state.tasks.map((task) =>
      task.id === id
        ? { ...task, status, updatedAt: new Date().toISOString() }
        : task
    )
  }))
}));