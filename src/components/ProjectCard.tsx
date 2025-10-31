import { CTAButton } from "@/components/CTAButton";
import type { ProjectItem } from "@/content/schema";

interface ProjectCardProps {
  project: ProjectItem;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="flex flex-col gap-4 rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm transition-transform hover:-translate-y-1 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900">
      <header className="flex items-center justify-between gap-4">
        <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">{project.name}</h3>
        <span className="text-xs uppercase tracking-[0.25em] text-zinc-400">{project.year}</span>
      </header>
      <p className="text-base text-zinc-600 dark:text-zinc-300">{project.description}</p>
      <ul className="flex flex-wrap gap-2 text-sm text-zinc-500 dark:text-zinc-400">
        {project.technologies.map((tech) => (
          <li
            key={tech}
            className="rounded-full border border-zinc-200 px-3 py-1 dark:border-zinc-800"
          >
            {tech}
          </li>
        ))}
      </ul>
      <div className="flex flex-wrap gap-3">
        {project.links.map((link) => (
          <CTAButton
            key={link.label}
            href={link.href}
            className="border border-zinc-300 bg-transparent text-zinc-900 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-100 dark:hover:bg-zinc-800"
            target={link.href.startsWith("http") ? "_blank" : undefined}
            rel={link.href.startsWith("http") ? "noreferrer" : undefined}
          >
            {link.label}
          </CTAButton>
        ))}
      </div>
    </article>
  );
}
