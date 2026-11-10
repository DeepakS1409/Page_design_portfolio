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
  onSelectProject: (project: ProjectItem) => void;
}

/**
 * Page 3 Spreads — Projects I've Worked On:
 * - First spread (pp. 7–8): Dedicated side-by-side showcase for the featured
 *   V2 Boutique – E-Commerce Platform (Left: V2 Operations Admin Dashboard,
 *   Right: V2 Boutique E-Commerce Website).
 * - Continuation spread (pp. 9–10): Remaining college & AI projects.
 */
export function ProjectsPage({
  side,
  continuation = false,
  onSelectProject,
}: ProjectsPageProps) {
  const featured = PROJECTS.find((p) => p.dualShowcase);
  const remaining = featured
    ? PROJECTS.filter((p) => p.id !== featured.id)
    : PROJECTS;

  if (!continuation && featured?.dualShowcase) {
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
              Next spread: {remaining.length} more projects →
            </span>
          </div>
        )}
      </div>
    );
  }

  const half = Math.ceil(remaining.length / 2);
  const items = side === 'left' ? remaining.slice(0, half) : remaining.slice(half);

  return (
    <div className="page-content">
      {side === 'left' && (
        <>
          <h2 className="page-title">More Projects</h2>
          <div className="title-accent" />
        </>
      )}

      <div className="projects-list">
        {items.map((project, idx) => (
          <article key={project.id} className="project-card">
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
                  <span>0{(side === 'left' ? 0 : half) + idx + 2}</span>
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
        ))}
      </div>
    </div>
  );
}
