import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsConfigPaths from 'vite-tsconfig-paths';
import typescript from 'rollup-plugin-typescript2';
import * as packageJSON from './package.json';
import path from 'path'

const resolvePaths = (...paths: string[]): string => {
  return path.resolve(__dirname, ...paths)
}

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: resolvePaths('./src/index.ts'),
      name: 'SimpleStore',
    },
    rollupOptions: {
      external: Object.keys(packageJSON.peerDependencies)
    }
  },
  plugins: [react(), tsConfigPaths(), typescript({
    tsconfig: resolvePaths('./tsconfig.json')
  })],
})
