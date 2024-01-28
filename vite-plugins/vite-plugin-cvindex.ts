import type { Plugin } from 'vite'
import fs from 'fs'
import path from 'path'

export default function cvIndex(): Plugin {
  return {
    name: 'vite:cvIndex',

    writeBundle() {
      // This hook is called at the beginning of the build process
      const outputDir = './dist'
      const indexPath = path.join(outputDir, 'index.html')
      console.log('\n', indexPath)

      // Check if index.html exists
      if (fs.existsSync(indexPath)) {
        const targetPath = path.join(outputDir, '404.html')
        const indexContent = fs.readFileSync(indexPath, 'utf-8')

        // Write index.html content to 404.html
        fs.writeFileSync(targetPath, indexContent, 'utf-8')

        console.log('Successfully created 404.html')
      } else {
        console.log('index.html does not exist. Skipping 404.html creation.')
      }
    },
  }
}
