import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  include: ["jwt-decode"],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // '@' đại diện cho thư mục src
    },
  },
  build: {
    outDir: "build", // Đổi từ "dist" thành "build"
  },
})
