export interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  company?: string;
  position?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}