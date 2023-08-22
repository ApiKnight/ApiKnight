import React, { memo } from 'react'

import { Input } from 'antd'
const { TextArea } = Input

import { useAppDispatch, useAppSelector } from '@/store'
import { changeResponseBodyAction } from '@/store/modules/document/document'

const DocResponse: React.FunctionComponent = memo(() => {
  const dispatch = useAppDispatch()
  const { requestBody } = useAppSelector((state) => ({
    requestBody: state.document.apiData.apiInfo.response.body,
  }))
  return (
    <div className='doc-response'>
      <div className='section-title'>返回响应</div>
      <div className='content'>
        <TextArea
          rows={6}
          placeholder='请求体内容'
          value={requestBody}
          onChange={(e) => dispatch(changeResponseBodyAction(e.target.value))}
        />
      </div>
    </div>
  )
})

export default DocResponse
