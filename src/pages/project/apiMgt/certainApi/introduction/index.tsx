import React, { memo } from 'react'
import { IntroductionProps } from './type'
import IntroInfo from './c-pages/intro-info'
import IntroRequest from './c-pages/intro-request'
import IntroResponse from './c-pages/intro-response'

const Introduction: React.FunctionComponent<IntroductionProps> = (props) => {
  const { data } = props
  return (
    <div className='introduction-page'>
      <IntroInfo />
      <IntroRequest />
      <IntroResponse />
    </div>
  )
}

export default memo(Introduction)
