'use client';

import { StatusResponse } from '@/types/spec';

interface StatusCardProps {
  status: StatusResponse;
}

export default function StatusCard({ status }: StatusCardProps) {
  const getStatusColor = (statusValue: string) => {
    if (statusValue === 'ok' || statusValue === 'connected') {
      return 'bg-green-500';
    }
    return 'bg-red-500';
  };

  const getStatusText = (statusValue: string) => {
    if (statusValue === 'ok' || statusValue === 'connected') {
      return statusValue === 'ok' ? 'OK' : 'Connected';
    }
    return 'Error';
  };

  return (
    <div className="bg-slate-800/60 backdrop-blur-xl rounded-2xl shadow-2xl p-6 md:p-8 border border-slate-700/50 hover:border-cyan-500/30 transition-all">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-slate-100">System Status</h2>
      <div className="space-y-4 md:space-y-5">
        <div className="flex items-center justify-between p-4 bg-slate-700/30 rounded-xl border-2 border-slate-600/50 backdrop-blur-sm">
          <span className="font-semibold text-slate-100 text-base md:text-lg">Backend</span>
          <div className="flex items-center gap-3">
            <div className={`w-4 h-4 rounded-full ${getStatusColor(status.backend)} shadow-lg ${status.backend === 'ok' ? 'shadow-green-500/50' : 'shadow-red-500/50'}`}></div>
            <span className="font-medium text-slate-300">{getStatusText(status.backend)}</span>
          </div>
        </div>
        <div className="flex items-center justify-between p-4 bg-slate-700/30 rounded-xl border-2 border-slate-600/50 backdrop-blur-sm">
          <span className="font-semibold text-slate-100 text-base md:text-lg">Database</span>
          <div className="flex items-center gap-3">
            <div className={`w-4 h-4 rounded-full ${getStatusColor(status.database)} shadow-lg ${status.database === 'connected' ? 'shadow-green-500/50' : 'shadow-red-500/50'}`}></div>
            <span className="font-medium text-slate-300">{getStatusText(status.database)}</span>
          </div>
        </div>
        <div className="flex items-center justify-between p-4 bg-slate-700/30 rounded-xl border-2 border-slate-600/50 backdrop-blur-sm">
          <span className="font-semibold text-slate-100 text-base md:text-lg">Gemini API</span>
          <div className="flex items-center gap-3">
            <div className={`w-4 h-4 rounded-full ${getStatusColor(status.gemini)} shadow-lg ${status.gemini === 'connected' ? 'shadow-green-500/50' : 'shadow-red-500/50'}`}></div>
            <span className="font-medium text-slate-300">{getStatusText(status.gemini)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
