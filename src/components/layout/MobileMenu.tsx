import React, { useState, useEffect } from 'react';
import { Menu, X, FileDown, ExternalLink, Terminal } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

interface NavItem {
  label: string;
  href: string;
}

interface Props {
  items: readonly NavItem[];
  currentPath: string;
  resumeUrl: string;
}

export default function MobileMenu({ items, currentPath, resumeUrl }: Props) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    if (open) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [open]);

  const isActive = (href: string) => {
    if (href === '/') return currentPath === '/';
    return currentPath.startsWith(href);
  };

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-controls="mobile-nav-drawer"
        aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
        className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-400/20 bg-obsidian-800/90 text-slate-50 transition-colors hover:border-accent-cyan/50 hover:text-accent-cyan"
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav-drawer"
            initial={{ opacity: 1, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            style={{ backgroundColor: '#080B12' }}
            className="fixed inset-x-0 top-[72px] z-[100] min-h-[calc(100vh-72px)] overflow-y-auto border-t border-slate-400/20 bg-obsidian-900 px-6 py-6 shadow-2xl"
          >
            <div className="mb-4 flex items-center justify-between border-b border-slate-400/10 pb-3 font-mono text-xs text-slate-400">
              <span className="flex items-center gap-2 text-accent-cyan">
                <Terminal className="h-3.5 w-3.5" />
                CLUSTER_NAV // MKBN.IN
              </span>
              <span className="text-accent-emerald">● READY</span>
            </div>

            <nav aria-label="Mobile Navigation" className="grid grid-cols-1 gap-1.5">
              {items.map((item) => {
                const active = isActive(item.href);
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    aria-current={active ? 'page' : undefined}
                    className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                      active
                        ? 'border border-accent-blue/40 bg-accent-blue/15 text-slate-50'
                        : 'text-slate-400 hover:bg-obsidian-800 hover:text-slate-50'
                    }`}
                  >
                    <span>{item.label}</span>
                    {active && (
                      <span className="font-mono text-[11px] text-accent-cyan">ACTIVE</span>
                    )}
                  </a>
                );
              })}
            </nav>

            <div className="mt-6 flex flex-col gap-3 border-t border-slate-400/15 pt-5">
              <a
                href={resumeUrl}
                download
                className="btn-primary w-full justify-center text-center"
              >
                <FileDown className="h-4 w-4" />
                Download Resume (PDF)
              </a>
              <a
                href="https://www.credly.com/users/mohan-kumar-bn"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary w-full justify-center text-center text-xs"
              >
                Verify Kubestronaut Credentials
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
