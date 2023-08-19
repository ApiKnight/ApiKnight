import React, { useState } from 'react'
import './index.less'
import MockReqParams from './c-pages/mock-req-params'
import MockResponse from './c-pages/mock-response'
import MockUrl from './c-pages/mock-url'
import { InfoType, MockInfo } from './c-pages/types'

const Mock: React.FunctionComponent = (props) => {
  const {mode} = props  //run为运行,mock为mock
  
  const {data} = props
  
  const [mockInfo, setMockInfo] = useState({} as MockInfo)

  // 发送请求
  const handleSend = (isDownload: boolean): void => {
    console.log(isDownload)
  }

  // 数据改变后更新信息
  const handleDataChange = (info: any, type: InfoType): void => {
    const newInfo = { ...mockInfo }
    newInfo[type] = info
    setMockInfo(newInfo)
  }

  return (
    <div className='mock-page'>
      {/* 网址部分 */}
      <MockUrl onInfoChange={handleDataChange} onSend={handleSend} />
      {/* 请求参数部分 */}
      <MockReqParams onInfoChange={handleDataChange} />
      {/* 响应部分 */}
      <MockResponse onInfoChange={handleDataChange} />
    </div>
  )
}

export default Mock
