import axios from 'axios';
import { useDB } from './db';

const api = {
  contacts: {
    getAll: async () => {
      const { db } = useDB.getState();
      return db.contacts;
    },
    getById: async (id: string) => {
      const { db } = useDB.getState();
      return db.contacts.find(contact => contact.id === id);
    },
    create: async (data: any) => {
      const { addContact } = useDB.getState();
      addContact(data);
      return data;
    },
    update: async (id: string, data: any) => {
      const { updateContact } = useDB.getState();
      updateContact(id, data);
      return data;
    },
    delete: async (id: string) => {
      const { deleteContact } = useDB.getState();
      deleteContact(id);
    }
  },

  companies: {
    getAll: async () => {
      const { db } = useDB.getState();
      return db.companies;
    },
    getById: async (id: string) => {
      const { db } = useDB.getState();
      return db.companies.find(company => company.id === id);
    },
    create: async (data: any) => {
      const { addCompany } = useDB.getState();
      addCompany(data);
      return data;
    },
    update: async (id: string, data: any) => {
      const { updateCompany } = useDB.getState();
      updateCompany(id, data);
      return data;
    },
    delete: async (id: string) => {
      const { deleteCompany } = useDB.getState();
      deleteCompany(id);
    }
  },

  deals: {
    getAll: async () => {
      const { db } = useDB.getState();
      return db.deals;
    },
    getById: async (id: string) => {
      const { db } = useDB.getState();
      return db.deals.find(deal => deal.id === id);
    },
    create: async (data: any) => {
      const { addDeal } = useDB.getState();
      addDeal(data);
      return data;
    },
    update: async (id: string, data: any) => {
      const { updateDeal } = useDB.getState();
      updateDeal(id, data);
      return data;
    },
    delete: async (id: string) => {
      const { deleteDeal } = useDB.getState();
      deleteDeal(id);
    }
  },

  tasks: {
    getAll: async () => {
      const { db } = useDB.getState();
      return db.tasks;
    },
    getById: async (id: string) => {
      const { db } = useDB.getState();
      return db.tasks.find(task => task.id === id);
    },
    create: async (data: any) => {
      const { addTask } = useDB.getState();
      addTask(data);
      return data;
    },
    update: async (id: string, data: any) => {
      const { updateTask } = useDB.getState();
      updateTask(id, data);
      return data;
    },
    delete: async (id: string) => {
      const { deleteTask } = useDB.getState();
      deleteTask(id);
    }
  }
};

export default api;