import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: '@cyborgtests/test',
      fileName: (format) => `index.${format}.js`
    },
    rollupOptions: {
      external: ['@playwright/test', 'playwright'],
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
      '@': path.resolve(__dirname, './src')
    }
  },
});