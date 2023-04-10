import { defineConfig } from 'vite';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import dts from 'vite-plugin-dts';
import path from 'path';

const resolvePaths = (...paths: string[]): string => {
  return path.resolve(__dirname, ...paths);
};
const extensions = ['.js', '.ts', '.tsx'];

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [dts({
    tsConfigFilePath: './tsconfig.json',
    insertTypesEntry: true
  })],
  build: {
    lib: {
      entry: resolvePaths('./src/index.ts'),
      name: 'SimpleStore',
    },
    rollupOptions: {
      plugins: [
        resolve({ extensions }),
        commonjs(),
      ],
    },
  },
});
