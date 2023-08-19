import React, { memo, useState, useEffect } from 'react'
import { Input } from 'antd'
const { TextArea } = Input

import './index.less'
import { ResponsePropsType } from './type'

const MockResponse: React.FunctionComponent<ResponsePropsType> = (props) => {
  const [responseInfo, setResponseInfo] = useState('')

  useEffect(() => {
    // 内容修改了通知父组件
    if (props.onInfoChange) {
      props.onInfoChange(responseInfo, 'response')
    }
  }, [responseInfo])

  return (
    <div className='response-page'>
      <div className='section-title'>返回响应</div>
      <div className='content'>
        <TextArea
          rows={6}
          placeholder='响应内容'
          value={responseInfo}
          onChange={(e) => setResponseInfo(e.target.value)}
        />
      </div>
    </div>
  )
}

export default memo(MockResponse)
