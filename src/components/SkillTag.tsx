interface SkillTagProps {
  label: string;
  index?: number;
}

export function SkillTag({ label, index = 0 }: SkillTagProps) {
  const delayClass = index < 4 ? `animation-delay-${Math.min(index, 3)}` : "";
  
  return (
    <span className={`rounded-full border border-border bg-surface px-3 py-1 text-sm font-medium text-muted transition-all duration-300 hover:border-accent hover:bg-accent hover:text-accent-foreground hover:scale-105 hover:shadow-md animate-fade-up ${delayClass}`}>
      {label}
    </span>
  );
}
