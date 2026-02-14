'use client';

import { useState } from 'react';
import { Spec, UserStory, EngineeringTask } from '@/types/spec';
import TaskEditor from './TaskEditor';

interface SpecViewerProps {
  spec: Spec;
  onUpdate: (spec: Spec) => void;
}

export default function SpecViewer({ spec, onUpdate }: SpecViewerProps) {
  const [userStories, setUserStories] = useState<UserStory[]>(spec.output.user_stories);
  const [engineeringTasks, setEngineeringTasks] = useState<EngineeringTask[]>(
    spec.output.engineering_tasks
  );
  const [risks, setRisks] = useState<string[]>(spec.output.risks || []);
  const [unknowns, setUnknowns] = useState<string[]>(spec.output.unknowns || []);

  const updateUserStory = (index: number, field: keyof UserStory, value: string) => {
    const updated = [...userStories];
    updated[index] = { ...updated[index], [field]: value };
    setUserStories(updated);
    saveChanges({ ...spec, output: { ...spec.output, user_stories: updated } });
  };

  const deleteUserStory = (index: number) => {
    const updated = userStories.filter((_, i) => i !== index);
    setUserStories(updated);
    saveChanges({ ...spec, output: { ...spec.output, user_stories: updated } });
  };

  const addUserStory = () => {
    const newStory: UserStory = { title: '', description: '' };
    const updated = [...userStories, newStory];
    setUserStories(updated);
    saveChanges({ ...spec, output: { ...spec.output, user_stories: updated } });
  };

  const updateRisk = (index: number, value: string) => {
    const updated = [...risks];
    updated[index] = value;
    setRisks(updated);
    saveChanges({ ...spec, output: { ...spec.output, risks: updated } });
  };

  const deleteRisk = (index: number) => {
    const updated = risks.filter((_, i) => i !== index);
    setRisks(updated);
    saveChanges({ ...spec, output: { ...spec.output, risks: updated } });
  };

  const addRisk = () => {
    const updated = [...risks, ''];
    setRisks(updated);
    saveChanges({ ...spec, output: { ...spec.output, risks: updated } });
  };

  const updateUnknown = (index: number, value: string) => {
    const updated = [...unknowns];
    updated[index] = value;
    setUnknowns(updated);
    saveChanges({ ...spec, output: { ...spec.output, unknowns: updated } });
  };

  const deleteUnknown = (index: number) => {
    const updated = unknowns.filter((_, i) => i !== index);
    setUnknowns(updated);
    saveChanges({ ...spec, output: { ...spec.output, unknowns: updated } });
  };

  const addUnknown = () => {
    const updated = [...unknowns, ''];
    setUnknowns(updated);
    saveChanges({ ...spec, output: { ...spec.output, unknowns: updated } });
  };

  const saveChanges = (updatedSpec: Spec) => {
    onUpdate(updatedSpec);
  };

  const handleTasksUpdate = (tasks: EngineeringTask[]) => {
    setEngineeringTasks(tasks);
    saveChanges({ ...spec, output: { ...spec.output, engineering_tasks: tasks } });
  };

  return (
    <div className="space-y-6 md:space-y-8">
      <div className="bg-slate-800/60 backdrop-blur-xl rounded-2xl shadow-2xl p-6 md:p-8 border border-slate-700/50 hover:border-cyan-500/30 transition-all">
        <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-slate-100">{spec.title}</h2>
        <div className="space-y-2 md:space-y-3 text-sm md:text-base text-slate-300">
          <p className="flex flex-wrap gap-2"><strong className="text-slate-100">Template Type:</strong> <span className="px-3 py-1 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 border border-cyan-500/30 rounded-lg text-xs font-semibold">{spec.templateType}</span></p>
          <p><strong className="text-slate-100">Goal:</strong> <span className="text-slate-300">{spec.goal}</span></p>
          <p><strong className="text-slate-100">Target Users:</strong> <span className="text-slate-300">{spec.users}</span></p>
          <p><strong className="text-slate-100">Constraints:</strong> <span className="text-slate-300">{spec.constraints}</span></p>
        </div>
      </div>

      <div className="bg-slate-800/60 backdrop-blur-xl rounded-2xl shadow-2xl p-6 md:p-8 border border-slate-700/50 hover:border-cyan-500/30 transition-all">
        <h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-slate-100">Overview</h3>
        <textarea
          value={spec.output.overview}
          onChange={(e) =>
            saveChanges({
              ...spec,
              output: { ...spec.output, overview: e.target.value },
            })
          }
          rows={6}
          className="w-full px-4 py-3 text-slate-100 bg-slate-700/50 border-2 border-slate-600 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all resize-none placeholder:text-slate-500 backdrop-blur-sm"
        />
      </div>

      <div className="bg-slate-800/60 backdrop-blur-xl rounded-2xl shadow-2xl p-6 md:p-8 border border-slate-700/50 hover:border-cyan-500/30 transition-all">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h3 className="text-xl md:text-2xl font-bold text-slate-100">User Stories</h3>
          <button
            onClick={addUserStory}
            className="px-4 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl hover:from-emerald-400 hover:to-teal-500 transition-all text-sm font-semibold shadow-lg shadow-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/40 transform hover:-translate-y-0.5"
          >
            + Add Story
          </button>
        </div>
        <div className="space-y-4">
          {userStories.map((story, index) => (
            <div key={index} className="border-2 border-slate-600/50 rounded-xl p-4 md:p-5 space-y-3 hover:border-cyan-500/50 transition-colors bg-slate-700/30 backdrop-blur-sm">
              <input
                type="text"
                value={story.title}
                onChange={(e) => updateUserStory(index, 'title', e.target.value)}
                placeholder="User story title"
                className="w-full px-4 py-2.5 text-slate-100 bg-slate-700/50 border-2 border-slate-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all font-semibold placeholder:text-slate-500 backdrop-blur-sm"
              />
              <textarea
                value={story.description}
                onChange={(e) => updateUserStory(index, 'description', e.target.value)}
                placeholder="User story description"
                rows={2}
                className="w-full px-4 py-2.5 text-slate-100 bg-slate-700/50 border-2 border-slate-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all resize-none placeholder:text-slate-500 backdrop-blur-sm"
              />
              <button
                onClick={() => deleteUserStory(index)}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500 transition-colors text-sm font-medium shadow-lg shadow-red-500/20"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-slate-800/60 backdrop-blur-xl rounded-2xl shadow-2xl p-6 md:p-8 border border-slate-700/50 hover:border-cyan-500/30 transition-all">
        <TaskEditor tasks={engineeringTasks} onUpdate={handleTasksUpdate} />
      </div>

      <div className="bg-slate-800/60 backdrop-blur-xl rounded-2xl shadow-2xl p-6 md:p-8 border border-slate-700/50 hover:border-cyan-500/30 transition-all">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h3 className="text-xl md:text-2xl font-bold text-slate-100">Risks</h3>
          <button
            onClick={addRisk}
            className="px-4 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl hover:from-emerald-400 hover:to-teal-500 transition-all text-sm font-semibold shadow-lg shadow-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/40 transform hover:-translate-y-0.5"
          >
            + Add Risk
          </button>
        </div>
        <div className="space-y-3">
          {risks.map((risk, index) => (
            <div key={index} className="flex gap-2 md:gap-3">
              <input
                type="text"
                value={risk}
                onChange={(e) => updateRisk(index, e.target.value)}
                placeholder="Risk description"
                className="flex-1 px-4 py-2.5 text-slate-100 bg-slate-700/50 border-2 border-slate-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all placeholder:text-slate-500 backdrop-blur-sm"
              />
              <button
                onClick={() => deleteRisk(index)}
                className="px-4 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-500 transition-colors font-medium min-w-[40px] shadow-lg shadow-red-500/20"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-slate-800/60 backdrop-blur-xl rounded-2xl shadow-2xl p-6 md:p-8 border border-slate-700/50 hover:border-cyan-500/30 transition-all">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h3 className="text-xl md:text-2xl font-bold text-slate-100">Unknowns</h3>
          <button
            onClick={addUnknown}
            className="px-4 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl hover:from-emerald-400 hover:to-teal-500 transition-all text-sm font-semibold shadow-lg shadow-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/40 transform hover:-translate-y-0.5"
          >
            + Add Unknown
          </button>
        </div>
        <div className="space-y-3">
          {unknowns.map((unknown, index) => (
            <div key={index} className="flex gap-2 md:gap-3">
              <input
                type="text"
                value={unknown}
                onChange={(e) => updateUnknown(index, e.target.value)}
                placeholder="Unknown item"
                className="flex-1 px-4 py-2.5 text-slate-100 bg-slate-700/50 border-2 border-slate-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all placeholder:text-slate-500 backdrop-blur-sm"
              />
              <button
                onClick={() => deleteUnknown(index)}
                className="px-4 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-500 transition-colors font-medium min-w-[40px] shadow-lg shadow-red-500/20"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
