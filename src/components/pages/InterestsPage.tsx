import { TECH_INTERESTS } from '../../data/portfolioData';
import { TechInterestItem } from '../../types/portfolio';
import { SpreadPageProps } from './AboutPage';

/**
 * Custom crisp SVG technical schematics representing each area of exploration.
 */
function TechSchematicSvg({ type }: { type: TechInterestItem['illustration'] }) {
  switch (type) {
    case 'ai':
      return (
        <svg viewBox="0 0 40 40" className="schematic-svg" aria-hidden="true">
          <circle cx="10" cy="12" r="3" />
          <circle cx="10" cy="28" r="3" />
          <circle cx="22" cy="20" r="3.5" />
          <circle cx="32" cy="12" r="3" />
          <circle cx="32" cy="28" r="3" />
          <line x1="13" y1="13" x2="19" y2="18" />
          <line x1="13" y1="27" x2="19" y2="22" />
          <line x1="25" y1="18" x2="29" y2="14" />
          <line x1="25" y1="22" x2="29" y2="26" />
        </svg>
      );
    case 'iot':
      return (
        <svg viewBox="0 0 40 40" className="schematic-svg" aria-hidden="true">
          <circle cx="20" cy="26" r="4" />
          <path d="M12 20a11 11 0 0 1 16 0" fill="none" />
          <path d="M8 15a17 17 0 0 1 24 0" fill="none" />
          <line x1="20" y1="30" x2="20" y2="35" />
          <line x1="13" y1="35" x2="27" y2="35" />
        </svg>
      );
    case 'arduino':
      return (
        <svg viewBox="0 0 40 40" className="schematic-svg" aria-hidden="true">
          <rect x="6" y="10" width="28" height="20" rx="3" fill="none" />
          <rect x="13" y="16" width="14" height="8" rx="1" fill="none" />
          <line x1="10" y1="7" x2="10" y2="10" />
          <line x1="15" y1="7" x2="15" y2="10" />
          <line x1="20" y1="7" x2="20" y2="10" />
          <line x1="25" y1="7" x2="25" y2="10" />
          <line x1="30" y1="7" x2="30" y2="10" />
        </svg>
      );
    case 'esp32':
      return (
        <svg viewBox="0 0 40 40" className="schematic-svg" aria-hidden="true">
          <rect x="10" y="9" width="20" height="22" rx="2" fill="none" />
          <path d="M14 14h12M14 19h8M14 24h12" />
          <line x1="7" y1="14" x2="10" y2="14" />
          <line x1="7" y1="20" x2="10" y2="20" />
          <line x1="7" y1="26" x2="10" y2="26" />
          <line x1="30" y1="14" x2="33" y2="14" />
          <line x1="30" y1="20" x2="33" y2="20" />
          <line x1="30" y1="26" x2="33" y2="26" />
        </svg>
      );
    case 'robotics':
      return (
        <svg viewBox="0 0 40 40" className="schematic-svg" aria-hidden="true">
          <rect x="11" y="12" width="18" height="14" rx="3" fill="none" />
          <circle cx="16" cy="19" r="2" />
          <circle cx="24" cy="19" r="2" />
          <line x1="20" y1="6" x2="20" y2="12" />
          <circle cx="20" cy="6" r="1.5" />
          <line x1="14" y1="26" x2="14" y2="33" />
          <line x1="26" y1="26" x2="26" y2="33" />
        </svg>
      );
    case 'embedded':
      return (
        <svg viewBox="0 0 40 40" className="schematic-svg" aria-hidden="true">
          <rect x="12" y="12" width="16" height="16" rx="2" fill="none" />
          <rect x="16" y="16" width="8" height="8" fill="none" />
          <path d="M16 7v5M24 7v5M16 28v5M24 28v5M7 16h5M7 24h5M28 16h5M28 24h5" />
        </svg>
      );
    case 'sensors':
      return (
        <svg viewBox="0 0 40 40" className="schematic-svg" aria-hidden="true">
          <polyline points="5,24 12,24 16,13 21,29 26,18 30,24 35,24" fill="none" />
          <circle cx="20" cy="20" r="14" fill="none" strokeDasharray="3 3" />
        </svg>
      );
    case 'integration':
      return (
        <svg viewBox="0 0 40 40" className="schematic-svg" aria-hidden="true">
          <rect x="6" y="12" width="11" height="16" rx="2" fill="none" />
          <rect x="23" y="12" width="11" height="16" rx="2" fill="none" />
          <path d="M17 17h6M20 14l3 3-3 3" fill="none" />
          <path d="M23 23h-6M20 20l-3 3 3 3" fill="none" />
        </svg>
      );
  }
}

/**
 * Page 7 Spread — Beyond Coding:
 * Showcases technical curiosity & exploration areas (clearly framed as interests,
 * not completed hardware projects).
 */
export function InterestsPage({ side }: SpreadPageProps) {
  const half = Math.ceil(TECH_INTERESTS.length / 2);
  const items = side === 'left' ? TECH_INTERESTS.slice(0, half) : TECH_INTERESTS.slice(half);

  return (
    <div className="page-content">
      {side === 'left' ? (
        <>
          <h2 className="page-title">Beyond Coding</h2>
          <div className="title-accent" />
          <p className="page-lead">
            Areas of curiosity I am actively exploring alongside software development.
          </p>
        </>
      ) : (
        <p className="interests-note">
          <strong>Exploration Note:</strong> These represent ongoing technology interests and
          concepts I am studying—bridging software intelligence with physical hardware.
        </p>
      )}

      <div className="interests-grid">
        {items.map((item) => (
          <div key={item.id} className="interest-card">
            <div className="interest-icon-wrap">
              <TechSchematicSvg type={item.illustration} />
            </div>
            <div>
              <h3 className="interest-title">{item.title}</h3>
              <p className="interest-summary">{item.summary}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

