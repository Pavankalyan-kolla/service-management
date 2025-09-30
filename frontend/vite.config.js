import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/', // Netlify handles routing, so root is fine
  plugins: [react()]
})
