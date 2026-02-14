import type { Metadata } from 'next';
import './globals.css';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Tasks Generator – AI Product Planning Tool',
  description: 'Generate comprehensive product specifications using AI',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <nav className="bg-slate-900/95 backdrop-blur-xl shadow-2xl border-b border-slate-700/50 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16 md:h-20">
              <div className="flex items-center">
                <Link href="/" className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent hover:from-blue-300 hover:via-cyan-300 hover:to-blue-400 transition-all">
                  Tasks Generator
                </Link>
              </div>
              <div className="flex items-center space-x-2 sm:space-x-4">
                <Link
                  href="/"
                  className="text-slate-300 hover:text-cyan-400 px-3 py-2 rounded-lg text-sm font-medium transition-all hover:bg-slate-800/50 hover:scale-105"
                >
                  Home
                </Link>
                <Link
                  href="/history"
                  className="text-slate-300 hover:text-cyan-400 px-3 py-2 rounded-lg text-sm font-medium transition-all hover:bg-slate-800/50 hover:scale-105"
                >
                  History
                </Link>
                <Link
                  href="/status"
                  className="text-slate-300 hover:text-cyan-400 px-3 py-2 rounded-lg text-sm font-medium transition-all hover:bg-slate-800/50 hover:scale-105"
                >
                  Status
                </Link>
              </div>
            </div>
          </div>
        </nav>
        <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-6 md:py-8 lg:py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
