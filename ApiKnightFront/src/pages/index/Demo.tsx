import React, { useEffect, useState } from 'react'
// 确保路径正确，并且指向构建后的 WebAssembly 包
import { parse_swagger_parameters } from '@apiknight/compute-module'

const Fibonacci = () => {
  const [result, setResult] = useState(null)

  useEffect(() => {
    // 异步初始化 WebAssembly 模块
    const loadWasm = async () => {
      // 准备数据
      const swaggerParams = [
        {
          in: 'body',
          schema: { $ref: '#/definitions/RequestApisCreate' },
          name: 'body',
          required: true,
          description: '',
        },
      ]
      // 调用 WebAssembly 函数
      const wasmResult = parse_swagger_parameters(swaggerParams)
      setResult(wasmResult)
    }

    loadWasm()
  }, []) // 空依赖数组意味着 effect 仅在组件挂载时运行

  console.log('result', result)

  return (
    <div>
      <h1>WebAssembly in React</h1>
      {result && <pre>{JSON.stringify(result, null, 2)}</pre>}
    </div>
  )
}

export default Fibonacci
