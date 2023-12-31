import React, { memo } from 'react'

import { Input } from 'antd'
const { TextArea } = Input

import { useAppDispatch, useAppSelector } from '@/store'
import { changeResponseBodyAction } from '@/store/modules/document/document'
import './index.less'
import CodeEditor from '@/components/CodeEditor'

const DocResponse: React.FunctionComponent = memo(() => {
  const dispatch = useAppDispatch()
  const { apiData } = useAppSelector((state) => ({
    apiData: state.document.apiData,
  }))
  return (
    <div className='doc-response'>
      <div className='section-title'>返回响应</div>
      <div className='content'>
        <CodeEditor
          height='300px'
          defaultValue={apiData.apiInfo.response.body}
          onChange={(val) => dispatch(changeResponseBodyAction(val))}
        />
        {/* <TextArea
          rows={6}
          placeholder='请求体内容'
          value={requestBody}
          onChange={(e) => dispatch(changeResponseBodyAction(e.target.value))}
        /> */}
      </div>
    </div>
  )
})

export default DocResponse
