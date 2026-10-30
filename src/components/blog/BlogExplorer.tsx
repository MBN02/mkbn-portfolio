import React, { useState, useMemo } from 'react';
import { Search, Clock, Calendar, ArrowRight, Play, ExternalLink, Tag } from 'lucide-react';

export interface BlogSummaryItem {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  category: string;
  tags: string[];
  readingTime: string;
  featured: boolean;
  canonicalUrl: string;
  youtubeVideoId?: string;
}

interface Props {
  posts: BlogSummaryItem[];
}

export default function BlogExplorer({ posts }: Props) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedTag, setSelectedTag] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = useMemo(() => {
    const unique = Array.from(new Set(posts.map((p) => p.category)));
    return ['All', ...unique];
  }, [posts]);

  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    posts.forEach((p) => p.tags.forEach((t) => tagSet.add(t)));
    return ['All', ...Array.from(tagSet)];
  }, [posts]);

  const featuredPost = useMemo(() => posts.find((p) => p.featured) || posts[0], [posts]);

  const filteredPosts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return posts.filter((post) => {
      const matchesCat = selectedCategory === 'All' || post.category === selectedCategory;
      const matchesTag = selectedTag === 'All' || post.tags.includes(selectedTag);
      const matchesQuery =
        !q ||
        post.title.toLowerCase().includes(q) ||
        post.description.toLowerCase().includes(q) ||
        post.category.toLowerCase().includes(q) ||
        post.tags.some((t) => t.toLowerCase().includes(q));
      return matchesCat && matchesTag && matchesQuery;
    });
  }, [posts, selectedCategory, selectedTag, searchQuery]);

  return (
    <div>
      {/* Featured Article Spotlight */}
      {featuredPost && selectedCategory === 'All' && selectedTag === 'All' && !searchQuery && (
        <article className="glass-panel relative mb-10 overflow-hidden rounded-3xl border border-accent-blue/35 p-6 sm:p-10">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="section-badge">FEATURED ENGINEERING BLUEPRINT</span>
            <div className="flex items-center gap-4 font-mono text-xs text-slate-400">
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5 text-accent-cyan" />
                {featuredPost.publishedAt}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 text-accent-cyan" />
                {featuredPost.readingTime}
              </span>
            </div>
          </div>

          <h2 className="mt-4 text-2xl sm:text-4xl font-extrabold text-slate-50">
            <a
              href={`/blog/${featuredPost.slug}`}
              className="hover:text-accent-cyan transition-colors"
            >
              {featuredPost.title}
            </a>
          </h2>
          <p className="mt-3 max-w-3xl text-base leading-relaxed text-slate-400">
            {featuredPost.description}
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-slate-400/15 pt-5">
            <div className="flex flex-wrap gap-2">
              {featuredPost.tags.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => setSelectedTag(tag)}
                  className="rounded-lg border border-slate-400/15 bg-obsidian-900 px-2.5 py-1 font-mono text-xs text-accent-cyan hover:border-accent-cyan"
                >
                  #{tag}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-3">
              <a href={`/blog/${featuredPost.slug}`} className="btn-primary py-2.5 px-5 text-xs">
                <span>Read Technical Blueprint</span>
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </article>
      )}

      {/* Search, Category & Tag Filters */}
      <div className="glass-panel rounded-2xl p-5 sm:p-6">
        <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Full-text search across articles (e.g. RKE2, Ansible, K8sGPT, kubectl-ai, Ceph, Longhorn, Prometheus)..."
              aria-label="Search blog articles"
              className="w-full rounded-xl border border-slate-400/20 bg-obsidian-900/90 pl-10 pr-4 py-2.5 text-sm text-slate-50 placeholder-slate-400 focus:border-accent-cyan focus:outline-none"
            />
          </div>
          <span className="font-mono text-xs text-slate-400">
            Showing <strong className="text-accent-cyan">{filteredPosts.length}</strong> of{' '}
            {posts.length} Articles
          </span>
        </div>

        {/* Category Tabs */}
        <div
          role="tablist"
          aria-label="Filter articles by category"
          className="mt-4 flex flex-wrap gap-2"
        >
          {categories.map((cat) => {
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

        {/* Tag Pills */}
        <div className="mt-3 flex flex-wrap items-center gap-1.5 border-t border-slate-400/10 pt-3">
          <span className="mr-1 inline-flex items-center gap-1 font-mono text-[11px] text-slate-400">
            <Tag className="h-3 w-3 text-accent-cyan" />
            Tags:
          </span>
          {allTags.map((tag) => {
            const active = selectedTag === tag;
            return (
              <button
                key={tag}
                type="button"
                onClick={() => setSelectedTag(tag)}
                className={`rounded-lg px-2.5 py-1 font-mono text-[11px] transition-colors ${
                  active
                    ? 'bg-accent-blue text-obsidian-900 font-bold'
                    : 'bg-obsidian-900/80 text-slate-400 hover:text-slate-50'
                }`}
              >
                {tag === 'All' ? 'All Tags' : `#${tag}`}
              </button>
            );
          })}
        </div>
      </div>

      {/* Article Cards Grid */}
      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredPosts.map((post) => (
          <article
            key={post.slug}
            className="glass-card-interactive flex flex-col justify-between rounded-2xl p-6"
          >
            <div>
              <div className="flex items-center justify-between font-mono text-xs">
                <span className="rounded bg-accent-blue/15 px-2.5 py-0.5 font-semibold text-accent-cyan">
                  {post.category}
                </span>
                <span className="text-slate-400">{post.readingTime}</span>
              </div>

              <h3 className="mt-3.5 text-xl font-bold leading-snug text-slate-50">
                <a href={`/blog/${post.slug}`} className="hover:text-accent-cyan transition-colors">
                  {post.title}
                </a>
              </h3>

              <p className="mt-2.5 text-sm leading-relaxed text-slate-400">{post.description}</p>

              <div className="mt-4 flex flex-wrap gap-1.5">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded border border-slate-400/15 bg-obsidian-900 px-2 py-0.5 font-mono text-[11px] text-slate-400"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between border-t border-slate-400/15 pt-4 font-mono text-xs">
              <time dateTime={post.publishedAt} className="text-slate-400">
                {post.publishedAt}
              </time>
              <div className="flex items-center gap-3">
                {post.youtubeVideoId && (
                  <a
                    href={`https://www.youtube.com/watch?v=${post.youtubeVideoId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Watch Companion Video"
                    className="inline-flex items-center gap-1 text-accent-violet hover:underline"
                  >
                    <Play className="h-3.5 w-3.5" />
                    <span>Video</span>
                  </a>
                )}
                <a
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-1 font-semibold text-accent-cyan hover:underline"
                >
                  <span>Read</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <div className="mt-8 glass-panel rounded-2xl p-12 text-center">
          <p className="text-lg font-bold text-slate-50">
            No articles matched your current filters.
          </p>
          <button
            type="button"
            onClick={() => {
              setSelectedCategory('All');
              setSelectedTag('All');
              setSearchQuery('');
            }}
            className="btn-secondary mt-4 text-xs"
          >
            Reset All Filters
          </button>
        </div>
      )}
    </div>
  );
}
