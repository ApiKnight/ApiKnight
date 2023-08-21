import React, { memo } from 'react'
import { Input } from 'antd'
const { TextArea } = Input

import './index.less'
import { shallowEqualApp, useAppSelector } from '@/store'
import { ResponseType } from '@/types/api'
import withMode from '../../../with-mode'

const MockResponse: React.FunctionComponent<{ mode: 'run' | 'mock' }> = (
  props,
) => {
  const { responseInfo } = useAppSelector((state) => {
    const res = {} as { responseInfo: ResponseType }
    if (props.mode === 'mock') {
      res.responseInfo = state.mock.mockData.apiInfo.response
    } else {
      res.responseInfo = state.mock.runData.apiInfo.response
    }
    return res
  }, shallowEqualApp)

  return (
    <div className='response-page'>
      <div className='section-title'>返回响应</div>
      <div className='content'>
        <TextArea rows={6} placeholder='响应内容' value={responseInfo.body} />
      </div>
    </div>
  )
}

export default memo(withMode(MockResponse))
