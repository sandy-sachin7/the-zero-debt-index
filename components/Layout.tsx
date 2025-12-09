import React, { ReactNode } from 'react';
import Link from 'next/link';
import Head from 'next/head';

interface LayoutProps {
  children: ReactNode;
  title?: string;
}

const Layout = ({ children, title = 'Vibe Coding' }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col font-roboto">
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      {/* Google App Bar Style Header */}
      <header className="bg-white sticky top-0 z-50 px-4 sm:px-6 py-3 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2 group">
             {/* Simple Logo Icon */}
             <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-md group-hover:shadow-lg transition-all">
                <span className="material-icons-round text-2xl">auto_awesome</span>
             </div>
             <span className="text-xl font-medium text-gray-700 tracking-tight group-hover:text-blue-600 transition-colors">
               Vibe Coding
             </span>
          </Link>
        </div>

        <nav className="flex items-center gap-2 sm:gap-4">
          <Link href="/" className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-full transition-colors flex items-center gap-2">
            <span className="material-icons-round text-lg">dashboard</span>
            <span className="hidden sm:inline">Library</span>
          </Link>
        </nav>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow max-w-6xl mx-auto w-full px-4 sm:px-6 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-[#f1f3f4] py-8 border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-sm text-gray-500 flex items-center justify-center gap-2">
            <span className="material-icons-round text-base">code</span>
            with
            <span className="material-icons-round text-base text-red-500">favorite</span>
            for Antigravity & Gemini
          </p>
          <p className="text-xs text-gray-400 mt-2">
            &copy; {new Date().getFullYear()} Vibe Coding Library
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
