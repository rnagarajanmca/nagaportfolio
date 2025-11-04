import { CTAButton } from "@/components/CTAButton";
import type { ProjectItem } from "@/content/schema";

interface ProjectCardProps {
  project: ProjectItem;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const { company, client, links } = project;
  const metaLine = [company, client].filter(Boolean).join(" · ");

  return (
    <article className="flex flex-col gap-4 rounded-3xl border border-border bg-surface p-6 shadow-sm transition-transform hover:-translate-y-1 hover:shadow-[var(--shadow-soft)]">
      <header className="flex items-center justify-between gap-4">
        <h3 className="text-xl font-semibold text-foreground">{project.name}</h3>
        <span className="text-xs uppercase tracking-[0.25em] text-muted">{project.year}</span>
      </header>
      {metaLine ? <p className="text-xs uppercase tracking-[0.25em] text-muted">{metaLine}</p> : null}
      <p className="text-base text-muted-foreground">{project.description}</p>
      <ul className="flex flex-wrap gap-2 text-sm text-muted">
        {project.technologies.map((tech) => (
          <li
            key={tech}
            className="rounded-full border border-border bg-surface-strong/70 px-3 py-1 text-xs font-medium text-muted"
          >
            {tech}
          </li>
        ))}
      </ul>
      <div className="flex flex-wrap gap-3">
        {links.map((link) => {
          const isExternal = link.href.startsWith("http");
          const ctaLabel = link.label === "Experience" ? "View experience" : link.label;
          return (
            <CTAButton
              key={`${project.name}-${link.href}`}
              href={link.href}
              className="border border-border bg-transparent text-foreground hover:bg-surface-strong/70"
              target={isExternal ? "_blank" : undefined}
              rel={isExternal ? "noreferrer" : undefined}
            >
              {ctaLabel}
            </CTAButton>
          );
        })}
      </div>
    </article>
  );
}
