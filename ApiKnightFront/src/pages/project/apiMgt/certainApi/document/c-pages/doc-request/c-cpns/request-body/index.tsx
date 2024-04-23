import React, { memo } from 'react'
import { useAppDispatch, useAppSelector } from '@/store'
import { changeRequestBodyAction } from '@/store/modules/document/document'
import CodeEditor from '@/components/CodeEditor'
import './index.less'

// eslint-disable-next-line react-refresh/only-export-components
const RequestBody: React.FunctionComponent = () => {
  const dispatch = useAppDispatch()
  const { requestBody } = useAppSelector((state) => ({
    requestBody: state.document.apiData.apiInfo.request.body,
  }))
  return (
    <div className='doc-req-body'>
      <CodeEditor
        height='200px'
        defaultValue={requestBody}
        onChange={(val) => dispatch(changeRequestBodyAction(val))}
      />
    </div>
    // <TextArea
    //   rows={6}
    //   placeholder='请求体内容'
    //   value={requestBody}
    //   onChange={(e) => dispatch(changeRequestBodyAction(e.target.value))}
    // />
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export default memo(RequestBody)
