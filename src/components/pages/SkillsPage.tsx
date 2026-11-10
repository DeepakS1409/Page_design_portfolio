import { BookMarked, Code2, Globe, Sparkles, Wrench } from 'lucide-react';
import { CURRENTLY_LEARNING, SKILL_CATEGORIES } from '../../data/portfolioData';
import { SkillCategory } from '../../types/portfolio';
import { SpreadPageProps } from './AboutPage';

function CategoryIcon({ name }: { name: SkillCategory['iconName'] }) {
  switch (name) {
    case 'code':
      return <Code2 size={16} />;
    case 'globe':
      return <Globe size={16} />;
    case 'wrench':
      return <Wrench size={16} />;
    case 'sparkles':
      return <Sparkles size={16} />;
  }
}

/**
 * Page 2 Spread — My Skills:
 * Left: Programming & Web Development categories.
 * Right: Tools & Technologies, AI & Technology, and editable Currently Learning section.
 * Intentionally avoids fabricated proficiency percentages.
 */
export function SkillsPage({ side }: SpreadPageProps) {
  const leftCategories = SKILL_CATEGORIES.slice(0, 2);
  const rightCategories = SKILL_CATEGORIES.slice(2);

  if (side === 'left') {
    return (
      <div className="page-content">
        <h2 className="page-title">My Skills</h2>
        <div className="title-accent" />
        <p className="page-lead">
          Core languages, web fundamentals, tools, and AI concepts I work with and continue to strengthen.
        </p>

        <div className="skills-stack">
          {leftCategories.map((cat) => (
            <section key={cat.id} className="skill-card">
              <div className="skill-card-head">
                <span className="skill-icon-box">
                  <CategoryIcon name={cat.iconName} />
                </span>
                <h3 className="skill-cat-title">{cat.title}</h3>
              </div>
              <div className="skill-tags">
                {cat.items.map((skill) => (
                  <span key={skill} className="skill-pill">
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="page-content">
      <div className="skills-stack">
        {rightCategories.map((cat) => (
          <section key={cat.id} className="skill-card">
            <div className="skill-card-head">
              <span className="skill-icon-box">
                <CategoryIcon name={cat.iconName} />
              </span>
              <h3 className="skill-cat-title">{cat.title}</h3>
            </div>
            <div className="skill-tags">
              {cat.items.map((skill) => (
                <span key={skill} className="skill-pill">
                  {skill}
                </span>
              ))}
            </div>
          </section>
        ))}

        <section className="learning-box" aria-label="Currently Learning">
          <div className="learning-head">
            <BookMarked size={15} />
            <h3>CURRENTLY LEARNING</h3>
            <span className="editable-chip">Editable</span>
          </div>
          <ul className="learning-list">
            {CURRENTLY_LEARNING.map((topic) => (
              <li key={topic}>{topic}</li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}

