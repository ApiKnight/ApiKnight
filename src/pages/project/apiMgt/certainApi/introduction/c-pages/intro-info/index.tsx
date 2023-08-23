import React, { memo } from 'react'
import { Button } from 'antd'
import './index.less'
import { useAppSelector } from '@/store'

const IntroInfo: React.FunctionComponent = memo(() => {
  const { baseInfo } = useAppSelector((state) => ({
    baseInfo: state.document.apiData.meta_info,
  }))
  return (
    <div className='intro-request'>
      <div className='name-wrap'>
        <div className='title'>{baseInfo.name}</div>
        <div className='opt-wrap'>
          <Button type='primary'>生成代码</Button>
          <Button>删除</Button>
        </div>
      </div>
      <div className='meta-info'></div>
    </div>
  )
})

export default IntroInfo
