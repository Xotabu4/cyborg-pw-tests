import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: '@cyborgtests/test',
      fileName: (format) => `index.${format}.js`
    },
    rollupOptions: {
      external: ['@playwright/test', 'playwright', 'child_process', 'http', 'path', 'process', 'fs'],
      output: {
        globals: {
          '@playwright/test': 'playwrightTest',
          'playwright': 'playwright',
          'react': 'React',
          'react-dom': 'ReactDOM'
        }
      }
    },
    sourcemap: true,
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  },
});