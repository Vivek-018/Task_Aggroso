'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import SpecViewer from '@/components/SpecViewer';
import ExportButtons from '@/components/ExportButtons';
import { Spec } from '@/types/spec';

export default function SpecPage() {
  const params = useParams();
  const router = useRouter();
  const [spec, setSpec] = useState<Spec | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const fetchSpec = async () => {
      try {
        const response = await fetch(`/api/specs/${params.id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch specification');
        }
        const data = await response.json();
        setSpec(data.spec);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unexpected error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    if (params.id) {
      fetchSpec();
    }
  }, [params.id]);

  const handleUpdate = async (updatedSpec: Spec) => {
    setSpec(updatedSpec);
    setIsSaving(true);

    try {
      const response = await fetch(`/api/specs/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ output: updatedSpec.output }),
      });

      if (!response.ok) {
        throw new Error('Failed to save changes');
      }
    } catch (err) {
      console.error('Failed to save:', err);
      alert('Failed to save changes. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-cyan-500/20 border-t-cyan-500 mx-auto mb-4"></div>
          <p className="text-slate-300 text-lg font-medium">Loading specification...</p>
        </div>
      </div>
    );
  }

  if (error || !spec) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-red-900/30 border-2 border-red-500/50 text-red-300 px-6 py-4 rounded-xl mb-4 backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <span className="font-semibold">{error || 'Specification not found'}</span>
          </div>
        </div>
        <button
          onClick={() => router.push('/')}
          className="px-6 py-3 bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-600 text-white rounded-xl hover:from-cyan-400 hover:via-blue-400 hover:to-cyan-500 transition-all font-semibold shadow-lg shadow-cyan-500/30 hover:shadow-xl hover:shadow-cyan-500/40 transform hover:-translate-y-0.5"
        >
          Go Home
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-100">Specification Details</h1>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 md:gap-4 w-full md:w-auto">
          {isSaving && (
            <div className="flex items-center gap-2 text-sm text-cyan-300 bg-cyan-500/10 border border-cyan-500/30 px-4 py-2 rounded-lg backdrop-blur-sm">
              <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12c0-1.084.27-2.098.75-2.992L1.5 5.25v12.75h3.75A7.962 7.962 0 014 12z"></path>
              </svg>
              <span>Saving...</span>
            </div>
          )}
          <ExportButtons spec={spec} />
        </div>
      </div>
      <SpecViewer spec={spec} onUpdate={handleUpdate} />
    </div>
  );
}
