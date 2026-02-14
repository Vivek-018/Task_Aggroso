'use client';

import { useState } from 'react';
import { EngineeringTask } from '@/types/spec';

interface TaskEditorProps {
  tasks: EngineeringTask[];
  onUpdate: (tasks: EngineeringTask[]) => void;
}

export default function TaskEditor({ tasks, onUpdate }: TaskEditorProps) {
  const [localTasks, setLocalTasks] = useState<EngineeringTask[]>(tasks);

  const updateTask = (index: number, field: keyof EngineeringTask, value: string) => {
    const updated = [...localTasks];
    updated[index] = { ...updated[index], [field]: value };
    setLocalTasks(updated);
    onUpdate(updated);
  };

  const deleteTask = (index: number) => {
    const updated = localTasks.filter((_, i) => i !== index);
    setLocalTasks(updated);
    onUpdate(updated);
  };

  const addTask = () => {
    const newTask: EngineeringTask = { group: 'Frontend', task: '' };
    const updated = [...localTasks, newTask];
    setLocalTasks(updated);
    onUpdate(updated);
  };

  const moveTask = (index: number, direction: 'up' | 'down') => {
    if (
      (direction === 'up' && index === 0) ||
      (direction === 'down' && index === localTasks.length - 1)
    ) {
      return;
    }

    const updated = [...localTasks];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    [updated[index], updated[targetIndex]] = [updated[targetIndex], updated[index]];
    setLocalTasks(updated);
    onUpdate(updated);
  };

  const groupOptions: EngineeringTask['group'][] = ['Frontend', 'Backend', 'DevOps', 'Testing'];

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h3 className="text-xl md:text-2xl font-bold text-slate-100">Engineering Tasks</h3>
        <button
          onClick={addTask}
          className="px-4 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl hover:from-emerald-400 hover:to-teal-500 transition-all text-sm font-semibold shadow-lg shadow-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/40 transform hover:-translate-y-0.5"
        >
          + Add Task
        </button>
      </div>

      {localTasks.map((task, index) => (
        <div key={index} className="border-2 border-slate-600/50 rounded-xl p-4 md:p-5 space-y-3 hover:border-cyan-500/50 transition-colors bg-slate-700/30 backdrop-blur-sm">
          <div className="flex flex-col sm:flex-row gap-3 items-start">
            <div className="flex-1 space-y-3 w-full">
              <select
                value={task.group}
                onChange={(e) => updateTask(index, 'group', e.target.value)}
                className="w-full px-4 py-2.5 text-slate-100 bg-slate-700/50 border-2 border-slate-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all cursor-pointer font-medium backdrop-blur-sm"
              >
                {groupOptions.map((group) => (
                  <option key={group} value={group}>
                    {group}
                  </option>
                ))}
              </select>
              <textarea
                value={task.task}
                onChange={(e) => updateTask(index, 'task', e.target.value)}
                rows={2}
                className="w-full px-4 py-2.5 text-slate-100 bg-slate-700/50 border-2 border-slate-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all resize-none placeholder:text-slate-500 backdrop-blur-sm"
                placeholder="Task description..."
              />
            </div>
            <div className="flex sm:flex-col gap-2 w-full sm:w-auto">
              <button
                onClick={() => moveTask(index, 'up')}
                disabled={index === 0}
                className="flex-1 sm:flex-none px-3 py-2 bg-slate-600 text-slate-200 rounded-lg hover:bg-slate-500 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium transition-colors"
                title="Move up"
              >
                ↑
              </button>
              <button
                onClick={() => moveTask(index, 'down')}
                disabled={index === localTasks.length - 1}
                className="flex-1 sm:flex-none px-3 py-2 bg-slate-600 text-slate-200 rounded-lg hover:bg-slate-500 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium transition-colors"
                title="Move down"
              >
                ↓
              </button>
              <button
                onClick={() => deleteTask(index)}
                className="flex-1 sm:flex-none px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500 text-sm font-medium transition-colors shadow-lg shadow-red-500/20"
                title="Delete"
              >
                ×
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
