import { useEffect, useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { BookCover } from './BookCover';
import { BookPage } from './BookPage';
import {
  createPageEdgeTexture,
  createPaperTexture,
  createTurnSheetTexture,
} from '../../utils/bookTextures';
import { BOOK_CHAPTERS } from '../../data/portfolioData';

export interface SpreadScreenBounds {
  left: number;
  top: number;
  width: number;
  height: number;
  visible: boolean;
}

export interface TurnAnimationState {
  active: boolean;
  direction: 'next' | 'prev';
  fromSpread: number;
  toSpread: number;
  isMultiJump: boolean;
}

export interface BookModelProps {
  isOpen: boolean;
  currentSpread: number;
  mobileSide: 'left' | 'right';
  isMobile: boolean;
  reduceMotion: boolean;
  turnState: TurnAnimationState;
  onTurnComplete: () => void;
  onOpenComplete: () => void;
  onOpenBook: () => void;
  onBoundsUpdate: (bounds: SpreadScreenBounds) => void;
}

// Physical book proportions (4:5.33 hardcover ratio)
const COVER_W = 2.42;
const COVER_H = 3.22;
const COVER_THICK = 0.055;
const PAGE_W = 2.3;
const PAGE_H = 3.06;
const PAGE_BLOCK_DEPTH = 0.2;

export function BookModel({
  isOpen,
  currentSpread,
  mobileSide,
  isMobile,
  reduceMotion,
  turnState,
  onTurnComplete,
  onOpenComplete,
  onOpenBook,
  onBoundsUpdate,
}: BookModelProps) {
  const { camera, size, pointer } = useThree();

  const rootGroupRef = useRef<THREE.Group>(null);
  const openProgressRef = useRef(isOpen ? 1 : 0);
  const openNotifiedRef = useRef(isOpen);
  const openAnimStartRef = useRef<number | null>(null);
  const openAnimFromRef = useRef(0);

  // Page flip progress state (0 = resting right, 1 = resting left)
  const flipProgressRef = useRef(0);
  const turnStartRef = useRef<number | null>(null);
  const mobileShiftRef = useRef(0);
  const lastBoundsRef = useRef<SpreadScreenBounds>({
    left: 0,
    top: 0,
    width: 0,
    height: 0,
    visible: false,
  });

  // Base textures + lazy cache for per-chapter 3D turning sheet textures
  const { leftBaseTex, rightBaseTex, pageEdgeMat, turnTexCache } = useMemo(() => {
    const lTex = createPaperTexture('left');
    const rTex = createPaperTexture('right');
    const edgeTex = createPageEdgeTexture();
    const edgeMaterial = new THREE.MeshStandardMaterial({
      map: edgeTex,
      roughness: 0.9,
      metalness: 0.0,
    });
    const ivorySideMat = new THREE.MeshStandardMaterial({
      color: '#f7f1e3',
      roughness: 0.88,
    });

    return {
      leftBaseTex: lTex,
      rightBaseTex: rTex,
      pageEdgeMat: [
        edgeMaterial,
        edgeMaterial,
        edgeMaterial,
        edgeMaterial,
        ivorySideMat,
        ivorySideMat,
      ],
      turnTexCache: new Map<string, THREE.CanvasTexture>(),
    };
  }, []);

  useEffect(() => {
    return () => {
      leftBaseTex.dispose();
      rightBaseTex.dispose();
      turnTexCache.forEach((tex) => tex.dispose());
      turnTexCache.clear();
    };
  }, [leftBaseTex, rightBaseTex, turnTexCache]);

  const getTurnTexture = (spreadIdx: number, side: 'left' | 'right') => {
    const clampedIdx = Math.max(0, Math.min(BOOK_CHAPTERS.length - 1, spreadIdx));
    const key = `${clampedIdx}-${side}`;
    let tex = turnTexCache.get(key);
    if (!tex) {
      tex = createTurnSheetTexture(clampedIdx, side);
      turnTexCache.set(key, tex);
    }
    return tex;
  };

  // Track cover open/close animation start timestamp
  useEffect(() => {
    openAnimStartRef.current = performance.now();
    openAnimFromRef.current = openProgressRef.current;
    if (!isOpen) {
      openNotifiedRef.current = false;
    }
  }, [isOpen]);

  // Reset flip progress whenever a new turn starts
  useEffect(() => {
    if (!turnState.active) {
      turnStartRef.current = null;
      return;
    }
    flipProgressRef.current = turnState.direction === 'next' ? 0 : 1;
    turnStartRef.current = performance.now();
  }, [turnState]);

  // Compute dynamic left/right page stack thickness based on reading progress
  const totalSpreads = BOOK_CHAPTERS.length;
  const readingRatio = totalSpreads > 1 ? currentSpread / (totalSpreads - 1) : 0;
  const minStack = 0.018;
  const variableDepth = PAGE_BLOCK_DEPTH - minStack * 2;
  const leftStackDepth = minStack + variableDepth * readingRatio;
  const rightStackDepth = minStack + variableDepth * (1 - readingRatio);

  // Determine textures on the active turning sheet
  const turningFrontTex = useMemo(() => {
    if (!turnState.active) return rightBaseTex;
    const idx = turnState.direction === 'next' ? turnState.fromSpread : turnState.toSpread;
    return getTurnTexture(idx, 'right');
  }, [turnState, rightBaseTex]);

  const turningBackTex = useMemo(() => {
    if (!turnState.active) return leftBaseTex;
    const idx = turnState.direction === 'next' ? turnState.toSpread : turnState.fromSpread;
    return getTurnTexture(idx, 'left');
  }, [turnState, leftBaseTex]);

  // Reusable vectors for screen projection (zero per-frame GC allocation)
  const projTopLeft = useMemo(() => new THREE.Vector3(), []);
  const projBottomRight = useMemo(() => new THREE.Vector3(), []);

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.08);
    const t = state.clock.elapsedTime;
    const now = performance.now();

    // 1. Animate book cover opening / closing using real wall-clock time
    const targetOpen = isOpen ? 1 : 0;
    const openDurationMs = reduceMotion ? 120 : 680;
    if (openAnimStartRef.current !== null) {
      const elapsed = now - openAnimStartRef.current;
      const ratio = Math.min(1, elapsed / openDurationMs);
      openProgressRef.current = THREE.MathUtils.lerp(
        openAnimFromRef.current,
        targetOpen,
        ratio
      );
      if (ratio >= 1) {
        openProgressRef.current = targetOpen;
        openAnimStartRef.current = null;
      }
    }

    if (isOpen && openProgressRef.current >= 0.98 && !openNotifiedRef.current) {
      openNotifiedRef.current = true;
      onOpenComplete();
    }

    const op = openProgressRef.current;

    // 2. Animate active 3D page turn using wall-clock time
    if (turnState.active && turnStartRef.current !== null) {
      const durationMs = reduceMotion ? 140 : turnState.isMultiJump ? 760 : 680;
      const ratio = Math.min(1, (now - turnStartRef.current) / durationMs);
      const easedRatio = ratio * ratio * ratio * (ratio * (ratio * 6 - 15) + 10);
      if (turnState.direction === 'next') {
        flipProgressRef.current = easedRatio;
      } else {
        flipProgressRef.current = 1 - easedRatio;
      }
      if (ratio >= 1) {
        turnStartRef.current = null;
        onTurnComplete();
      }
    }

    // 3. Position & subtle floating / parallax tilt
    if (rootGroupRef.current) {
      // Shift book so closed cover is centered at x=0, and open spread spine is centered at x=0
      const baseShiftX = THREE.MathUtils.lerp(-COVER_W / 2, 0, op);
      // On mobile when open, smoothly pan horizontally to center whichever page (left or right) is active
      const targetMobileShift = isMobile
        ? mobileSide === 'left'
          ? PAGE_W * 0.51
          : -PAGE_W * 0.51
        : 0;
      mobileShiftRef.current = THREE.MathUtils.damp(
        mobileShiftRef.current,
        targetMobileShift,
        10,
        dt
      );
      rootGroupRef.current.position.x = baseShiftX + mobileShiftRef.current * op;

      const floatAmp = reduceMotion ? 0 : (1 - op) * 0.045;
      rootGroupRef.current.position.y = Math.sin(t * 1.45) * floatAmp;

      // Closed: dramatic 3/4 editorial showcase angle; Open: clean ergonomic reading angle
      const closedRotX = -0.1 + (reduceMotion ? 0 : pointer.y * 0.06);
      const closedRotY = -0.32 + (reduceMotion ? 0 : pointer.x * 0.1);
      const closedRotZ = 0.02;

      const openRotX = -0.025;
      const openRotY = 0;
      const openRotZ = 0;

      rootGroupRef.current.rotation.x = THREE.MathUtils.lerp(closedRotX, openRotX, op);
      rootGroupRef.current.rotation.y = THREE.MathUtils.lerp(closedRotY, openRotY, op);
      rootGroupRef.current.rotation.z = THREE.MathUtils.lerp(closedRotZ, openRotZ, op);
    }

    // 4. Responsive Camera framing so book always fits cleanly without clipping
    const aspect = size.width / Math.max(1, size.height);
    const closedDist = aspect < 0.8 ? 6.4 : 4.85;
    // Open spread width is ~4.84; compute distance to fit comfortably inside viewport
    const spreadWidthNeeded = isMobile ? PAGE_W * 1.18 : COVER_W * 2.18;
    const fovRad = ((camera as THREE.PerspectiveCamera).fov * Math.PI) / 180;
    const tanHalfFov = Math.tan(fovRad / 2);
    const distForWidth = spreadWidthNeeded / (2 * tanHalfFov * Math.max(0.55, aspect));
    const distForHeight = (COVER_H * 1.24) / (2 * tanHalfFov);
    const openDist = Math.max(distForWidth, distForHeight, 4.5);

    const targetCamZ = THREE.MathUtils.lerp(closedDist, openDist, op);
    const targetCamY = THREE.MathUtils.lerp(-0.08, -0.04, op);
    camera.position.z = THREE.MathUtils.damp(camera.position.z, targetCamZ, 8.5, dt);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, targetCamY, 8.5, dt);
    camera.lookAt(0, 0, 0);

    // 5. Project open spread bounding rectangle onto screen coordinates for crisp DOM page layer
    const shouldShowOverlay = isOpen && op >= 0.96 && !turnState.active;
    if (shouldShowOverlay && rootGroupRef.current) {
      rootGroupRef.current.updateMatrixWorld();
      const leftBoundX = isMobile
        ? mobileSide === 'left'
          ? -PAGE_W
          : 0.03
        : -PAGE_W;
      const rightBoundX = isMobile
        ? mobileSide === 'left'
          ? -0.03
          : PAGE_W
        : PAGE_W;

      const surfaceZ = Math.max(leftStackDepth, rightStackDepth) + 0.035;
      projTopLeft.set(leftBoundX, PAGE_H / 2, surfaceZ).applyMatrix4(rootGroupRef.current.matrixWorld);
      projBottomRight
        .set(rightBoundX, -PAGE_H / 2, surfaceZ)
        .applyMatrix4(rootGroupRef.current.matrixWorld);

      projTopLeft.project(camera);
      projBottomRight.project(camera);

      const x1 = (projTopLeft.x * 0.5 + 0.5) * size.width;
      const y1 = (-projTopLeft.y * 0.5 + 0.5) * size.height;
      const x2 = (projBottomRight.x * 0.5 + 0.5) * size.width;
      const y2 = (-projBottomRight.y * 0.5 + 0.5) * size.height;

      const nextBounds: SpreadScreenBounds = {
        left: Math.round(x1),
        top: Math.round(y1),
        width: Math.max(0, Math.round(x2 - x1)),
        height: Math.max(0, Math.round(y2 - y1)),
        visible: true,
      };

      const prev = lastBoundsRef.current;
      if (
        !prev.visible ||
        Math.abs(prev.left - nextBounds.left) > 1 ||
        Math.abs(prev.top - nextBounds.top) > 1 ||
        Math.abs(prev.width - nextBounds.width) > 1 ||
        Math.abs(prev.height - nextBounds.height) > 1
      ) {
        lastBoundsRef.current = nextBounds;
        onBoundsUpdate(nextBounds);
      }
    } else if (lastBoundsRef.current.visible) {
      const hidden = { ...lastBoundsRef.current, visible: false };
      lastBoundsRef.current = hidden;
      onBoundsUpdate(hidden);
    }
  });

  return (
    <group
      ref={rootGroupRef}
      onClick={(e) => {
        if (!isOpen) {
          e.stopPropagation();
          onOpenBook();
        }
      }}
      onPointerOver={() => {
        if (!isOpen) document.body.style.cursor = 'pointer';
      }}
      onPointerOut={() => {
        document.body.style.cursor = 'auto';
      }}
    >
      {/* Hardcover Front, Back & 3D Spine */}
      <BookCover
        coverWidth={COVER_W}
        coverHeight={COVER_H}
        coverThickness={COVER_THICK}
        pageBlockDepth={PAGE_BLOCK_DEPTH}
        openProgressRef={openProgressRef}
      />

      {/* Right Page Stack (visible when closed along fore-edge & when open on right side) */}
      <mesh
        position={[PAGE_W / 2 + 0.015, 0, rightStackDepth / 2]}
        material={pageEdgeMat}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[PAGE_W - 0.02, PAGE_H, rightStackDepth]} />
      </mesh>

      {/* Left Page Stack (grows as pages are turned to the left) */}
      {isOpen && (
        <mesh
          position={[-PAGE_W / 2 - 0.015, 0, leftStackDepth / 2]}
          material={pageEdgeMat}
          castShadow
          receiveShadow
        >
          <boxGeometry args={[PAGE_W - 0.02, PAGE_H, leftStackDepth]} />
        </mesh>
      )}

      {/* Resting Right Curved Page Surface */}
      <BookPage
        pageWidth={PAGE_W}
        pageHeight={PAGE_H}
        turnProgress={0}
        frontTexture={rightBaseTex}
        backTexture={leftBaseTex}
        zOffset={rightStackDepth + 0.002}
        isTurning={false}
      />

      {/* Resting Left Curved Page Surface (visible once cover begins opening) */}
      {isOpen && (
        <BookPage
          pageWidth={PAGE_W}
          pageHeight={PAGE_H}
          turnProgress={1}
          frontTexture={rightBaseTex}
          backTexture={leftBaseTex}
          zOffset={leftStackDepth + 0.002}
          isTurning={false}
        />
      )}

      {/* Active 3D Curved Turning Sheet */}
      {turnState.active && (
        <BookPage
          pageWidth={PAGE_W}
          pageHeight={PAGE_H}
          turnProgress={turnState.direction === 'next' ? 0 : 1}
          turnProgressRef={flipProgressRef}
          frontTexture={turningFrontTex}
          backTexture={turningBackTex}
          zOffset={Math.max(leftStackDepth, rightStackDepth) + 0.014}
          isTurning
        />
      )}

      {/* Secondary trailing sheet during Table-of-Contents multi-page jumps */}
      {turnState.active && turnState.isMultiJump && (
        <BookPage
          pageWidth={PAGE_W}
          pageHeight={PAGE_H}
          turnProgress={turnState.direction === 'next' ? 0 : 1}
          turnProgressRef={flipProgressRef}
          turnProgressOffset={turnState.direction === 'next' ? -0.16 : 0.16}
          frontTexture={rightBaseTex}
          backTexture={leftBaseTex}
          zOffset={Math.max(leftStackDepth, rightStackDepth) + 0.008}
          isTurning
        />
      )}
    </group>
  );
}
