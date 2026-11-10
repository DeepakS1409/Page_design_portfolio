import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2, ExternalLink, FolderGit2, ImageIcon, X } from 'lucide-react';
import { ProjectItem } from '../../types/portfolio';

export interface ProjectDetailsModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export function ProjectDetailsModal({ project, onClose }: ProjectDetailsModalProps) {
  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={`Project details: ${project.title}`}
        >
          <motion.div
            className="detail-modal"
            initial={{ opacity: 0, y: 18, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.97 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="detail-modal-head">
              <div>
                <span className="detail-kicker">
                  {project.category} · {project.status}
                </span>
                <h2 className="detail-title">{project.title}</h2>
              </div>
              <button
                type="button"
                className="icon-btn"
                onClick={onClose}
                aria-label="Close project details"
              >
                <X size={18} />
              </button>
            </div>

            <div className="detail-preview-box">
              {project.imageUrl ? (
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="detail-preview-img"
                />
              ) : (
                <div className="detail-preview-placeholder">
                  <ImageIcon size={32} strokeWidth={1.5} />
                  <span>{project.imagePlaceholderLabel}</span>
                  <small>
                    Add screenshot in <code>public/assets/projects/</code> and set{' '}
                    <code>imageUrl</code> in <code>src/data/portfolioData.ts</code>
                  </small>
                </div>
              )}
            </div>

            <p className="detail-overview">{project.detailedOverview}</p>

            <div className="detail-section">
              <h3>Key Concepts & Capabilities</h3>
              <ul className="detail-cap-list">
                {project.keyCapabilities.map((cap) => (
                  <li key={cap}>
                    <CheckCircle2 size={14} />
                    <span>{cap}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="detail-section">
              <h3>Technologies</h3>
              <div className="detail-tech-row">
                {project.technologies.map((t) => (
                  <span key={t} className="detail-tech-pill">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="detail-links">
              {project.githubUrl ? (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="detail-btn detail-btn--primary"
                >
                  <FolderGit2 size={15} />
                  <span>View on GitHub</span>
                </a>
              ) : (
                <span className="detail-btn detail-btn--placeholder">
                  <FolderGit2 size={15} />
                  <span>GitHub Link Placeholder</span>
                </span>
              )}

              {project.liveDemoUrl ? (
                <a
                  href={project.liveDemoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="detail-btn detail-btn--primary"
                >
                  <ExternalLink size={15} />
                  <span>Open Live Demo</span>
                </a>
              ) : (
                <span className="detail-btn detail-btn--placeholder">
                  <ExternalLink size={15} />
                  <span>Live Demo Link Placeholder</span>
                </span>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

