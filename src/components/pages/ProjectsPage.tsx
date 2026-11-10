import {
  CheckCircle2,
  ExternalLink,
  Eye,
  FolderGit2,
  ImageIcon,
  Layers,
} from 'lucide-react';
import { PROJECTS } from '../../data/portfolioData';
import { ProjectItem } from '../../types/portfolio';

export interface ProjectsPageProps {
  side: 'left' | 'right';
  continuation?: boolean;
  spreadPart?: number;
  onSelectProject: (project: ProjectItem) => void;
}

function ProjectCard({
  project,
  indexLabel,
  featuredLayout = false,
  onSelectProject,
}: {
  project: ProjectItem;
  indexLabel: string;
  featuredLayout?: boolean;
  onSelectProject: (project: ProjectItem) => void;
}) {
  if (featuredLayout) {
    return (
      <article className="featured-project-card">
        <div className="featured-project-head">
          <div>
            <span className="v2-panel-kicker">{project.category}</span>
            <h3 className="featured-project-title">{project.title}</h3>
          </div>
          <span className="project-status">{project.status}</span>
        </div>

        <button
          type="button"
          className="featured-shot-btn"
          onClick={() => onSelectProject(project)}
          title={`View ${project.title} details`}
        >
          {project.imageUrl ? (
            <img
              src={project.imageUrl}
              alt={project.title}
              loading="lazy"
              className="featured-shot-img"
            />
          ) : (
            <div className="featured-shot-placeholder">
              <ImageIcon size={24} />
              <span>{project.imagePlaceholderLabel}</span>
            </div>
          )}
        </button>

        <p className="featured-project-desc">{project.shortDescription}</p>

        <div className="project-tech-row">
          {project.technologies.map((tech) => (
            <span key={tech} className="mini-tech-tag">
              {tech}
            </span>
          ))}
        </div>

        <div className="project-actions">
          <button
            type="button"
            className="project-detail-btn"
            onClick={() => onSelectProject(project)}
          >
            <Eye size={13} />
            <span>View Details</span>
          </button>

          {project.githubUrl ? (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="project-link-btn"
            >
              <FolderGit2 size={13} />
              <span>GitHub</span>
            </a>
          ) : (
            <span
              className="project-link-muted"
              title="Add githubUrl in src/data/portfolioData.ts"
            >
              <FolderGit2 size={12} />
              <span>GitHub Placeholder</span>
            </span>
          )}

          {project.liveDemoUrl ? (
            <a
              href={project.liveDemoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="project-link-btn"
            >
              <ExternalLink size={13} />
              <span>Live Demo</span>
            </a>
          ) : (
            <span
              className="project-link-muted"
              title="Add liveDemoUrl in src/data/portfolioData.ts"
            >
              <ExternalLink size={12} />
              <span>Demo Placeholder</span>
            </span>
          )}
        </div>
      </article>
    );
  }

  return (
    <article className="project-card">
      <div className="project-thumb">
        {project.imageUrl ? (
          <img
            src={project.imageUrl}
            alt={project.title}
            loading="lazy"
            className="project-thumb-img"
          />
        ) : (
          <div className="project-thumb-placeholder">
            <ImageIcon size={18} />
            <span>{indexLabel}</span>
          </div>
        )}
      </div>

      <div className="project-main">
        <div className="project-top-row">
          <h3 className="project-title">{project.title}</h3>
          <span className="project-status">{project.status}</span>
        </div>

        <p className="project-desc">{project.shortDescription}</p>

        <div className="project-tech-row">
          {project.technologies.slice(0, 4).map((tech) => (
            <span key={tech} className="mini-tech-tag">
              {tech}
            </span>
          ))}
        </div>

        <div className="project-actions">
          <button
            type="button"
            className="project-detail-btn"
            onClick={() => onSelectProject(project)}
          >
            <Eye size={13} />
            <span>View Details</span>
          </button>

          {project.githubUrl ? (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="project-link-btn"
            >
              <FolderGit2 size={13} />
              <span>GitHub</span>
            </a>
          ) : (
            <span
              className="project-link-muted"
              title="Add githubUrl in src/data/portfolioData.ts"
            >
              <FolderGit2 size={12} />
              <span>GitHub Placeholder</span>
            </span>
          )}

          {project.liveDemoUrl ? (
            <a
              href={project.liveDemoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="project-link-btn"
            >
              <ExternalLink size={13} />
              <span>Live Demo</span>
            </a>
          ) : (
            <span
              className="project-link-muted"
              title="Add liveDemoUrl in src/data/portfolioData.ts"
            >
              <ExternalLink size={12} />
              <span>Demo Placeholder</span>
            </span>
          )}
        </div>
      </div>
    </article>
  );
}

/**
 * Page 3 Spreads — Projects I've Worked On:
 * - Spread 0 (pp. 7–8): V2 Boutique – E-Commerce Platform side-by-side showcase
 * - Spread 1 (pp. 9–10): AI & Software Concepts (FactoryMind AI, WhatsApp AI, Padika AI)
 * - Spread 2 (pp. 11–12): Smart Systems & Infrastructure with screenshots
 *   (Smart Parking System & Hybrid Smart Street Light Fault Monitoring System)
 */
export function ProjectsPage({
  side,
  continuation = false,
  spreadPart,
  onSelectProject,
}: ProjectsPageProps) {
  const part = spreadPart ?? (continuation ? 1 : 0);
  const featured = PROJECTS.find((p) => p.dualShowcase);
  const remaining = featured
    ? PROJECTS.filter((p) => p.id !== featured.id)
    : PROJECTS;

  // Spread 0: Featured V2 Boutique dual-panel showcase
  if (part === 0 && featured?.dualShowcase) {
    const panel =
      side === 'left' ? featured.dualShowcase.left : featured.dualShowcase.right;

    return (
      <div className="page-content v2-spread-page">
        {side === 'left' ? (
          <>
            <div className="v2-header-row">
              <div>
                <h2 className="page-title">Projects I've Worked On</h2>
                <div className="title-accent" />
              </div>
              <span className="v2-live-badge">{featured.status}</span>
            </div>

            <div className="v2-intro-block">
              <h3 className="v2-platform-name">{featured.title}</h3>
              <p className="v2-platform-desc">{featured.shortDescription}</p>
            </div>
          </>
        ) : (
          <div className="v2-right-top-bar">
            <span className="v2-eyebrow">
              <Layers size={13} />
              <span>Dual-Surface Architecture · Customer &amp; Admin</span>
            </span>
            {featured.liveDemoUrl && (
              <a
                href={featured.liveDemoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="v2-live-btn"
              >
                <span>Open Live Project</span>
                <ExternalLink size={13} />
              </a>
            )}
          </div>
        )}

        <section className="v2-panel-card">
          <div className="v2-panel-head">
            <span className="v2-panel-kicker">{panel.badge}</span>
            <h4 className="v2-panel-title">{panel.title}</h4>
          </div>

          <button
            type="button"
            className="v2-screenshot-btn"
            onClick={() => onSelectProject(featured)}
            title="Click to inspect full side-by-side showcase"
          >
            <img
              src={panel.imageUrl}
              alt={panel.title}
              loading="lazy"
              className="v2-screenshot-img"
            />
          </button>

          <div className="v2-features-wrap">
            <span className="v2-features-label">Highlighted Features</span>
            <ul className="v2-features-grid">
              {panel.features.map((feat) => (
                <li key={feat}>
                  <CheckCircle2 size={12} />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {side === 'right' && (
          <div className="v2-bottom-actions">
            <button
              type="button"
              className="project-detail-btn"
              onClick={() => onSelectProject(featured)}
            >
              <Eye size={13} />
              <span>Compare Both Panels</span>
            </button>

            {featured.liveDemoUrl && (
              <a
                href={featured.liveDemoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="project-link-btn"
              >
                <ExternalLink size={13} />
                <span>Live Admin &amp; Store</span>
              </a>
            )}

            <span className="v2-next-hint">
              Next spreads: {remaining.length} more projects →
            </span>
          </div>
        )}
      </div>
    );
  }

  // Spread 1: AI & Software Concepts (at most 2 cards on Left, 1+ on Right)
  if (part === 1) {
    const aiBatch = remaining.slice(0, 3);
    const leftItems = aiBatch.slice(0, 2);
    const rightItems = aiBatch.slice(2);
    const items = side === 'left' ? leftItems : rightItems;

    return (
      <div className="page-content">
        {side === 'left' && (
          <>
            <h2 className="page-title">AI &amp; Software Projects</h2>
            <div className="title-accent" />
          </>
        )}

        <div className="projects-list">
          {items.map((project, idx) => (
            <ProjectCard
              key={project.id}
              project={project}
              indexLabel={`0${(side === 'left' ? 0 : 2) + idx + 2}`}
              onSelectProject={onSelectProject}
            />
          ))}
        </div>

        {side === 'right' && (
          <div className="cert-add-note">
            <span>
              <strong>Turn to Next Spread (pp. 11–12):</strong> Smart Mobility &amp;
              Infrastructure — <em>Smart Parking System</em> &amp;{' '}
              <em>Hybrid Smart Street Light Fault Monitoring System</em>.
            </span>
          </div>
        )}
      </div>
    );
  }

  // Spread 2: Smart Systems & Infrastructure (1 large featured screenshot card per page)
  const smartBatch = remaining.slice(3);
  const leftProject = smartBatch[0];
  const rightItems = smartBatch.slice(1);

  return (
    <div className="page-content">
      {side === 'left' && (
        <>
          <h2 className="page-title">Smart Systems &amp; Infrastructure</h2>
          <div className="title-accent" />
        </>
      )}

      {side === 'left' && leftProject && (
        <ProjectCard
          project={leftProject}
          indexLabel="05"
          featuredLayout
          onSelectProject={onSelectProject}
        />
      )}

      {side === 'right' && (
        <div className="projects-list">
          {rightItems.map((project, idx) => (
            <ProjectCard
              key={project.id}
              project={project}
              indexLabel={`0${idx + 6}`}
              featuredLayout={rightItems.length === 1}
              onSelectProject={onSelectProject}
            />
          ))}
        </div>
      )}
    </div>
  );
}
