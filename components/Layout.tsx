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

      <div className="min-h-screen flex flex-col bg-[#f8f9fa] text-[#202124] font-sans">
        {/* Navbar */}
        <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center gap-3">
                <Link href="/" className="flex items-center gap-2 group">
                  <div className="flex items-center justify-center">
                    <span className="material-icons-round text-3xl text-[#1a73e8]">auto_awesome</span>
                  </div>
                  <span className="text-xl font-medium text-[#5f6368] tracking-tight group-hover:text-[#1a73e8] transition-colors">
                    Gemini Vibe Station
                  </span>
                </Link>
              </div>
              <div className="flex items-center gap-4">
                <a
                  href="https://github.com/sandy-sachin7/the-zero-debt-index"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#5f6368] hover:text-[#202124] font-medium text-sm transition-colors"
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
        <footer className="bg-[#f1f3f4] border-t border-gray-200 mt-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-[#5f6368] text-sm">
                &copy; {new Date().getFullYear()} Gemini Vibe Station. Open Source.
              </p>
              <div className="flex items-center gap-6 text-sm font-medium text-[#5f6368]">
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
