import { useState } from 'react';
import { useTaskStore } from '../stores/taskStore';
import { TaskItem } from './TaskItem';
import { TaskFilter } from './TaskFilter';
import { Task, TaskStatus, TaskPriority } from '../types';

export function TaskList() {
  const { tasks } = useTaskStore();
  const [statusFilter, setStatusFilter] = useState<TaskStatus | 'all'>('all');
  const [priorityFilter, setPriorityFilter] = useState<TaskPriority | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTasks = tasks.filter((task) => {
    const matchesStatus = statusFilter === 'all' || task.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || task.priority === priorityFilter;
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description?.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesStatus && matchesPriority && matchesSearch;
  });

  return (
    <div className="space-y-4">
      <TaskFilter
        statusFilter={statusFilter}
        priorityFilter={priorityFilter}
        searchQuery={searchQuery}
        onStatusChange={setStatusFilter}
        onPriorityChange={setPriorityFilter}
        onSearchChange={setSearchQuery}
      />

      <div className="bg-white rounded-lg shadow divide-y divide-gray-200">
        {filteredTasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
        {filteredTasks.length === 0 && (
          <div className="p-4 text-center text-gray-500">
            No tasks found matching your filters
          </div>
        )}
      </div>
    </div>
  );
}