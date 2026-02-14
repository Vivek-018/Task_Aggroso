'use client';

import { Spec } from '@/types/spec';
import { formatSpecAsMarkdown } from '@/utils/formatMarkdown';

interface ExportButtonsProps {
  spec: Spec;
}

export default function ExportButtons({ spec }: ExportButtonsProps) {
  const handleCopyToClipboard = async () => {
    try {
      const markdown = formatSpecAsMarkdown(spec);
      await navigator.clipboard.writeText(markdown);
      alert('Specification copied to clipboard!');
    } catch (error) {
      console.error('Failed to copy:', error);
      alert('Failed to copy to clipboard');
    }
  };

  const handleDownload = () => {
    try {
      const markdown = formatSpecAsMarkdown(spec);
      const blob = new Blob([markdown], { type: 'text/markdown' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${spec.title.replace(/\s+/g, '-').toLowerCase()}-spec.md`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Failed to download:', error);
      alert('Failed to download file');
    }
  };

  return (
    <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
      <button
        onClick={handleCopyToClipboard}
        className="px-5 py-2.5 md:px-6 md:py-3 bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-600 text-white rounded-xl hover:from-cyan-400 hover:via-blue-400 hover:to-cyan-500 transition-all font-semibold shadow-lg shadow-cyan-500/30 hover:shadow-xl hover:shadow-cyan-500/40 transform hover:-translate-y-0.5 text-sm md:text-base"
      >
        Copy to Clipboard
      </button>
      <button
        onClick={handleDownload}
        className="px-5 py-2.5 md:px-6 md:py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl hover:from-emerald-400 hover:to-teal-500 transition-all font-semibold shadow-lg shadow-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/40 transform hover:-translate-y-0.5 text-sm md:text-base"
      >
        Download as Markdown
      </button>
    </div>
  );
}
