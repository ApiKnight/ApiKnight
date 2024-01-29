import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'
import viteCompression from 'vite-plugin-compression'
import cvIndex from './vite-plugins/vite-plugin-cvindex'
import cvRobots from './vite-plugins/vite-plugin-cvrobots'

const resolve = (dir: string) => path.join(__dirname, dir)

// https://vitejs.dev/config/
export default defineConfig({
  base: '/ApiKnight/',
  esbuild: {
    pure: ['console.log'], // 删除 console.log
    drop: ['debugger'], // 删除 debugger
  },
  build: {
    terserOptions: {
      mangle: true,
    },
    outDir: './dist',
  },
  plugins: [
    react(),
    viteCompression({
      threshold: 102400, // 对大于 0.1mb 的文件进行压缩
    }),
    cvIndex(),
    cvRobots(),
  ],
  resolve: {
    alias: {
      // 根路径别名
      '@': resolve('src'),
    },
    extensions: ['.tsx', '.ts', '.jsx', '.js', '.json'],
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        additionalData: `@import "${path.resolve(
          __dirname,
          './src/assets/css/variables.less',
        )}";`,
      },
    },
  },
})
