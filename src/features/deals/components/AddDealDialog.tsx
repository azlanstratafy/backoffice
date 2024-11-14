import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useDealStore } from '../stores/dealStore';
import { ContactCompanySearch } from './ContactCompanySearch';
import { useContactStore } from '../../contacts/stores/contactStore';
import { useCompanyStore } from '../../companies/stores/companyStore';

const dealSchema = z.object({
  name: z.string().min(1, 'Deal name is required'),
  companyId: z.string().min(1, 'Company is required'),
  value: z.string().transform((val) => parseFloat(val)),
  stage: z.enum(['Lead', 'Meeting', 'Proposal', 'Negotiation', 'Closed']),
  owner: z.string().min(1, 'Owner is required'),
  contactId: z.string().min(1, 'Contact is required'),
  closeDate: z.string(),
  probability: z.string().transform((val) => parseInt(val)),
  description: z.string(),
  source: z.enum(['Website', 'Referral', 'Outbound', 'Event', 'Other']),
  priority: z.enum(['Low', 'Medium', 'High']),
});

type DealFormData = z.infer<typeof dealSchema>;

interface AddDealDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddDealDialog({ isOpen, onClose }: AddDealDialogProps) {
  const { addDeal } = useDealStore();
  const { addContact } = useContactStore();
  const { addCompany } = useCompanyStore();
  
  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors, isSubmitting }
  } = useForm<DealFormData>({
    resolver: zodResolver(dealSchema),
    defaultValues: {
      stage: 'Lead',
      probability: '50',
      priority: 'Medium',
      source: 'Website',
    }
  });

  const handleCreateNewContact = (name: string) => {
    const newContact = {
      id: `contact-${Date.now()}`,
      name,
      email: '',
      phone: '',
      company: '',
      position: '',
      createdAt: new Date().toISOString(),
    };
    addContact(newContact);
    setValue('contactId', newContact.id);
  };

  const handleCreateNewCompany = (name: string) => {
    const newCompany = {
      id: `company-${Date.now()}`,
      name,
      industry: '',
      size: '',
      website: '',
      createdAt: new Date().toISOString(),
    };
    addCompany(newCompany);
    setValue('companyId', newCompany.id);
  };

  const onSubmit = async (data: DealFormData) => {
    try {
      const newDeal = {
        id: `deal-${Date.now()}`,
        ...data,
        createdAt: new Date().toISOString(),
      };
      
      addDeal(newDeal);
      reset();
      onClose();
    } catch (error) {
      console.error('Failed to add deal:', error);
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 shadow-xl transition-all">
                <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900 mb-4">
                  Add New Deal
                </Dialog.Title>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Deal Name */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Deal Name</label>
                      <input
                        type="text"
                        {...register('name')}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      />
                      {errors.name && (
                        <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                      )}
                    </div>

                    {/* Company Search */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Company</label>
                      <Controller
                        name="companyId"
                        control={control}
                        render={({ field }) => (
                          <ContactCompanySearch
                            type="company"
                            onSelect={(company) => field.onChange(company.id)}
                            onCreateNew={handleCreateNewCompany}
                            placeholder="Search or create company..."
                          />
                        )}
                      />
                      {errors.companyId && (
                        <p className="mt-1 text-sm text-red-600">{errors.companyId.message}</p>
                      )}
                    </div>

                    {/* Contact Search */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Contact</label>
                      <Controller
                        name="contactId"
                        control={control}
                        render={({ field }) => (
                          <ContactCompanySearch
                            type="contact"
                            onSelect={(contact) => field.onChange(contact.id)}
                            onCreateNew={handleCreateNewContact}
                            placeholder="Search or create contact..."
                          />
                        )}
                      />
                      {errors.contactId && (
                        <p className="mt-1 text-sm text-red-600">{errors.contactId.message}</p>
                      )}
                    </div>

                    {/* Rest of the form fields remain the same */}
                    {/* ... */}
                  </div>

                  <div className="flex justify-end gap-4">
                    <button
                      type="button"
                      onClick={onClose}
                      className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
                    >
                      {isSubmitting ? 'Adding...' : 'Add Deal'}
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}