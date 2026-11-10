import { AnimatePresence, motion } from 'framer-motion';
import { BookOpen, Home, X } from 'lucide-react';
import { BOOK_CHAPTERS, PERSONAL_INFO } from '../../data/portfolioData';

export interface TableOfContentsProps {
  isOpen: boolean;
  currentSpread: number;
  onSelectChapter: (spreadIndex: number) => void;
  onCloseBook: () => void;
  onCloseModal: () => void;
}

/**
 * Interactive Table of Contents modal allowing visitors to jump directly
 * to any section with a physical 3D page-turn transition.
 */
export function TableOfContents({
  isOpen,
  currentSpread,
  onSelectChapter,
  onCloseBook,
  onCloseModal,
}: TableOfContentsProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onCloseModal}
          role="dialog"
          aria-modal="true"
          aria-label="Table of Contents"
        >
          <motion.div
            className="toc-panel"
            initial={{ opacity: 0, y: 18, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.97 }}
            transition={{ duration: 0.22 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="toc-header">
              <div>
                <p className="toc-kicker">{PERSONAL_INFO.coverTitle} · {PERSONAL_INFO.coverEdition}</p>
                <h2 className="toc-title">Table of Contents</h2>
              </div>
              <button
                type="button"
                className="icon-btn"
                onClick={onCloseModal}
                aria-label="Close Table of Contents"
              >
                <X size={18} />
              </button>
            </div>

            <p className="toc-desc">
              Select any chapter to turn directly to its spread inside the book.
            </p>

            <nav className="toc-list" aria-label="Book chapters">
              {BOOK_CHAPTERS.filter((chapter) => !chapter.continuation).map((chapter) => {
                const active = BOOK_CHAPTERS[currentSpread]?.id === chapter.id;
                const matchingSpreads = BOOK_CHAPTERS.filter((c) => c.id === chapter.id);
                const firstPage = matchingSpreads[0]?.pageNumbers[0] ?? chapter.pageNumbers[0];
                const lastPage =
                  matchingSpreads[matchingSpreads.length - 1]?.pageNumbers[1] ??
                  chapter.pageNumbers[1];
                return (
                  <button
                    key={chapter.id}
                    type="button"
                    className={`toc-item ${active ? 'toc-item--active' : ''}`}
                    onClick={() => {
                      onSelectChapter(chapter.spreadIndex);
                      onCloseModal();
                    }}
                  >
                    <span className="toc-num">{chapter.number}</span>
                    <span className="toc-item-main">
                      <span className="toc-item-title">{chapter.title}</span>
                      <span className="toc-item-sub">{chapter.subtitle}</span>
                    </span>
                    <span className="toc-pages">
                      pp. {firstPage}–{lastPage}
                    </span>
                  </button>
                );
              })}
            </nav>

            <div className="toc-footer">
              <button
                type="button"
                className="toc-cover-btn"
                onClick={() => {
                  onCloseModal();
                  onCloseBook();
                }}
              >
                <Home size={15} />
                <span>Return to Book Cover</span>
              </button>
              <span className="toc-hint">
                <BookOpen size={14} />
                <span>Tip: Arrow keys or swipe to flip pages</span>
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

