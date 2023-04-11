import { defineConfig } from 'vite';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import dts from 'vite-plugin-dts';
import path from 'path';

const resolvePaths = (...paths: string[]): string => {
  return path.resolve(__dirname, ...paths);
};
const extensions = ['.js', '.ts'];
const globals = {
  react: 'react',
  'react-dom': 'react-dome',
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    dts({
      tsConfigFilePath: './tsconfig.json',
      outputDir: 'dist/declarations',
      insertTypesEntry: true,
    }),
  ],
  build: {
    lib: {
      entry: resolvePaths('./src/index.ts'),
      name: 'zuxs',
      formats: ['cjs', 'es', 'umd'],
      fileName(format) {
        return `${format}/zuxs.js`
      },
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      input: resolvePaths('./src/index.ts'),
      output: {
        globals
      },
      plugins: [resolve({ extensions }), commonjs()],
    },
  },
});
