"use client";

import React, { useState } from "react";
import { siteContent, ContactChannel } from "@/data/content";
import { SectionHeader } from "./SectionHeader";
import { ArrowUpRight, Mail, CheckCircle2, AlertCircle, Send, RotateCcw } from "lucide-react";

// Platform Icon Components with authentic SVG paths
function ChannelIcon({ type }: { type: ContactChannel["type"] }) {
  const iconProps = { className: "w-4 h-4 fill-current", "aria-hidden": true };

  switch (type) {
    case "email":
      return <Mail className="w-4 h-4 text-current" aria-hidden="true" />;
    case "whatsapp":
      return (
        <svg {...iconProps} viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.456 5.711 1.456h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      );
    case "linkedin":
      return (
        <svg {...iconProps} viewBox="0 0 24 24">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      );
    case "x":
      return (
        <svg {...iconProps} viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      );
    case "fiverr":
      return (
        <svg {...iconProps} viewBox="0 0 24 24">
          <circle cx="16.5" cy="5.5" r="1.5" />
          <path d="M15.5 8h-2.2c-.8 0-1.3.5-1.3 1.3v1.7h3.5v2.5h-3.5V20H9.5v-6.5H7.5V11h2V9.2C9.5 6.9 11 5.5 13.3 5.5h2.2V8z" />
          <circle cx="19.5" cy="18.5" r="1.5" />
        </svg>
      );
    case "upwork":
      return (
        <svg {...iconProps} viewBox="0 0 24 24">
          <path d="M18.561 13.158c-1.102 0-2.135-.467-3.074-1.229l.228-1.076l.008-.042c.207-1.143.849-3.06 2.839-3.06c1.492 0 2.703 1.212 2.703 2.703c-.001 1.489-1.212 2.704-2.704 2.704zm0-8.14c-3.757 0-6.452 2.778-7.054 6.257c-1.332-1.921-2.146-4.275-2.316-6.495H6.38v7.241c0 2.295-1.867 4.162-4.162 4.162H0V19h2.218c3.847 0 6.978-3.131 6.978-6.978v-1.119c.404 1.489 1.189 3.031 2.378 4.301l-1.984 9.176h3.013l1.439-6.657c1.334.815 2.87 1.272 4.538 1.272c4.321 0 7.82-3.498 7.82-7.82c.001-4.322-3.498-7.82-7.82-7.82z" />
        </svg>
      );
    case "discord":
      return (
        <svg {...iconProps} viewBox="0 0 24 24">
          <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127c-.598.35-1.226.65-1.873.893-.041.016-.062.066-.041.107.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
        </svg>
      );
  }
}

export function ContactSection() {
  const { contact } = siteContent;

  // Form State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [need, setNeed] = useState(contact.needsOptions[0] || "Clay enrichment and research");
  const [message, setMessage] = useState("");
  const [honeypot, setHoneypot] = useState("");

  // Validation & UI State
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [fallbackMailto, setFallbackMailto] = useState<string | null>(null);

  const validate = () => {
    const errs: { name?: string; email?: string; message?: string } = {};

    if (!name.trim()) {
      errs.name = "Please enter your name.";
    }

    if (!email.trim()) {
      errs.email = "Please enter your work email.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      errs.email = "Please enter a valid email address.";
    }

    if (!message.trim()) {
      errs.message = "Please tell me a bit about your project or need.";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError(null);
    setFallbackMailto(null);

    if (!validate()) return;

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          need,
          message: message.trim(),
          honeypot: honeypot.trim(),
        }),
      });

      const data = await res.json();

      if (data.success) {
        setIsSuccess(true);
      } else {
        // Handled failure or unconfigured email provider
        setApiError(data.error || "Unable to send message via automated dispatch.");
        if (data.fallbackMailto) {
          setFallbackMailto(data.fallbackMailto);
        }
      }
    } catch (err: any) {
      setApiError("A network error occurred while sending your message.");
      setFallbackMailto(
        `mailto:${contact.channels.find((c) => c.type === "email")?.handle || "daniel@upbynature.com"}?subject=${encodeURIComponent(
          `Project inquiry: ${need}`
        )}&body=${encodeURIComponent(`Hi Daniel,\n\nName: ${name}\n\n${message}`)}`
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setName("");
    setEmail("");
    setNeed(contact.needsOptions[0] || "Clay enrichment and research");
    setMessage("");
    setHoneypot("");
    setErrors({});
    setIsSuccess(false);
    setApiError(null);
    setFallbackMailto(null);
  };

  return (
    <section id="contact" className="w-full py-20 md:py-28 px-6 bg-[#F7F1DB] relative">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <SectionHeader
          eyebrow={contact.eyebrow}
          split={contact.heading}
          description={contact.description}
          buttonLabel={contact.buttonLabel}
          buttonUrl={contact.buttonUrl}
          buttonExternal={true}
          theme="light"
          bottomSpacing="mb-14 md:mb-16"
        />

        {/* Bento Grid: 2 Columns on Desktop, Stacked on Mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* LEFT COLUMN: Pill rows with icons for 7 channels */}
          <div className="lg:col-span-5 flex flex-col gap-3">
            <div className="flex items-center gap-2 mb-1 px-1">
              <span className="w-2 h-2 rounded-full bg-[#1F4633] animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#1F4633]">
                Channels & Profiles
              </span>
            </div>

            <div className="flex flex-col gap-2.5">
              {contact.channels.map((channel) => {
                const isMail = channel.type === "email";
                const isExternal = !isMail;

                return (
                  <a
                    key={channel.name}
                    href={channel.url}
                    target={isExternal ? "_blank" : undefined}
                    rel={isExternal ? "noopener noreferrer" : undefined}
                    className="group relative flex items-center justify-between p-3.5 sm:p-4 rounded-2xl bg-white/70 hover:bg-white border border-[#1F4633]/15 hover:border-[#1F4633]/35 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 select-none"
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      {/* Icon circle */}
                      <div className="w-10 h-10 rounded-xl bg-[#1F4633]/10 text-[#1F4633] flex items-center justify-center shrink-0 group-hover:bg-[#1F4633] group-hover:text-[#F7F1DB] transition-colors duration-200">
                        <ChannelIcon type={channel.type} />
                      </div>

                      <div className="flex flex-col min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-[#050409] tracking-tight">
                            {channel.name}
                          </span>
                          {channel.isPlaceholderTodo && (
                            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#1F4633]/10 text-[#1F4633]/80 font-medium">
                              TODO
                            </span>
                          )}
                        </div>
                        <span className="text-xs text-[#050409]/60 truncate mt-0.5">
                          {channel.description || channel.handle}
                        </span>
                      </div>
                    </div>

                    <div className="w-7 h-7 rounded-full bg-black/5 flex items-center justify-center shrink-0 group-hover:bg-[#1F4633] text-[#050409]/50 group-hover:text-[#F7F1DB] transition-all ml-3">
                      <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </a>
                );
              })}
            </div>
          </div>

          {/* RIGHT COLUMN: Form Card (Cream gradient, 24px radius, brand colors only) */}
          <div className="lg:col-span-7">
            <div
              className="relative p-7 sm:p-10 rounded-[24px] border border-[#1F4633]/20 shadow-[0_12px_40px_rgba(31,70,51,0.08)] backdrop-blur-sm overflow-hidden"
              style={{
                background:
                  "linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(247, 241, 219, 0.85) 60%, rgba(236, 227, 190, 0.75) 100%)",
              }}
            >
              {/* Subtle decorative glow element */}
              <div
                className="absolute -right-20 -top-20 w-64 h-64 rounded-full pointer-events-none opacity-40 blur-3xl"
                style={{
                  background: "radial-gradient(circle, rgba(141,191,159,0.5) 0%, transparent 70%)",
                }}
              />

              {isSuccess ? (
                // SUCCESS STATE
                <div className="py-10 text-center flex flex-col items-center justify-center relative z-10 animate-fade-in">
                  <div className="w-16 h-16 rounded-full bg-[#1F4633]/10 text-[#1F4633] flex items-center justify-center mb-6">
                    <CheckCircle2 className="w-9 h-9" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-[#050409] mb-3">
                    Message received.
                  </h3>
                  <p className="text-sm sm:text-base text-[#050409]/75 max-w-md mx-auto mb-8 leading-relaxed font-normal">
                    Thanks for reaching out, I&apos;ll reply by email.
                  </p>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#1F4633] hover:bg-[#050409] text-[#F7F1DB] text-xs font-bold uppercase tracking-[0.16em] transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Send another</span>
                  </button>
                </div>
              ) : (
                // FORM STATE
                <form onSubmit={handleSubmit} noValidate className="relative z-10 flex flex-col gap-5">
                  <div className="flex items-center justify-between pb-3 border-b border-[#1F4633]/10">
                    <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#1F4633]">
                      Direct Inquiry Form
                    </span>
                    <span className="text-xs text-[#050409]/50 font-medium">
                      Replies within 24h
                    </span>
                  </div>

                  {/* Honeypot field (hidden from view and assistive technologies) */}
                  <div className="hidden" aria-hidden="true" style={{ display: "none" }}>
                    <label htmlFor="hp_comment">Leave this empty</label>
                    <input
                      id="hp_comment"
                      type="text"
                      name="hp_comment"
                      tabIndex={-1}
                      autoComplete="off"
                      value={honeypot}
                      onChange={(e) => setHoneypot(e.target.value)}
                    />
                  </div>

                  {/* Name Field */}
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="contact-name"
                      className="text-xs font-bold uppercase tracking-[0.12em] text-[#050409]/80"
                    >
                      Name <span className="text-[#1F4633]">*</span>
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
                      }}
                      placeholder="e.g. Alex Rivera"
                      className={`w-full px-4 py-3 rounded-xl bg-white/85 text-[#050409] placeholder:text-[#050409]/35 text-sm transition-all focus:outline-none focus:ring-2 border ${
                        errors.name
                          ? "border-red-500/80 focus:ring-red-500/30"
                          : "border-[#1F4633]/20 focus:border-[#1F4633] focus:ring-[#1F4633]/20"
                      }`}
                    />
                    {errors.name && (
                      <span className="text-xs text-red-600 font-medium mt-0.5">
                        {errors.name}
                      </span>
                    )}
                  </div>

                  {/* Email Field */}
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="contact-email"
                      className="text-xs font-bold uppercase tracking-[0.12em] text-[#050409]/80"
                    >
                      Work Email <span className="text-[#1F4633]">*</span>
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                      }}
                      placeholder="alex@company.com"
                      className={`w-full px-4 py-3 rounded-xl bg-white/85 text-[#050409] placeholder:text-[#050409]/35 text-sm transition-all focus:outline-none focus:ring-2 border ${
                        errors.email
                          ? "border-red-500/80 focus:ring-red-500/30"
                          : "border-[#1F4633]/20 focus:border-[#1F4633] focus:ring-[#1F4633]/20"
                      }`}
                    />
                    {errors.email && (
                      <span className="text-xs text-red-600 font-medium mt-0.5">
                        {errors.email}
                      </span>
                    )}
                  </div>

                  {/* What do you need? Select Field */}
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="contact-need"
                      className="text-xs font-bold uppercase tracking-[0.12em] text-[#050409]/80"
                    >
                      What do you need?
                    </label>
                    <div className="relative">
                      <select
                        id="contact-need"
                        name="need"
                        value={need}
                        onChange={(e) => setNeed(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-white/85 text-[#050409] text-sm appearance-none cursor-pointer transition-all focus:outline-none focus:ring-2 border border-[#1F4633]/20 focus:border-[#1F4633] focus:ring-[#1F4633]/20 pr-10"
                      >
                        {contact.needsOptions.map((opt) => (
                          <option key={opt} value={opt} className="text-[#050409] py-1">
                            {opt}
                          </option>
                        ))}
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#050409]/50">
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                          <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Tell me about it Textarea */}
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="contact-message"
                      className="text-xs font-bold uppercase tracking-[0.12em] text-[#050409]/80"
                    >
                      Tell me about it <span className="text-[#1F4633]">*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={4}
                      value={message}
                      onChange={(e) => {
                        setMessage(e.target.value);
                        if (errors.message) setErrors((prev) => ({ ...prev, message: undefined }));
                      }}
                      placeholder="Briefly describe what you're trying to solve or build..."
                      className={`w-full px-4 py-3 rounded-xl bg-white/85 text-[#050409] placeholder:text-[#050409]/35 text-sm transition-all focus:outline-none focus:ring-2 border resize-y ${
                        errors.message
                          ? "border-red-500/80 focus:ring-red-500/30"
                          : "border-[#1F4633]/20 focus:border-[#1F4633] focus:ring-[#1F4633]/20"
                      }`}
                    />
                    {errors.message && (
                      <span className="text-xs text-red-600 font-medium mt-0.5">
                        {errors.message}
                      </span>
                    )}
                  </div>

                  {/* API / Environment Notice with Fallback Mailto */}
                  {apiError && (
                    <div className="p-4 rounded-xl bg-[#1F4633]/10 border border-[#1F4633]/20 flex flex-col gap-2 text-xs text-[#050409]">
                      <div className="flex items-start gap-2.5">
                        <AlertCircle className="w-4 h-4 text-[#1F4633] shrink-0 mt-0.5" />
                        <div>
                          <p className="font-semibold text-[#1F4633]">
                            Automated delivery notice:
                          </p>
                          <p className="text-[#050409]/80 mt-0.5">{apiError}</p>
                        </div>
                      </div>

                      {fallbackMailto && (
                        <div className="pt-2 border-t border-[#1F4633]/15 flex items-center justify-between">
                          <span className="text-[11px] text-[#050409]/70">
                            Send directly via your email client:
                          </span>
                          <a
                            href={fallbackMailto}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1F4633] text-[#F7F1DB] text-[11px] font-bold uppercase tracking-wider hover:bg-[#050409] transition-colors"
                          >
                            <Mail className="w-3 h-3" />
                            <span>Open Email Client</span>
                          </a>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Submit Button */}
                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#1F4633] hover:bg-[#050409] disabled:opacity-60 text-[#F7F1DB] text-xs font-bold uppercase tracking-[0.16em] transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="w-4 h-4 rounded-full border-2 border-[#F7F1DB]/30 border-t-[#F7F1DB] animate-spin" />
                          <span>Sending message...</span>
                        </>
                      ) : (
                        <>
                          <span>Send message</span>
                          <Send className="w-3.5 h-3.5 text-[#8DBF9F]" />
                        </>
                      )}
                    </button>

                    <span className="text-[11px] text-[#050409]/50 text-center sm:text-right">
                      No spam • Encrypted submission
                    </span>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
