import { CTAButton } from "@/components/CTAButton";
import { ContactForm } from "@/components/ContactForm";
import { NavBar } from "@/components/NavBar";
import { ProjectCard } from "@/components/ProjectCard";
import { ResumeDownload } from "@/components/ResumeDownload";
import { ScrollToTop } from "@/components/ScrollToTop";
import { SectionWrapper } from "@/components/SectionWrapper";
import { SkillTag } from "@/components/SkillTag";
import { TimelineItem } from "@/components/TimelineItem";
import { siteContent } from "@/content/site";
import { HeroTypingHeadline } from "@/components/HeroTypingHeadline";

export default function Home() {
  const { navigation, hero, about, experience, education, skills, projects, contact } = siteContent;

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://nagarajanr.com";
  const linkedInUrl = hero.social.find((s) => s.platform === "LinkedIn")?.href || "";
  const email = contact.email;
  const showHeroMetrics = false;

  // JSON-LD Structured Data
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: hero.name,
    jobTitle: hero.title,
    description: hero.summary,
    email: email,
    url: baseUrl,
    sameAs: [linkedInUrl, baseUrl].filter(Boolean),
    knowsAbout: skills.flatMap((category) => category.items),
    alumniOf: education.map((edu) => ({
      "@type": "EducationalOrganization",
      name: edu.school,
      address: {
        "@type": "PostalAddress",
        addressLocality: edu.location.split(",")[0]?.trim(),
        addressCountry: edu.location.split(",")[1]?.trim() || "India",
      },
    })),
    worksFor: experience.map((exp) => ({
      "@type": "Organization",
      name: exp.company,
      address: {
        "@type": "PostalAddress",
        addressLocality: exp.location.split(",")[0]?.trim(),
        addressRegion: exp.location.split(",")[1]?.trim() || "",
      },
    })),
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(15,23,42,0.08),_transparent_55%)] dark:bg-[radial-gradient(circle_at_top,_rgba(148,163,184,0.15),_transparent_55%)]" />
      <a
        href="#main-content"
        className="pointer-events-auto absolute left-4 top-4 z-50 -translate-y-20 rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background transition focus-visible:translate-y-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
      >
        Skip to content
      </a>
      <NavBar links={navigation} brand={hero.name} />
      <main id="main-content" className="mx-auto flex max-w-5xl flex-col gap-20 px-4 pb-20 pt-20 sm:gap-24 sm:px-8 sm:pb-24 sm:pt-24">
        <section
          id="home"
          className="scroll-mt-16 sm:scroll-mt-24 min-h-[calc(100vh-4rem)] sm:min-h-[calc(100vh-6rem)] pb-12 sm:pb-16"
        >
          <div className="grid h-full gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,320px)] md:items-center">
            <div className="space-y-6 animate-fade-up">
              <p className="text-xs uppercase tracking-[0.3em] text-muted sm:text-sm">
                {hero.title}
              </p>
              <h1 className="text-[2.5rem] font-semibold leading-tight tracking-tight text-foreground sm:text-5xl">
                {hero.name}
              </h1>
              <HeroTypingHeadline
                phrases={hero.typingPhrases}
                className="animate-fade-up animation-delay-1"
              />
              <p className="max-w-2xl text-base text-muted animate-fade-up animation-delay-2 sm:text-lg">
                {hero.summary}
              </p>
              <div className="flex flex-wrap gap-3 animate-fade-up animation-delay-3">
                {hero.cta.map((cta) =>
                  cta.download ? (
                    <ResumeDownload key={cta.label} variant={cta.variant}>
                      {cta.label}
                    </ResumeDownload>
                  ) : (
                    <CTAButton
                      key={cta.label}
                      href={cta.href}
                      variant={cta.variant}
                      target={cta.target}
                      rel={cta.rel}
                    >
                      {cta.label}
                    </CTAButton>
                  )
                )}
              </div>
              {showHeroMetrics && hero.metrics?.length ? (
                <div className="grid gap-4 rounded-3xl border border-border/60 bg-surface/70 p-6 shadow-[var(--shadow-soft)] backdrop-blur animate-fade-up animation-delay-3 sm:grid-cols-3">
                  {hero.metrics.map((metric) => (
                    <div key={metric.label} className="space-y-2">
                      <span className="text-3xl font-semibold text-foreground">{metric.value}</span>
                      <p className="text-xs uppercase tracking-[0.25em] text-muted">{metric.label}</p>
                      {metric.description ? (
                        <p className="text-sm text-muted-foreground">{metric.description}</p>
                      ) : null}
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
            <div className="relative flex items-center justify-center animate-fade-up animation-delay-1">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 -translate-y-6 rounded-[48px] bg-[radial-gradient(circle_at_top,_rgba(240,84,84,0.32),_transparent_60%),_radial-gradient(circle_at_bottom_right,_rgba(23,74,118,0.4),_transparent_65%)] blur-3xl opacity-80"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute -left-12 -top-10 h-20 w-20 rounded-full bg-[radial-gradient(circle,_rgba(255,178,107,0.55),_transparent_60%)] blur-xl"
              />
              <aside className="relative z-10 space-y-4 rounded-3xl border border-border/70 bg-surface/95 p-6 shadow-[var(--shadow-soft)] backdrop-blur">
                <div className="flex items-center justify-between gap-3">
                  <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-muted">
                    Connect
                  </h2>
                  <span className="inline-flex items-center gap-1 rounded-full border border-border/70 bg-surface-strong/60 px-3 py-1 text-xs font-medium text-muted">
                    <span className="inline-block h-2 w-2 rounded-full bg-highlight" />
                    {hero.social.length} links
                  </span>
                </div>
                <ul className="space-y-2 text-sm">
                  {hero.social.map((item) => (
                    <li key={item.platform}>
                      <a
                        href={item.href}
                        className="group inline-flex max-w-full flex-wrap items-center gap-2 text-muted transition-colors hover:text-foreground"
                        target={item.href.startsWith("http") ? "_blank" : undefined}
                        rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                      >
                        <span className="text-xs uppercase tracking-[0.25em] text-muted group-hover:text-highlight">
                          {item.platform}
                        </span>
                        <span className="font-medium break-words break-all text-left">
                          {item.href.replace(/^mailto:/, "")}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </aside>
            </div>
          </div>
        </section>

        <SectionWrapper id="about" title="About" subtitle={about.heading} className="pt-6 sm:pt-8">
          {about.body.map((paragraph) => (
            <p key={paragraph} className="text-lg leading-relaxed text-muted animate-fade-up">
              {paragraph}
            </p>
          ))}
        </SectionWrapper>

        <SectionWrapper id="experience" title="Experience" subtitle="Recent roles and impact" fillViewport>
          <div className="relative">
            <span className="absolute left-[5px] top-0 h-full w-px bg-gradient-to-b from-surface-strong via-transparent to-transparent" aria-hidden />
            <div className="space-y-12">
              {experience.map((item) => (
                <TimelineItem
                  key={`${item.title}-${item.company}`}
                  title={item.title}
                  subtitle={`${item.company} · ${item.location}`}
                  meta={`${item.startDate} — ${item.endDate}`}
                >
                  {item.description.map((entry, index) => (
                    <p key={entry} className={`text-muted animate-fade-up ${index ? "animation-delay-1" : ""}`}>
                      {entry}
                    </p>
                  ))}
                </TimelineItem>
              ))}
            </div>
          </div>
        </SectionWrapper>

        <SectionWrapper id="education" title="Education" subtitle="Foundations that shaped my craft" fillViewport>
          <div className="relative">
            <span className="absolute left-[5px] top-0 h-full w-px bg-gradient-to-b from-surface-strong via-transparent to-transparent" aria-hidden />
            <div className="space-y-12">
              {education.map((item) => (
                <TimelineItem
                  key={`${item.school}-${item.credential}`}
                  title={item.credential}
                  subtitle={`${item.school} · ${item.location}`}
                  meta={`${item.startDate} — ${item.endDate}`}
                >
                  <ul className="list-disc space-y-2 pl-4 text-muted">
                    {item.highlights.map((highlight) => (
                      <li key={highlight}>{highlight}</li>
                    ))}
                  </ul>
                </TimelineItem>
              ))}
            </div>
          </div>
        </SectionWrapper>

        <SectionWrapper id="skills" title="Skills" subtitle="Core tools and topics I rely on" fillViewport>
          <div className="grid gap-6 sm:grid-cols-2">
            {skills.map((category) => (
              <div key={category.name} className="rounded-2xl border border-border bg-surface p-6 animate-fade-up">
                <h3 className="text-sm font-semibold uppercase tracking-[0.25em] text-muted">
                  {category.name}
                </h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {category.items.map((item, index) => (
                    <SkillTag key={item} label={item} index={index} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </SectionWrapper>

        <SectionWrapper id="projects" title="Projects" subtitle="Selected collaborations and experiments">
          <div className="grid gap-6 md:grid-cols-2">
            {projects.map((project, index) => (
              <div key={project.name} className={`animate-fade-up ${index % 2 === 1 ? "animation-delay-1" : ""}`}>
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
        </SectionWrapper>

        <SectionWrapper id="contact" title="Contact" subtitle={contact.headline}>
          <div className="mx-auto max-w-2xl">
            <p className="mb-8 text-center text-lg text-muted animate-fade-up">
              {contact.description}
            </p>
            <div className="rounded-3xl border border-border bg-surface p-8 shadow-sm animate-fade-up animation-delay-1">
              <ContactForm />
            </div>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <CTAButton
                href={`mailto:${contact.email}`}
                variant="secondary"
              >
                Or email directly
              </CTAButton>
              <CTAButton
                href="https://cal.com"
                variant="secondary"
                target="_blank"
                rel="noreferrer"
              >
                Book a call
              </CTAButton>
            </div>
          </div>
        </SectionWrapper>
      </main>
      <footer className="border-t border-border bg-surface/60 py-6 text-center text-sm text-muted">
        © {new Date().getFullYear()} {hero.name}. Inspired by thoughtful, human-centered design.
      </footer>
      <ScrollToTop />
    </div>
  );
}
