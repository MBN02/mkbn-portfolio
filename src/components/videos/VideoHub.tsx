import React, { useState, useMemo } from 'react';
import {
  Search,
  Play,
  ExternalLink,
  BookOpen,
  Layers,
  GitFork,
  CheckCircle2,
  Youtube,
} from 'lucide-react';
import type { VideoItem } from '@/data/schemas';

interface Props {
  videos: VideoItem[];
  channelUrl: string;
}

const CATEGORIES = [
  'All',
  'Red Hat OpenShift',
  'Kubernetes',
  'GitOps & CI/CD',
  'Platform Engineering & AI',
  'Cloud Infrastructure',
  'Observability & Storage',
  'Production Troubleshooting',
] as const;

export default function VideoHub({ videos, channelUrl }: Props) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedFormat, setSelectedFormat] = useState<'all' | 'masterclass' | 'short'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeEmbedId, setActiveEmbedId] = useState<string | null>(null);

  const featuredVideo = useMemo(
    () => videos.find((v) => v.id === 'openshift-ha-upgrade-masterclass') || videos[0],
    [videos]
  );

  const filteredVideos = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return videos.filter((video) => {
      const matchesCat = selectedCategory === 'All' || video.category === selectedCategory;
      const matchesFormat = selectedFormat === 'all' || video.format === selectedFormat;
      const matchesQuery =
        !q ||
        video.cleanTitle.toLowerCase().includes(q) ||
        video.description.toLowerCase().includes(q) ||
        video.category.toLowerCase().includes(q) ||
        video.keyTakeaways.some((k) => k.toLowerCase().includes(q));
      return matchesCat && matchesFormat && matchesQuery;
    });
  }, [videos, selectedCategory, selectedFormat, searchQuery]);

  return (
    <div>
      {/* Featured Video Masterclass Spotlight */}
      {featuredVideo && selectedCategory === 'All' && selectedFormat === 'all' && !searchQuery && (
        <div className="glass-panel mb-10 overflow-hidden rounded-3xl border border-accent-cyan/35 p-6 sm:p-8 shadow-glow-blue">
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <div className="relative aspect-video overflow-hidden rounded-2xl border border-slate-400/20 bg-obsidian-900">
                {activeEmbedId === featuredVideo.videoId ? (
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${featuredVideo.videoId}?autoplay=1&rel=0`}
                    title={featuredVideo.cleanTitle}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="h-full w-full border-0"
                  />
                ) : (
                  <button
                    type="button"
                    onClick={() => setActiveEmbedId(featuredVideo.videoId)}
                    aria-label={`Play featured masterclass: ${featuredVideo.cleanTitle}`}
                    className="group relative block h-full w-full text-left"
                  >
                    <img
                      src={featuredVideo.thumbnailUrl}
                      alt={featuredVideo.cleanTitle}
                      width="480"
                      height="360"
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-obsidian-900/90 via-obsidian-900/30 to-transparent" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="inline-flex items-center gap-2.5 rounded-full bg-accent-cyan px-6 py-3.5 font-mono text-xs font-extrabold text-obsidian-900 shadow-glow-cyan transition-transform group-hover:scale-105">
                        <Play className="h-4 w-4 fill-obsidian-900" />
                        PLAY PRODUCTION MASTERCLASS
                      </span>
                    </div>
                  </button>
                )}
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
                <span className="rounded-md bg-accent-cyan/15 px-2.5 py-1 font-bold text-accent-cyan">
                  FEATURED MASTERCLASS
                </span>
                <span className="text-slate-400">{featuredVideo.publishedAt}</span>
              </div>

              <h2 className="mt-3 text-2xl sm:text-3xl font-extrabold text-slate-50">
                {featuredVideo.cleanTitle}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-400">
                {featuredVideo.description}
              </p>

              <ul className="mt-4 space-y-1.5 text-xs text-slate-400">
                {featuredVideo.keyTakeaways.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent-emerald" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={featuredVideo.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary py-2.5 px-5 text-xs"
                >
                  <Youtube className="h-4 w-4" />
                  <span>Watch on YouTube</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
                {featuredVideo.relatedProjectSlug && (
                  <a
                    href={`/projects/${featuredVideo.relatedProjectSlug}`}
                    className="btn-secondary py-2.5 px-4 text-xs"
                  >
                    <span>Read Case Study →</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Search, Format & Category Filter Bar */}
      <div className="glass-panel rounded-2xl p-5 sm:p-6">
        <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search videos (e.g. OpenShift upgrade, Argo CD ephemeral, Corporate SSO, Ceph, K8sGPT, Podman)..."
              aria-label="Search YouTube videos"
              className="w-full rounded-xl border border-slate-400/20 bg-obsidian-900/90 pl-10 pr-4 py-2.5 text-sm text-slate-50 placeholder-slate-400 focus:border-accent-cyan focus:outline-none"
            />
          </div>

          {/* Format Toggle */}
          <div className="flex items-center gap-1.5 rounded-xl border border-slate-400/15 bg-obsidian-900 p-1 font-mono text-xs">
            <button
              type="button"
              onClick={() => setSelectedFormat('all')}
              className={`rounded-lg px-3 py-1.5 transition-colors ${
                selectedFormat === 'all'
                  ? 'bg-accent-blue text-obsidian-900 font-bold'
                  : 'text-slate-400 hover:text-slate-50'
              }`}
            >
              All ({videos.length})
            </button>
            <button
              type="button"
              onClick={() => setSelectedFormat('masterclass')}
              className={`rounded-lg px-3 py-1.5 transition-colors ${
                selectedFormat === 'masterclass'
                  ? 'bg-accent-cyan text-obsidian-900 font-bold'
                  : 'text-slate-400 hover:text-slate-50'
              }`}
            >
              Full Tutorials ({videos.filter((v) => v.format === 'masterclass').length})
            </button>
            <button
              type="button"
              onClick={() => setSelectedFormat('short')}
              className={`rounded-lg px-3 py-1.5 transition-colors ${
                selectedFormat === 'short'
                  ? 'bg-accent-violet text-slate-50 font-bold'
                  : 'text-slate-400 hover:text-slate-50'
              }`}
            >
              60s Shorts ({videos.filter((v) => v.format === 'short').length})
            </button>
          </div>
        </div>

        {/* Category Pills */}
        <div
          role="tablist"
          aria-label="Filter videos by topic"
          className="mt-4 flex flex-wrap gap-2"
        >
          {CATEGORIES.map((cat) => {
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

      {/* Video Cards Grid */}
      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredVideos.map((video) => {
          const isPlaying = activeEmbedId === video.videoId;
          return (
            <article
              key={video.id}
              id={video.id}
              className="glass-card-interactive flex flex-col justify-between overflow-hidden rounded-2xl scroll-mt-24"
            >
              <div>
                {/* Privacy-Conscious Click-to-Play Thumbnail or Embed */}
                <div className="relative aspect-video overflow-hidden bg-obsidian-900">
                  {isPlaying ? (
                    <iframe
                      src={`https://www.youtube-nocookie.com/embed/${video.videoId}?autoplay=1&rel=0`}
                      title={video.cleanTitle}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="h-full w-full border-0"
                    />
                  ) : (
                    <button
                      type="button"
                      onClick={() => setActiveEmbedId(video.videoId)}
                      aria-label={`Play video: ${video.cleanTitle}`}
                      className="group relative block h-full w-full text-left"
                    >
                      <img
                        src={video.thumbnailUrl}
                        alt={video.cleanTitle}
                        width="480"
                        height="360"
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-obsidian-900 via-obsidian-900/20 to-transparent" />
                      <span className="absolute top-3 left-3 rounded-md border border-accent-cyan/30 bg-obsidian-900/90 px-2.5 py-1 font-mono text-[10px] font-semibold text-accent-cyan">
                        {video.category}
                      </span>
                      <span className="absolute top-3 right-3 rounded-md bg-obsidian-900/90 px-2 py-0.5 font-mono text-[10px] text-slate-400">
                        {video.format === 'short' ? 'SHORT' : 'MASTERCLASS'}
                      </span>
                      <div className="absolute inset-0 flex items-center justify-center opacity-90 transition-transform group-hover:scale-110">
                        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-accent-cyan text-obsidian-900 shadow-glow-cyan">
                          <Play className="h-5 w-5 fill-obsidian-900 ml-0.5" />
                        </span>
                      </div>
                    </button>
                  )}
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between font-mono text-xs text-slate-400">
                    <time dateTime={video.publishedAt}>{video.publishedAt}</time>
                    <span>{video.duration}</span>
                  </div>

                  <h3 className="mt-2.5 text-lg font-bold leading-snug text-slate-50">
                    {video.cleanTitle}
                  </h3>

                  <p className="mt-2 text-xs leading-relaxed text-slate-400">{video.description}</p>

                  {video.keyTakeaways.length > 0 && (
                    <ul className="mt-3.5 space-y-1 border-t border-slate-400/10 pt-3 text-[11px] text-slate-400">
                      {video.keyTakeaways.map((takeaway) => (
                        <li key={takeaway} className="flex items-start gap-1.5">
                          <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-accent-cyan" />
                          <span>{takeaway}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>

              {/* Footer Links: YouTube, Related Blog, Related Project, Related Repo */}
              <div className="flex flex-wrap items-center justify-between gap-2 border-t border-slate-400/15 px-6 py-4 font-mono text-xs">
                <a
                  href={video.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-semibold text-accent-cyan hover:underline"
                >
                  <span>Watch on YouTube</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>

                <div className="flex items-center gap-2.5">
                  {video.relatedBlogSlug && (
                    <a
                      href={`/blog/${video.relatedBlogSlug}`}
                      title="Read Companion Article"
                      className="inline-flex items-center gap-1 text-slate-400 hover:text-slate-50"
                    >
                      <BookOpen className="h-3.5 w-3.5 text-accent-blue" />
                      <span>Article</span>
                    </a>
                  )}
                  {video.relatedProjectSlug && (
                    <a
                      href={`/projects/${video.relatedProjectSlug}`}
                      title="View Case Study"
                      className="inline-flex items-center gap-1 text-slate-400 hover:text-slate-50"
                    >
                      <Layers className="h-3.5 w-3.5 text-accent-violet" />
                      <span>Case Study</span>
                    </a>
                  )}
                  {video.relatedRepoUrl && (
                    <a
                      href={video.relatedRepoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="GitHub Repository"
                      className="inline-flex items-center gap-1 text-slate-400 hover:text-slate-50"
                    >
                      <GitFork className="h-3.5 w-3.5 text-accent-emerald" />
                      <span>Repo</span>
                    </a>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
