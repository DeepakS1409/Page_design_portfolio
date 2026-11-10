import { AnimatePresence, motion } from 'framer-motion';
import { Award, ImagePlus, X } from 'lucide-react';
import { CertificateItem } from '../../types/portfolio';

export interface CertificatePreviewModalProps {
  certificate: CertificateItem | null;
  onClose: () => void;
}

/**
 * High-quality lightbox preview for supplied certificates (and clear editable
 * placeholder view when the actual image file has not yet been attached).
 */
export function CertificatePreviewModal({
  certificate,
  onClose,
}: CertificatePreviewModalProps) {
  return (
    <AnimatePresence>
      {certificate && (
        <motion.div
          className="modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={`Certificate preview: ${certificate.title}`}
        >
          <motion.div
            className="cert-modal"
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="detail-modal-head">
              <div>
                <span className="detail-kicker">
                  <Award size={12} style={{ display: 'inline', marginRight: 5 }} />
                  {certificate.issuer}
                </span>
                <h2 className="detail-title">{certificate.title}</h2>
              </div>
              <button
                type="button"
                className="icon-btn"
                onClick={onClose}
                aria-label="Close certificate preview"
              >
                <X size={18} />
              </button>
            </div>

            <div className="cert-modal-frame">
              {certificate.imageUrl ? (
                <img
                  src={certificate.imageUrl}
                  alt={certificate.title}
                  className="cert-modal-img"
                />
              ) : (
                <div className="cert-modal-placeholder">
                  <ImagePlus size={42} strokeWidth={1.4} />
                  <h3>Actual Certificate Image Not Attached Yet</h3>
                  <p>{certificate.imagePlaceholderHint}</p>
                  <small>
                    Once you place your real certificate image inside{' '}
                    <code>public/assets/certificates/</code> and update{' '}
                    <code>imageUrl</code> in <code>src/data/portfolioData.ts</code>, it will
                    render here at full crisp quality.
                  </small>
                </div>
              )}
            </div>

            <ul className="cert-modal-details">
              {certificate.details.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

