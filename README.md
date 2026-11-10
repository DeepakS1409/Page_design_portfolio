# Deepak S — Interactive 3D Hardcover Book Portfolio

An interactive 3D digital hardcover book portfolio built with React, TypeScript, Vite, Three.js, React Three Fiber, and React Three Drei.

## Features

- **3D Hardcover Book Cover**: Dark navy/black hardcover with metallic cyan-turquoise typography, rounded 3D spine, layered page edges, subtle floating animation, and smooth cover opening.
- **Physical 3D Page Turning**: Curved, bending paper meshes with dynamic page-stack thickness updates, keyboard arrow support, mobile swipe gestures, and a Table of Contents quick-jump.
- **Editorial Ivory Spreads**: 8 dedicated chapters (16 pages) covering About Me, My Skills, Projects, Certifications & Participation, Achievements, Education, Tech Interests (Beyond Coding), and Contact.
- **Lightweight & Accessible**: Tuned for integrated graphics (single shadow-casting light, low-poly curved page sheets, cached canvas textures), includes a **Reduce Motion** toggle, and provides a CSS fallback when WebGL is unavailable.

---

## Project Structure

```text
├── public/assets/
│   ├── certificates/          # Drop actual certificate images here
│   ├── profile/               # Drop profile photo here
│   └── projects/              # Drop project screenshots here
├── src/
│   ├── components/
│   │   ├── book/
│   │   │   ├── BookCover.tsx
│   │   │   ├── BookModel.tsx
│   │   │   ├── BookPage.tsx
│   │   │   ├── BookScene.tsx
│   │   │   ├── PageShell.tsx
│   │   │   ├── PageTurnController.tsx
│   │   │   ├── TableOfContents.tsx
│   │   │   └── WebGLFallbackBook.tsx
│   │   ├── modals/
│   │   │   ├── CertificatePreviewModal.tsx
│   │   │   └── ProjectDetailsModal.tsx
│   │   └── pages/
│   │       ├── AboutPage.tsx
│   │       ├── AchievementsPage.tsx
│   │       ├── CertificatesPage.tsx
│   │       ├── ContactPage.tsx
│   │       ├── EducationPage.tsx
│   │       ├── InterestsPage.tsx
│   │       ├── ProjectsPage.tsx
│   │       └── SkillsPage.tsx
│   ├── data/
│   │   └── portfolioData.ts   # All editable content lives here
│   ├── styles/
│   │   └── book.css
│   ├── types/
│   │   └── portfolio.ts
│   └── utils/
│       └── bookTextures.ts    # Procedural 3D cover, spine & paper textures
```

---

## How to Run Locally

```bash
npm install
npm run dev
```

Open the local URL printed by Vite (typically `http://localhost:5173`).

---

## How to Edit Your Portfolio Content

All personal information, skills, projects, certificates, and links are separated into **`src/data/portfolioData.ts`**. You do not need to modify the 3D engine to update content.

### 1. Update Personal Details & Profile Photo
1. Place your photograph in `public/assets/profile/` (e.g., `deepak-profile.jpg`).
2. Open `src/data/portfolioData.ts` and update `PERSONAL_INFO.profileImageUrl`:
   ```ts
   profileImageUrl: '/assets/profile/deepak-profile.jpg',
   ```
3. You can also update `CURRENTLY_LEARNING`, `JOURNEY_TIMELINE`, or `EDUCATION_TIMELINE` in the same file.

### 2. Add or Update Projects
Edit the `PROJECTS` array in `src/data/portfolioData.ts`.
- Add screenshots to `public/assets/projects/` and set `imageUrl: '/assets/projects/your-image.png'`.
- Set `githubUrl` and `liveDemoUrl` when repositories or live deployments are ready.

### 3. Upload Actual Certificates
1. Place your real certificate image files (`.jpg`, `.png`, `.webp`) inside `public/assets/certificates/`.
2. In `src/data/portfolioData.ts`, update each entry in `CERTIFICATES`:
   ```ts
   imageUrl: '/assets/certificates/ziro-agentic-ai-2026.jpg',
   ```
3. To add a new certificate, append another object to the `CERTIFICATES` array.

### 4. Update Social Links & Contact Form
In `src/data/portfolioData.ts`:
- Set `SOCIAL_LINKS.linkedin` to your LinkedIn profile URL.
- Set `CONTACT_CONFIG.recipientEmail` to your email address for the `mailto:` fallback, or set `CONTACT_CONFIG.formEndpoint` (e.g., a Formspree endpoint) for direct web submissions.

---

## Build & Deploy (Cloudflare Pages / Static Hosting)

Run a TypeScript check and production build:

```bash
npm run build
```

This generates the static bundle inside `dist/`.

### Cloudflare Pages Settings
- **Framework preset**: Vite (or None)
- **Build command**: `npm run build`
- **Build output directory**: `dist`
- **Node version**: 18+ or 20+

