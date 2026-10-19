import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const repository = 'ayhem-hammami'

export default defineConfig({
  base: process.env.GITHUB_PAGES === 'true' ? `/${repository}/` : '/',
  plugins: [react()],
  server: { port: 5173 },
  preview: { port: 4173 },
})
