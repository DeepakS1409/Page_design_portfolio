import { Award, Medal, Trophy } from 'lucide-react';
import { ACHIEVEMENTS } from '../../data/portfolioData';
import { SpreadPageProps } from './AboutPage';

/**
 * Page 5 Spread — Achievements and Milestones:
 * Left: Prominent editorial spotlight on National Qualification Rank #132.
 * Right: Full milestone timeline across all verified recognitions.
 */
export function AchievementsPage({ side }: SpreadPageProps) {
  const featured = ACHIEVEMENTS.find((a) => a.featured) ?? ACHIEVEMENTS[0];
  const otherAchievements = ACHIEVEMENTS.filter((item) => !item.featured);

  if (side === 'left') {
    return (
      <div className="page-content">
        <h2 className="page-title">Achievements and Milestones</h2>
        <div className="title-accent" />

        <div className="achievement-spotlight">
          <div className="spotlight-medal">
            <Trophy size={26} />
            <span>FEATURED NATIONAL RANKING</span>
          </div>

          <div className="spotlight-rank-num">#132</div>
          <p className="spotlight-rank-label">National Qualification Rank</p>

          <h3 className="spotlight-title">{featured.title}</h3>
          <p className="spotlight-org">{featured.organization}</p>

          <div className="spotlight-score-box">
            <span>Overall Evaluation Score</span>
            <strong>116 / 180</strong>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-content">
      <h3 className="subsection-label">Milestone Ledger</h3>
      <ol className="milestone-list">
        {otherAchievements.map((item, idx) => (
          <li
            key={item.id}
            className={`milestone-card ${item.featured ? 'milestone-card--featured' : ''}`}
          >
            <div className="milestone-icon">
              {idx === 0 ? <Trophy size={16} /> : idx === 1 ? <Medal size={16} /> : <Award size={16} />}
            </div>
            <div className="milestone-body">
              <span className="milestone-badge">{item.rankOrBadge}</span>
              <h4 className="milestone-title">{item.title}</h4>
              <p className="milestone-org">{item.organization}</p>
              <ul className="milestone-points">
                {item.highlights.map((pt) => (
                  <li key={pt}>{pt}</li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

