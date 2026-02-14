'use client';

import Link from 'next/link';
import { Spec } from '@/types/spec';

interface HistoryListProps {
  specs: Spec[];
}

export default function HistoryList({ specs }: HistoryListProps) {
  if (specs.length === 0) {
    return (
      <div className="bg-slate-800/60 backdrop-blur-xl rounded-2xl shadow-2xl p-8 md:p-12 text-center border border-slate-700/50">
        <div className="max-w-md mx-auto">
          <svg className="mx-auto h-16 w-16 text-slate-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <p className="text-lg font-medium text-slate-300 mb-2">No specifications generated yet</p>
          <p className="text-slate-400">Create your first one to get started!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 md:space-y-6">
      <h2 className="text-2xl md:text-3xl font-bold text-slate-100 mb-6">Recent Specifications</h2>
      {specs.map((spec) => (
        <Link
          key={spec._id}
          href={`/spec/${spec._id}`}
          className="block bg-slate-800/60 backdrop-blur-xl rounded-2xl shadow-2xl p-6 md:p-8 hover:shadow-cyan-500/20 transition-all duration-200 border border-slate-700/50 hover:border-cyan-500/50 transform hover:-translate-y-1"
        >
          <h3 className="text-xl md:text-2xl font-bold text-slate-100 mb-3">{spec.title}</h3>
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <span className="px-3 py-1 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 border border-cyan-500/30 rounded-lg text-xs font-semibold">
              {spec.templateType}
            </span>
            <span className="text-sm text-slate-400">
              {new Date(spec.createdAt).toLocaleString()}
            </span>
          </div>
          <p className="text-slate-300 line-clamp-2 leading-relaxed">{spec.output.overview.substring(0, 150)}...</p>
        </Link>
      ))}
    </div>
  );
}
