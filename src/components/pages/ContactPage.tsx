import React, { useState } from 'react';
import {
  AlertCircle,
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  Send,
} from 'lucide-react';
import {
  CONTACT_CONFIG,
  PERSONAL_INFO,
  SOCIAL_LINKS,
} from '../../data/portfolioData';
import { SpreadPageProps } from './AboutPage';

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

/**
 * Page 8 Spread — Let's Connect:
 * Left: Social links, academic signature, and closing line.
 * Right: Validated contact form using configurable endpoint or honest mailto fallback.
 */
export function ContactPage({ side }: SpreadPageProps) {
  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [statusNotice, setStatusNotice] = useState<{
    type: 'info' | 'error' | 'success';
    text: string;
  } | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const validate = (): FormErrors => {
    const next: FormErrors = {};
    if (!form.name.trim() || form.name.trim().length < 2) {
      next.name = 'Please enter your name (at least 2 characters).';
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.email.trim() || !emailPattern.test(form.email.trim())) {
      next.email = 'Please enter a valid email address.';
    }
    if (!form.subject.trim() || form.subject.trim().length < 3) {
      next.subject = 'Please provide a brief subject.';
    }
    if (!form.message.trim() || form.message.trim().length < 10) {
      next.message = 'Please write a message (at least 10 characters).';
    }
    return next;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusNotice(null);

    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    // If a real form endpoint is configured in portfolioData.ts, submit to it
    if (CONTACT_CONFIG.formEndpoint) {
      try {
        setSubmitting(true);
        const res = await fetch(CONTACT_CONFIG.formEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify(form),
        });
        if (!res.ok) {
          throw new Error('Submission failed');
        }
        setStatusNotice({
          type: 'success',
          text: 'Your message was submitted successfully.',
        });
        setForm({ name: '', email: '', subject: '', message: '' });
      } catch {
        setStatusNotice({
          type: 'error',
          text: 'Could not reach the configured form endpoint. Please try again or use email directly.',
        });
      } finally {
        setSubmitting(false);
      }
      return;
    }

    // Honest mailto fallback when no backend endpoint is configured
    const recipient = CONTACT_CONFIG.recipientEmail.trim();
    const subject = encodeURIComponent(`[Portfolio] ${form.subject.trim()}`);
    const body = encodeURIComponent(
      `Name: ${form.name.trim()}\nEmail: ${form.email.trim()}\n\n${form.message.trim()}`
    );

    if (!recipient) {
      // Open default mail composer without a recipient so user can still copy/send,
      // and honestly notify that recipientEmail is a placeholder in portfolioData.ts
      window.location.href = `mailto:?subject=${subject}&body=${body}`;
      setStatusNotice({
        type: 'info',
        text: 'Opened your email client via mailto fallback. Configure CONTACT_CONFIG.recipientEmail or formEndpoint in src/data/portfolioData.ts for direct delivery.',
      });
      return;
    }

    window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
    setStatusNotice({
      type: 'info',
      text: `Opened your email client addressed to ${recipient}.`,
    });
  };

  if (side === 'left') {
    return (
      <div className="page-content contact-left">
        <div>
          <h2 className="page-title">Let's Connect</h2>
          <div className="title-accent" />
          <p className="page-lead">
            Open to learning opportunities, software and AI project collaborations, and technical conversations.
          </p>

          <div className="contact-links-stack">
            <a
              href={SOCIAL_LINKS.github}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-channel-card"
            >
              <span className="contact-channel-icon">
                <Github size={18} />
              </span>
              <span className="contact-channel-body">
                <strong>GitHub</strong>
                <small>github.com/DeepakS1409</small>
              </span>
              <ExternalLink size={14} />
            </a>

            {SOCIAL_LINKS.linkedin ? (
              <a
                href={SOCIAL_LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-channel-card"
              >
                <span className="contact-channel-icon">
                  <Linkedin size={18} />
                </span>
                <span className="contact-channel-body">
                  <strong>LinkedIn</strong>
                  <small>View Profile</small>
                </span>
                <ExternalLink size={14} />
              </a>
            ) : (
              <div
                className="contact-channel-card contact-channel-card--placeholder"
                title="Set SOCIAL_LINKS.linkedin in src/data/portfolioData.ts"
              >
                <span className="contact-channel-icon">
                  <Linkedin size={18} />
                </span>
                <span className="contact-channel-body">
                  <strong>LinkedIn</strong>
                  <small>{SOCIAL_LINKS.linkedinPlaceholderLabel}</small>
                </span>
              </div>
            )}

            <a
              href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
                CONTACT_CONFIG.recipientEmail
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-channel-card"
            >
              <span className="contact-channel-icon">
                <Mail size={18} />
              </span>
              <span className="contact-channel-body">
                <strong>Direct Email</strong>
                <small>
                  {CONTACT_CONFIG.recipientEmail ||
                    'Set recipientEmail in src/data/portfolioData.ts'}
                </small>
              </span>
              <ExternalLink size={14} />
            </a>
          </div>
        </div>

        <div className="closing-colophon">
          <p className="closing-quote">“{CONTACT_CONFIG.closingLine}”</p>
          <span className="closing-sig">
            — {PERSONAL_INFO.name} · {PERSONAL_INFO.college} ({PERSONAL_INFO.batch})
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="page-content">
      <h3 className="subsection-label">Send a Message</h3>
      <form className="contact-form" onSubmit={handleSubmit} noValidate>
        <div className="form-field">
          <label htmlFor="contact-name">Name</label>
          <input
            id="contact-name"
            type="text"
            placeholder="Your name"
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            aria-invalid={!!errors.name}
          />
          {errors.name && <span className="field-error">{errors.name}</span>}
        </div>

        <div className="form-field">
          <label htmlFor="contact-email">Email</label>
          <input
            id="contact-email"
            type="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            aria-invalid={!!errors.email}
          />
          {errors.email && <span className="field-error">{errors.email}</span>}
        </div>

        <div className="form-field">
          <label htmlFor="contact-subject">Subject</label>
          <input
            id="contact-subject"
            type="text"
            placeholder="Project collaboration, opportunity, or hello"
            value={form.subject}
            onChange={(e) => setForm((f) => ({ ...f, subject: e.target.value }))}
            aria-invalid={!!errors.subject}
          />
          {errors.subject && <span className="field-error">{errors.subject}</span>}
        </div>

        <div className="form-field">
          <label htmlFor="contact-message">Message</label>
          <textarea
            id="contact-message"
            rows={4}
            placeholder="Write your message here..."
            value={form.message}
            onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
            aria-invalid={!!errors.message}
          />
          {errors.message && <span className="field-error">{errors.message}</span>}
        </div>

        <button type="submit" className="submit-btn" disabled={submitting}>
          <Send size={14} />
          <span>{submitting ? 'Sending...' : 'Send Message'}</span>
        </button>

        {statusNotice && (
          <div className={`form-notice form-notice--${statusNotice.type}`} role="status">
            <AlertCircle size={15} />
            <span>{statusNotice.text}</span>
          </div>
        )}
      </form>
    </div>
  );
}

