'use client';

import { useState } from 'react';
import { FeatureFormData } from '@/types/spec';

interface FeatureFormProps {
  onSubmit: (data: FeatureFormData) => void;
  isLoading: boolean;
}

export default function FeatureForm({ onSubmit, isLoading }: FeatureFormProps) {
  const [formData, setFormData] = useState<FeatureFormData>({
    title: '',
    goal: '',
    users: '',
    constraints: '',
    templateType: 'Web App',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="title" className="block text-sm font-semibold text-slate-200 mb-2">
          Feature Title *
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 text-slate-100 bg-slate-700/50 border-2 border-slate-600 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all placeholder:text-slate-500 backdrop-blur-sm"
          placeholder="e.g., User Authentication System"
        />
      </div>

      <div>
        <label htmlFor="goal" className="block text-sm font-semibold text-slate-200 mb-2">
          Goal *
        </label>
        <textarea
          id="goal"
          name="goal"
          value={formData.goal}
          onChange={handleChange}
          required
          rows={3}
          className="w-full px-4 py-3 text-slate-100 bg-slate-700/50 border-2 border-slate-600 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all resize-none placeholder:text-slate-500 backdrop-blur-sm"
          placeholder="Describe the main goal of this feature..."
        />
      </div>

      <div>
        <label htmlFor="users" className="block text-sm font-semibold text-slate-200 mb-2">
          Target Users *
        </label>
        <textarea
          id="users"
          name="users"
          value={formData.users}
          onChange={handleChange}
          required
          rows={2}
          className="w-full px-4 py-3 text-slate-100 bg-slate-700/50 border-2 border-slate-600 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all resize-none placeholder:text-slate-500 backdrop-blur-sm"
          placeholder="Who will use this feature?"
        />
      </div>

      <div>
        <label htmlFor="constraints" className="block text-sm font-semibold text-slate-200 mb-2">
          Constraints *
        </label>
        <textarea
          id="constraints"
          name="constraints"
          value={formData.constraints}
          onChange={handleChange}
          required
          rows={2}
          className="w-full px-4 py-3 text-slate-100 bg-slate-700/50 border-2 border-slate-600 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all resize-none placeholder:text-slate-500 backdrop-blur-sm"
          placeholder="Technical, time, or resource constraints..."
        />
      </div>

      <div>
        <label htmlFor="templateType" className="block text-sm font-semibold text-slate-200 mb-2">
          Template Type *
        </label>
        <select
          id="templateType"
          name="templateType"
          value={formData.templateType}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 text-slate-100 bg-slate-700/50 border-2 border-slate-600 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all cursor-pointer backdrop-blur-sm"
        >
          <option value="Web App">Web App</option>
          <option value="Mobile App">Mobile App</option>
          <option value="Internal Tool">Internal Tool</option>
        </select>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-600 text-white py-3.5 px-6 rounded-xl font-semibold hover:from-cyan-400 hover:via-blue-400 hover:to-cyan-500 disabled:from-slate-600 disabled:via-slate-600 disabled:to-slate-600 disabled:cursor-not-allowed transition-all duration-200 shadow-lg shadow-cyan-500/30 hover:shadow-xl hover:shadow-cyan-500/40 transform hover:-translate-y-0.5 disabled:transform-none"
      >
        {isLoading ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12c0-1.084.27-2.098.75-2.992L1.5 5.25v12.75h3.75A7.962 7.962 0 014 12z"></path>
            </svg>
            Generating...
          </span>
        ) : (
          'Generate Specification'
        )}
      </button>
    </form>
  );
}
