import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        horizontal: resolve(__dirname, 'horizontal.html'),
        vertical: resolve(__dirname, 'vertical.html'),
      },
    },
  },
});

