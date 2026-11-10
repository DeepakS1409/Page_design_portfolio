import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Home,
  List,
  Sparkles,
} from 'lucide-react';
import { BookScene } from './components/book/BookScene';
import { SpreadScreenBounds, TurnAnimationState } from './components/book/BookModel';
import { PageShell } from './components/book/PageShell';
import { PageTurnController } from './components/book/PageTurnController';
import { TableOfContents } from './components/book/TableOfContents';
import { AboutPage } from './components/pages/AboutPage';
import { SkillsPage } from './components/pages/SkillsPage';
import { ProjectsPage } from './components/pages/ProjectsPage';
import { CertificatesPage } from './components/pages/CertificatesPage';
import { AchievementsPage } from './components/pages/AchievementsPage';
import { EducationPage } from './components/pages/EducationPage';
import { InterestsPage } from './components/pages/InterestsPage';
import { ContactPage } from './components/pages/ContactPage';
import { ProjectDetailsModal } from './components/modals/ProjectDetailsModal';
import { CertificatePreviewModal } from './components/modals/CertificatePreviewModal';
import { BOOK_CHAPTERS, PERSONAL_INFO } from './data/portfolioData';
import { CertificateItem, ProjectItem } from './types/portfolio';

const INITIAL_TURN_STATE: TurnAnimationState = {
  active: false,
  direction: 'next',
  fromSpread: 0,
  toSpread: 0,
  isMultiJump: false,
};

export function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [coverReady, setCoverReady] = useState(false);
  const [currentSpread, setCurrentSpread] = useState(0);
  const [mobileSide, setMobileSide] = useState<'left' | 'right'>('left');
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth < 768 : false
  );
  const [reduceMotion, setReduceMotion] = useState(() =>
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false
  );
  const [isFallback, setIsFallback] = useState(false);

  const [turnState, setTurnState] = useState<TurnAnimationState>(INITIAL_TURN_STATE);
  const [spreadBounds, setSpreadBounds] = useState<SpreadScreenBounds>({
    left: 0,
    top: 0,
    width: 0,
    height: 0,
    visible: false,
  });

  const [tocOpen, setTocOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [selectedCertificate, setSelectedCertificate] = useState<CertificateItem | null>(
    null
  );

  useEffect(() => {
    const onResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const totalSpreads = BOOK_CHAPTERS.length;
  const activeChapter = BOOK_CHAPTERS[currentSpread] ?? BOOK_CHAPTERS[0];
  const isModalOpen = tocOpen || !!selectedProject || !!selectedCertificate;

  const canGoPrev = isMobile
    ? currentSpread > 0 || mobileSide === 'right'
    : currentSpread > 0;
  const canGoNext = isMobile
    ? currentSpread < totalSpreads - 1 || mobileSide === 'left'
    : currentSpread < totalSpreads - 1;

  const handleOpenBook = useCallback(() => {
    if (isOpen) return;
    setCurrentSpread(0);
    setMobileSide('left');
    setIsOpen(true);
    if (isFallback) {
      setCoverReady(true);
    }
  }, [isOpen, isFallback]);

  const handleCloseBook = useCallback(() => {
    if (turnState.active) return;
    setCoverReady(false);
    setIsOpen(false);
    setTocOpen(false);
  }, [turnState.active]);

  const handleOpenComplete = useCallback(() => {
    setCoverReady(true);
  }, []);

  const startTurn = useCallback(
    (targetSpread: number, nextMobileSide?: 'left' | 'right') => {
      if (turnState.active) return;
      const clamped = Math.max(0, Math.min(totalSpreads - 1, targetSpread));
      if (clamped === currentSpread) {
        if (nextMobileSide) setMobileSide(nextMobileSide);
        return;
      }

      if (isFallback) {
        setCurrentSpread(clamped);
        if (nextMobileSide) setMobileSide(nextMobileSide);
        return;
      }

      setTurnState({
        active: true,
        direction: clamped > currentSpread ? 'next' : 'prev',
        fromSpread: currentSpread,
        toSpread: clamped,
        isMultiJump: Math.abs(clamped - currentSpread) > 1,
      });

      if (nextMobileSide) {
        setMobileSide(nextMobileSide);
      }
    },
    [turnState.active, totalSpreads, currentSpread, isFallback]
  );

  const handleTurnComplete = useCallback(() => {
    setTurnState((prev) => {
      if (!prev.active) return prev;
      setCurrentSpread(prev.toSpread);
      return INITIAL_TURN_STATE;
    });
  }, []);

  const handleNextPage = useCallback(() => {
    if (!canGoNext || turnState.active) return;
    if (isMobile) {
      if (mobileSide === 'left') {
        setMobileSide('right');
      } else {
        startTurn(currentSpread + 1, 'left');
      }
      return;
    }
    startTurn(currentSpread + 1);
  }, [canGoNext, turnState.active, isMobile, mobileSide, currentSpread, startTurn]);

  const handlePrevPage = useCallback(() => {
    if (!canGoPrev || turnState.active) return;
    if (isMobile) {
      if (mobileSide === 'right') {
        setMobileSide('left');
      } else {
        startTurn(currentSpread - 1, 'right');
      }
      return;
    }
    startTurn(currentSpread - 1);
  }, [canGoPrev, turnState.active, isMobile, mobileSide, currentSpread, startTurn]);

  const handleJumpToChapter = useCallback(
    (targetSpread: number) => {
      if (!isOpen) {
        setIsOpen(true);
        setCurrentSpread(targetSpread);
        setMobileSide('left');
        return;
      }
      startTurn(targetSpread, 'left');
    },
    [isOpen, startTurn]
  );

  const renderSpreadSide = (side: 'left' | 'right') => {
    switch (activeChapter.id) {
      case 'about':
        return <AboutPage side={side} continuation={activeChapter.continuation} />;
      case 'skills':
        return <SkillsPage side={side} />;
      case 'projects':
        return (
          <ProjectsPage
            side={side}
            continuation={activeChapter.continuation}
            spreadPart={activeChapter.spreadPart}
            onSelectProject={setSelectedProject}
          />
        );
      case 'certificates':
        return (
          <CertificatesPage
            side={side}
            onSelectCertificate={setSelectedCertificate}
          />
        );
      case 'achievements':
        return <AchievementsPage side={side} />;
      case 'education':
        return <EducationPage side={side} />;
      case 'interests':
        return <InterestsPage side={side} />;
      case 'contact':
        return <ContactPage side={side} />;
    }
  };

  const showInteractiveSpread =
    isOpen &&
    coverReady &&
    !turnState.active &&
    (isFallback || spreadBounds.visible);

  const currentMobilePageNum =
    mobileSide === 'left'
      ? activeChapter.pageNumbers[0]
      : activeChapter.pageNumbers[1];

  return (
    <div className={`app-shell ${reduceMotion ? 'reduce-motion' : ''}`}>
      {/* Subtle ambient background glow */}
      <div className="ambient-backdrop" aria-hidden="true" />

      {/* Top Editorial Chrome */}
      <header className="top-bar">
        <div className="top-brand">
          <BookOpen size={16} className="brand-icon" />
          <span className="brand-name">{PERSONAL_INFO.name}</span>
          <span className="brand-sep">·</span>
          <span className="brand-sub">Digital Book Portfolio</span>
        </div>

        <div className="top-actions">
          {isOpen && (
            <>
              <button
                type="button"
                className="chrome-btn"
                onClick={handleCloseBook}
                disabled={turnState.active}
                title="Return to Book Cover"
              >
                <Home size={14} />
                <span className="chrome-btn-label">Book Cover</span>
              </button>

              <button
                type="button"
                className="chrome-btn chrome-btn--accent"
                onClick={() => setTocOpen(true)}
                disabled={turnState.active}
              >
                <List size={14} />
                <span>Table of Contents</span>
              </button>
            </>
          )}

          <button
            type="button"
            className={`chrome-btn ${reduceMotion ? 'chrome-btn--active' : ''}`}
            onClick={() => setReduceMotion((r) => !r)}
            aria-pressed={reduceMotion}
            title="Skip or reduce 3D animations"
          >
            <Sparkles size={14} />
            <span className="chrome-btn-label">
              {reduceMotion ? 'Motion Reduced' : 'Reduce Motion'}
            </span>
          </button>
        </div>
      </header>

      {/* Main 3D Stage */}
      <main className="stage-area">
        <BookScene
          isOpen={isOpen}
          currentSpread={currentSpread}
          mobileSide={mobileSide}
          isMobile={isMobile}
          reduceMotion={reduceMotion}
          turnState={turnState}
          onTurnComplete={handleTurnComplete}
          onOpenComplete={handleOpenComplete}
          onOpenBook={handleOpenBook}
          onBoundsUpdate={setSpreadBounds}
          onFallbackReady={setIsFallback}
        />

        {/* Closed Book CTA Overlay */}
        <AnimatePresence>
          {!isOpen && (
            <motion.div
              className="cover-cta-dock"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.25 }}
            >
              <button
                type="button"
                className="open-book-btn"
                onClick={handleOpenBook}
              >
                <BookOpen size={17} />
                <span>OPEN MY BOOK</span>
              </button>
              <p className="cover-cta-hint">
                Click the cover or press Enter to begin exploring
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Interactive Ivory Pages Aligned Directly Onto the Open 3D Book */}
        <AnimatePresence mode="wait">
          {showInteractiveSpread && (
            <motion.section
              key={`${currentSpread}-${isMobile ? mobileSide : 'spread'}`}
              className={`spread-overlay ${
                isFallback ? 'spread-overlay--fallback' : ''
              } ${isMobile ? 'spread-overlay--single' : ''}`}
              style={
                !isFallback && spreadBounds.width > 0
                  ? {
                      left: `${spreadBounds.left}px`,
                      top: `${spreadBounds.top}px`,
                      width: `${spreadBounds.width}px`,
                      height: `${spreadBounds.height}px`,
                    }
                  : undefined
              }
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduceMotion ? 0.08 : 0.16 }}
              aria-label={`Chapter ${activeChapter.number}: ${activeChapter.title}`}
            >
              {isMobile ? (
                <PageShell
                  side={mobileSide}
                  chapter={activeChapter}
                  pageNumber={currentMobilePageNum}
                >
                  {renderSpreadSide(mobileSide)}
                </PageShell>
              ) : (
                <>
                  <PageShell
                    side="left"
                    chapter={activeChapter}
                    pageNumber={activeChapter.pageNumbers[0]}
                  >
                    {renderSpreadSide('left')}
                  </PageShell>
                  <div className="spread-spine-gutter" aria-hidden="true" />
                  <PageShell
                    side="right"
                    chapter={activeChapter}
                    pageNumber={activeChapter.pageNumbers[1]}
                  >
                    {renderSpreadSide('right')}
                  </PageShell>
                </>
              )}
            </motion.section>
          )}
        </AnimatePresence>
      </main>

      {/* Bottom Book Navigation Bar */}
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            className="bottom-nav"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.22 }}
            aria-label="Book page navigation"
          >
            <button
              type="button"
              className="nav-turn-btn"
              onClick={handlePrevPage}
              disabled={!canGoPrev || turnState.active}
            >
              <ChevronLeft size={16} />
              <span>Previous Page</span>
            </button>

            <div className="nav-status">
              <span className="nav-chapter-label">
                {activeChapter.number}. {activeChapter.title}
              </span>
              <span className="nav-page-counter">
                {isMobile
                  ? `Page ${String(currentMobilePageNum).padStart(2, '0')} of ${totalSpreads * 2}`
                  : `Pages ${String(activeChapter.pageNumbers[0]).padStart(2, '0')}–${String(
                      activeChapter.pageNumbers[1]
                    ).padStart(2, '0')} of ${totalSpreads * 2}`}
              </span>
            </div>

            <button
              type="button"
              className="nav-turn-btn nav-turn-btn--next"
              onClick={handleNextPage}
              disabled={!canGoNext || turnState.active}
            >
              <span>Next Page</span>
              <ChevronRight size={16} />
            </button>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Keyboard & Touch Swipe Controller */}
      <PageTurnController
        isOpen={isOpen}
        isTurning={turnState.active}
        canGoPrev={canGoPrev}
        canGoNext={canGoNext}
        onPrev={handlePrevPage}
        onNext={handleNextPage}
        onOpenBook={handleOpenBook}
        onToggleToc={() => setTocOpen((v) => !v)}
        isModalOpen={isModalOpen}
      />

      {/* Modals */}
      <TableOfContents
        isOpen={tocOpen}
        currentSpread={currentSpread}
        onSelectChapter={handleJumpToChapter}
        onCloseBook={handleCloseBook}
        onCloseModal={() => setTocOpen(false)}
      />

      <ProjectDetailsModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      <CertificatePreviewModal
        certificate={selectedCertificate}
        onClose={() => setSelectedCertificate(null)}
      />
    </div>
  );
}

export default App;

