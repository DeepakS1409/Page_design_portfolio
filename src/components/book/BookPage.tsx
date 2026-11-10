import { useEffect, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export interface BookPageProps {
  pageWidth: number;
  pageHeight: number;
  /** Normalized turn progress in [0, 1]: 0 = resting on right, 1 = resting on left */
  turnProgress: number;
  /** Optional mutable ref for 60fps zero-rerender turn updates */
  turnProgressRef?: React.MutableRefObject<number>;
  turnProgressOffset?: number;
  frontTexture: THREE.Texture;
  backTexture: THREE.Texture;
  zOffset?: number;
  isTurning?: boolean;
}

const SEGMENTS_X = 28;
const SEGMENTS_Y = 8;

/**
 * Deforms a PlaneGeometry into a realistic curved book page with spine-hinge bending,
 */
function deformPageGeometry(
  geom: THREE.PlaneGeometry,
  baseX: Float32Array,
  pageWidth: number,
  p: number,
  isBackFace: boolean
) {
  const pos = geom.attributes.position;
  const sinP = Math.sin(p * Math.PI);

  for (let i = 0; i < pos.count; i++) {
    // baseX spans [0, pageWidth]
    const x0 = baseX[i];
    const u = x0 / pageWidth; // 0 at spine, 1 at outer fore-edge

    // Outer edge trails behind the spine hinge for lifelike paper curl
    const curlLag = sinP * 0.44 * Math.pow(u, 1.35);
    const angle = -p * Math.PI + curlLag;

    // Gentle arch perpendicular to the paper sheet during motion + natural resting page curve
    const motionArch = sinP * Math.sin(u * Math.PI) * 0.085;
    const restingArch = Math.sin(u * Math.PI) * 0.032;
    const normalOffset = (motionArch + restingArch) * (isBackFace ? 0.985 : 1);

    const cosA = Math.cos(angle);
    const sinA = Math.sin(angle);

    // Local tangent along page is (cosA, 0, -sinA); local normal is (sinA, 0, cosA)
    const x = x0 * cosA + normalOffset * sinA;
    const z = -x0 * sinA + normalOffset * cosA;

    pos.setX(i, x);
    pos.setZ(i, isBackFace ? z - 0.0012 : z);
  }

  pos.needsUpdate = true;
  geom.computeVertexNormals();
}

/**
 * Single physical 3D paper sheet with front & back faces and dynamic vertex bending.
 */
export function BookPage({
  pageWidth,
  pageHeight,
  turnProgress,
  turnProgressRef,
  turnProgressOffset = 0,
  frontTexture,
  backTexture,
  zOffset = 0,
  isTurning = false,
}: BookPageProps) {
  const progressRef = useRef(turnProgress);
  progressRef.current = turnProgress;

  const { frontGeo, backGeo, baseXFront, baseXBack } = useMemo(() => {
    const fGeo = new THREE.PlaneGeometry(pageWidth, pageHeight, SEGMENTS_X, SEGMENTS_Y);
    fGeo.translate(pageWidth / 2, 0, 0);

    const bGeo = new THREE.PlaneGeometry(pageWidth, pageHeight, SEGMENTS_X, SEGMENTS_Y);
    // Flip UV horizontally on the back side so text/layout reads left-to-right when turned to the left page
    const uv = bGeo.attributes.uv;
    for (let i = 0; i < uv.count; i++) {
      uv.setX(i, 1 - uv.getX(i));
    }
    uv.needsUpdate = true;
    bGeo.translate(pageWidth / 2, 0, 0);

    const fPos = fGeo.attributes.position;
    const fBase = new Float32Array(fPos.count);
    for (let i = 0; i < fPos.count; i++) fBase[i] = fPos.getX(i);

    const bPos = bGeo.attributes.position;
    const bBase = new Float32Array(bPos.count);
    for (let i = 0; i < bPos.count; i++) bBase[i] = bPos.getX(i);

    deformPageGeometry(fGeo, fBase, pageWidth, turnProgress, false);
    deformPageGeometry(bGeo, bBase, pageWidth, turnProgress, true);

    return {
      frontGeo: fGeo,
      backGeo: bGeo,
      baseXFront: fBase,
      baseXBack: bBase,
    };
  }, [pageWidth, pageHeight]);

  useEffect(() => {
    return () => {
      frontGeo.dispose();
      backGeo.dispose();
    };
  }, [frontGeo, backGeo]);

  useEffect(() => {
    deformPageGeometry(frontGeo, baseXFront, pageWidth, turnProgress, false);
    deformPageGeometry(backGeo, baseXBack, pageWidth, turnProgress, true);
  }, [frontGeo, backGeo, baseXFront, baseXBack, pageWidth, turnProgress]);

  useFrame(() => {
    if (!isTurning) return;
    const raw = turnProgressRef ? turnProgressRef.current : progressRef.current;
    const p = THREE.MathUtils.clamp(raw + turnProgressOffset, 0, 1);
    deformPageGeometry(frontGeo, baseXFront, pageWidth, p, false);
    deformPageGeometry(backGeo, baseXBack, pageWidth, p, true);
  });

  return (
    <group position={[0, 0, zOffset]}>
      <mesh geometry={frontGeo} castShadow={isTurning} receiveShadow>
        <meshStandardMaterial
          map={frontTexture}
          roughness={0.86}
          metalness={0.02}
          side={THREE.FrontSide}
        />
      </mesh>
      <mesh geometry={backGeo} castShadow={isTurning} receiveShadow>
        <meshStandardMaterial
          map={backTexture}
          roughness={0.86}
          metalness={0.02}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  );
}
