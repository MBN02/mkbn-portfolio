import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import {
  Search,
  CheckCircle2,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Layers,
  BookOpen,
  Play,
  GitFork,
} from 'lucide-react';
import type { SkillDomain } from '@/data/schemas';

interface Props {
  domains: SkillDomain[];
}

export default function InteractiveSkillMap({ domains }: Props) {
  const [selectedDomainId, setSelectedDomainId] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedSkills, setExpandedSkills] = useState<Record<string, boolean>>({
    'red-hat-openshift': true,
    'argocd-openshift-gitops': true,
    'port-idp': true,
    'vault-external-secrets': true,
  });
  const shouldReduceMotion = useReducedMotion();

  const toggleSkill = (slug: string) => {
    setExpandedSkills((prev) => ({
      ...prev,
      [slug]: !prev[slug],
    }));
  };

  const filteredDomains = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return domains
      .filter((d) => selectedDomainId === 'all' || d.id === selectedDomainId)
      .map((domain) => {
        if (!q) return domain;
        const matchedSkills = domain.skills.filter(
          (skill) =>
            skill.name.toLowerCase().includes(q) ||
            skill.productionSummary.toLowerCase().includes(q) ||
            skill.roleContext.toLowerCase().includes(q) ||
            skill.keyPatterns.some((p) => p.toLowerCase().includes(q))
        );
        return { ...domain, skills: matchedSkills };
      })
      .filter((d) => d.skills.length > 0);
  }, [domains, selectedDomainId, searchQuery]);

  const totalSkillsCount = useMemo(
    () => domains.reduce((acc, d) => acc + d.skills.length, 0),
    [domains]
  );

  const renderEvidenceIcon = (type: string) => {
    switch (type) {
      case 'project':
        return <Layers className="h-3.5 w-3.5 text-accent-cyan" />;
      case 'blog':
        return <BookOpen className="h-3.5 w-3.5 text-accent-blue" />;
      case 'video':
        return <Play className="h-3.5 w-3.5 text-accent-violet" />;
      default:
        return <GitFork className="h-3.5 w-3.5 text-accent-emerald" />;
    }
  };

  return (
    <div>
      {/* Control Bar: Domain Tabs + Search */}
      <div className="glass-panel rounded-2xl p-5 sm:p-6">
        <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter capabilities (e.g. OpenShift, Argo CD, Port, Vault, Terraform, Ceph, K8sGPT)..."
              aria-label="Filter capabilities and technologies"
              className="w-full rounded-xl border border-slate-400/20 bg-obsidian-900/90 pl-10 pr-4 py-2.5 text-sm text-slate-50 placeholder-slate-400 focus:border-accent-cyan focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-3 font-mono text-xs text-slate-400">
            <span>
              Showing <strong className="text-accent-cyan">{filteredDomains.length}</strong> domains
              · <strong className="text-slate-50">{totalSkillsCount}</strong> verified capabilities
            </span>
          </div>
        </div>

        {/* Domain Filter Pills */}
        <div
          role="tablist"
          aria-label="Filter by Engineering Domain"
          className="mt-4 flex flex-wrap gap-2"
        >
          <button
            type="button"
            role="tab"
            aria-selected={selectedDomainId === 'all'}
            onClick={() => setSelectedDomainId('all')}
            className={`rounded-xl px-3.5 py-2 font-mono text-xs font-medium transition-all ${
              selectedDomainId === 'all'
                ? 'bg-accent-blue text-obsidian-900 font-bold shadow-glow-blue'
                : 'border border-slate-400/15 bg-obsidian-900/80 text-slate-400 hover:border-accent-cyan/40 hover:text-slate-50'
            }`}
          >
            All Domains ({domains.length})
          </button>
          {domains.map((domain) => {
            const active = selectedDomainId === domain.id;
            return (
              <button
                key={domain.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setSelectedDomainId(domain.id)}
                className={`rounded-xl px-3.5 py-2 font-mono text-xs font-medium transition-all ${
                  active
                    ? 'bg-accent-cyan text-obsidian-900 font-bold shadow-glow-cyan'
                    : 'border border-slate-400/15 bg-obsidian-900/80 text-slate-400 hover:border-accent-cyan/40 hover:text-slate-50'
                }`}
              >
                {domain.title}
              </button>
            );
          })}
        </div>
      </div>

      {/* Domain Sections */}
      <div className="mt-10 space-y-12">
        {filteredDomains.map((domain) => (
          <section
            key={domain.id}
            id={domain.id}
            className="glass-panel rounded-3xl p-6 sm:p-8 scroll-mt-24"
          >
            <div className="border-b border-slate-400/15 pb-5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="font-mono text-xs font-semibold uppercase tracking-wider text-accent-cyan">
                  DOMAIN // {domain.id.toUpperCase()}
                </span>
                <span className="rounded-lg border border-slate-400/15 bg-obsidian-900 px-3 py-1 font-mono text-xs text-slate-400">
                  {domain.skills.length} Production Capabilities
                </span>
              </div>
              <h2 className="mt-2 text-2xl sm:text-3xl font-bold text-slate-50">{domain.title}</h2>
              <p className="mt-1.5 text-sm sm:text-base text-slate-400">
                {domain.architecturalScope}
              </p>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-2">
              {domain.skills.map((skill) => {
                const isExpanded = Boolean(expandedSkills[skill.slug]);
                return (
                  <div
                    key={skill.slug}
                    className="flex flex-col justify-between rounded-2xl border border-slate-400/15 bg-obsidian-900/85 p-5 transition-colors hover:border-accent-blue/40"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h3 className="text-lg font-bold text-slate-50">{skill.name}</h3>
                          <p className="mt-0.5 font-mono text-xs text-accent-cyan">
                            {skill.roleContext}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => toggleSkill(skill.slug)}
                          aria-expanded={isExpanded}
                          aria-label={`Toggle architectural patterns for ${skill.name}`}
                          className="inline-flex items-center gap-1 rounded-lg border border-slate-400/20 bg-obsidian-800 px-2.5 py-1.5 font-mono text-[11px] text-slate-50 hover:border-accent-cyan"
                        >
                          <span>{isExpanded ? 'Hide Patterns' : 'Patterns'}</span>
                          {isExpanded ? (
                            <ChevronUp className="h-3.5 w-3.5 text-accent-cyan" />
                          ) : (
                            <ChevronDown className="h-3.5 w-3.5 text-accent-cyan" />
                          )}
                        </button>
                      </div>

                      <p className="mt-3 text-sm leading-relaxed text-slate-400">
                        {skill.productionSummary}
                      </p>

                      <AnimatePresence initial={false}>
                        {isExpanded && (
                          <motion.div
                            initial={
                              shouldReduceMotion ? { opacity: 1 } : { opacity: 0, height: 0 }
                            }
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <div className="mt-4 rounded-xl border border-slate-400/10 bg-obsidian-800/70 p-3.5">
                              <p className="font-mono text-[11px] font-semibold uppercase tracking-wider text-slate-50">
                                Production Implementation Patterns:
                              </p>
                              <ul className="mt-2 space-y-1.5 text-xs text-slate-400">
                                {skill.keyPatterns.map((pattern) => (
                                  <li key={pattern} className="flex items-start gap-2">
                                    <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent-emerald" />
                                    <span>{pattern}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Evidence Links */}
                    <div className="mt-5 border-t border-slate-400/10 pt-3.5">
                      <p className="mb-2 font-mono text-[10px] uppercase tracking-wider text-slate-400">
                        Verified Production &amp; Open-Source Evidence:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {skill.evidenceLinks.map((link) => {
                          const isExternal = link.href.startsWith('http');
                          return (
                            <a
                              key={link.href + link.label}
                              href={link.href}
                              target={isExternal ? '_blank' : undefined}
                              rel={isExternal ? 'noopener noreferrer' : undefined}
                              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-400/15 bg-obsidian-800/90 px-2.5 py-1 font-mono text-xs text-slate-50 transition-colors hover:border-accent-cyan/50 hover:text-accent-cyan"
                            >
                              {renderEvidenceIcon(link.type)}
                              <span>{link.label}</span>
                              {isExternal && <ExternalLink className="h-3 w-3 opacity-70" />}
                            </a>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        ))}

        {filteredDomains.length === 0 && (
          <div className="glass-panel rounded-2xl p-12 text-center">
            <p className="text-lg font-bold text-slate-50">
              No matching capabilities found for “{searchQuery}”
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedDomainId('all');
              }}
              className="btn-secondary mt-4 text-xs"
            >
              Reset Filter
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
