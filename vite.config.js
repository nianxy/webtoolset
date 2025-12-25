import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const VITE_BASE_URL = process.env.VITE_BASE_URL || ""

// https://vite.dev/config/
export default defineConfig({
  base: VITE_BASE_URL,
  plugins: [react()],
})
