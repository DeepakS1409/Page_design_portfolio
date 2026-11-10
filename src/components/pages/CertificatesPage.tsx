import { Award, ImagePlus, ZoomIn } from 'lucide-react';
import { CERTIFICATES } from '../../data/portfolioData';
import { CertificateItem } from '../../types/portfolio';

export interface CertificatesPageProps {
  side: 'left' | 'right';
  onSelectCertificate: (cert: CertificateItem) => void;
}

/**
 * Page 4 Spread — Certifications and Participation:
 * Displays supplied certificate images (or clearly editable placeholders when
 * image files have not yet been placed) with click-to-preview lightbox support.
 */
export function CertificatesPage({
  side,
  onSelectCertificate,
}: CertificatesPageProps) {
  const items = side === 'left' ? CERTIFICATES.slice(0, 1) : CERTIFICATES.slice(1);

  return (
    <div className="page-content">
      {side === 'left' && (
        <>
          <h2 className="page-title">Certifications and Participation</h2>
          <div className="title-accent" />
          <p className="page-lead">
            Click any certificate card to inspect a larger preview.
          </p>
        </>
      )}

      <div className={`cert-grid cert-grid--${side}`}>
        {items.map((cert) => (
          <button
            key={cert.id}
            type="button"
            className="cert-card"
            onClick={() => onSelectCertificate(cert)}
          >
            <div className="cert-thumb-box">
              {cert.imageUrl ? (
                <>
                  <img
                    src={cert.imageUrl}
                    alt={cert.title}
                    loading="lazy"
                    className="cert-thumb-img"
                    onError={(event) => {
                      event.currentTarget.hidden = true;
                      event.currentTarget.nextElementSibling?.removeAttribute('hidden');
                    }}
                  />
                  <div className="cert-placeholder" hidden>
                    <ImagePlus size={22} strokeWidth={1.6} />
                    <span>Certificate Image Placeholder</span>
                    <small>{cert.imagePlaceholderHint}</small>
                  </div>
                </>
              ) : (
                <div className="cert-placeholder">
                  <ImagePlus size={22} strokeWidth={1.6} />
                  <span>Certificate Image Placeholder</span>
                  <small>{cert.imagePlaceholderHint}</small>
                </div>
              )}
              <span className="cert-zoom-badge">
                <ZoomIn size={13} />
                <span>Preview</span>
              </span>
            </div>

            <div className="cert-info">
              <div className="cert-head-row">
                <h3 className="cert-title">{cert.title}</h3>
                {cert.badgeText && <span className="cert-badge">{cert.badgeText}</span>}
              </div>
              <p className="cert-issuer">
                <Award size={13} />
                <span>{cert.issuer}</span>
              </p>
              <ul className="cert-details-list">
                {cert.details.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

