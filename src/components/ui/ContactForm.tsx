import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Mail, Copy, Check } from 'lucide-react';

interface Props {
  primaryEmail: string;
  communityEmail: string;
}

export default function ContactForm({ primaryEmail, communityEmail }: Props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [organization, setOrganization] = useState('');
  const [topic, setTopic] = useState('Platform Engineering / SRE Leadership Opportunity');
  const [message, setMessage] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);

  const copyAddress = async (addr: string) => {
    try {
      await navigator.clipboard.writeText(addr);
      setCopiedEmail(addr);
      setTimeout(() => setCopiedEmail(null), 2000);
    } catch {
      // Fallback ignored
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    // Bot honeypot check
    if (honeypot) {
      setStatus('success');
      return;
    }

    if (name.trim().length < 2) {
      setStatus('error');
      setErrorMessage('Please enter your name (at least 2 characters).');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setStatus('error');
      setErrorMessage('Please enter a valid professional email address.');
      return;
    }

    if (message.trim().length < 15) {
      setStatus('error');
      setErrorMessage('Please include a brief summary of your inquiry (at least 15 characters).');
      return;
    }

    setStatus('submitting');

    const subject = `[mkbn.in Inquiry] ${topic} — ${name.trim()}${
      organization.trim() ? ` (${organization.trim()})` : ''
    }`;
    const body = `Hello Mohan,\n\n${message.trim()}\n\n---\nSender: ${name.trim()}\nEmail: ${email.trim()}\nOrganization: ${
      organization.trim() || 'N/A'
    }\nTopic: ${topic}`;

    const mailtoHref = `mailto:${primaryEmail}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    setTimeout(() => {
      setStatus('success');
      window.location.href = mailtoHref;
    }, 300);
  };

  return (
    <div className="space-y-6">
      {/* Quick Copy Email Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-slate-400/15 bg-obsidian-900/90 p-4">
          <span className="font-mono text-[10px] uppercase tracking-wider text-accent-cyan">
            PRIMARY // RECRUITING &amp; ARCHITECTURE
          </span>
          <p className="mt-1 font-mono text-sm font-bold text-slate-50">{primaryEmail}</p>
          <div className="mt-3 flex items-center gap-2">
            <a
              href={`mailto:${primaryEmail}`}
              className="inline-flex items-center gap-1.5 rounded-lg bg-accent-blue/15 px-3 py-1.5 font-mono text-xs font-semibold text-accent-cyan hover:bg-accent-blue/25"
            >
              <Mail className="h-3.5 w-3.5" />
              <span>Email Directly</span>
            </a>
            <button
              type="button"
              onClick={() => copyAddress(primaryEmail)}
              className="inline-flex items-center gap-1 rounded-lg border border-slate-400/20 bg-obsidian-800 px-2.5 py-1.5 font-mono text-xs text-slate-400 hover:text-slate-50"
            >
              {copiedEmail === primaryEmail ? (
                <>
                  <Check className="h-3.5 w-3.5 text-accent-emerald" />
                  <span className="text-accent-emerald">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-400/15 bg-obsidian-900/90 p-4">
          <span className="font-mono text-[10px] uppercase tracking-wider text-accent-violet">
            MKBN-TECH // COMMUNITY &amp; COLLABORATION
          </span>
          <p className="mt-1 font-mono text-sm font-bold text-slate-50">{communityEmail}</p>
          <div className="mt-3 flex items-center gap-2">
            <a
              href={`mailto:${communityEmail}`}
              className="inline-flex items-center gap-1.5 rounded-lg bg-accent-violet/15 px-3 py-1.5 font-mono text-xs font-semibold text-accent-violet hover:bg-accent-violet/25"
            >
              <Mail className="h-3.5 w-3.5" />
              <span>Email MKBN-Tech</span>
            </a>
            <button
              type="button"
              onClick={() => copyAddress(communityEmail)}
              className="inline-flex items-center gap-1 rounded-lg border border-slate-400/20 bg-obsidian-800 px-2.5 py-1.5 font-mono text-xs text-slate-400 hover:text-slate-50"
            >
              {copiedEmail === communityEmail ? (
                <>
                  <Check className="h-3.5 w-3.5 text-accent-emerald" />
                  <span className="text-accent-emerald">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Validated Inquiry Composer */}
      <form
        onSubmit={handleSubmit}
        noValidate
        className="glass-panel rounded-3xl p-6 sm:p-8 space-y-5"
      >
        <div className="border-b border-slate-400/15 pb-4">
          <h2 className="text-xl font-bold text-slate-50">
            Structured Engineering Inquiry Composer
          </h2>
          <p className="mt-1 text-xs text-slate-400">
            Validates your inquiry details and opens a pre-formatted message directly to{' '}
            <span className="font-mono text-accent-cyan">{primaryEmail}</span> with zero third-party
            tracking.
          </p>
        </div>

        {/* Honeypot anti-bot field */}
        <div className="hidden" aria-hidden="true">
          <label htmlFor="website-url">Website</label>
          <input
            id="website-url"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label
              htmlFor="contact-name"
              className="block font-mono text-xs font-semibold uppercase tracking-wider text-slate-50"
            >
              Your Name *
            </label>
            <input
              id="contact-name"
              name="name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Jane Doe"
              className="mt-2 w-full rounded-xl border border-slate-400/20 bg-obsidian-900/90 px-4 py-2.5 text-sm text-slate-50 placeholder-slate-500 focus:border-accent-cyan focus:outline-none"
            />
          </div>

          <div>
            <label
              htmlFor="contact-email"
              className="block font-mono text-xs font-semibold uppercase tracking-wider text-slate-50"
            >
              Your Email *
            </label>
            <input
              id="contact-email"
              name="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="jane@company.com"
              className="mt-2 w-full rounded-xl border border-slate-400/20 bg-obsidian-900/90 px-4 py-2.5 text-sm text-slate-50 placeholder-slate-500 focus:border-accent-cyan focus:outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label
              htmlFor="contact-org"
              className="block font-mono text-xs font-semibold uppercase tracking-wider text-slate-50"
            >
              Organization / Company
            </label>
            <input
              id="contact-org"
              name="organization"
              type="text"
              value={organization}
              onChange={(e) => setOrganization(e.target.value)}
              placeholder="Enterprise Cloud / Recruiting"
              className="mt-2 w-full rounded-xl border border-slate-400/20 bg-obsidian-900/90 px-4 py-2.5 text-sm text-slate-50 placeholder-slate-500 focus:border-accent-cyan focus:outline-none"
            />
          </div>

          <div>
            <label
              htmlFor="contact-topic"
              className="block font-mono text-xs font-semibold uppercase tracking-wider text-slate-50"
            >
              Inquiry Topic
            </label>
            <select
              id="contact-topic"
              name="topic"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="mt-2 w-full rounded-xl border border-slate-400/20 bg-obsidian-900/90 px-4 py-2.5 text-sm text-slate-50 focus:border-accent-cyan focus:outline-none"
            >
              <option value="Platform Engineering / SRE Leadership Opportunity">
                Platform Engineering / SRE Leadership Opportunity
              </option>
              <option value="Kubernetes & OpenShift Architecture Advisory">
                Kubernetes &amp; OpenShift Architecture Advisory
              </option>
              <option value="Internal Developer Platform & GitOps Consulting">
                Internal Developer Platform &amp; GitOps Consulting
              </option>
              <option value="MKBN-Tech Content & Speaking Inquiry">
                MKBN-Tech Content &amp; Speaking Inquiry
              </option>
            </select>
          </div>
        </div>

        <div>
          <label
            htmlFor="contact-message"
            className="block font-mono text-xs font-semibold uppercase tracking-wider text-slate-50"
          >
            Message &amp; Context *
          </label>
          <textarea
            id="contact-message"
            name="message"
            rows={5}
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Share details about the role, platform challenge, or collaboration..."
            className="mt-2 w-full rounded-xl border border-slate-400/20 bg-obsidian-900/90 px-4 py-3 text-sm text-slate-50 placeholder-slate-500 focus:border-accent-cyan focus:outline-none"
          />
        </div>

        {status === 'error' && (
          <div
            role="alert"
            className="flex items-center gap-2.5 rounded-xl border border-red-500/40 bg-red-500/10 p-3.5 text-xs text-red-200"
          >
            <AlertCircle className="h-4 w-4 shrink-0 text-red-400" />
            <span>{errorMessage}</span>
          </div>
        )}

        {status === 'success' && (
          <div
            role="status"
            className="flex items-center gap-2.5 rounded-xl border border-accent-emerald/40 bg-accent-emerald/10 p-3.5 text-xs text-accent-emerald"
          >
            <CheckCircle2 className="h-4 w-4 shrink-0" />
            <span>
              Inquiry formatted! Your email client has been opened addressed to {primaryEmail}.
            </span>
          </div>
        )}

        <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
          <button
            type="submit"
            disabled={status === 'submitting'}
            className="btn-primary text-xs py-3 px-6"
          >
            <Send className="h-4 w-4" />
            <span>
              {status === 'submitting' ? 'Preparing Inquiry...' : 'Compose & Send Inquiry'}
            </span>
          </button>
          <span className="font-mono text-[11px] text-slate-400">
            Response SLA: Typically within 24 hours
          </span>
        </div>
      </form>
    </div>
  );
}
