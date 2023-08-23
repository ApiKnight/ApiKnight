import React, { memo, useEffect } from 'react'
import { Button } from 'antd'
import './index.less'
import DocOperator from './c-pages/doc-operator'
import DocInfo from './c-pages/doc-info'
import DocRequest from './c-pages/doc-request'
import DocResponse from './c-pages/doc-response'
import { useAppDispatch, useAppSelector } from '@/store'
import { fetchDocumentApiAction } from '@/store/modules/document/document'

type DocumentPropsType = {
  data?: string
}

const Document: React.FunctionComponent<DocumentPropsType> = memo((props) => {
  const dispatch = useAppDispatch()
  // useEffect(() => {
  //   dispatch(fetchDocumentApiAction(props.data))
  // }, [dispatch])
  dispatch(fetchDocumentApiAction(props.data))
  return (
    <div className='document-page'>
      <DocOperator />
      <DocInfo />
      <DocRequest />
      <DocResponse />
    </div>
  )
})

export default Document
