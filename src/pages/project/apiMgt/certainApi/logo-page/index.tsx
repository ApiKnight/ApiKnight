import React, { memo } from 'react'
import './index.less'

const LogoPage: React.FunctionComponent = memo(() => {
  return (
    <div className='logo-page'>
      <div className='text large-text'>🍻🍻</div>
      <div className='text'>ApiKnight</div>
      <div className='text small-text'>
        {
          ['干杯！', '今天有什么有趣的事情呢', '轻舟已过万重山'][
            Math.floor(Math.random() * 3)
          ]
        }
      </div>
    </div>
  )
})

export default LogoPage
