import { defineCollection, z } from 'astro:content';

const projectsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    subtitle: z.string(),
    category: z.enum([
      'Enterprise OpenShift Platform',
      'Internal Developer Platform',
      'GitOps & Serverless CI/CD',
      'Security & Supply Chain',
      'Autonomous AI SRE',
      'Multi-Cloud & IaC',
      'Observability & Storage',
    ]),
    order: z.number(),
    featured: z.boolean().default(false),
    role: z.string(),
    environmentScope: z.string(),
    problemStatement: z.string(),
    businessContext: z.string(),
    architectureSummary: z.string(),
    mermaidDiagram: z.string(),
    topologyNodes: z.array(
      z.object({
        stage: z.string(),
        component: z.string(),
        detail: z.string(),
      })
    ),
    keyDecisions: z.array(
      z.object({
        decision: z.string(),
        rationale: z.string(),
        tradeoff: z.string(),
      })
    ),
    securityConsiderations: z.array(z.string()),
    reliabilityConsiderations: z.array(z.string()),
    outcomes: z.array(
      z.object({
        metric: z.string(),
        description: z.string(),
      })
    ),
    technologies: z.array(z.string()),
    githubUrl: z.string().url().optional(),
    relatedVideoUrl: z.string().url().optional(),
    relatedVideoTitle: z.string().optional(),
    relatedBlogSlug: z.string().optional(),
  }),
});

const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishedAt: z.string(),
    updatedAt: z.string().optional(),
    category: z.enum([
      'Kubernetes',
      'OpenShift',
      'Platform Engineering',
      'SRE & AI Ops',
      'GitOps & CI/CD',
      'Infrastructure Automation',
      'Observability',
      'Storage & Networking',
    ]),
    tags: z.array(z.string()),
    readingTime: z.string(),
    featured: z.boolean().default(false),
    canonicalUrl: z.string().url(),
    youtubeVideoId: z.string().optional(),
    githubRepoUrl: z.string().url().optional(),
    architectureDiagram: z.string().optional(),
  }),
});

export const collections = {
  projects: projectsCollection,
  blog: blogCollection,
};
