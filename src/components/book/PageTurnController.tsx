import { useEffect, useRef } from 'react';

export interface PageTurnControllerProps {
  isOpen: boolean;
  isTurning: boolean;
  canGoPrev: boolean;
  canGoNext: boolean;
  onPrev: () => void;
  onNext: () => void;
  onOpenBook: () => void;
  onToggleToc: () => void;
  isModalOpen: boolean;
}

/**
 * Handles keyboard shortcuts (ArrowLeft / ArrowRight / Space / Enter / Escape)
 * and horizontal touch-swipe gestures across mobile and touch-enabled laptops.
 */
export function PageTurnController({
  isOpen,
  isTurning,
  canGoPrev,
  canGoNext,
  onPrev,
  onNext,
  onOpenBook,
  onToggleToc,
  isModalOpen,
}: PageTurnControllerProps) {
  const wheelState = useRef({
    isOpen,
    isTurning,
    canGoPrev,
    canGoNext,
    isModalOpen,
    onPrev,
    onNext,
    onOpenBook,
  });
  wheelState.current = {
    isOpen,
    isTurning,
    canGoPrev,
    canGoNext,
    isModalOpen,
    onPrev,
    onNext,
    onOpenBook,
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isModalOpen) return;

      const target = e.target as HTMLElement | null;
      const tag = target?.tagName?.toLowerCase();
      if (tag === 'input' || tag === 'textarea' || tag === 'select') {
        return;
      }

      if (!isOpen) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onOpenBook();
        }
        return;
      }

      if (isTurning) return;

      if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        if (canGoNext) {
          e.preventDefault();
          onNext();
        }
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        if (canGoPrev) {
          e.preventDefault();
          onPrev();
        }
      } else if (e.key.toLowerCase() === 't') {
        e.preventDefault();
        onToggleToc();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isTurning, canGoPrev, canGoNext, onPrev, onNext, onOpenBook, onToggleToc, isModalOpen]);

  useEffect(() => {
    let accumulatedDelta = 0;
    let gestureLocked = false;
    let resetTimer: number | undefined;

    const scheduleUnlock = (): void => {
      window.clearTimeout(resetTimer);
      resetTimer = window.setTimeout(() => {
        if (wheelState.current.isTurning) {
          scheduleUnlock();
          return;
        }
        accumulatedDelta = 0;
        gestureLocked = false;
      }, 180);
    };

    const handleWheel = (event: WheelEvent) => {
      const state = wheelState.current;
      if (state.isModalOpen || Math.abs(event.deltaY) < Math.abs(event.deltaX)) return;

      event.preventDefault();
      if (state.isTurning) {
        accumulatedDelta = 0;
        gestureLocked = true;
        scheduleUnlock();
        return;
      }

      if (gestureLocked) {
        scheduleUnlock();
        return;
      }

      scheduleUnlock();
      accumulatedDelta += event.deltaY;
      if (Math.abs(accumulatedDelta) < 60) return;

      const direction = Math.sign(accumulatedDelta);
      accumulatedDelta = 0;
      gestureLocked = true;
      if (!state.isOpen) {
        if (direction > 0) state.onOpenBook();
      } else if (direction > 0 && state.canGoNext) {
        state.onNext();
      } else if (direction < 0 && state.canGoPrev) {
        state.onPrev();
      }
      scheduleUnlock();
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.clearTimeout(resetTimer);
    };
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    let startX = 0;
    let startY = 0;
    let tracking = false;

    const onTouchStart = (e: TouchEvent) => {
      if (isModalOpen || e.touches.length !== 1) return;
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
      tracking = true;
    };

    const onTouchEnd = (e: TouchEvent) => {
      if (!tracking || isModalOpen || isTurning) {
        tracking = false;
        return;
      }
      tracking = false;
      const touch = e.changedTouches[0];
      if (!touch) return;

      const dx = touch.clientX - startX;
      const dy = touch.clientY - startY;

      // Require clear horizontal swipe (> 52px and dominant over vertical scroll)
      if (Math.abs(dx) > 52 && Math.abs(dx) > Math.abs(dy) * 1.35) {
        if (dx < 0 && canGoNext) {
          onNext();
        } else if (dx > 0 && canGoPrev) {
          onPrev();
        }
      } else if (Math.abs(dy) > 60 && Math.abs(dy) > Math.abs(dx) * 1.2) {
        if (dy < 0 && canGoNext) {
          onNext();
        } else if (dy > 0 && canGoPrev) {
          onPrev();
        }
      }
    };

    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchend', onTouchEnd, { passive: true });
    return () => {
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, [isOpen, isTurning, canGoPrev, canGoNext, onPrev, onNext, isModalOpen]);

  return null;
}

