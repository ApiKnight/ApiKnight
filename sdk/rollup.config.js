import fs, { readdir } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, resolve, join } from 'path'
import { terser } from 'rollup-plugin-terser'
import typescript from 'rollup-plugin-typescript2'

console.log('正在使用rollup进行打包...')

const url = import.meta.url // 获取当前脚本文件的url
const path = resolve(dirname(fileURLToPath(url)), 'src')
const rollup_Array = []
function clearDirectory(directoryPath) {
  if (!fs.existsSync(directoryPath)) {
    fs.mkdirSync(directoryPath)
    console.log('目录不存在,创建目录成功.')
  }

  console.log('正在读取lib目录...')
  // 读取目录中的文件和子目录
  const files = fs.readdirSync(directoryPath)
  console.log('正在删除lib目录...')
  files.forEach((file) => {
    const filePath = join(directoryPath, file)

    // 删除文件
    if (fs.statSync(filePath).isFile()) {
      fs.unlinkSync(filePath)
    }
    // 递归清空子目录
    else {
      clearDirectory(filePath)
    }
  })

  // 删除空目录
  fs.rmdirSync(directoryPath)
  console.log('清空lib目录完毕.')
}

const directoryPath = resolve(dirname(fileURLToPath(url)), 'lib')
clearDirectory(directoryPath)
async function readDirectory() {
  const arr = await new Promise((resolve, reject) => {
    readdir(path, (err, result) => {
      if (err) {
        reject(err)
      } else {
        resolve(result)
      }
    })
  })

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === 'type.d.ts') {
      arr.splice(i, 1)
      i--
    }
  }

  arr.map((i) => {
    console.log(i)
  })

  for (let i = 0; i < arr.length; i++) {
    rollup_Array.push({
      input: `${path}/${arr[i]}`,
      output: [
        {
          file: `./lib/${arr[i]}-amd.js`,
          format: 'amd',
          name: `${arr[i]}`,
          sourcemapExcludeSources: true,
          minifyInternalExports: true,
        },
        {
          file: `./lib/${arr[i]}-iife.js`,
          format: 'iife',
          name: `${arr[i]}`,
          sourcemapExcludeSources: true,
          minifyInternalExports: true,
        },
        {
          file: `./lib/${arr[i]}-system.js`,
          format: 'system',
          name: `${arr[i]}`,
          sourcemapExcludeSources: true,
          minifyInternalExports: true,
        },
        {
          file: `./lib/${arr[i]}-umd.js`,
          format: 'umd',
          name: `${arr[i]}`,
          sourcemapExcludeSources: true,
          minifyInternalExports: true,
        },
        {
          file: `./lib/${arr[i]}-es.js`,
          format: 'es',
          sourcemapExcludeSources: true,
          minifyInternalExports: true,
        },
        {
          file: `./lib/${arr[i]}-cjs.js`,
          format: 'cjs',
          sourcemapExcludeSources: true,
          minifyInternalExports: true,
        },
      ],
      plugins: [
        terser({
          format: {
            comments: false,
          },
        }),
        typescript({
          useTsconfigDeclarationDir: true,
          tsconfigOverride: { compilerOptions: {} },
        }),
      ], // 配置插件
      external: ['../*'],
    })
  }
  return rollup_Array
}

export default readDirectory()
