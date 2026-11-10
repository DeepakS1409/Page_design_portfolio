import * as THREE from 'three';
import { BOOK_CHAPTERS, PERSONAL_INFO } from '../data/portfolioData';

/**
 * Procedural 3D book textures (canvas-backed, cached, GPU-friendly).
 * Designed for low VRAM usage on integrated graphics while preserving
 * crisp metallic cover typography, leather grain, and ivory paper texture.
 */

function addSubtleGrain(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  alpha = 0.035
) {
  const imageData = ctx.getImageData(0, 0, w, h);
  const data = imageData.data;
  // Deterministic lightweight LCG noise so grain renders quickly without Math.random overhead
  let seed = 1337;
  const maxDelta = Math.round(255 * alpha);
  for (let i = 0; i < data.length; i += 4) {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    const delta = ((seed & 0xff) / 255 - 0.5) * 2 * maxDelta;
    data[i] = Math.min(255, Math.max(0, data[i] + delta));
    data[i + 1] = Math.min(255, Math.max(0, data[i + 1] + delta));
    data[i + 2] = Math.min(255, Math.max(0, data[i + 2] + delta));
  }
  ctx.putImageData(imageData, 0, 0);
}

export function createFrontCoverTexture(): THREE.CanvasTexture {
  const w = 1024;
  const h = 1365;
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d')!;

  // Deep navy-black hardcover gradient
  const bg = ctx.createLinearGradient(0, 0, w, h);
  bg.addColorStop(0, '#070e1c');
  bg.addColorStop(0.45, '#0b172c');
  bg.addColorStop(1, '#050a14');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);

  // Subtle cloth/leather grain
  addSubtleGrain(ctx, w, h, 0.03);

  // Soft radial sheen
  const sheen = ctx.createRadialGradient(w * 0.62, h * 0.28, 40, w * 0.55, h * 0.38, w * 0.78);
  sheen.addColorStop(0, 'rgba(34, 211, 238, 0.11)');
  sheen.addColorStop(0.45, 'rgba(20, 184, 166, 0.04)');
  sheen.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = sheen;
  ctx.fillRect(0, 0, w, h);

  // Spine hinge crease shadow & metallic line on left edge
  const spineShadow = ctx.createLinearGradient(0, 0, 68, 0);
  spineShadow.addColorStop(0, 'rgba(0,0,0,0.65)');
  spineShadow.addColorStop(0.55, 'rgba(0,0,0,0.22)');
  spineShadow.addColorStop(1, 'rgba(255,255,255,0.03)');
  ctx.fillStyle = spineShadow;
  ctx.fillRect(0, 0, 68, h);

  ctx.strokeStyle = 'rgba(45, 212, 191, 0.32)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(64, 48);
  ctx.lineTo(64, h - 48);
  ctx.stroke();

  // Outer metallic cyan-turquoise frame
  const foilGrad = ctx.createLinearGradient(100, 80, w - 70, h - 80);
  foilGrad.addColorStop(0, '#67e8f9');
  foilGrad.addColorStop(0.5, '#2dd4bf');
  foilGrad.addColorStop(1, '#38bdf8');

  ctx.strokeStyle = foilGrad;
  ctx.lineWidth = 2.5;
  ctx.strokeRect(98, 68, w - 166, h - 136);

  // Inner thin hairline frame
  ctx.strokeStyle = 'rgba(103, 232, 249, 0.35)';
  ctx.lineWidth = 1.2;
  ctx.strokeRect(114, 84, w - 198, h - 168);

  // Corner L-ornaments
  const corners = [
    [114, 84, 1, 1],
    [w - 84, 84, -1, 1],
    [114, h - 84, 1, -1],
    [w - 84, h - 84, -1, -1],
  ];
  ctx.strokeStyle = '#5eead4';
  ctx.lineWidth = 2.5;
  for (const [cx, cy, dx, dy] of corners) {
    ctx.beginPath();
    ctx.moveTo(cx, cy + dy * 28);
    ctx.lineTo(cx, cy);
    ctx.lineTo(cx + dx * 28, cy);
    ctx.stroke();
  }

  const centerX = w / 2 + 16;

  // Top subtle edition mark
  ctx.fillStyle = '#5eead4';
  ctx.font = '600 22px "Inter", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('INTERACTIVE PORTFOLIO VOLUME', centerX, 200);

  // Thin rule
  ctx.strokeStyle = 'rgba(45, 212, 191, 0.45)';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(centerX - 110, 232);
  ctx.lineTo(centerX + 110, 232);
  ctx.stroke();

  // Main Name: DEEPAK S
  const titleGrad = ctx.createLinearGradient(centerX - 240, 340, centerX + 240, 440);
  titleGrad.addColorStop(0, '#e0f2fe');
  titleGrad.addColorStop(0.5, '#67e8f9');
  titleGrad.addColorStop(1, '#2dd4bf');

  ctx.fillStyle = titleGrad;
  ctx.font = '700 84px "Cormorant Garamond", Georgia, serif';
  ctx.fillText(PERSONAL_INFO.coverTitle, centerX, 372);

  // Book title: MY DIGITAL JOURNEY
  ctx.fillStyle = '#38bdf8';
  ctx.font = '600 32px "Inter", sans-serif';
  ctx.fillText('M Y   D I G I T A L   J O U R N E Y', centerX, 448);

  // Decorative central emblem (geometric compass / book diamond)
  ctx.save();
  ctx.translate(centerX, 585);
  ctx.strokeStyle = 'rgba(94, 234, 212, 0.72)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(0, -46);
  ctx.lineTo(46, 0);
  ctx.lineTo(0, 46);
  ctx.lineTo(-46, 0);
  ctx.closePath();
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(0, 0, 18, 0, Math.PI * 2);
  ctx.stroke();

  ctx.fillStyle = '#2dd4bf';
  ctx.beginPath();
  ctx.arc(0, 0, 4.5, 0, Math.PI * 2);
  ctx.fill();

  // Horizontal lines flanking emblem
  ctx.strokeStyle = 'rgba(56, 189, 248, 0.45)';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(-220, 0);
  ctx.lineTo(-68, 0);
  ctx.moveTo(68, 0);
  ctx.lineTo(220, 0);
  ctx.stroke();
  ctx.restore();

  // Academic Details
  ctx.fillStyle = '#e2e8f0';
  ctx.font = '600 31px "Cormorant Garamond", Georgia, serif';
  ctx.fillText(PERSONAL_INFO.degree, centerX, 755);

  ctx.fillStyle = '#cbd5e1';
  ctx.font = '500 26px "Inter", sans-serif';
  ctx.fillText(PERSONAL_INFO.college, centerX, 818);

  // Batch Pill
  ctx.strokeStyle = 'rgba(45, 212, 191, 0.5)';
  ctx.fillStyle = 'rgba(13, 148, 136, 0.14)';
  ctx.lineWidth = 1.5;
  const pillW = 190;
  const pillH = 44;
  const pillX = centerX - pillW / 2;
  const pillY = 858;
  ctx.beginPath();
  ctx.roundRect(pillX, pillY, pillW, pillH, 22);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#67e8f9';
  ctx.font = '600 22px "JetBrains Mono", monospace';
  ctx.fillText(PERSONAL_INFO.batch, centerX, pillY + 29);

  // Subtitle
  ctx.fillStyle = '#94a3b8';
  ctx.font = 'italic 500 27px "Cormorant Garamond", Georgia, serif';
  ctx.fillText(`"${PERSONAL_INFO.coverSubtitle}"`, centerX, 1170);

  // Bottom publisher mark
  ctx.fillStyle = 'rgba(103, 232, 249, 0.55)';
  ctx.font = '500 17px "JetBrains Mono", monospace';
  ctx.fillText('EDITION I · SOFTWARE & AI', centerX, 1235);

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  return tex;
}

export function createBackCoverTexture(): THREE.CanvasTexture {
  const w = 512;
  const h = 682;
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d')!;

  const bg = ctx.createLinearGradient(0, 0, w, h);
  bg.addColorStop(0, '#060c18');
  bg.addColorStop(1, '#0b1629');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);
  addSubtleGrain(ctx, w, h, 0.025);

  ctx.strokeStyle = 'rgba(45, 212, 191, 0.35)';
  ctx.lineWidth = 1.5;
  ctx.strokeRect(36, 36, w - 72, h - 72);

  ctx.fillStyle = '#5eead4';
  ctx.font = '700 32px "Cormorant Garamond", Georgia, serif';
  ctx.textAlign = 'center';
  ctx.fillText('DS', w / 2, h / 2 - 8);

  ctx.fillStyle = '#94a3b8';
  ctx.font = '500 14px "Inter", sans-serif';
  ctx.fillText(`${PERSONAL_INFO.name} · ${PERSONAL_INFO.batch}`, w / 2, h / 2 + 28);

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

export function createEndpaperTexture(): THREE.CanvasTexture {
  const w = 512;
  const h = 682;
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#0c182c';
  ctx.fillRect(0, 0, w, h);

  // Subtle architectural diamond lattice pattern
  ctx.strokeStyle = 'rgba(45, 212, 191, 0.08)';
  ctx.lineWidth = 1;
  const step = 36;
  for (let y = -step; y < h + step; y += step) {
    for (let x = -step; x < w + step; x += step) {
      ctx.beginPath();
      ctx.moveTo(x, y - 12);
      ctx.lineTo(x + 12, y);
      ctx.lineTo(x, y + 12);
      ctx.lineTo(x - 12, y);
      ctx.closePath();
      ctx.stroke();
    }
  }

  ctx.strokeStyle = 'rgba(103, 232, 249, 0.25)';
  ctx.strokeRect(24, 24, w - 48, h - 48);

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

export function createSpineTexture(): THREE.CanvasTexture {
  const w = 192;
  const h = 1024;
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d')!;

  const grad = ctx.createLinearGradient(0, 0, w, 0);
  grad.addColorStop(0, '#050b16');
  grad.addColorStop(0.5, '#0e1d36');
  grad.addColorStop(1, '#050b16');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);

  // Raised bookbinding ribs
  const ribPositions = [95, 130, h - 130, h - 95];
  for (const ry of ribPositions) {
    ctx.fillStyle = 'rgba(45, 212, 191, 0.45)';
    ctx.fillRect(16, ry, w - 32, 3);
    ctx.fillStyle = 'rgba(0, 0, 0, 0.45)';
    ctx.fillRect(16, ry + 3, w - 32, 4);
  }

  // Rotated spine title
  ctx.save();
  ctx.translate(w / 2, h / 2);
  ctx.rotate(-Math.PI / 2);
  ctx.fillStyle = '#67e8f9';
  ctx.font = '700 28px "Cormorant Garamond", Georgia, serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('DEEPAK S  ·  MY DIGITAL JOURNEY', 0, 0);
  ctx.restore();

  ctx.fillStyle = '#5eead4';
  ctx.font = '600 18px "JetBrains Mono", monospace';
  ctx.textAlign = 'center';
  ctx.fillText('2026', w / 2, h - 46);

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

export function createPaperTexture(side: 'left' | 'right'): THREE.CanvasTexture {
  const w = 512;
  const h = 682;
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d')!;

  // Warm ivory paper base
  ctx.fillStyle = '#faf6ee';
  ctx.fillRect(0, 0, w, h);
  addSubtleGrain(ctx, w, h, 0.015);

  // Natural spine-gutter curvature shading
  const gutter =
    side === 'right'
      ? ctx.createLinearGradient(0, 0, 56, 0)
      : ctx.createLinearGradient(w, 0, w - 56, 0);
  gutter.addColorStop(0, 'rgba(20, 28, 46, 0.22)');
  gutter.addColorStop(0.35, 'rgba(20, 28, 46, 0.07)');
  gutter.addColorStop(1, 'rgba(250, 246, 238, 0)');
  ctx.fillStyle = gutter;
  ctx.fillRect(0, 0, w, h);

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

export function createPageEdgeTexture(): THREE.CanvasTexture {
  const w = 128;
  const h = 512;
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#ece3d2';
  ctx.fillRect(0, 0, w, h);

  // Fine page-stack striations
  for (let x = 0; x < w; x += 3) {
    ctx.fillStyle = x % 6 === 0 ? 'rgba(130, 114, 90, 0.28)' : 'rgba(255, 252, 245, 0.45)';
    ctx.fillRect(x, 0, 1.5, h);
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  return tex;
}

/**
 * Generates an ivory printed-page preview texture for the 3D turning sheet
 * so that real page turns display curved paper with editorial typography and layout.
 */
export function createTurnSheetTexture(
  spreadIndex: number,
  side: 'left' | 'right'
): THREE.CanvasTexture {
  const w = 512;
  const h = 682;
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#faf6ee';
  ctx.fillRect(0, 0, w, h);
  addSubtleGrain(ctx, w, h, 0.014);

  const chapter = BOOK_CHAPTERS[Math.max(0, Math.min(BOOK_CHAPTERS.length - 1, spreadIndex))];
  const pageNum = side === 'left' ? chapter.pageNumbers[0] : chapter.pageNumbers[1];

  // Gutter shade
  const gutter =
    side === 'right'
      ? ctx.createLinearGradient(0, 0, 48, 0)
      : ctx.createLinearGradient(w, 0, w - 48, 0);
  gutter.addColorStop(0, 'rgba(15, 23, 42, 0.18)');
  gutter.addColorStop(1, 'rgba(250, 246, 238, 0)');
  ctx.fillStyle = gutter;
  ctx.fillRect(0, 0, w, h);

  // Editorial header
  ctx.fillStyle = '#0891b2';
  ctx.font = '600 13px "JetBrains Mono", monospace';
  ctx.textAlign = side === 'left' ? 'left' : 'right';
  const headerX = side === 'left' ? 44 : w - 44;
  ctx.fillText(`CHAPTER ${chapter.number} · ${chapter.shortTitle.toUpperCase()}`, headerX, 50);

  ctx.strokeStyle = 'rgba(15, 23, 42, 0.14)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(44, 66);
  ctx.lineTo(w - 44, 66);
  ctx.stroke();

  // Chapter Heading
  ctx.fillStyle = '#0f172a';
  ctx.textAlign = 'left';
  ctx.font = '700 30px "Cormorant Garamond", Georgia, serif';
  ctx.fillText(side === 'left' ? chapter.title : chapter.subtitle, 44, 114);

  // Stylized editorial blocks representing the page content during motion
  ctx.fillStyle = 'rgba(8, 145, 178, 0.12)';
  ctx.fillRect(44, 134, 72, 3);

  const blockColors = ['rgba(15, 23, 42, 0.06)', 'rgba(8, 145, 178, 0.08)'];
  for (let i = 0; i < 4; i++) {
    const y = 166 + i * 108;
    ctx.fillStyle = blockColors[i % 2];
    ctx.beginPath();
    ctx.roundRect(44, y, w - 88, 86, 8);
    ctx.fill();

    ctx.fillStyle = 'rgba(15, 23, 42, 0.18)';
    ctx.fillRect(62, y + 20, 180, 10);
    ctx.fillStyle = 'rgba(15, 23, 42, 0.10)';
    ctx.fillRect(62, y + 42, w - 140, 8);
    ctx.fillRect(62, y + 58, w - 180, 8);
  }

  // Footer page number
  ctx.fillStyle = '#475569';
  ctx.font = '500 13px "JetBrains Mono", monospace';
  ctx.textAlign = 'center';
  ctx.fillText(String(pageNum).padStart(2, '0'), w / 2, h - 32);

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

