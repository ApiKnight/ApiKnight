import React, { memo } from 'react'
import { Input } from 'antd'
const { TextArea } = Input

import './index.less'
import { useAppDispatch, useAppSelector } from '@/store'
import { changeRequestBodyAction } from '@/store/modules/document/document'

const RequestBody: React.FunctionComponent = () => {
  const dispatch = useAppDispatch()
  const { requestBody } = useAppSelector((state) => ({
    requestBody: state.document.apiData.apiInfo.request.body,
  }))
  return (
    <TextArea
      rows={6}
      placeholder='请求体内容'
      value={requestBody}
      onChange={(e) => dispatch(changeRequestBodyAction(e.target.value))}
    />
  )
}

export default memo(RequestBody)
