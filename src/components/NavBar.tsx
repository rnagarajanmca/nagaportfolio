"use client";

import { useEffect, useMemo, useState } from "react";
import type { NavLink } from "@/content/schema";
import { ThemeToggle } from "@/components/ThemeToggle";

interface NavBarProps {
  links: NavLink[];
  brand: string;
}

export function NavBar({ links, brand }: NavBarProps) {
  const [activeId, setActiveId] = useState<string>(links[0]?.href.replace("#", "") ?? "");
  const [menuOpen, setMenuOpen] = useState(false);
  const linkMap = useMemo(() => links.map((link) => link.href.replace("#", "")), [links]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-64px 0px -80% 0px",
        threshold: [0, 0.2, 0.5],
      }
    );

    linkMap.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [linkMap]);

  useEffect(() => {
    if (!menuOpen) {
      return;
    }
    const handler = () => setMenuOpen(false);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, [menuOpen]);

  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-surface/80 backdrop-blur">
      <nav className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3 sm:gap-6 sm:px-6 sm:py-4">
        <span className="text-base font-semibold text-foreground sm:text-lg">{brand}</span>
        <div className="flex items-center gap-3 sm:hidden">
          <ThemeToggle size="compact" />
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-surface text-sm text-muted shadow-sm transition hover:bg-surface-strong focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            aria-expanded={menuOpen}
            aria-label="Toggle navigation menu"
            aria-controls="mobile-navigation"
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
        <div className="hidden flex-1 items-center justify-end gap-4 sm:flex">
          <ul className="flex flex-wrap items-center gap-2 text-sm text-muted">
            {links.map((link) => {
              const id = link.href.replace("#", "");
              const isActive = activeId === id;
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    aria-current={isActive ? "page" : undefined}
                    className={`rounded-full px-3 py-1 transition-colors ${
                      isActive ? "bg-accent text-accent-foreground" : "hover:bg-surface-strong"
                    }`}
                  >
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>
          <ThemeToggle />
        </div>
      </nav>
      <div
        id="mobile-navigation"
        className={`sm:hidden ${
          menuOpen ? "max-h-[420px] translate-y-0 opacity-100" : "pointer-events-none max-h-0 -translate-y-1 opacity-0"
        } transition-all duration-300 ease-in-out`}
      >
        <div className="mx-4 mb-3 rounded-3xl border border-border bg-surface p-4 shadow-[var(--shadow-soft)]">
          <ul className="flex flex-col gap-2 text-sm text-muted">
            {links.map((link) => {
              const id = link.href.replace("#", "");
              const isActive = activeId === id;
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={handleLinkClick}
                    aria-current={isActive ? "page" : undefined}
                    className={`block rounded-full px-4 py-2 transition-colors ${
                      isActive ? "bg-accent text-accent-foreground" : "hover:bg-surface-strong"
                    }`}
                  >
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </header>
  );
}
