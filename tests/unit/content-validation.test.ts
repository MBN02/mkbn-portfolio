import { describe, it, expect } from 'vitest';
import { profile, socialLinks, navigationItems } from '@/data/profile';
import { experience } from '@/data/experience';
import { skillDomains } from '@/data/skills';
import { certifications } from '@/data/certifications';
import { videos } from '@/data/videos';

describe('Content Models & Schema Integrity (Phase 5 Verification)', () => {
  it('validates Mohan Kumar BN profile and custom domain www.mkbn.in', () => {
    expect(profile.name).toBe('Mohan Kumar BN');
    expect(profile.domain).toBe('https://www.mkbn.in');
    expect(profile.credlyUrl).toBe('https://www.credly.com/users/mohan-kumar-bn');
    expect(profile.primaryEmail).toBe('pea.mohan@gmail.com');
    expect(profile.metrics.length).toBeGreaterThanOrEqual(6);
  });

  it('ensures phone number is omitted from public profile model for privacy', () => {
    const serialized = JSON.stringify(profile);
    expect(serialized).not.toContain('966-399-4592');
  });

  it('validates all 7 career experience roles from 2012 to Present', () => {
    expect(experience.length).toBe(7);
    expect(experience[0].company).toBe('Henkel');
    expect(experience[0].current).toBe(true);
    expect(experience.some((e) => e.company.includes('OpsRamp'))).toBe(true);
    expect(experience.some((e) => e.company.includes('Hewlett Packard Enterprise'))).toBe(true);
  });

  it('validates all 7 platform engineering skill domains with evidence links and no percentage bars', () => {
    expect(skillDomains.length).toBe(7);
    for (const domain of skillDomains) {
      expect(domain.skills.length).toBeGreaterThan(0);
      for (const skill of domain.skills) {
        expect(skill.evidenceLinks.length).toBeGreaterThan(0);
        expect(skill).not.toHaveProperty('percentage');
      }
    }
  });

  it('validates Credly certifications including CNCF Kubestronaut', () => {
    expect(certifications.length).toBeGreaterThanOrEqual(18);
    const kubestronaut = certifications.find((c) => c.id === 'cncf-kubestronaut');
    expect(kubestronaut).toBeDefined();
    expect(kubestronaut?.verificationUrl).toContain('credly.com/badges/');
  });

  it('validates MKBN-Tech YouTube video library entries', () => {
    expect(videos.length).toBeGreaterThanOrEqual(20);
    for (const v of videos) {
      expect(v.videoId).toMatch(/^[a-zA-Z0-9_-]{11}$/);
      expect(v.youtubeUrl).toContain(v.videoId);
    }
  });

  it('validates primary navigation routes', () => {
    const routes = navigationItems.map((n) => n.href);
    expect(routes).toEqual([
      '/',
      '/about',
      '/expertise',
      '/projects',
      '/certifications',
      '/blog',
      '/videos',
      '/resume',
      '/contact',
    ]);
    expect(socialLinks.length).toBeGreaterThanOrEqual(5);
  });
});
