import { z } from 'zod';

export const SocialLinkSchema = z.object({
  id: z.string(),
  label: z.string(),
  url: z.string().url(),
  handle: z.string(),
  icon: z.string(),
  primary: z.boolean().default(false),
});

export const MetricSchema = z.object({
  value: z.string(),
  label: z.string(),
  detail: z.string(),
});

export const PhilosophyPillarSchema = z.object({
  id: z.string(),
  title: z.string(),
  principle: z.string(),
  description: z.string(),
  icon: z.string(),
});

export const EducationItemSchema = z.object({
  degree: z.string(),
  institution: z.string(),
  location: z.string(),
  type: z.enum(['degree', 'program']),
});

export const ProfileSchema = z.object({
  name: z.string(),
  shortName: z.string(),
  brandName: z.string(),
  headline: z.object({
    line1: z.string(),
    line2: z.string(),
    line3: z.string(),
  }),
  roleTagline: z.string(),
  title: z.string(),
  location: z.string(),
  primaryEmail: z.string().email(),
  communityEmail: z.string().email(),
  domain: z.string().url(),
  blogDomain: z.string().url(),
  credlyUrl: z.string().url(),
  youtubeChannelId: z.string(),
  youtubeUrl: z.string().url(),
  githubUrl: z.string().url(),
  linkedinUrl: z.string().url(),
  resumeUrl: z.string(),
  portraitUrl: z.string(),
  shortBio: z.string(),
  extendedBio: z.array(z.string()),
  areasOfOwnership: z.array(
    z.object({
      title: z.string(),
      description: z.string(),
      metrics: z.string(),
      icon: z.string(),
    })
  ),
  metrics: z.array(MetricSchema),
  philosophy: z.array(PhilosophyPillarSchema),
  education: z.array(EducationItemSchema),
});

export const ExperienceItemSchema = z.object({
  id: z.string(),
  company: z.string(),
  parentOrPartner: z.string().optional(),
  role: z.string(),
  location: z.string(),
  period: z.string(),
  startDate: z.string(),
  endDate: z.string(),
  current: z.boolean().default(false),
  summary: z.string(),
  keyAchievements: z.array(z.string()),
  domains: z.array(z.string()),
  technologies: z.array(z.string()),
});

export const SkillEvidenceLinkSchema = z.object({
  label: z.string(),
  href: z.string(),
  type: z.enum(['project', 'blog', 'video', 'repo']),
});

export const SkillItemSchema = z.object({
  name: z.string(),
  slug: z.string(),
  category: z.string(),
  roleContext: z.string(),
  productionSummary: z.string(),
  keyPatterns: z.array(z.string()),
  evidenceLinks: z.array(SkillEvidenceLinkSchema),
});

export const SkillDomainSchema = z.object({
  id: z.string(),
  title: z.string(),
  subtitle: z.string(),
  icon: z.string(),
  accentColor: z.enum(['blue', 'cyan', 'violet', 'emerald']),
  architecturalScope: z.string(),
  skills: z.array(SkillItemSchema),
});

export const CertificationSchema = z.object({
  id: z.string(),
  name: z.string(),
  code: z.string().optional(),
  issuer: z.string(),
  provider: z.enum([
    'CNCF',
    'Google Cloud',
    'Microsoft',
    'HashiCorp',
    'GitLab',
    'Cloud Native Ecosystem',
  ]),
  issuedDate: z.string(),
  expirationDate: z.string().nullable().optional(),
  status: z.enum([
    'Verified Credly Credential',
    'Active Distinction',
    'Verified Alumni Credential',
  ]),
  featured: z.boolean().default(false),
  kubestronautComponent: z.boolean().default(false),
  badgeUrl: z.string().url(),
  verificationUrl: z.string().url(),
  skillsValidated: z.array(z.string()),
});

export const VideoItemSchema = z.object({
  id: z.string(),
  videoId: z.string(),
  title: z.string(),
  cleanTitle: z.string(),
  publishedAt: z.string(),
  category: z.enum([
    'Red Hat OpenShift',
    'Kubernetes',
    'GitOps & CI/CD',
    'Platform Engineering & AI',
    'Cloud Infrastructure',
    'Observability & Storage',
    'Production Troubleshooting',
  ]),
  format: z.enum(['masterclass', 'short']),
  duration: z.string().optional(),
  description: z.string(),
  keyTakeaways: z.array(z.string()),
  youtubeUrl: z.string().url(),
  thumbnailUrl: z.string().url(),
  relatedBlogSlug: z.string().optional(),
  relatedProjectSlug: z.string().optional(),
  relatedRepoUrl: z.string().url().optional(),
  featured: z.boolean().default(false),
});

export type SocialLink = z.infer<typeof SocialLinkSchema>;
export type Metric = z.infer<typeof MetricSchema>;
export type PhilosophyPillar = z.infer<typeof PhilosophyPillarSchema>;
export type EducationItem = z.infer<typeof EducationItemSchema>;
export type Profile = z.infer<typeof ProfileSchema>;
export type ExperienceItem = z.infer<typeof ExperienceItemSchema>;
export type SkillDomain = z.infer<typeof SkillDomainSchema>;
export type SkillItem = z.infer<typeof SkillItemSchema>;
export type Certification = z.infer<typeof CertificationSchema>;
export type VideoItem = z.infer<typeof VideoItemSchema>;
