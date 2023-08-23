import React, { memo } from 'react'
import { IntroductionProps } from './type'
import IntroInfo from './c-pages/intro-info'
import IntroRequest from './c-pages/intro-request'
import IntroResponse from './c-pages/intro-response'
import './index.less'
import { useAppDispatch } from '@/store'
import { fetchDocumentApiAction } from '@/store/modules/document/document'

const Introduction: React.FunctionComponent<IntroductionProps> = (props) => {
  const { data } = props
  const dispatch = useAppDispatch()
  dispatch(fetchDocumentApiAction(data))
  return (
    <div className='introduction-page'>
      <IntroInfo />
      <IntroRequest />
      <IntroResponse />
    </div>
  )
}

export default memo(Introduction)
