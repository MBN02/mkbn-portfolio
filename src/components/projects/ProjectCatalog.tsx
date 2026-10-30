import React, { useState, useMemo } from 'react';
import { Search, ExternalLink, ArrowRight, Play } from 'lucide-react';

export interface ProjectSummaryItem {
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  role: string;
  environmentScope: string;
  problemStatement: string;
  architectureSummary: string;
  outcomes: { metric: string; description: string }[];
  technologies: string[];
  githubUrl?: string;
  relatedVideoUrl?: string;
  featured: boolean;
}

interface Props {
  projects: ProjectSummaryItem[];
}

export default function ProjectCatalog({ projects }: Props) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = useMemo(() => {
    const unique = Array.from(new Set(projects.map((p) => p.category)));
    return ['All', ...unique];
  }, [projects]);

  const filteredProjects = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return projects.filter((p) => {
      const matchesCat = selectedCategory === 'All' || p.category === selectedCategory;
      const matchesQuery =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.subtitle.toLowerCase().includes(q) ||
        p.problemStatement.toLowerCase().includes(q) ||
        p.architectureSummary.toLowerCase().includes(q) ||
        p.technologies.some((t) => t.toLowerCase().includes(q));
      return matchesCat && matchesQuery;
    });
  }, [projects, selectedCategory, searchQuery]);

  return (
    <div>
      {/* Filter & Search Bar */}
      <div className="glass-panel rounded-2xl p-5 sm:p-6">
        <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search case studies by technology or architecture (e.g. OpenShift, Port, Argo CD, Vault, CrewAI, Terraform)..."
              aria-label="Search engineering case studies"
              className="w-full rounded-xl border border-slate-400/20 bg-obsidian-900/90 pl-10 pr-4 py-2.5 text-sm text-slate-50 placeholder-slate-400 focus:border-accent-cyan focus:outline-none"
            />
          </div>
          <span className="font-mono text-xs text-slate-400">
            Showing <strong className="text-accent-cyan">{filteredProjects.length}</strong> of{' '}
            {projects.length} Case Studies
          </span>
        </div>

        <div
          role="tablist"
          aria-label="Filter projects by category"
          className="mt-4 flex flex-wrap gap-2"
        >
          {categories.map((cat) => {
            const active = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setSelectedCategory(cat)}
                className={`rounded-xl px-3.5 py-2 font-mono text-xs font-medium transition-all ${
                  active
                    ? 'bg-accent-cyan text-obsidian-900 font-bold shadow-glow-cyan'
                    : 'border border-slate-400/15 bg-obsidian-900/80 text-slate-400 hover:border-accent-cyan/40 hover:text-slate-50'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Case Studies Grid */}
      <div className="mt-10 space-y-8">
        {filteredProjects.map((project, index) => (
          <article key={project.slug} className="glass-card-interactive rounded-3xl p-6 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-400/15 pb-4">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="font-mono text-xs font-bold text-accent-cyan">
                  CASE STUDY 0{index + 1}
                </span>
                <span className="rounded-lg border border-accent-blue/35 bg-accent-blue/10 px-3 py-1 font-mono text-xs font-semibold text-accent-cyan">
                  {project.category}
                </span>
              </div>
              <span className="font-mono text-xs text-slate-400">{project.environmentScope}</span>
            </div>

            <div className="mt-5 grid grid-cols-1 gap-8 lg:grid-cols-12">
              <div className="lg:col-span-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-50">
                  <a
                    href={`/projects/${project.slug}`}
                    className="hover:text-accent-cyan transition-colors"
                  >
                    {project.title}
                  </a>
                </h2>
                <p className="mt-1.5 font-mono text-xs text-accent-violet">{project.role}</p>

                <div className="mt-4 space-y-3 text-sm leading-relaxed text-slate-400">
                  <p>
                    <strong className="font-semibold text-slate-50">Engineering Problem: </strong>
                    {project.problemStatement}
                  </p>
                  <p>
                    <strong className="font-semibold text-slate-50">Architecture Summary: </strong>
                    {project.architectureSummary}
                  </p>
                </div>

                <div className="mt-5 flex flex-wrap gap-1.5">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-lg border border-slate-400/15 bg-obsidian-900 px-2.5 py-1 font-mono text-xs text-slate-50"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col justify-between rounded-2xl border border-slate-400/15 bg-obsidian-900/85 p-5 lg:col-span-4">
                <div>
                  <p className="font-mono text-xs font-semibold uppercase tracking-wider text-accent-cyan">
                    Verified Impact &amp; Outcomes
                  </p>
                  <div className="mt-3 space-y-3">
                    {project.outcomes.map((o) => (
                      <div key={o.metric} className="border-l-2 border-accent-emerald pl-3">
                        <p className="font-mono text-sm font-bold text-accent-emerald">
                          {o.metric}
                        </p>
                        <p className="text-xs text-slate-400">{o.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 flex flex-col gap-2.5 border-t border-slate-400/15 pt-4">
                  <a
                    href={`/projects/${project.slug}`}
                    className="btn-primary w-full justify-center py-2.5 text-xs"
                  >
                    <span>Explore Full Case Study</span>
                    <ArrowRight className="h-4 w-4" />
                  </a>
                  <div className="flex items-center justify-between gap-2 pt-1 font-mono text-xs">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-slate-400 hover:text-accent-cyan"
                      >
                        <span>GitHub Repo</span>
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    )}
                    {project.relatedVideoUrl && (
                      <a
                        href={project.relatedVideoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-accent-cyan hover:underline"
                      >
                        <Play className="h-3.5 w-3.5" />
                        <span>Video Masterclass</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
