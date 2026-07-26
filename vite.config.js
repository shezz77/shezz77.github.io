import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// User/organization GitHub Pages site (shezz77.github.io) is served from the
// domain root, so the base path stays '/'.
export default defineConfig({
  base: '/',
  plugins: [react()],
})
