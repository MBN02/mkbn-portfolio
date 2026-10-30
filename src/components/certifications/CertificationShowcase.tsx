import React, { useState, useMemo } from 'react';
import { ExternalLink, ShieldCheck, CheckCircle2, Award } from 'lucide-react';
import type { Certification } from '@/data/schemas';

interface Props {
  certifications: Certification[];
  credlyProfileUrl: string;
}

const PROVIDERS = [
  'All',
  'CNCF',
  'Google Cloud',
  'Microsoft',
  'HashiCorp',
  'GitLab',
  'Cloud Native Ecosystem',
] as const;

export default function CertificationShowcase({ certifications, credlyProfileUrl }: Props) {
  const [selectedProvider, setSelectedProvider] = useState<string>('All');

  const kubestronaut = useMemo(
    () => certifications.find((c) => c.id === 'cncf-kubestronaut'),
    [certifications]
  );

  const filteredCerts = useMemo(() => {
    if (selectedProvider === 'All') return certifications;
    return certifications.filter((c) => c.provider === selectedProvider);
  }, [certifications, selectedProvider]);

  return (
    <div>
      {/* Flagship CNCF Kubestronaut Spotlight Banner */}
      {kubestronaut && (
        <div className="glass-panel relative overflow-hidden rounded-3xl border border-accent-cyan/40 p-6 sm:p-10 shadow-glow-cyan">
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
            <div className="flex justify-center lg:col-span-3">
              <div className="relative rounded-3xl border border-accent-cyan/35 bg-obsidian-900/90 p-5 shadow-glow-blue">
                <img
                  src={kubestronaut.badgeUrl}
                  alt={kubestronaut.name}
                  width="160"
                  height="160"
                  className="h-36 w-36 object-contain"
                />
              </div>
            </div>

            <div className="lg:col-span-9">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-accent-emerald/40 bg-accent-emerald/15 px-3 py-1 font-mono text-xs font-bold text-accent-emerald">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  FLAGSHIP GLOBAL DISTINCTION
                </span>
                <span className="font-mono text-xs text-accent-cyan">
                  Issued {kubestronaut.issuedDate} · Linux Foundation / CNCF
                </span>
              </div>

              <h2 className="mt-3 text-2xl sm:text-4xl font-extrabold text-slate-50">
                {kubestronaut.name}
              </h2>
              <p className="mt-2.5 text-sm sm:text-base leading-relaxed text-slate-400">
                Awarded by the Cloud Native Computing Foundation to elite Kubernetes engineers who
                simultaneously hold all five CNCF Kubernetes certifications:{' '}
                <strong className="text-slate-50">CKA</strong> (Administrator),{' '}
                <strong className="text-slate-50">CKS</strong> (Security Specialist),{' '}
                <strong className="text-slate-50">CKAD</strong> (Application Developer),{' '}
                <strong className="text-slate-50">KCNA</strong> (Cloud Native Associate), and{' '}
                <strong className="text-slate-50">KCSA</strong> (Security Associate).
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {kubestronaut.skillsValidated.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-lg border border-accent-blue/30 bg-obsidian-900/90 px-3 py-1 font-mono text-xs text-slate-50"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-4">
                <a
                  href={kubestronaut.verificationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary text-xs py-2.5 px-5"
                >
                  <span>Verify Kubestronaut Badge on Credly</span>
                  <ExternalLink className="h-4 w-4" />
                </a>
                <a
                  href={credlyProfileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary text-xs py-2.5 px-5"
                >
                  <span>Full Credly Profile ({certifications.length} Badges)</span>
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Provider Filter Tabs */}
      <div className="mt-10 glass-panel rounded-2xl p-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div
            role="tablist"
            aria-label="Filter certifications by issuing provider"
            className="flex flex-wrap gap-2"
          >
            {PROVIDERS.map((provider) => {
              const active = selectedProvider === provider;
              const count =
                provider === 'All'
                  ? certifications.length
                  : certifications.filter((c) => c.provider === provider).length;
              return (
                <button
                  key={provider}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setSelectedProvider(provider)}
                  className={`rounded-xl px-3.5 py-2 font-mono text-xs font-medium transition-all ${
                    active
                      ? 'bg-accent-cyan text-obsidian-900 font-bold shadow-glow-cyan'
                      : 'border border-slate-400/15 bg-obsidian-900/80 text-slate-400 hover:border-accent-cyan/40 hover:text-slate-50'
                  }`}
                >
                  {provider} ({count})
                </button>
              );
            })}
          </div>

          <a
            href={credlyProfileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-accent-cyan hover:underline"
          >
            <Award className="h-4 w-4" />
            <span>credly.com/users/mohan-kumar-bn</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>

      {/* Certifications Grid */}
      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredCerts.map((cert) => (
          <article
            key={cert.id}
            className="glass-card-interactive flex flex-col justify-between rounded-2xl p-6"
          >
            <div>
              <div className="flex items-start gap-4">
                <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl border border-slate-400/15 bg-obsidian-900/90 p-2">
                  <img
                    src={cert.badgeUrl}
                    alt={cert.name}
                    width="72"
                    height="72"
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-contain"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="rounded bg-accent-blue/15 px-2 py-0.5 font-mono text-[10px] font-bold text-accent-cyan">
                      {cert.provider}
                    </span>
                    {cert.kubestronautComponent && (
                      <span className="rounded bg-accent-violet/15 px-2 py-0.5 font-mono text-[10px] font-semibold text-accent-violet">
                        Kubestronaut Core
                      </span>
                    )}
                  </div>
                  <h3 className="mt-2 text-base font-bold leading-snug text-slate-50">
                    {cert.name}
                  </h3>
                  <p className="mt-1 font-mono text-[11px] text-slate-400">{cert.issuer}</p>
                </div>
              </div>

              <div className="mt-5 border-t border-slate-400/10 pt-4">
                <p className="font-mono text-[10px] uppercase tracking-wider text-slate-400">
                  Validated Engineering Competencies:
                </p>
                <ul className="mt-2 space-y-1.5 text-xs text-slate-400">
                  {cert.skillsValidated.map((s) => (
                    <li key={s} className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent-emerald" />
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between border-t border-slate-400/15 pt-4 font-mono text-xs">
              <div className="text-slate-400">
                <span>Issued: {cert.issuedDate}</span>
              </div>
              <a
                href={cert.verificationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-semibold text-accent-emerald hover:underline"
              >
                <span>Verify Credential</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
