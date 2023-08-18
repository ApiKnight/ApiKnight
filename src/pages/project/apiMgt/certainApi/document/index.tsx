import React, { memo } from 'react'
import { Button } from 'antd'
import './index.less'
import DocOperator from './c-pages/doc-operator'
import DocInfo from './c-pages/doc-info'
import DocRequest from './c-pages/doc-request'
import DocResponse from './c-pages/doc-response'
import { useLocation } from 'react-router-dom'

const Document: React.FunctionComponent = memo(() => {
  const state = useLocation().state

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
