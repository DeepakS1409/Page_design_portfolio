import { ExternalLink, Eye, FolderGit2, ImageIcon } from 'lucide-react';
import { PROJECTS } from '../../data/portfolioData';
import { ProjectItem } from '../../types/portfolio';

export interface ProjectsPageProps {
  side: 'left' | 'right';
  continuation?: boolean;
  onSelectProject: (project: ProjectItem) => void;
}

/**
 * Page 3 Spread — Projects I've Worked On:
 * Splits projects across two spreads so each reading page stays concise,
 * with editable screenshot placeholders, technology pills, View Details trigger,
 * and honest GitHub / Live Demo link placeholders.
 */
export function ProjectsPage({ side, continuation = false, onSelectProject }: ProjectsPageProps) {
  const projectsPerSpread = Math.ceil(PROJECTS.length / 2);
  const spreadStart = continuation ? projectsPerSpread : 0;
  const spreadProjects = PROJECTS.slice(spreadStart, spreadStart + projectsPerSpread);
  const half = Math.ceil(spreadProjects.length / 2);
  const items = side === 'left'
    ? spreadProjects.slice(0, half)
    : spreadProjects.slice(half);

  return (
    <div className="page-content">
      {side === 'left' && (
        <>
          <h2 className="page-title">
            {continuation ? 'More Projects' : "Projects I've Worked On"}
          </h2>
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
                  <span>0{spreadStart + (side === 'left' ? 0 : half) + idx + 1}</span>
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

