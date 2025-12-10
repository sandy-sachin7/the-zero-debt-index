import React, { ReactNode } from 'react';
import Link from 'next/link';
import Head from 'next/head';

interface LayoutProps {
  children: ReactNode;
  title?: string;
}

const Layout = ({ children, title = 'The Zero-Debt Index' }: LayoutProps) => {
  return (
    <>
      <Head>
        <title>Gemini Vibe Station</title>
        <meta name="description" content="The ultimate collection of Vibe Coding templates." />
      </Head>

      <div className="min-h-screen flex flex-col bg-slate-950 text-slate-200 font-sans selection:bg-fuchsia-500/30">
        {/* Navbar */}
        <nav className="border-b border-white/10 bg-slate-900/50 backdrop-blur-md sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center gap-3">
                <Link href="/" className="flex items-center gap-2 group">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-fuchsia-500 to-purple-600 flex items-center justify-center shadow-lg shadow-purple-500/20 group-hover:shadow-purple-500/40 transition-all duration-300">
                    <span className="text-white font-bold text-lg">V</span>
                  </div>
                  <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                    Gemini Vibe Station
                  </span>
                </Link>
              </div>
              <div className="flex items-center gap-4">
                <a
                  href="https://github.com/sandy-sachin7/the-zero-debt-index"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  GitHub
                </a>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-grow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-white/10 bg-slate-900/50 backdrop-blur-sm mt-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-slate-500 text-sm">
                &copy; {new Date().getFullYear()} Gemini Vibe Station. Open Source.
              </p>
              <div className="flex items-center gap-6 text-sm font-medium text-slate-400">
                <span>Built in 2 hours using Google AI Studio. 100% Vibe Coded.</span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Layout;
