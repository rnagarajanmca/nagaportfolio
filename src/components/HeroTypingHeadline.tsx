'use client';

import { useEffect, useMemo, useState } from "react";

interface HeroTypingHeadlineProps {
  phrases: string[];
  className?: string;
  typingDelay?: number;
  deletingDelay?: number;
  holdDelay?: number;
}

const DEFAULT_TYPING_DELAY = 70;
const DEFAULT_DELETING_DELAY = 40;
const DEFAULT_HOLD_DELAY = 1600;

export function HeroTypingHeadline({
  phrases,
  className = "",
  typingDelay = DEFAULT_TYPING_DELAY,
  deletingDelay = DEFAULT_DELETING_DELAY,
  holdDelay = DEFAULT_HOLD_DELAY,
}: HeroTypingHeadlineProps) {
  const focusIcons = ["✹", "⚡", "✦", "⬢", "☄", "⚙", "∞", "☑" as const];
  const focusIconThemes = [
    "border-highlight/40 text-highlight",
    "border-[#ffb26b]/50 text-[#ffb26b]",
    "border-[#7f5af0]/50 text-[#7f5af0]",
    "border-[#4fd1c5]/50 text-[#4fd1c5]",
    "border-[#f97316]/50 text-[#f97316]",
    "border-[#38bdf8]/50 text-[#38bdf8]",
    "border-[#a855f7]/50 text-[#a855f7]",
    "border-[#22c55e]/50 text-[#22c55e]",
  ];
  const sanitizedPhrases = useMemo(
    () => phrases.filter((phrase) => phrase.trim().length > 0),
    [phrases],
  );

  const [phraseIndex, setPhraseIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (sanitizedPhrases.length === 0) {
      return;
    }

    const currentPhrase = sanitizedPhrases[phraseIndex % sanitizedPhrases.length];
    const isComplete = displayed === currentPhrase;
    const isEmpty = displayed === "";

    let timeout = typingDelay;

    if (!isDeleting && !isComplete) {
      timeout = typingDelay;
      const nextChar = currentPhrase.charAt(displayed.length);
      const timer = setTimeout(() => {
        setDisplayed((prev) => prev + nextChar);
      }, timeout);
      return () => clearTimeout(timer);
    }

    if (!isDeleting && isComplete) {
      const timer = setTimeout(() => {
        setIsDeleting(true);
      }, holdDelay);
      return () => clearTimeout(timer);
    }

    if (isDeleting && !isEmpty) {
      timeout = deletingDelay;
      const timer = setTimeout(() => {
        setDisplayed((prev) => prev.slice(0, -1));
      }, timeout);
      return () => clearTimeout(timer);
    }

    if (isDeleting && isEmpty) {
      const timer = setTimeout(() => {
        setIsDeleting(false);
        setPhraseIndex((prev) => (prev + 1) % sanitizedPhrases.length);
      }, typingDelay);
      return () => clearTimeout(timer);
    }
  }, [deletingDelay, displayed, holdDelay, isDeleting, phraseIndex, sanitizedPhrases, typingDelay]);

  if (sanitizedPhrases.length === 0) {
    return null;
  }

  return (
    <div
      className={`group inline-flex items-center gap-4 rounded-full border border-border/60 bg-surface/80 px-5 py-3 text-sm text-foreground shadow-[var(--shadow-soft)] backdrop-blur transition hover:border-ring/50 ${className}`
        .replace(/\s+/g, " ")
        .trim()}
      aria-live="polite"
      aria-atomic="true"
    >
      <span
        aria-hidden
        className={`inline-flex h-9 w-9 items-center justify-center rounded-2xl border bg-surface-strong/60 text-base shadow-[0_12px_28px_-16px_rgba(12,18,24,0.35)] ${
          focusIconThemes[phraseIndex % focusIconThemes.length]
        }`
          .replace(/\s+/g, " ")
          .trim()}
      >
        {focusIcons[phraseIndex % focusIcons.length]}
      </span>
      <div className="flex flex-col gap-1">
        <span className="text-xs uppercase tracking-[0.25em] text-muted">Focus areas</span>
        <span
          className="flex items-center gap-2 text-base font-semibold text-foreground"
          style={{ minWidth: `${Math.min(Math.max(displayed.length, 1) + 1, 36)}ch` }}
        >
          {displayed || "\u00a0"}
          <span className="typing-cursor" aria-hidden="true" />
        </span>
      </div>
    </div>
  );
}
