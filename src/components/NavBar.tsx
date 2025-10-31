"use client";

import { useEffect, useState } from "react";
import type { NavLink } from "@/content/schema";
import { ThemeToggle } from "@/components/ThemeToggle";

interface NavBarProps {
  links: NavLink[];
  brand: string;
}

export function NavBar({ links, brand }: NavBarProps) {
  const [activeId, setActiveId] = useState<string>(links[0]?.href.replace("#", "") ?? "");

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

    links.forEach((link) => {
      const id = link.href.replace("#", "");
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [links]);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-surface/80 backdrop-blur">
      <nav className="mx-auto flex max-w-5xl items-center justify-between gap-6 px-6 py-4">
        <span className="text-lg font-semibold text-foreground">{brand}</span>
        <div className="flex flex-1 items-center justify-end gap-4">
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
                      isActive
                        ? "bg-accent text-accent-foreground"
                        : "hover:bg-surface-strong"
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
    </header>
  );
}
