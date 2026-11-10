import { ExternalLink, Github, Linkedin, MapPin, User } from 'lucide-react';
import {
  JOURNEY_TIMELINE,
  PERSONAL_INFO,
  SOCIAL_LINKS,
} from '../../data/portfolioData';

export interface SpreadPageProps {
  side: 'left' | 'right';
}

interface AboutPageProps extends SpreadPageProps {
  continuation?: boolean;
}

/**
 * Page 1 Spread — About Me:
 * Left: Profile portrait placeholder, academic identity, and social links.
 * Right: Introduction, career objective, and personal journey timeline.
 */
export function AboutPage({ side, continuation = false }: AboutPageProps) {
  if (continuation) {
    if (side === 'left') {
      return (
        <div className="page-content">
          <h2 className="page-title">Personal Journey, Continued</h2>
          <div className="title-accent" />
          <ol className="timeline-list">
            {JOURNEY_TIMELINE.slice(2).map((item) => (
              <li key={item.title} className="timeline-item">
                <span className="timeline-badge">{item.period}</span>
                <div>
                  <h4 className="timeline-title">{item.title}</h4>
                  <p className="timeline-detail">{item.detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      );
    }

    return (
      <div className="page-content">
        <h2 className="page-title">Career Objective</h2>
        <div className="title-accent" />
        <p className="page-lead">{PERSONAL_INFO.careerObjective}</p>
      </div>
    );
  }

  if (side === 'left') {
    return (
      <div className="page-content about-left">
        <div className="profile-card">
          <div className="profile-frame">
            {PERSONAL_INFO.profileImageUrl ? (
              <img
                src={PERSONAL_INFO.profileImageUrl}
                alt={PERSONAL_INFO.name}
                className="profile-img"
                loading="lazy"
              />
            ) : (
              <div className="profile-placeholder">
                <User size={38} strokeWidth={1.5} />
                <span>Profile Photo</span>
                <small>Editable Placeholder</small>
              </div>
            )}
          </div>

          <div className="profile-identity">
            <h1 className="page-display-name">{PERSONAL_INFO.name}</h1>
            <p className="profile-degree">{PERSONAL_INFO.degree}</p>
            <p className="profile-college">
              <MapPin size={13} />
              <span>{PERSONAL_INFO.college}</span>
            </p>
            <span className="batch-pill">Batch {PERSONAL_INFO.batch}</span>
          </div>
        </div>

        <div className="identity-pills" aria-label="Professional identity">
          {PERSONAL_INFO.professionalIdentity.map((tag) => (
            <span key={tag} className="editorial-tag">
              {tag}
            </span>
          ))}
        </div>

        <div className="social-row">
          <a
            href={SOCIAL_LINKS.github}
            target="_blank"
            rel="noopener noreferrer"
            className="paper-link-btn"
          >
            <Github size={15} />
            <span>GitHub (@DeepakS1409)</span>
            <ExternalLink size={12} />
          </a>

          {SOCIAL_LINKS.linkedin ? (
            <a
              href={SOCIAL_LINKS.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="paper-link-btn"
            >
              <Linkedin size={15} />
              <span>LinkedIn</span>
              <ExternalLink size={12} />
            </a>
          ) : (
            <span
              className="paper-link-placeholder"
              title="Update SOCIAL_LINKS.linkedin in src/data/portfolioData.ts"
            >
              <Linkedin size={15} />
              <span>LinkedIn: Editable Placeholder</span>
            </span>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="page-content about-right">
      <h2 className="page-title">About Me</h2>
      <div className="title-accent" />

      <blockquote className="editorial-quote">
        “{PERSONAL_INFO.aboutIntro}”
      </blockquote>

      <div className="subsection-block">
        <h3 className="subsection-label">Personal Journey</h3>
        <ol className="timeline-list">
          {JOURNEY_TIMELINE.slice(0, 2).map((item) => (
            <li key={item.title} className="timeline-item">
              <span className="timeline-badge">{item.period}</span>
              <div>
                <h4 className="timeline-title">{item.title}</h4>
                <p className="timeline-detail">{item.detail}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

