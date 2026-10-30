import React, { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import {
  Terminal,
  GitBranch,
  Boxes,
  Cloud,
  Activity,
  CheckCircle2,
  ShieldCheck,
  Cpu,
  Copy,
  Check,
  Radio,
} from 'lucide-react';

interface PipelineStage {
  id: string;
  step: string;
  label: string;
  sublabel: string;
  status: string;
  latencyOrMetric: string;
  tools: string[];
  commandSnippet: string;
  telemetryDetail: string;
  accent: 'blue' | 'cyan' | 'violet' | 'emerald';
}

const PIPELINE_STAGES: PipelineStage[] = [
  {
    id: 'developer',
    step: '01',
    label: 'Developer & Port IDP',
    sublabel: 'Self-Service Golden Paths',
    status: 'CATALOG_READY',
    latencyOrMetric: 'Zero Ticket Wait',
    tools: ['Port IDP', 'GitLab', 'Tekton CI', 'Cosign'],
    commandSnippet: '$ port action invoke create-openshift-tenant --env=prod-ha --quota=tier-1',
    telemetryDetail:
      'Self-service onboarding triggers Tekton pipelines, Trivy/Snyk CVE scans, and Cosign image signing before committing declarative manifests.',
    accent: 'blue',
  },
  {
    id: 'gitops',
    step: '02',
    label: 'GitOps Control Plane',
    sublabel: 'Argo CD & OpenShift GitOps',
    status: 'SYNCED // HEALTHY',
    latencyOrMetric: '0% Config Drift',
    tools: ['Argo CD', 'OpenShift GitOps', 'Helm', 'Kustomize'],
    commandSnippet: '$ argocd app sync trailhead-prod --prune --timeout 120',
    telemetryDetail:
      'ApplicationSets continuously reconcile SNO staging, ephemeral PR preview namespaces, and multi-node HA production clusters.',
    accent: 'cyan',
  },
  {
    id: 'kubernetes',
    step: '03',
    label: 'Kubernetes & OpenShift',
    sublabel: 'Multi-Cluster & Virtualization',
    status: '60+ CLUSTERS ONLINE',
    latencyOrMetric: 'Zero-Downtime HA',
    tools: ['Red Hat OpenShift 4', 'OpenShift Virt', 'GKE / AKS / EKS', 'Vault + ESO'],
    commandSnippet: '$ oc get clusterversion,mcp && kubectl get externalsecrets -A',
    telemetryDetail:
      'Converged container and KubeVirt VM workloads hardened with restricted SCCs, OPA Gatekeeper, and dynamic HashiCorp Vault secrets.',
    accent: 'violet',
  },
  {
    id: 'cloud',
    step: '04',
    label: 'Cloud & Bare-Metal IaC',
    sublabel: 'GCP · Azure · AWS · Ceph',
    status: '200+ CLOUD PROJECTS',
    latencyOrMetric: '100% Codified IaC',
    tools: ['Terraform', 'Ansible', 'GCP / Azure / AWS', 'Ceph & Longhorn'],
    commandSnippet: '$ terraform apply -target=module.gke_fleet && ansible-playbook rke2-ha.yml',
    telemetryDetail:
      'Standardized multi-cloud landing zones and bare-metal HA load balancers (HAProxy + Keepalived) backed by self-healing Ceph & Longhorn storage.',
    accent: 'blue',
  },
  {
    id: 'observability',
    step: '05',
    label: 'Observability & AI SRE',
    sublabel: 'Prometheus · Loki · Kasten · CrewAI',
    status: '99.9% PROD SLA',
    latencyOrMetric: 'Autonomous L1 Triage',
    tools: ['Prometheus & Grafana', 'Loki', 'Veeam Kasten DR', 'CrewAI + K8sGPT'],
    commandSnippet: '$ k8sgpt analyze --explain --backend=localai && k10-backup verify',
    telemetryDetail:
      'Full-stack Golden Signal telemetry, Veeam Kasten DR protection, and in-cluster Autonomous AI SRE agents powered by local Ollama LLMs.',
    accent: 'emerald',
  },
];

export default function PlatformPipelineHero() {
  const [activeIndex, setActiveIndex] = useState<number>(2); // Default focus on Kubernetes & OpenShift
  const [isAutoCycling, setIsAutoCycling] = useState<boolean>(true);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [copied, setCopied] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted || shouldReduceMotion || !isAutoCycling) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % PIPELINE_STAGES.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [isMounted, shouldReduceMotion, isAutoCycling]);

  const activeStage = PIPELINE_STAGES[activeIndex];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  const handleCopyCommand = () => {
    const cleanCmd = activeStage.commandSnippet.replace(/^\$\s*/, '');
    navigator.clipboard?.writeText(cleanCmd);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  const renderIcon = (id: string, className: string) => {
    switch (id) {
      case 'developer':
        return <Terminal className={className} />;
      case 'gitops':
        return <GitBranch className={className} />;
      case 'kubernetes':
        return <Boxes className={className} />;
      case 'cloud':
        return <Cloud className={className} />;
      case 'observability':
        return <Activity className={className} />;
      default:
        return <Cpu className={className} />;
    }
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsAutoCycling(false)}
      onMouseLeave={() => setIsAutoCycling(true)}
      className="glass-panel relative overflow-hidden rounded-2xl border border-slate-400/20 p-5 sm:p-7 shadow-glass"
      role="region"
      aria-label="Interactive Platform Engineering Control Plane Visualization"
    >
      {/* Dynamic mouse-reactive radial spotlight */}
      {isMounted && !shouldReduceMotion && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 transition-opacity duration-300"
          style={{
            background: `radial-gradient(560px circle at ${mousePos.x}% ${mousePos.y}%, rgba(34, 211, 238, 0.11), rgba(59, 130, 246, 0.04) 45%, transparent 70%)`,
          }}
        />
      )}

      {/* Control Plane Top Bar */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 border-b border-slate-400/15 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-1.5">
            <span className="radar-dot h-2.5 w-2.5 rounded-full bg-accent-emerald" />
            <span className="h-2.5 w-2.5 rounded-full bg-accent-cyan/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-accent-blue/70" />
          </div>
          <span className="font-mono text-xs font-semibold tracking-wider text-slate-50">
            LIVE ARCHITECTURE // PLATFORM CONTROL PLANE
          </span>
        </div>
        <div className="flex items-center gap-2 font-mono text-[11px]">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-accent-emerald/30 bg-accent-emerald/10 px-2.5 py-0.5 text-accent-emerald">
            <CheckCircle2 className="h-3 w-3" />
            SLA 99.9%
          </span>
          <span className="hidden sm:inline-flex items-center gap-1 rounded-full border border-accent-cyan/30 bg-obsidian-900/90 px-2.5 py-0.5 text-accent-cyan">
            <ShieldCheck className="h-3 w-3" />
            KUBESTRONAUT VERIFIED
          </span>
        </div>
      </div>

      {/* 5-Node Interactive Pipeline Flow */}
      <div className="relative z-10 mt-6">
        {/* Multi-Packet Animated SVG Telemetry Bus on Desktop */}
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute left-0 top-1/2 hidden h-14 w-full -translate-y-1/2 lg:block"
          viewBox="0 0 1000 56"
          fill="none"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="bus-glow" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(59, 130, 246, 0.1)" />
              <stop offset="50%" stopColor="rgba(34, 211, 238, 0.45)" />
              <stop offset="100%" stopColor="rgba(16, 185, 129, 0.1)" />
            </linearGradient>
          </defs>
          <line
            x1="70"
            y1="28"
            x2="930"
            y2="28"
            stroke="url(#bus-glow)"
            strokeWidth="2"
            strokeDasharray="6 6"
          />
          {isMounted && !shouldReduceMotion && (
            <>
              {/* Primary Forward Telemetry Packet */}
              <motion.circle
                cx="70"
                cy="28"
                r="5"
                fill="#22D3EE"
                animate={{ cx: [70, 930] }}
                transition={{
                  duration: 4.2,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              />
              {/* Secondary Staggered Packet */}
              <motion.circle
                cx="70"
                cy="28"
                r="4"
                fill="#3B82F6"
                animate={{ cx: [70, 930] }}
                transition={{
                  duration: 4.2,
                  delay: 2.1,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              />
              {/* Reverse Feedback Loop Packet (Observability -> Control Plane) */}
              <motion.circle
                cx="930"
                cy="28"
                r="3.5"
                fill="#10B981"
                animate={{ cx: [930, 70] }}
                transition={{
                  duration: 5.6,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              />
            </>
          )}
        </svg>

        <div
          role="tablist"
          aria-label="Platform Engineering Pipeline Stages"
          className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5"
        >
          {PIPELINE_STAGES.map((stage, idx) => {
            const isSelected = idx === activeIndex;
            return (
              <button
                key={stage.id}
                role="tab"
                type="button"
                aria-selected={isSelected}
                aria-controls={`stage-panel-${stage.id}`}
                id={`stage-tab-${stage.id}`}
                onClick={() => {
                  setActiveIndex(idx);
                  setIsAutoCycling(false);
                }}
                className={`group relative flex flex-col justify-between overflow-hidden rounded-xl border p-4 text-left transition-all duration-300 ${
                  isSelected
                    ? 'border-accent-cyan bg-obsidian-800/95 shadow-glow-cyan -translate-y-0.5'
                    : 'border-slate-400/15 bg-obsidian-900/85 hover:-translate-y-0.5 hover:border-accent-blue/40 hover:bg-obsidian-800/75'
                }`}
              >
                {/* Animated Auto-Cycle Progress Bar on Active Tab */}
                {isMounted && isSelected && !shouldReduceMotion && isAutoCycling && (
                  <motion.div
                    key={`progress-${stage.id}`}
                    aria-hidden="true"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 4.5, ease: 'linear' }}
                    style={{ transformOrigin: 'left' }}
                    className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-accent-blue via-accent-cyan to-accent-emerald"
                  />
                )}

                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-[11px] font-semibold text-accent-cyan">
                    STAGE {stage.step}
                  </span>
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-lg border transition-all duration-300 ${
                      isSelected
                        ? 'scale-105 border-accent-cyan/50 bg-accent-cyan/15 text-accent-cyan'
                        : 'border-slate-400/15 bg-obsidian-800 text-slate-400 group-hover:scale-105 group-hover:text-slate-50'
                    }`}
                  >
                    {renderIcon(stage.id, 'h-4 w-4')}
                  </div>
                </div>

                <div className="mt-3">
                  <p className="text-sm font-bold text-slate-50">{stage.label}</p>
                  <p className="mt-0.5 text-xs text-slate-400">{stage.sublabel}</p>
                </div>

                <div className="mt-3 flex items-center justify-between border-t border-slate-400/10 pt-2.5 font-mono text-[10px]">
                  <span className={isSelected ? 'text-accent-emerald' : 'text-slate-400'}>
                    ● {stage.latencyOrMetric}
                  </span>
                  <span className="text-accent-cyan">
                    {isSelected ? 'ACTIVE' : 'INSPECT →'}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Live Telemetry & Inspector Panel for Selected Node */}
      <motion.div
        key={activeStage.id}
        id={`stage-panel-${activeStage.id}`}
        role="tabpanel"
        aria-labelledby={`stage-tab-${activeStage.id}`}
        initial={shouldReduceMotion ? false : { y: 8 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 320, damping: 28 }}
        className="relative z-10 mt-5 rounded-xl border border-slate-400/15 bg-obsidian-900/95 p-4 sm:p-5"
      >
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-md bg-accent-blue/15 px-2.5 py-0.5 font-mono text-xs font-semibold text-accent-cyan">
                <Radio className="h-3 w-3 animate-pulse" />
                {activeStage.status}
              </span>
              <span className="font-mono text-xs text-slate-400">// {activeStage.label}</span>
            </div>
            <p className="mt-2.5 text-sm leading-relaxed text-slate-50">
              {activeStage.telemetryDetail}
            </p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {activeStage.tools.map((tool) => (
                <span
                  key={tool}
                  className="rounded-lg border border-slate-400/15 bg-obsidian-800 px-2.5 py-1 font-mono text-xs text-slate-50 transition-colors hover:border-accent-cyan/40"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-xl border border-slate-400/15 bg-obsidian-800/90 p-3.5 font-mono text-xs">
              <div className="mb-2 flex items-center justify-between text-[11px] text-slate-400">
                <span className="flex items-center gap-1.5 text-accent-cyan">
                  <Terminal className="h-3.5 w-3.5" />
                  CONTROL_PLANE_CLI // zsh
                </span>
                <button
                  type="button"
                  onClick={handleCopyCommand}
                  aria-label="Copy CLI command to clipboard"
                  className="inline-flex items-center gap-1 rounded border border-slate-400/20 bg-obsidian-900/80 px-2 py-0.5 text-[10px] text-slate-50 transition-colors hover:border-accent-cyan/50 hover:text-accent-cyan"
                >
                  {copied ? (
                    <>
                      <Check className="h-3 w-3 text-accent-emerald" />
                      <span className="text-accent-emerald">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3 w-3" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
              <div className="flex items-center gap-1.5 overflow-x-auto whitespace-nowrap py-0.5 text-accent-emerald">
                <code>{activeStage.commandSnippet}</code>
                <span
                  aria-hidden="true"
                  className="inline-block h-3.5 w-1.5 animate-pulse bg-accent-cyan/80"
                />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
