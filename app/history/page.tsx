'use client';

import { useState, useEffect } from 'react';
import HistoryList from '@/components/HistoryList';
import { Spec } from '@/types/spec';

export default function HistoryPage() {
  const [specs, setSpecs] = useState<Spec[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSpecs = async () => {
      try {
        const response = await fetch('/api/specs');
        if (!response.ok) {
          throw new Error('Failed to fetch specifications');
        }
        const data = await response.json();
        setSpecs(data.specs);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unexpected error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchSpecs();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-cyan-500/20 border-t-cyan-500 mx-auto mb-4"></div>
          <p className="text-slate-300 text-lg font-medium">Loading history...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-red-900/30 border-2 border-red-500/50 text-red-300 px-6 py-4 rounded-xl backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <span className="font-semibold">{error}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <HistoryList specs={specs} />
    </div>
  );
}
