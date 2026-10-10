import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/ml': {
        target: 'https://task-4-doubthub.onrender.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/ml/, ''),
      },
    },
  },
})

