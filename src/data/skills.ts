import { SkillDomainSchema, type SkillDomain } from './schemas';

export const skillDomains: SkillDomain[] = [
  {
    id: 'container-platforms',
    title: 'Container Platforms & Orchestration',
    subtitle: 'Enterprise Multi-Cluster Kubernetes & Red Hat OpenShift Operations',
    icon: 'Boxes',
    accentColor: 'blue',
    architecturalScope:
      'Full lifecycle architecture, day-2 operations, zero-downtime upgrades, and multi-tenant governance across 60+ production and non-production Kubernetes and OpenShift clusters.',
    skills: [
      {
        name: 'Red Hat OpenShift',
        slug: 'red-hat-openshift',
        category: 'Container Platforms',
        roleContext: 'Senior Platform Engineer @ Henkel · MKBN-Tech Masterclass Instructor',
        productionSummary:
          'Architect and operate enterprise on-premises OpenShift 4 clusters supporting mission-critical workloads. Execute zero-downtime HA control plane and MachineConfigPool worker upgrades, configure OAuth/Corporate SSO, and enforce multi-tenant guardrails.',
        keyPatterns: [
          'Zero-downtime HA cluster upgrades with MCP pause/soak gates',
          'Multi-tenant namespace isolation, ResourceQuotas, LimitRanges & NetworkPolicies',
          'Operator Lifecycle Manager (OLM) day-2 automation',
        ],
        evidenceLinks: [
          {
            label: 'Case Study: Enterprise OpenShift Platform',
            href: '/projects/enterprise-openshift-platform',
            type: 'project',
          },
          {
            label: 'Video: Zero Downtime OpenShift HA Upgrade',
            href: 'https://www.youtube.com/watch?v=wXSIgwyIRaI',
            type: 'video',
          },
          {
            label: 'Repo: OpenShift Administrator Course',
            href: 'https://github.com/mkbntech/openshift-administrator',
            type: 'repo',
          },
        ],
      },
      {
        name: 'Kubernetes (Upstream, RKE2, Kubeadm)',
        slug: 'kubernetes',
        category: 'Container Platforms',
        roleContext: 'CNCF Certified Kubestronaut (CKA, CKS, CKAD, KCNA, KCSA)',
        productionSummary:
          'Deep control-plane and workload orchestration expertise spanning stacked etcd HA bare-metal clusters, Rancher RKE2, Cluster API, and fleet-scale multi-cluster governance.',
        keyPatterns: [
          'HA stacked etcd control planes with HAProxy + Keepalived VIP failover',
          'RKE2 security-hardened cluster provisioning via Ansible',
          'Custom scheduling, taints/tolerations, topology spread constraints & HPA/VPA',
        ],
        evidenceLinks: [
          {
            label: 'Blog: HA Kubernetes Cluster on Baremetal',
            href: '/blog/k8s-kubeadm-ha-cluster',
            type: 'blog',
          },
          {
            label: 'Blog: RKE2 HA Cluster with Ansible',
            href: '/blog/rke2-ha-ansible',
            type: 'blog',
          },
          {
            label: 'Repo: kubernetes-ha-setup',
            href: 'https://github.com/mkbntech/kubernetes-ha-setup',
            type: 'repo',
          },
        ],
      },
      {
        name: 'OpenShift Virtualization (KubeVirt)',
        slug: 'openshift-virtualization',
        category: 'Container Platforms',
        roleContext: 'Senior Platform Engineer @ Henkel',
        productionSummary:
          'Engineered converged application platforms running virtual machines alongside containerized microservices on OpenShift, enabling application teams to modernize legacy VM workloads without dual-stack operational overhead.',
        keyPatterns: [
          'Unified VM and Pod networking & storage classes',
          'Live migration and Veeam Kasten snapshot protection for virtualized workloads',
          'Golden base images and declarative VirtualMachine manifests via GitOps',
        ],
        evidenceLinks: [
          {
            label: 'Case Study: Converged OpenShift Platform',
            href: '/projects/enterprise-openshift-platform',
            type: 'project',
          },
          {
            label: 'Video: From Kubernetes to OpenShift',
            href: 'https://www.youtube.com/watch?v=z-MzaoWP2tU',
            type: 'video',
          },
        ],
      },
      {
        name: 'Managed Kubernetes (GKE, AKS, EKS) & Rancher',
        slug: 'managed-kubernetes-fleet',
        category: 'Container Platforms',
        roleContext: 'Senior SRE @ OpsRamp · Technical Lead @ HPE',
        productionSummary:
          'Provisioned and operated 60+ managed clusters across Google Kubernetes Engine (GKE), Azure Kubernetes Service (AKS), Amazon EKS, Anthos, and Rancher multi-cluster control planes.',
        keyPatterns: [
          'Rancher multi-cluster lifecycle management with Let’s Encrypt TLS',
          'GKE private cluster provisioning with Workload Identity and node auto-provisioning',
          'Fleet-wide policy synchronization across hybrid environments',
        ],
        evidenceLinks: [
          {
            label: 'Case Study: Multi-Cloud Fleet Automation',
            href: '/projects/multi-cloud-fleet-automation',
            type: 'project',
          },
          {
            label: 'Blog: Install Rancher on Kubernetes',
            href: '/blog/rancher-installation',
            type: 'blog',
          },
        ],
      },
    ],
  },
  {
    id: 'cicd-gitops',
    title: 'CI/CD & GitOps Delivery',
    subtitle:
      'Declarative Continuous Delivery, Ephemeral Environments & Kubernetes-Native Pipelines',
    icon: 'GitBranch',
    accentColor: 'cyan',
    architecturalScope:
      'End-to-end automated software delivery from commit to multi-cluster production using OpenShift GitOps (Argo CD), Tekton, GitLab CI/CD, Helm, and Kustomize.',
    skills: [
      {
        name: 'Argo CD & OpenShift GitOps',
        slug: 'argocd-openshift-gitops',
        category: 'CI/CD and GitOps',
        roleContext: 'Senior Platform Engineer @ Henkel · LFS169 Certified',
        productionSummary:
          'Architected declarative, zero-drift continuous delivery across Single-Node OpenShift (SNO) staging and multi-node HA production clusters using Argo CD ApplicationSets, sync waves, and PR-driven ephemeral preview environments.',
        keyPatterns: [
          'Pull Request Generator ApplicationSets for instant ephemeral preview namespaces',
          'App-of-Apps & ApplicationSet multi-cluster promotion patterns',
          'Automated drift detection, self-healing reconciliation, and sync hooks',
        ],
        evidenceLinks: [
          {
            label: 'Case Study: GitOps & Ephemeral Environments',
            href: '/projects/serverless-gitops-cicd-platform',
            type: 'project',
          },
          {
            label: 'Video: Ephemeral Environments with Argo CD',
            href: 'https://www.youtube.com/watch?v=7y-JO4bSPqg',
            type: 'video',
          },
          {
            label: 'Repo: app-services-gitops',
            href: 'https://github.com/mkbntech/app-services-gitops',
            type: 'repo',
          },
        ],
      },
      {
        name: 'Tekton (OpenShift Pipelines)',
        slug: 'tekton-openshift-pipelines',
        category: 'CI/CD and GitOps',
        roleContext: 'Senior Platform Engineer @ Henkel',
        productionSummary:
          'Engineered reusable, serverless Kubernetes-native CI pipelines on OpenShift Pipelines (Tekton) for automated source builds, vulnerability scanning, OCI image signing, and GitOps manifest updates.',
        keyPatterns: [
          'Custom Tekton Tasks, Pipelines, Triggers & EventListeners',
          'Rootless container image builds (Buildah/Kaniko) integrated with Harbor & Quay',
          'Automated GitOps commit-back of immutable image digests',
        ],
        evidenceLinks: [
          {
            label: 'Case Study: Serverless GitOps CI/CD',
            href: '/projects/serverless-gitops-cicd-platform',
            type: 'project',
          },
          {
            label: 'Video: Complete GitOps CI/CD Platform on OpenShift',
            href: 'https://www.youtube.com/watch?v=CmrsAaxZrPM',
            type: 'video',
          },
        ],
      },
      {
        name: 'GitLab CI/CD, GitHub Actions & Jenkins',
        slug: 'gitlab-cicd-jenkins',
        category: 'CI/CD and GitOps',
        roleContext: 'GitLab Certified Associate · Senior SRE @ OpsRamp',
        productionSummary:
          'Built standardized pipeline-as-code templates across GitLab CI/CD, GitHub Actions, Azure Pipelines, and Kubernetes-hosted Jenkins controllers with dynamic agent pods.',
        keyPatterns: [
          'Self-hosted GitLab omnibus deployment & runner autoscaling via Ansible',
          'Dynamic Kubernetes pod agents for Jenkins pipelines',
          'Integrated SAST, container CVE scanning (Trivy/Snyk) & artifact promotion (Harbor/Nexus/JFrog)',
        ],
        evidenceLinks: [
          {
            label: 'Blog: Self-Hosted GitLab with Ansible',
            href: '/blog/gitlab',
            type: 'blog',
          },
          {
            label: 'Blog: Running Jenkins on Kubernetes',
            href: '/blog/jenkins',
            type: 'blog',
          },
          {
            label: 'Repo: self-hosted-gitlab-instance',
            href: 'https://github.com/mkbntech/self-hosted-gitlab-instance',
            type: 'repo',
          },
        ],
      },
      {
        name: 'Helm, Kustomize & Knative Serverless',
        slug: 'helm-kustomize',
        category: 'CI/CD and GitOps',
        roleContext: 'Senior Platform Engineer @ Henkel · Senior SRE @ OpsRamp',
        productionSummary:
          'Authored reusable Helm charts and environment-specific Kustomize overlays to promote workload consistency across INT, QA, Dev, UAT, and Production clusters without duplicating YAML.',
        keyPatterns: [
          'Base + environment overlay Kustomize hierarchies for SNO & HA Production',
          'Versioned Helm chart libraries with strict schema validation',
          'Knative Serving scale-to-zero microservice deployments',
        ],
        evidenceLinks: [
          {
            label: 'Video: How Modern Platform Teams Deploy to K8s',
            href: 'https://www.youtube.com/watch?v=0Rs1mMiFTBI',
            type: 'video',
          },
          {
            label: 'Repo: finance-api-ops',
            href: 'https://github.com/mkbntech/finance-api-ops',
            type: 'repo',
          },
        ],
      },
    ],
  },
  {
    id: 'platform-engineering-ai',
    title: 'Platform Engineering & Autonomous AI Ops',
    subtitle: 'Internal Developer Platforms (Port), Golden Paths & Agentic Kubernetes SRE',
    icon: 'Cpu',
    accentColor: 'violet',
    architecturalScope:
      'Transforming complex infrastructure into self-service developer experiences via Port IDP and pioneering autonomous in-cluster AI SRE workflows with CrewAI, Ollama, and K8sGPT.',
    skills: [
      {
        name: 'Port Internal Developer Platform (IDP)',
        slug: 'port-idp',
        category: 'Platform Engineering',
        roleContext: 'Senior Platform Engineer @ Henkel',
        productionSummary:
          'Built and scaled an Internal Developer Platform using Port that enables developers and application owners to self-service OpenShift namespaces, quotas, and onboarding workflows without manual platform tickets.',
        keyPatterns: [
          'Software catalog modeling for clusters, namespaces, services, and environments',
          'Self-service day-2 actions backed by GitOps PR generation and API automation',
          'Embedded scorecards enforcing production readiness (probes, quotas, backup labels)',
        ],
        evidenceLinks: [
          {
            label: 'Case Study: Port Self-Service IDP',
            href: '/projects/port-internal-developer-platform',
            type: 'project',
          },
          {
            label: 'Video: Production Ready OpenShift Apps',
            href: 'https://www.youtube.com/watch?v=7jFnzBQ5E64',
            type: 'video',
          },
        ],
      },
      {
        name: 'Autonomous AI SRE Agents (CrewAI, Ollama, K8sGPT)',
        slug: 'autonomous-ai-sre',
        category: 'Platform Engineering',
        roleContext: 'Creator of Autonomous AI SRE Crew & MKBN-Tech AI Ops Series',
        productionSummary:
          'Designed and deployed in-cluster autonomous AI SRE agent crews using Python, CrewAI, K8sGPT, kubectl-ai, kagent, and local GPU-accelerated Ollama LLMs to continuously monitor Golden Signals, diagnose pod failures, and execute guarded remediations.',
        keyPatterns: [
          'Event-driven L1 SRE triage of CrashLoopBackOff & OOMKilled workloads',
          'Privacy-preserving local LLM inference on Kubernetes with NVIDIA GPU Operator',
          'Model Context Protocol (MCP) integrations for zero-config cloud & cluster operations',
        ],
        evidenceLinks: [
          {
            label: 'Case Study: Autonomous AI SRE Crew',
            href: '/projects/autonomous-ai-sre-crew',
            type: 'project',
          },
          {
            label: 'Blog: AI Troubleshooting with K8sGPT',
            href: '/blog/k8sgpt',
            type: 'blog',
          },
          {
            label: 'Blog: Supercharge K8s with kubectl-ai',
            href: '/blog/kubectl-ai',
            type: 'blog',
          },
          {
            label: 'Repo: autonomous-ai-sre-crew',
            href: 'https://github.com/mkbntech/autonomous-ai-sre-crew',
            type: 'repo',
          },
        ],
      },
      {
        name: 'Developer Golden Paths & API Automation',
        slug: 'golden-paths-automation',
        category: 'Platform Engineering',
        roleContext: 'Senior Platform Engineer @ Henkel',
        productionSummary:
          'Automated repetitive platform operations using Python, Go templates, Bash, and Kubernetes/OpenShift REST APIs to eliminate operational toil and standardize application onboarding.',
        keyPatterns: [
          'Standardized helm/kustomize starter kits with baked-in observability & security',
          'Automated compliance pre-checks before production promotion',
          'Local multi-cloud developer emulation using Floci & MicroK8s',
        ],
        evidenceLinks: [
          {
            label: 'Case Study: DevOps & Cloud Native Tools Hub',
            href: '/projects/devops-tools-hub',
            type: 'project',
          },
          {
            label: 'Video: Run AWS, Azure & GCP Locally',
            href: 'https://www.youtube.com/watch?v=vtkEd8QS5p8',
            type: 'video',
          },
        ],
      },
    ],
  },
  {
    id: 'security-secrets',
    title: 'Security, Secrets & Supply Chain',
    subtitle: 'Zero-Trust Workload Identity, Vault + ESO, Cosign/OPA & Wiz CNAPP',
    icon: 'ShieldCheck',
    accentColor: 'emerald',
    architecturalScope:
      'Defense-in-depth platform security across the 4Cs of Cloud Native—from signed OCI artifacts and admission control to runtime secret injection and CNAPP posture management.',
    skills: [
      {
        name: 'HashiCorp Vault & External Secrets Operator (ESO)',
        slug: 'vault-external-secrets',
        category: 'Security and Secrets',
        roleContext: 'Senior Platform Engineer @ Henkel',
        productionSummary:
          'Designed and operated enterprise secrets management architectures integrating HashiCorp Vault and Azure Key Vault with External Secrets Operator (ESO), eliminating hard-coded secrets from Git repositories and CI pipelines.',
        keyPatterns: [
          'Kubernetes ServiceAccount JWT authentication to HashiCorp Vault',
          'Declarative ExternalSecret & ClusterSecretStore CRD reconciliation',
          'Automated secret rotation and least-privilege namespace scoping',
        ],
        evidenceLinks: [
          {
            label: 'Case Study: Zero-Trust Secrets & Supply Chain',
            href: '/projects/zero-trust-secrets-supply-chain',
            type: 'project',
          },
        ],
      },
      {
        name: 'OpenShift RBAC, SCCs & Corporate SSO',
        slug: 'openshift-rbac-scc',
        category: 'Security and Secrets',
        roleContext: 'Senior Platform Engineer @ Henkel · CKS & KCSA Certified',
        productionSummary:
          'Replaced default cluster-admin credentials with enterprise OAuth/OIDC SSO identity providers, group-based RBAC bindings, restricted Security Context Constraints (SCCs), and zero-trust NetworkPolicies.',
        keyPatterns: [
          'Transitioning from kubeadmin to corporate IdP with automated GroupSync',
          'Custom least-privilege SCCs preventing privileged container escalation',
          'Default-deny ingress/egress NetworkPolicies per tenant namespace',
        ],
        evidenceLinks: [
          {
            label: 'Video: From kubeadmin to Corporate SSO & RBAC',
            href: 'https://www.youtube.com/watch?v=uyKcb_jXgb4',
            type: 'video',
          },
          {
            label: 'Case Study: Enterprise OpenShift Platform',
            href: '/projects/enterprise-openshift-platform',
            type: 'project',
          },
        ],
      },
      {
        name: 'Supply Chain Security (Cosign, OPA, Wiz CNAPP, Harbor)',
        slug: 'supply-chain-security',
        category: 'Security and Secrets',
        roleContext: 'Senior Platform Engineer @ Henkel · Senior SRE @ OpsRamp',
        productionSummary:
          'Enforced end-to-end software supply chain integrity by scanning images with Trivy/Snyk, hosting private OCI artifacts in Harbor, signing images with Sigstore Cosign, gating admissions via OPA Policy Agent, and monitoring cloud posture with Wiz CNAPP.',
        keyPatterns: [
          'Cryptographic OCI image signing with Cosign & admission verification via OPA Gatekeeper',
          'Continuous vulnerability & posture remediation with Wiz CNAPP',
          'Enterprise Harbor registry deployment with Trivy scanner and RBAC',
        ],
        evidenceLinks: [
          {
            label: 'Case Study: Zero-Trust Secrets & Supply Chain',
            href: '/projects/zero-trust-secrets-supply-chain',
            type: 'project',
          },
          {
            label: 'Repo: Harbor-on-k8s',
            href: 'https://github.com/mkbntech/Harbor-on-k8s',
            type: 'repo',
          },
        ],
      },
    ],
  },
  {
    id: 'observability-reliability',
    title: 'Observability, SRE & Disaster Recovery',
    subtitle: 'Prometheus, Grafana, Loki, Veeam Kasten DR & Distributed Storage (Ceph / Longhorn)',
    icon: 'Activity',
    accentColor: 'cyan',
    architecturalScope:
      'Sustaining 99.9% production availability through full-stack telemetry, proactive capacity engineering, resilient distributed block/object storage, and verified disaster recovery.',
    skills: [
      {
        name: 'Prometheus, Grafana, Alertmanager & Loki',
        slug: 'prometheus-grafana-loki',
        category: 'Observability and Reliability',
        roleContext: 'PCA Certified · Senior Platform Engineer @ Henkel · Senior SRE @ OpsRamp',
        productionSummary:
          'Engineered unified monitoring, metrics, alerting, and centralized log aggregation stacks across Kubernetes and OpenShift clusters to track Golden Signals, detect resource saturation, and accelerate root-cause analysis.',
        keyPatterns: [
          'kube-prometheus-stack with custom ServiceMonitors, PodMonitors & PromQL recording rules',
          'Centralized log aggregation with Grafana Loki & Promtail/Fluentd',
          'Actionable multi-burn-rate SLO alerts routed via Alertmanager',
        ],
        evidenceLinks: [
          {
            label: 'Case Study: Unified Observability & HA Storage',
            href: '/projects/observability-and-ha-storage',
            type: 'project',
          },
          {
            label: 'Blog: Monitoring with Prometheus, Grafana & Loki',
            href: '/blog/monitoring-stack',
            type: 'blog',
          },
          {
            label: 'Repo: monitoring-stack-kuberntes',
            href: 'https://github.com/mkbntech/monitoring-stack-kuberntes',
            type: 'repo',
          },
        ],
      },
      {
        name: 'Kubernetes Disaster Recovery (Veeam Kasten)',
        slug: 'veeam-kasten-dr',
        category: 'Observability and Reliability',
        roleContext: 'Senior Platform Engineer @ Henkel · Zerto Certified',
        productionSummary:
          'Implemented enterprise backup, immutable snapshot replication, and disaster recovery orchestration using Veeam Kasten K10 to protect stateful Kubernetes applications, PVCs, and OpenShift Virtualization VMs.',
        keyPatterns: [
          'Policy-driven application-consistent snapshots & off-cluster object storage exports',
          'Scheduled DR drills validating RTO/RPO across namespaces and virtual machines',
          'Automated etcd control-plane backup and quorum recovery procedures',
        ],
        evidenceLinks: [
          {
            label: 'Case Study: Enterprise OpenShift Platform',
            href: '/projects/enterprise-openshift-platform',
            type: 'project',
          },
        ],
      },
      {
        name: 'Cloud-Native Storage (Ceph & Longhorn)',
        slug: 'ceph-longhorn-storage',
        category: 'Observability and Reliability',
        roleContext: 'Senior SRE @ OpsRamp · MKBN-Tech Storage Architecture Series',
        productionSummary:
          'Deployed and operated self-healing distributed storage platforms using Ceph (RBD/CephFS/RGW) and SUSE Longhorn to provide replicated persistent block and file storage for bare-metal and hybrid Kubernetes clusters.',
        keyPatterns: [
          'Automated multi-OSD external Ceph cluster deployment via Ansible',
          'Longhorn distributed block storage with automated volume replicas and S3 backups',
          'CSI storage class tuning for stateful databases (MySQL, Kafka, Cassandra)',
        ],
        evidenceLinks: [
          {
            label: 'Blog: External Ceph Cluster with Ansible',
            href: '/blog/ceph-ansible',
            type: 'blog',
          },
          {
            label: 'Blog: Cloud-Native Block Storage with Longhorn',
            href: '/blog/longhorn-deploy',
            type: 'blog',
          },
          {
            label: 'Repo: longhorn',
            href: 'https://github.com/mkbntech/longhorn',
            type: 'repo',
          },
        ],
      },
    ],
  },
  {
    id: 'cloud-infrastructure',
    title: 'Cloud Infrastructure & Networking',
    subtitle: 'GCP, Microsoft Azure, AWS Landing Zones & High-Availability Networking',
    icon: 'Cloud',
    accentColor: 'blue',
    architecturalScope:
      'Multi-cloud foundation engineering across 200+ GCP projects, Azure subscriptions, and AWS accounts with enterprise landing zones, IAM governance, and L4/L7 load balancing.',
    skills: [
      {
        name: 'Google Cloud Platform (GCP) & GKE',
        slug: 'google-cloud-platform',
        category: 'Cloud Infrastructure',
        roleContext:
          'Google Cloud Certified Professional Cloud Architect & Cloud Security Engineer',
        productionSummary:
          'Architected standardized GCP landing zones, shared VPC topologies, IAM/Workload Identity boundaries, and GKE/Anthos fleets supporting 200+ production and non-production projects.',
        keyPatterns: [
          'Automated GCP project factory and folder-level policy hierarchy via Terraform',
          'Private GKE clusters with Cloud NAT, Cloud Armor, and VPC Service Controls',
          'Workload migration using GCP Migrate to Virtual Machines & containerization',
        ],
        evidenceLinks: [
          {
            label: 'Case Study: Multi-Cloud Fleet Automation',
            href: '/projects/multi-cloud-fleet-automation',
            type: 'project',
          },
          {
            label: 'Credly: GCP Professional Cloud Architect',
            href: 'https://www.credly.com/badges/13afdc28-e4e2-4a96-a678-1c7c7fad364d/public_url',
            type: 'project',
          },
        ],
      },
      {
        name: 'Microsoft Azure & AWS Cloud Architecture',
        slug: 'azure-aws-architecture',
        category: 'Cloud Infrastructure',
        roleContext: 'Microsoft Certified DevOps Expert (AZ-400) & Azure Admin (AZ-104)',
        productionSummary:
          'Led multi-cloud architecture and migration initiatives across Microsoft Azure and AWS at Hewlett Packard Enterprise, designing highly available compute, hub-spoke networking, and cost-optimized workloads.',
        keyPatterns: [
          'Azure Landing Zones, subscription vending, and Azure Migrate transitions',
          'Multi-cloud transit networking (Aviatrix ACE Certified) and hybrid connectivity',
          'Zero-Config Azure MCP server integration for AI-assisted cloud operations',
        ],
        evidenceLinks: [
          {
            label: 'Video: Zero-Config Azure MCP',
            href: 'https://www.youtube.com/shorts/qDEGeCblXOo',
            type: 'video',
          },
          {
            label: 'Video: Run AWS Locally on Your Laptop',
            href: 'https://www.youtube.com/shorts/CwCfBm3Bj7g',
            type: 'video',
          },
        ],
      },
      {
        name: 'HA Load Balancing & Kubernetes Networking (HAProxy, Keepalived, Istio)',
        slug: 'networking-load-balancing',
        category: 'Cloud Infrastructure',
        roleContext: 'Solo.io Istio Certified · Former Cisco TAC Sr. IT Analyst',
        productionSummary:
          'Deep foundational networking expertise from Cisco routing/switching to Kubernetes CNI (Calico/OVN-Kubernetes), Istio service mesh, OpenShift Routes/Ingress, and bare-metal HAProxy + Keepalived VRRP failover.',
        keyPatterns: [
          'Active/Passive HAProxy load balancers with Keepalived VRRP floating VIPs',
          'Istio service mesh traffic splitting, circuit breaking, and strict mTLS',
          'Calico & OpenShift OVN-Kubernetes network policy micro-segmentation',
        ],
        evidenceLinks: [
          {
            label: 'Blog: HA Load Balancing with HAProxy & Keepalived',
            href: '/blog/haproxy-keepalived',
            type: 'blog',
          },
        ],
      },
    ],
  },
  {
    id: 'infrastructure-as-code',
    title: 'Infrastructure as Code & Configuration Management',
    subtitle: 'Modular Terraform Blueprints, Ansible Playbooks & SaltStack Automation',
    icon: 'Terminal',
    accentColor: 'violet',
    architecturalScope:
      'Codifying 100% of cloud provisioning, bare-metal OS hardening, and Kubernetes cluster bootstrapping using versioned, tested Infrastructure as Code.',
    skills: [
      {
        name: 'Terraform (Multi-Cloud Reusable Modules)',
        slug: 'terraform-iac',
        category: 'Infrastructure as Code',
        roleContext: 'HashiCorp Certified Terraform Associate · Technical Lead @ HPE',
        productionSummary:
          'Authored and maintained enterprise Terraform module registries provisioning VPCs, IAM roles, GKE/AKS/EKS clusters, and database infrastructure across GCP, Azure, and AWS.',
        keyPatterns: [
          'Composable, versioned Terraform modules with remote state locking',
          'Automated `terraform fmt`, `validate`, `tflint`, and policy checks in CI pipelines',
          'Standardized cloud foundation provisioning across 200+ projects',
        ],
        evidenceLinks: [
          {
            label: 'Case Study: Multi-Cloud Fleet Automation',
            href: '/projects/multi-cloud-fleet-automation',
            type: 'project',
          },
        ],
      },
      {
        name: 'Ansible & SaltStack Configuration Automation',
        slug: 'ansible-saltstack',
        category: 'Infrastructure as Code',
        roleContext: 'Senior Platform Engineer · Senior SRE @ OpsRamp',
        productionSummary:
          'Automated bare-metal and VM day-0/day-2 operations using idempotent Ansible roles and SaltStack states—bootstrapping HA Kubernetes/RKE2 clusters, external Ceph storage, and self-hosted GitLab instances.',
        keyPatterns: [
          'Zero-touch Ansible playbooks for kubeadm HA and Rancher RKE2 clusters',
          'Automated RHEL/Ubuntu OS security hardening and container runtime tuning',
          'Hybrid fleet configuration orchestration with SaltStack',
        ],
        evidenceLinks: [
          {
            label: 'Blog: Kubernetes Cluster Deployment with Ansible',
            href: '/blog/k8s-with-ansible',
            type: 'blog',
          },
          {
            label: 'Repo: rke2-ha-setup-ansible',
            href: 'https://github.com/mkbntech/rke2-ha-setup-ansible',
            type: 'repo',
          },
          {
            label: 'Repo: k8s-cluster-with-ansible',
            href: 'https://github.com/mkbntech/k8s-cluster-with-ansible',
            type: 'repo',
          },
        ],
      },
    ],
  },
].map((domain) => SkillDomainSchema.parse(domain));
