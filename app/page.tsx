'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import FeatureForm from '@/components/FeatureForm';
import { FeatureFormData, Spec } from '@/types/spec';

export default function HomePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (data: FeatureFormData) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to generate specification');
      }

      const result = await response.json();
      router.push(`/spec/${result.spec._id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8 md:mb-12">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-100 mb-4 leading-tight">
          Tasks Generator
          <span className="block text-2xl sm:text-3xl md:text-4xl bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-500 bg-clip-text text-transparent mt-2">
            AI Product Planning Tool
          </span>
        </h1>
        <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto px-4">
          Generate comprehensive product specifications powered by AI
        </p>
      </div>

      <div className="bg-slate-800/60 backdrop-blur-xl rounded-2xl shadow-2xl p-6 md:p-8 lg:p-10 mb-6 md:mb-8 border border-slate-700/50 hover:border-cyan-500/30 transition-all">
        <h2 className="text-xl md:text-2xl font-bold text-slate-100 mb-6 md:mb-8">How It Works</h2>
        <div className="space-y-6 md:space-y-8">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-cyan-500 to-blue-600 text-white rounded-xl flex items-center justify-center font-bold text-lg md:text-xl shadow-lg shadow-cyan-500/30">
              1
            </div>
            <div className="flex-1 pt-1">
              <h3 className="font-bold text-slate-100 mb-2 text-lg">Fill in the Feature Details</h3>
              <p className="text-slate-400 leading-relaxed">
                Provide the feature title, goal, target users, constraints, and template type.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-cyan-500 to-blue-600 text-white rounded-xl flex items-center justify-center font-bold text-lg md:text-xl shadow-lg shadow-cyan-500/30">
              2
            </div>
            <div className="flex-1 pt-1">
              <h3 className="font-bold text-slate-100 mb-2 text-lg">Generate Specification</h3>
              <p className="text-slate-400 leading-relaxed">
                Our AI will generate a comprehensive specification including overview, user stories,
                engineering tasks, risks, and unknowns.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-cyan-500 to-blue-600 text-white rounded-xl flex items-center justify-center font-bold text-lg md:text-xl shadow-lg shadow-cyan-500/30">
              3
            </div>
            <div className="flex-1 pt-1">
              <h3 className="font-bold text-slate-100 mb-2 text-lg">Edit and Export</h3>
              <p className="text-slate-400 leading-relaxed">
                Review, edit, reorder tasks, and export your specification as Markdown or copy to
                clipboard.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-slate-800/60 backdrop-blur-xl rounded-2xl shadow-2xl p-6 md:p-8 lg:p-10 border border-slate-700/50 hover:border-cyan-500/30 transition-all">
        <h2 className="text-xl md:text-2xl font-bold text-slate-100 mb-6 md:mb-8">Create New Specification</h2>
        {error && (
          <div className="mb-6 p-4 bg-red-900/30 border-2 border-red-500/50 text-red-300 rounded-xl backdrop-blur-sm">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <span className="font-medium">{error}</span>
            </div>
          </div>
        )}
        <FeatureForm onSubmit={handleSubmit} isLoading={isLoading} />
      </div>
    </div>
  );
}
