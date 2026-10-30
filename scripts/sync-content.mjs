#!/usr/bin/env node
/**
 * Automated Content Synchronization Engine (YouTube + MKBN-Tech Blog)
 *
 * 1. Pulls the public YouTube Atom feed for @mkbn-tech (UCrScDsPZSceXgZOLJGrOOIw)
 *    and appends any newly published Masterclasses or Shorts into `src/data/videos.ts`.
 * 2. Pulls the public Jekyll Search Index (`https://www.mkbntech.com/assets/js/data/search.json`)
 *    and Atom feed (`https://www.mkbntech.com/feed.xml`) and scaffolds any newly published
 *    articles into `src/content/blog/<slug>.mdx`.
 *
 * Requires ZERO API keys or secrets. Safe to run in CI/CD or pre-build hooks.
 */
import fs from 'node:fs';
import path from 'node:path';
import https from 'node:https';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = path.resolve(__dirname, '..');
const VIDEOS_FILE = path.join(ROOT_DIR, 'src/data/videos.ts');
const BLOG_DIR = path.join(ROOT_DIR, 'src/content/blog');

const CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID || 'UCrScDsPZSceXgZOLJGrOOIw';
const YOUTUBE_FEED_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;
const BLOG_SEARCH_JSON_URL = 'https://www.mkbntech.com/assets/js/data/search.json';

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    const req = https.get(
      url,
      {
        timeout: 10000,
        headers: {
          'User-Agent': 'MKBN-Portfolio-Sync/1.0 (+https://www.mkbn.in)',
        },
      },
      (res) => {
        if (res.statusCode && res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          fetchUrl(res.headers.location).then(resolve).catch(reject);
          return;
        }
        if (res.statusCode !== 200) {
          reject(new Error(`HTTP ${res.statusCode} from ${url}`));
          return;
        }
        let body = '';
        res.on('data', (chunk) => (body += chunk));
        res.on('end', () => resolve(body));
      }
    );
    req.on('error', reject);
    req.on('timeout', () => {
      req.destroy();
      reject(new Error(`Request timed out for ${url}`));
    });
  });
}

function decodeXmlEntities(str = '') {
  return str
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .trim();
}

function slugify(str) {
  return str
    .toLowerCase()
    .replace(/#[a-z0-9_-]+/gi, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 56);
}

function inferVideoCategory(title, description) {
  const text = `${title} ${description}`.toLowerCase();
  if (text.includes('openshift') || text.includes('sno') || text.includes('crc')) {
    return 'Red Hat OpenShift';
  }
  if (
    text.includes('argocd') ||
    text.includes('argo cd') ||
    text.includes('gitops') ||
    text.includes('tekton') ||
    text.includes('jenkins') ||
    text.includes('gitlab') ||
    text.includes('ci/cd')
  ) {
    return 'GitOps & CI/CD';
  }
  if (
    text.includes('ai') ||
    text.includes('llm') ||
    text.includes('ollama') ||
    text.includes('k8sgpt') ||
    text.includes('kubectl-ai') ||
    text.includes('idp') ||
    text.includes('port')
  ) {
    return 'Platform Engineering & AI';
  }
  if (
    text.includes('ceph') ||
    text.includes('longhorn') ||
    text.includes('prometheus') ||
    text.includes('grafana') ||
    text.includes('loki') ||
    text.includes('monitoring')
  ) {
    return 'Observability & Storage';
  }
  if (text.includes('azure') || text.includes('gcp') || text.includes('aws') || text.includes('haproxy')) {
    return 'Cloud Infrastructure';
  }
  return 'Kubernetes';
}

function inferBlogCategory(title, tagsStr, categoriesStr) {
  const text = `${title} ${tagsStr} ${categoriesStr}`.toLowerCase();
  if (text.includes('openshift')) return 'OpenShift';
  if (text.includes('ai') || text.includes('k8sgpt') || text.includes('ollama')) return 'SRE & AI Ops';
  if (text.includes('jenkins') || text.includes('gitlab') || text.includes('argocd') || text.includes('ci')) {
    return 'GitOps & CI/CD';
  }
  if (text.includes('monitoring') || text.includes('prometheus') || text.includes('grafana') || text.includes('loki')) {
    return 'Observability';
  }
  if (text.includes('ceph') || text.includes('longhorn') || text.includes('haproxy') || text.includes('storage')) {
    return 'Storage & Networking';
  }
  if (text.includes('ansible') || text.includes('terraform')) return 'Infrastructure Automation';
  return 'Kubernetes';
}

async function syncYouTubeVideos() {
  console.log(`[sync:youtube] Fetching YouTube Atom feed for channel ${CHANNEL_ID}...`);
  const xml = await fetchUrl(YOUTUBE_FEED_URL);
  const currentVideosTs = fs.readFileSync(VIDEOS_FILE, 'utf8');

  const entryMatches = [...xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)];
  let addedCount = 0;
  let updatedContent = currentVideosTs;

  for (const match of entryMatches) {
    const entryXml = match[1];
    const videoId = entryXml.match(/<yt:videoId>([^<]+)<\/yt:videoId>/)?.[1]?.trim();
    if (!videoId || updatedContent.includes(`videoId: '${videoId}'`)) {
      continue;
    }

    const rawTitle = decodeXmlEntities(entryXml.match(/<title>([\s\S]*?)<\/title>/)?.[1] || '');
    const cleanTitle = rawTitle.replace(/\s*#[a-zA-Z0-9_-]+/g, '').replace(/!+$/, '').trim();
    const publishedIso = entryXml.match(/<published>([^<]+)<\/published>/)?.[1] || new Date().toISOString();
    const publishedAt = publishedIso.slice(0, 10);
    const alternateHref =
      entryXml.match(/<link rel="alternate" href="([^"]+)"/)?.[1] ||
      `https://www.youtube.com/watch?v=${videoId}`;
    const isShort = alternateHref.includes('/shorts/');
    const rawDesc = decodeXmlEntities(
      entryXml.match(/<media:description>([\s\S]*?)<\/media:description>/)?.[1] || cleanTitle
    );
    const firstParagraph = rawDesc
      .split(/\n+/)
      .map((line) => line.trim())
      .filter((line) => line.length > 20 && !line.startsWith('#'))[0] || cleanTitle;

    const category = inferVideoCategory(rawTitle, firstParagraph);
    const idPrefix = isShort ? 'short-' : '';
    const itemSlug = `${idPrefix}${slugify(cleanTitle || videoId)}`;

    const newEntryBlock = `  {
    id: ${JSON.stringify(itemSlug)},
    videoId: ${JSON.stringify(videoId)},
    title: ${JSON.stringify(rawTitle)},
    cleanTitle: ${JSON.stringify(cleanTitle || rawTitle)},
    publishedAt: ${JSON.stringify(publishedAt)},
    category: ${JSON.stringify(category)},
    format: ${JSON.stringify(isShort ? 'short' : 'masterclass')},
    duration: ${JSON.stringify(isShort ? '60s Rapid Insight' : 'Technical Walkthrough')},
    description: ${JSON.stringify(firstParagraph.slice(0, 280))},
    keyTakeaways: [
      ${JSON.stringify(`${category} architecture & hands-on implementation`)},
      ${JSON.stringify('Production-ready patterns from MKBN-Tech')},
    ],
    youtubeUrl: ${JSON.stringify(alternateHref)},
    thumbnailUrl: ${JSON.stringify(`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`)},
    featured: false,
  },\n`;

    const targetMarker = '].map((item) => VideoItemSchema.parse(item));';
    if (updatedContent.includes(targetMarker)) {
      updatedContent = updatedContent.replace(targetMarker, `${newEntryBlock}${targetMarker}`);
      addedCount++;
      console.log(`[sync:youtube] + Added new YouTube ${isShort ? 'Short' : 'Video'}: "${cleanTitle}" (${videoId})`);
    }
  }

  if (addedCount > 0) {
    fs.writeFileSync(VIDEOS_FILE, updatedContent, 'utf8');
  } else {
    console.log(`[sync:youtube] All ${entryMatches.length} feed entries are already present in src/data/videos.ts.`);
  }
  return addedCount;
}

async function syncBlogPosts() {
  console.log(`[sync:blog] Fetching MKBN-Tech post index from ${BLOG_SEARCH_JSON_URL}...`);
  const rawJson = await fetchUrl(BLOG_SEARCH_JSON_URL);
  const posts = JSON.parse(rawJson);
  let addedCount = 0;

  for (const post of posts) {
    const slugMatch = post.url?.match(/\/posts\/([^/]+)\/?/);
    if (!slugMatch) continue;
    const slug = slugMatch[1];
    const mdxPath = path.join(BLOG_DIR, `${slug}.mdx`);

    if (fs.existsSync(mdxPath)) {
      continue;
    }

    const publishedAt = (post.date || new Date().toISOString()).slice(0, 10);
    const category = inferBlogCategory(post.title || '', post.tags || '', post.categories || '');
    const tags = Array.from(
      new Set(
        `${post.tags || ''},${post.categories || ''}`
          .split(',')
          .map((t) => t.trim().toLowerCase())
          .filter(Boolean)
      )
    );
    if (tags.length === 0) tags.push('kubernetes');

    const rawSnippet = (post.content || '')
      .replace(/🎞️\s*Watch Video/gi, '')
      .replace(/\s+/g, ' ')
      .trim();
    const description =
      rawSnippet.length > 180 ? `${rawSnippet.slice(0, 177).trim()}...` : rawSnippet || post.title;
    const canonicalUrl = `https://www.mkbntech.com/posts/${slug}/`;

    const mdxContent = `---
title: ${JSON.stringify(post.title)}
description: ${JSON.stringify(description)}
publishedAt: ${JSON.stringify(publishedAt)}
category: ${JSON.stringify(category)}
tags: ${JSON.stringify(tags)}
readingTime: '6 min read'
featured: false
canonicalUrl: ${JSON.stringify(canonicalUrl)}
---

## Overview

${rawSnippet.slice(0, 600)}

---

> Read the complete step-by-step command reference and manifest guide on [MKBN-Tech Documentation (${canonicalUrl})](${canonicalUrl}).
`;

    fs.writeFileSync(mdxPath, mdxContent, 'utf8');
    addedCount++;
    console.log(`[sync:blog] + Created new blog post: src/content/blog/${slug}.mdx`);
  }

  if (addedCount === 0) {
    console.log(`[sync:blog] All ${posts.length} published MKBN-Tech articles are already synced in src/content/blog/.`);
  }
  return addedCount;
}

async function main() {
  let totalAdded = 0;
  try {
    totalAdded += await syncYouTubeVideos();
  } catch (err) {
    console.warn(`[sync:youtube] Warning: ${err.message}. Retaining existing validated src/data/videos.ts.`);
  }

  try {
    totalAdded += await syncBlogPosts();
  } catch (err) {
    console.warn(`[sync:blog] Warning: ${err.message}. Retaining existing validated src/content/blog/*.mdx.`);
  }

  console.log(`[sync:complete] Total newly synchronized items: ${totalAdded}`);
}

main();
