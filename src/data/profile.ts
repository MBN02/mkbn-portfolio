import { ProfileSchema, SocialLinkSchema, type Profile, type SocialLink } from './schemas';

export const profile: Profile = ProfileSchema.parse({
  name: 'Mohan Kumar BN',
  shortName: 'Mohan Kumar',
  brandName: 'MKBN Tech',
  headline: {
    line1: 'Engineering Platforms.',
    line2: 'Automating Infrastructure.',
    line3: 'Building Reliability.',
  },
  roleTagline:
    'Senior Platform Engineer | SRE | Kubernetes & OpenShift | Cloud Infrastructure | GitOps | Platform Automation',
  title: 'Senior Platform Engineer & CNCF Certified Kubestronaut',
  location: 'Bangalore, India',
  primaryEmail: 'pea.mohan@gmail.com',
  communityEmail: 'mkbntech@gmail.com',
  domain: 'https://www.mkbn.in',
  blogDomain: 'https://www.mkbntech.com',
  credlyUrl: 'https://www.credly.com/users/mohan-kumar-bn',
  youtubeChannelId: 'UCrScDsPZSceXgZOLJGrOOIw',
  youtubeUrl: 'https://www.youtube.com/@mkbn-tech',
  githubUrl: 'https://github.com/mkbntech',
  linkedinUrl: 'https://www.linkedin.com/in/mohankumarbn',
  resumeUrl: '/resume/Mohan-Kumar-BN-Platform-Engineer-Resume.pdf',
  portraitUrl: '/images/mohan-portrait.png',
  shortBio:
    'Senior Platform Engineer with 13+ years of experience designing, automating, and operating mission-critical Kubernetes platforms across GCP, GKE, Azure, AWS, and on-premises Red Hat OpenShift. Proven track record supporting 60+ Kubernetes clusters and 200+ GCP projects in production through Internal Developer Platforms, GitOps, Infrastructure as Code, zero-trust security, and SRE observability.',
  extendedBio: [
    'I am a Senior Platform Engineer and CNCF Certified Kubestronaut based in Bangalore, India, specializing in enterprise multi-cluster container platforms, GitOps delivery architectures, and Internal Developer Platforms (IDP) that transform infrastructure into self-service products.',
    'Currently at Henkel, I architect and operate enterprise Red Hat OpenShift platforms hosting both cloud-native microservices and virtualized workloads via OpenShift Virtualization. I build golden paths using Port IDP, OpenShift GitOps (Argo CD), Tekton (OpenShift Pipelines), GitLab CI/CD, HashiCorp Vault with External Secrets Operator, Wiz CNAPP security guardrails, and Veeam Kasten disaster recovery.',
    'Previously as a Senior Site Reliability Engineer at OpsRamp (an HPE company) and Technical Lead at Hewlett Packard Enterprise, I maintained 99.9% production SLAs for SaaS observability platforms, engineered software supply chain security with Cosign and OPA Gatekeeper, and led multi-cloud Infrastructure as Code across 60+ Kubernetes clusters and 200+ cloud projects.',
    'Beyond enterprise engineering, I run the MKBN-Tech YouTube channel and engineering blog (700+ subscribers, 45K+ views), publishing production-grade masterclasses on OpenShift HA upgrades, ephemeral GitOps environments, Ceph/Longhorn storage, and Autonomous AI SRE agents.',
  ],
  areasOfOwnership: [
    {
      title: 'Enterprise Multi-Cluster Platforms',
      description:
        'Full lifecycle ownership of on-premises Red Hat OpenShift and cloud-managed GKE/AKS/EKS fleets—spanning zero-downtime HA upgrades, capacity engineering, and converged container + VM orchestration.',
      metrics: '60+ Kubernetes Clusters · 200+ Cloud Projects',
      icon: 'Server',
    },
    {
      title: 'Internal Developer Platforms & GitOps',
      description:
        'Designing self-service developer portals with Port, declarative continuous delivery with OpenShift GitOps (Argo CD), Helm/Kustomize templates, and Kubernetes-native CI/CD with Tekton & GitLab.',
      metrics: 'Zero-Drift Declarative Delivery · Self-Service Golden Paths',
      icon: 'GitBranch',
    },
    {
      title: 'Zero-Trust Security & Supply Chain Governance',
      description:
        'Eliminating static credentials via HashiCorp Vault & External Secrets Operator, enforcing Cosign image signing & OPA admission gates, and integrating Wiz CNAPP posture management.',
      metrics: 'Vault + ESO · Cosign + OPA · Wiz CNAPP',
      icon: 'ShieldCheck',
    },
    {
      title: 'Site Reliability, Observability & AI Ops',
      description:
        'Architecting Prometheus, Grafana, Alertmanager, and Loki telemetry stacks alongside Veeam Kasten DR and autonomous AI SRE agents (CrewAI, Ollama, K8sGPT) for rapid incident remediation.',
      metrics: '99.9% Production SLA · Autonomous L1 Remediation',
      icon: 'Activity',
    },
  ],
  metrics: [
    {
      value: '13+ Yrs',
      label: 'Engineering Experience',
      detail: 'Enterprise Infrastructure, SRE & Platform Engineering',
    },
    {
      value: '60+',
      label: 'Kubernetes Clusters',
      detail: 'Operated across OpenShift, GKE, AKS & EKS',
    },
    {
      value: '200+',
      label: 'Cloud Projects',
      detail: 'Standardized with reusable Terraform & GitOps',
    },
    {
      value: '99.9%',
      label: 'Production SLA',
      detail: '24/7 high-availability SaaS & enterprise platforms',
    },
    {
      value: 'Kubestronaut',
      label: 'CNCF Accredited',
      detail: 'All 5 CNCF K8s Certs + GCP Architect & Security + AZ-400',
    },
    {
      value: '45K+ Views',
      label: 'MKBN-Tech Community',
      detail: '700+ Subscribers · Hands-on OpenShift & K8s Masterclasses',
    },
  ],
  philosophy: [
    {
      id: 'platform-as-product',
      title: 'Treat the Platform as a Product',
      principle: 'Golden Paths Over Ticket Queues',
      description:
        'An Internal Developer Platform succeeds when the most secure, observable, and compliant way to ship software is also the path of least resistance for application engineers.',
      icon: 'Layers',
    },
    {
      id: 'declarative-everything',
      title: 'Declarative Convergence & Zero Drift',
      principle: 'Git Is the Single Source of Truth',
      description:
        'Every cluster configuration, RBAC policy, network boundary, and workload manifest must be versioned, peer-reviewed, and continuously reconciled via GitOps.',
      icon: 'GitCommit',
    },
    {
      id: 'security-by-default',
      title: 'Shift-Left & Runtime Zero Trust',
      principle: 'Identity-Driven Guardrails',
      description:
        'Security cannot be a manual gate at the end of a release. Dynamic secrets via Vault/ESO, signed OCI artifacts, SCCs, and OPA admission policies enforce compliance automatically.',
      icon: 'Lock',
    },
    {
      id: 'resilience-engineering',
      title: 'Design for Graceful Failure',
      principle: 'Verified Recovery Over Assumed Uptime',
      description:
        'High availability requires proactive soak windows, MachineConfigPool drain safeguards, high-signal SLO alerting, and regularly rehearsed disaster recovery with Kasten and Ceph/Longhorn.',
      icon: 'ShieldAlert',
    },
  ],
  education: [
    {
      degree: 'Bachelor of Engineering (B.E.) in Electronics and Communication Engineering',
      institution: 'PES University',
      location: 'Bangalore, India',
      type: 'degree',
    },
    {
      degree: 'DevOps Engineer Master Program',
      institution: 'Simplilearn',
      location: 'Bangalore, India',
      type: 'program',
    },
  ],
});

export const socialLinks: SocialLink[] = [
  {
    id: 'linkedin',
    label: 'LinkedIn',
    url: 'https://www.linkedin.com/in/mohankumarbn',
    handle: 'in/mohankumarbn',
    icon: 'Linkedin',
    primary: true,
  },
  {
    id: 'github',
    label: 'GitHub',
    url: 'https://github.com/mkbntech',
    handle: '@mkbntech',
    icon: 'Github',
    primary: true,
  },
  {
    id: 'youtube',
    label: 'YouTube (MKBN-Tech)',
    url: 'https://www.youtube.com/@mkbn-tech',
    handle: '@mkbn-tech',
    icon: 'Youtube',
    primary: true,
  },
  {
    id: 'credly',
    label: 'Credly Credentials',
    url: 'https://www.credly.com/users/mohan-kumar-bn',
    handle: 'mohan-kumar-bn',
    icon: 'Award',
    primary: true,
  },
  {
    id: 'blog',
    label: 'MKBN-Tech Docs & Blog',
    url: 'https://www.mkbntech.com',
    handle: 'mkbntech.com',
    icon: 'BookOpen',
    primary: false,
  },
  {
    id: 'email',
    label: 'Direct Email',
    url: 'mailto:pea.mohan@gmail.com',
    handle: 'pea.mohan@gmail.com',
    icon: 'Mail',
    primary: true,
  },
].map((item) => SocialLinkSchema.parse(item));

export const navigationItems = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Expertise', href: '/expertise' },
  { label: 'Projects', href: '/projects' },
  { label: 'Certifications', href: '/certifications' },
  { label: 'Blog', href: '/blog' },
  { label: 'Videos', href: '/videos' },
  { label: 'Resume', href: '/resume' },
  { label: 'Contact', href: '/contact' },
] as const;
