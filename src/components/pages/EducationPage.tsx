import { BookOpenCheck, Calendar, GraduationCap, MapPin } from 'lucide-react';
import { EDUCATION_TIMELINE, PERSONAL_INFO } from '../../data/portfolioData';
import { SpreadPageProps } from './AboutPage';

/**
 * Page 6 Spread — My Education:
 * Left: Primary academic card (B.Tech Information Technology, Sri Eshwar College of Engineering, 2026–2030).
 * Right: Academic progression timeline.
 */
export function EducationPage({ side }: SpreadPageProps) {
  if (side === 'left') {
    return (
      <div className="page-content">
        <h2 className="page-title">My Education</h2>
        <div className="title-accent" />

        <div className="education-crest-card">
          <div className="crest-emblem">
            <GraduationCap size={30} strokeWidth={1.6} />
          </div>

          <span className="edu-status-pill">
            <BookOpenCheck size={13} />
            <span>Status: {PERSONAL_INFO.educationStatus}</span>
          </span>

          <h3 className="edu-degree">{PERSONAL_INFO.degree}</h3>
          <p className="edu-college">
            <MapPin size={14} />
            <span>{PERSONAL_INFO.college}</span>
          </p>

          <div className="edu-meta-grid">
            <div className="edu-meta-box">
              <span className="edu-meta-label">
                <Calendar size={12} /> Batch
              </span>
              <strong>{PERSONAL_INFO.batch}</strong>
            </div>
            <div className="edu-meta-box">
              <span className="edu-meta-label">Program</span>
              <strong>Undergraduate (4 Years)</strong>
            </div>
          </div>

          <p className="edu-objective">{PERSONAL_INFO.careerObjective}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-content">
      <h3 className="subsection-label">Academic Timeline</h3>
      <ol className="timeline-list timeline-list--spacious">
        {EDUCATION_TIMELINE.map((item) => (
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

