import { PERSONAL_INFO, BOOK_CHAPTERS } from '../../data/portfolioData';

export interface WebGLFallbackBookProps {
  isOpen: boolean;
  currentSpread: number;
  onOpenBook: () => void;
}

/**
 * Lightweight CSS 3D fallback book for environments where WebGL is disabled or unsupported.
 */
export function WebGLFallbackBook({
  isOpen,
  currentSpread,
  onOpenBook,
}: WebGLFallbackBookProps) {
  const chapter = BOOK_CHAPTERS[currentSpread] ?? BOOK_CHAPTERS[0];

  if (!isOpen) {
    return (
      <div className="fallback-stage">
        <div
          className="fallback-cover"
          onClick={onOpenBook}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') onOpenBook();
          }}
        >
          <div className="fallback-spine" />
          <div className="fallback-cover-inner">
            <span className="fallback-edition">INTERACTIVE PORTFOLIO VOLUME</span>
            <h1 className="fallback-title">{PERSONAL_INFO.coverTitle}</h1>
            <p className="fallback-sub">{PERSONAL_INFO.coverEdition}</p>
            <div className="fallback-divider" />
            <p className="fallback-degree">{PERSONAL_INFO.degree}</p>
            <p className="fallback-college">{PERSONAL_INFO.college}</p>
            <span className="fallback-batch">{PERSONAL_INFO.batch}</span>
            <p className="fallback-quote">"{PERSONAL_INFO.coverSubtitle}"</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fallback-open-shell" aria-label={`Open book: ${chapter.title}`}>
      <div className="fallback-open-spine" />
    </div>
  );
}

