import type { Plugin } from 'vite'
import fs from 'fs'
import path from 'path'

export default function cvIndex(): Plugin {
  return {
    name: 'vite:cvIndex',

    writeBundle() {
      const outputDir = './dist'
      const indexPath = path.join(outputDir, 'index.html')
      if (fs.existsSync(indexPath)) {
        const targetPath = path.join(outputDir, '404.html')
        const indexContent = fs.readFileSync(indexPath, 'utf-8')
        fs.writeFileSync(targetPath, indexContent, 'utf-8')
        console.log('\nSuccessfully created 404.html')
      } else {
        console.log('index.html does not exist. Skipping 404.html creation.')
      }
    },
  }
}
