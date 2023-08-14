import React, { memo, useState } from 'react'
import { Button } from 'antd'
import type { ApiOptReqOptType } from '@/types/components'
import './index.less'
import ApiOperator from '@/components/ApiOperator'

const DocOperator: React.FunctionComponent = memo(() => {
  const [method, setMethod] = useState<ApiOptReqOptType>()
  const [docUrl, setDocUrl] = useState('')

  // 输入框改变事件
  function urlInputChangeHandle(e: React.ChangeEvent<HTMLInputElement>): void {
    setDocUrl(e.target.value)
    // TODO:加上防抖与节流
    console.log(e.target.value)
  }

  return (
    <div className='doc-operator'>
      <ApiOperator
        methodValue={method}
        onOptionChange={(m) => setMethod(m)}
        onInputChange={(e) => urlInputChangeHandle(e)}
        inputValue={docUrl}>
        <Button className='btn' type='primary'>
          保存
        </Button>
        <Button className='btn'>运行</Button>
        <Button className='btn'>删除</Button>
      </ApiOperator>
    </div>
  )
})

export default DocOperator
