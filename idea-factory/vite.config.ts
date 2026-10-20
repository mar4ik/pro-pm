import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Builds a single fixed-name bundle into ../factory so the static landing page can embed it.
export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    outDir: '../factory',
    emptyOutDir: true,
    rollupOptions: {
      output: {
        entryFileNames: 'factory.js',
        chunkFileNames: 'factory-[name].js',
        assetFileNames: 'factory.[ext]',
      },
    },
  },
});
