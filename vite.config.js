import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: 5173, // 원하는 포트 번호로 변경
  },
  plugins: [react()],
})
