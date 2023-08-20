import React, { memo, useState, useEffect } from 'react'
import { Input } from 'antd'
const { TextArea } = Input

import './index.less'

const MockResponse: React.FunctionComponent = (props) => {
  const [responseInfo, setResponseInfo] = useState('')

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
