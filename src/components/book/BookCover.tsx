import { useEffect, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import {
  createBackCoverTexture,
  createEndpaperTexture,
  createFrontCoverTexture,
  createSpineTexture,
} from '../../utils/bookTextures';

export interface BookCoverProps {
  coverWidth: number;
  coverHeight: number;
  coverThickness: number;
  pageBlockDepth: number;
  openProgressRef: React.MutableRefObject<number>;
}

/**
 * 3D Hardcover Assembly:
 * - Front Hardcover (navy/black leather-grain + cyan/turquoise embossed cover typography + inner endpaper)
 * - Back Hardcover (matching hardcover slab + inner endpaper)
 * - Articulated 3D Spine with raised binding ribs and vertical metallic typography
 */
export function BookCover({
  coverWidth,
  coverHeight,
  coverThickness,
  pageBlockDepth,
  openProgressRef,
}: BookCoverProps) {
  const frontHingeRef = useRef<THREE.Group>(null);
  const spineRef = useRef<THREE.Group>(null);

  const textures = useMemo(() => {
    return {
      front: createFrontCoverTexture(),
      back: createBackCoverTexture(),
      endpaper: createEndpaperTexture(),
      spine: createSpineTexture(),
    };
  }, []);

  useEffect(() => {
    return () => {
      textures.front.dispose();
      textures.back.dispose();
      textures.endpaper.dispose();
      textures.spine.dispose();
    };
  }, [textures]);

  // Materials tuned for subtle leather/linen sheen without heavy shaders
  const edgeMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#091224',
        roughness: 0.62,
        metalness: 0.15,
      }),
    []
  );

  const frontMaterials = useMemo(() => {
    const frontFace = new THREE.MeshStandardMaterial({
      map: textures.front,
      roughness: 0.44,
      metalness: 0.22,
    });
    const innerFace = new THREE.MeshStandardMaterial({
      map: textures.endpaper,
      roughness: 0.65,
      metalness: 0.08,
    });
    // BoxGeometry face order: +X, -X, +Y, -Y, +Z (front), -Z (back/inner)
    return [
      edgeMaterial,
      edgeMaterial,
      edgeMaterial,
      edgeMaterial,
      frontFace,
      innerFace,
    ];
  }, [textures, edgeMaterial]);

  const backMaterials = useMemo(() => {
    const innerFace = new THREE.MeshStandardMaterial({
      map: textures.endpaper,
      roughness: 0.65,
      metalness: 0.08,
    });
    const backFace = new THREE.MeshStandardMaterial({
      map: textures.back,
      roughness: 0.48,
      metalness: 0.2,
    });
    // +Z faces inside pages, -Z faces table/desk
    return [
      edgeMaterial,
      edgeMaterial,
      edgeMaterial,
      edgeMaterial,
      innerFace,
      backFace,
    ];
  }, [textures, edgeMaterial]);

  const spineMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        map: textures.spine,
        roughness: 0.46,
        metalness: 0.24,
      }),
    [textures]
  );

  const spineRadius = (pageBlockDepth + coverThickness * 2) * 0.52;

  useFrame(() => {
    const p = openProgressRef.current;
    // Smooth cubic ease for physical cover swing
    const eased = p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;

    if (frontHingeRef.current) {
      frontHingeRef.current.rotation.y = -eased * Math.PI;
    }
    if (spineRef.current) {
      // Spine rotates smoothly from facing -X (closed) to facing -Z (open behind gutter)
      spineRef.current.rotation.y = -eased * (Math.PI * 0.5);
      spineRef.current.position.z =
        THREE.MathUtils.lerp(pageBlockDepth * 0.5, -coverThickness * 0.55, eased);
    }
  });

  return (
    <group>
      {/* Back Hardcover (stationary base on the right side when open) */}
      <mesh
        position={[coverWidth / 2, 0, -coverThickness / 2]}
        material={backMaterials}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[coverWidth, coverHeight, coverThickness]} />
      </mesh>

      {/* Front Hardcover (pivots around spine hinge at z = pageBlockDepth / 2) */}
      <group ref={frontHingeRef} position={[0, 0, pageBlockDepth / 2]}>
        <mesh
          position={[coverWidth / 2, 0, pageBlockDepth / 2 + coverThickness / 2]}
          material={frontMaterials}
          castShadow
          receiveShadow
        >
          <boxGeometry args={[coverWidth, coverHeight, coverThickness]} />
        </mesh>
      </group>

      {/* Rounded 3D Spine */}
      <group ref={spineRef} position={[0, 0, pageBlockDepth / 2]}>
        <mesh
          position={[-spineRadius * 0.35, 0, 0]}
          rotation={[0, -Math.PI / 2, 0]}
          material={spineMaterial}
          castShadow
          receiveShadow
        >
          <cylinderGeometry
            args={[
              spineRadius,
              spineRadius,
              coverHeight,
              16,
              1,
              false,
              -Math.PI * 0.48,
              Math.PI * 0.96,
            ]}
          />
        </mesh>
      </group>
    </group>
  );
}

