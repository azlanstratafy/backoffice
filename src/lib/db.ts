import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface DB {
  contacts: Contact[];
  companies: Company[];
  deals: Deal[];
  tasks: Task[];
}

interface Contact {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  position?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

interface Company {
  id: string;
  name: string;
  industry?: string;
  website?: string;
  size?: string;
  createdAt: string;
  updatedAt: string;
}

interface Deal {
  id: string;
  title: string;
  value: number;
  stage: string;
  probability: number;
  closeDate?: string;
  companyId?: string;
  contactId?: string;
  ownerId: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

interface Task {
  id: string;
  title: string;
  description?: string;
  status: 'todo' | 'in_progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  dueDate?: string;
  assignedTo?: string;
  createdAt: string;
  updatedAt: string;
}

interface DBStore {
  db: DB;
  addContact: (contact: Omit<Contact, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateContact: (id: string, contact: Partial<Contact>) => void;
  deleteContact: (id: string) => void;
  addCompany: (company: Omit<Company, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateCompany: (id: string, company: Partial<Company>) => void;
  deleteCompany: (id: string) => void;
  addDeal: (deal: Omit<Deal, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateDeal: (id: string, deal: Partial<Deal>) => void;
  deleteDeal: (id: string) => void;
  addTask: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateTask: (id: string, task: Partial<Task>) => void;
  deleteTask: (id: string) => void;
}

export const useDB = create<DBStore>()(
  persist(
    (set) => ({
      db: {
        contacts: [],
        companies: [],
        deals: [],
        tasks: [],
      },

      // Contacts
      addContact: (contact) =>
        set((state) => ({
          db: {
            ...state.db,
            contacts: [
              ...state.db.contacts,
              {
                ...contact,
                id: crypto.randomUUID(),
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
              },
            ],
          },
        })),

      updateContact: (id, contact) =>
        set((state) => ({
          db: {
            ...state.db,
            contacts: state.db.contacts.map((c) =>
              c.id === id
                ? { ...c, ...contact, updatedAt: new Date().toISOString() }
                : c
            ),
          },
        })),

      deleteContact: (id) =>
        set((state) => ({
          db: {
            ...state.db,
            contacts: state.db.contacts.filter((c) => c.id !== id),
          },
        })),

      // Companies
      addCompany: (company) =>
        set((state) => ({
          db: {
            ...state.db,
            companies: [
              ...state.db.companies,
              {
                ...company,
                id: crypto.randomUUID(),
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
              },
            ],
          },
        })),

      updateCompany: (id, company) =>
        set((state) => ({
          db: {
            ...state.db,
            companies: state.db.companies.map((c) =>
              c.id === id
                ? { ...c, ...company, updatedAt: new Date().toISOString() }
                : c
            ),
          },
        })),

      deleteCompany: (id) =>
        set((state) => ({
          db: {
            ...state.db,
            companies: state.db.companies.filter((c) => c.id !== id),
          },
        })),

      // Deals
      addDeal: (deal) =>
        set((state) => ({
          db: {
            ...state.db,
            deals: [
              ...state.db.deals,
              {
                ...deal,
                id: crypto.randomUUID(),
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
              },
            ],
          },
        })),

      updateDeal: (id, deal) =>
        set((state) => ({
          db: {
            ...state.db,
            deals: state.db.deals.map((d) =>
              d.id === id
                ? { ...d, ...deal, updatedAt: new Date().toISOString() }
                : d
            ),
          },
        })),

      deleteDeal: (id) =>
        set((state) => ({
          db: {
            ...state.db,
            deals: state.db.deals.filter((d) => d.id !== id),
          },
        })),

      // Tasks
      addTask: (task) =>
        set((state) => ({
          db: {
            ...state.db,
            tasks: [
              ...state.db.tasks,
              {
                ...task,
                id: crypto.randomUUID(),
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
              },
            ],
          },
        })),

      updateTask: (id, task) =>
        set((state) => ({
          db: {
            ...state.db,
            tasks: state.db.tasks.map((t) =>
              t.id === id
                ? { ...t, ...task, updatedAt: new Date().toISOString() }
                : t
            ),
          },
        })),

      deleteTask: (id) =>
        set((state) => ({
          db: {
            ...state.db,
            tasks: state.db.tasks.filter((t) => t.id !== id),
          },
        })),
    }),
    {
      name: 'crm-db',
    }
  )
);