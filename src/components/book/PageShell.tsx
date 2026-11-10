import React from 'react';
import { ChapterMeta } from '../../types/portfolio';

export interface PageShellProps {
  side: 'left' | 'right';
  chapter: ChapterMeta;
  pageNumber: number;
  children: React.ReactNode;
}

/**
 * Editorial ivory paper container for an individual left or right book page.
 * Renders subtle spine-gutter depth, running chapter header, scrollable reading body
 * on compact screens, and consistent page numbers.
 */
export function PageShell({ side, chapter, pageNumber, children }: PageShellProps) {
  return (
    <article
      className={`book-sheet book-sheet--${side}`}
      aria-label={`${chapter.title} — Page ${pageNumber}`}
    >
      <header className="sheet-header">
        <span className="sheet-chapter-tag">
          CHAPTER {chapter.number} · {chapter.shortTitle.toUpperCase()}
        </span>
        <span className="sheet-running-sub">{chapter.subtitle}</span>
      </header>

      <div className="sheet-body">{children}</div>

      <footer className="sheet-footer">
        <span className="sheet-footer-section">{chapter.title}</span>
        <span className="sheet-page-num">{String(pageNumber).padStart(2, '0')}</span>
      </footer>
    </article>
  );
}

