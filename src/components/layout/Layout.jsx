import React from 'react';
import TopUtilityBar from '../shell/TopUtilityBar';
import GovernmentHeader from '../shell/GovernmentHeader';
import Footer from '../shell/Footer';

function Layout({ children }) {
  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:m-2 focus:rounded-md focus:bg-yellow-300 focus:px-4 focus:py-2 focus:text-slate-900"
      >
        Skip to main content
      </a>
      <TopUtilityBar />
      <GovernmentHeader />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
