import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Configured for static deployment (Cloudflare Pages, Vercel, Netlify, GitHub Pages)
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: false,
    chunkSizeWarningLimit: 750,
    rollupOptions: {
      output: {
        manualChunks: {
          three: ['three'],
          r3f: ['@react-three/fiber', '@react-three/drei'],
          motion: ['framer-motion'],
        },
      },
    },
  },
});

