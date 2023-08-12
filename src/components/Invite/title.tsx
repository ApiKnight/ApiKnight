import React, { useEffect, useState } from 'react'
import './title.less'
import { PoweroffOutlined } from '@ant-design/icons'
import { useDispatch } from 'react-redux'
import { setFalse } from '@/store/modules/stateFlag'

const Title: React.FunctionComponent = () => {
  const dispatch = useDispatch()
  function closeInvite(): void {
    dispatch(setFalse())
  }
  return (
    <div className='invite-title'>
      <h2>邀请加入示例项目</h2>
      <div className='invite-title__close' onClick={closeInvite}>
        <PoweroffOutlined />
      </div>
    </div>
  )
}

export default Title
