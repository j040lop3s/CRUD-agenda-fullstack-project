import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/CRUD-agenda-fullstack-project/',
  plugins: [react()],
})
