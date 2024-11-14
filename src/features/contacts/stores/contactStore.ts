import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  position: string;
  createdAt: string;
}

interface ContactStore {
  contacts: Contact[];
  addContact: (contact: Contact) => void;
  updateContact: (id: string, updates: Partial<Contact>) => void;
  deleteContact: (id: string) => void;
}

export const useContactStore = create<ContactStore>()(
  persist(
    (set) => ({
      contacts: [],
      addContact: (contact) => set((state) => ({
        contacts: [...state.contacts, contact]
      })),
      updateContact: (id, updates) => set((state) => ({
        contacts: state.contacts.map((contact) =>
          contact.id === id ? { ...contact, ...updates } : contact
        )
      })),
      deleteContact: (id) => set((state) => ({
        contacts: state.contacts.filter((contact) => contact.id !== id)
      })),
    }),
    {
      name: 'contacts-storage'
    }
  )
);