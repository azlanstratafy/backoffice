import api from './config';
import { Contact } from '../../features/contacts/types';

export const contactsApi = {
  getAll: () => api.get<Contact[]>('/contacts'),
  getById: (id: string) => api.get<Contact>(`/contacts/${id}`),
  create: (data: Omit<Contact, 'id'>) => api.post<Contact>('/contacts', data),
  update: (id: string, data: Partial<Contact>) => api.put<Contact>(`/contacts/${id}`, data),
  delete: (id: string) => api.delete(`/contacts/${id}`),
};