import type { Plugin } from 'vite'
import fs from 'fs'
import path from 'path'

export default function cvRobots(): Plugin {
  return {
    name: 'vite:cvRobots',
    writeBundle() {
      const outputDir = './dist'
      const indexPath = path.join('./seo', 'robots.txt')
      if (fs.existsSync(indexPath)) {
        const targetPath = path.join(outputDir, 'robots.txt')
        const indexContent = fs.readFileSync(indexPath, 'utf-8')
        fs.writeFileSync(targetPath, indexContent, 'utf-8')
        console.log('\nSuccessfully created robots.txt')
      } else {
        console.log('Failed.')
      }
    },
  }
}
