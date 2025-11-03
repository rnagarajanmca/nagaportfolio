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
      className={`inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-sm font-medium text-foreground shadow-[var(--shadow-soft)] ${className}`.trim()}
      aria-live="polite"
      aria-atomic="true"
    >
      <span>{displayed}</span>
      <span className="typing-cursor" aria-hidden="true" />
    </div>
  );
}
