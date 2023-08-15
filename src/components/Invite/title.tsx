import React, { useEffect, useState } from 'react'
import './title.less'
import { PoweroffOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import { setFalse } from '@/store/modules/stateFlag'
import Overlay from '@/components/overlay'
import { RootState } from '../../store'

const Title: React.FunctionComponent = () => {
  const dispatch = useDispatch()
  const flag = useSelector((state: RootState) => state.stateFlag.value)
  function closeInvite(): void {
    dispatch(setFalse())
  }
  return (
    <div className='invite-title'>
      <h2>邀请加入示例项目</h2>
      <div className='invite-title__close' onClick={closeInvite}>
        <PoweroffOutlined />
      </div>
      {flag && <Overlay />}
    </div>
  )
}

export default Title
