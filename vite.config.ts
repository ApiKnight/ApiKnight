import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

const resolve = (dir: string) => path.join(__dirname, dir)

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			// 根路径别名
			'@': resolve('src')
		},
		extensions: ['.tsx', '.ts', '.jsx', '.js', '.json']
	}
})
