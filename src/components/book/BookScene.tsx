import React, { Component, Suspense, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { BookModel, SpreadScreenBounds, TurnAnimationState } from './BookModel';
import { WebGLFallbackBook } from './WebGLFallbackBook';

interface ErrorBoundaryState {
  hasError: boolean;
}

class WebGLErrorBoundary extends Component<
  { children: React.ReactNode; fallback: React.ReactNode },
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

function detectWebGLSupport(): boolean {
  try {
    const canvas = document.createElement('canvas');
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl2') ||
        canvas.getContext('webgl') ||
        canvas.getContext('experimental-webgl'))
    );
  } catch {
    return false;
  }
}

export interface BookSceneProps {
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
  onFallbackReady: (isFallback: boolean) => void;
}

/**
 * 3D WebGL stage with optimized lighting for integrated GPUs and automatic fallback.
 */
export function BookScene({
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
  onFallbackReady,
}: BookSceneProps) {
  const [webglAvailable, setWebglAvailable] = useState<boolean>(true);

  useEffect(() => {
    const supported = detectWebGLSupport();
    setWebglAvailable(supported);
    onFallbackReady(!supported);
  }, [onFallbackReady]);

  const fallbackView = (
    <WebGLFallbackBook
      isOpen={isOpen}
      currentSpread={currentSpread}
      onOpenBook={onOpenBook}
    />
  );

  if (!webglAvailable) {
    return fallbackView;
  }

  return (
    <WebGLErrorBoundary fallback={fallbackView}>
      <div className="canvas-stage" aria-hidden={!isOpen ? undefined : true}>
        <Canvas
          shadows
          dpr={[1, 1.5]}
          camera={{ position: [0, -0.08, 4.9], fov: 38, near: 0.1, far: 30 }}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance',
          }}
        >
          {/* Ambient & reading illumination — lightweight, zero heavy post-processing */}
          <ambientLight intensity={0.72} color="#e2e8f0" />
          <directionalLight
            position={[3.5, 4.2, 5.4]}
            intensity={1.35}
            color="#fff8ec"
            castShadow
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
            shadow-bias={-0.0004}
          />
          {/* Subtle cyan rim light on the spine/cover edge */}
          <directionalLight position={[-4.2, 2.0, 2.5]} intensity={0.55} color="#38bdf8" />
          <pointLight position={[0, -2.5, 3.2]} intensity={0.35} color="#2dd4bf" />

          <Suspense fallback={null}>
            <BookModel
              isOpen={isOpen}
              currentSpread={currentSpread}
              mobileSide={mobileSide}
              isMobile={isMobile}
              reduceMotion={reduceMotion}
              turnState={turnState}
              onTurnComplete={onTurnComplete}
              onOpenComplete={onOpenComplete}
              onOpenBook={onOpenBook}
              onBoundsUpdate={onBoundsUpdate}
            />

            <mesh position={[0, 0, -0.45]} receiveShadow>
              <planeGeometry args={[20, 14]} />
              <shadowMaterial opacity={0.34} />
            </mesh>
          </Suspense>
        </Canvas>
      </div>
    </WebGLErrorBoundary>
  );
}

