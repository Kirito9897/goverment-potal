import React from 'react';

function Footer() {
  return (
    <footer className="mt-10 border-t border-slate-800 bg-slate-950/90 text-xs text-slate-300">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-6 md:flex-row md:justify-between md:px-10">
        <div>
          <p className="font-semibold text-slate-100">National Government Information Portal</p>
          <p className="mt-1 max-w-md text-slate-400">
            This is a demonstration interface inspired by official national portals. For
            transactions and applications, please visit the respective official government
            websites.
          </p>
        </div>
        <div className="flex flex-col gap-2 md:text-right">
          <a href="#" className="hover:text-sky-200">
            Privacy policy
          </a>
          <a href="#" className="hover:text-sky-200">
            Terms of use
          </a>
          <a href="#" className="hover:text-sky-200">
            Accessibility statement
          </a>
          <p className="mt-2 text-slate-500">
            © {new Date().getFullYear()} Government of India (demo)
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
