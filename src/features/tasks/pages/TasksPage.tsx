import { DashboardLayout } from '../../dashboard/layouts/DashboardLayout';
import { TaskList } from '../components/TaskList';
import { Plus } from 'lucide-react';
import { BackButton } from '../../../components/ui/BackButton';

export function TasksPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <BackButton className="mb-2" />
            <h1 className="text-2xl font-semibold text-gray-900">Tasks</h1>
            <p className="mt-1 text-sm text-gray-500">
              Manage and track your team's tasks
            </p>
          </div>
          <button
            onClick={() => {/* Implement add task */}}
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add Task
          </button>
        </div>

        <TaskList />
      </div>
    </DashboardLayout>
  );
}