interface SkillTagProps {
  label: string;
}

export function SkillTag({ label }: SkillTagProps) {
  return (
    <span className="rounded-full border border-border bg-surface px-3 py-1 text-sm font-medium text-muted">
      {label}
    </span>
  );
}
