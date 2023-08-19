import React, { useEffect, useState } from 'react'
import Tabs from '@/components/Tabs'
import RightComponent from '@/components/RightComponent'
import { RootState } from '../../store'
import { useSelector } from 'react-redux'
import { Button } from 'antd'
import './index.less'

const RightPage: React.FunctionComponent = () => {
  return (
    <div className='cpn-right-page full-height'>
      <div className='tabs-wrap'>
        <Tabs />
      </div>
      <div className='other-wrap'>
        <RightComponent />
      </div>
    </div>
  )
}

export default RightPage
