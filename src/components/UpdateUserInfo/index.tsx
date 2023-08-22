import React, { useState } from 'react'
import './index.less'
import ReactDOM from 'react-dom'
import { CloseOutlined } from '@ant-design/icons'
import Overlay from '../overlay'
import { Button, Input } from 'antd'
import { useDispatch } from 'react-redux'
import { setIValue } from '@/store/modules/updateUserInfoSlice'
import { SendProps } from '@/types/userInfo'
import request from '@/api/request'
import { increment } from '@/store/modules/isUpdateSlice'

const UpdateUserInfo: React.FunctionComponent<{ data: SendProps }> = (
  props,
) => {
  interface SendData {
    email?: string
    phone?: string
    username?: string
  }
  const [inputValue, setInputValue] = useState('')
  function ChangeValue(e: any): void {
    setInputValue(e.target.value)
  }
  const dispatch = useDispatch()
  function closeThisPage(): void {
    dispatch(setIValue(false))
  }
  function sendUpdateInfo() {
    const url = '/v1/user/update'
    let sendData: SendData
    switch (props.data.sendType) {
      case 'email':
        sendData = {
          email: inputValue,
        }
        break
      case 'phone':
        sendData = {
          phone: inputValue,
        }
        break
      case 'username':
        sendData = {
          username: inputValue,
        }
        break
    }
    request.post(url, sendData, {}).then((resp: any) => {
      if (resp.data.code == 200) {
        dispatch(increment())
      }
      closeThisPage()
    })
  }
  return ReactDOM.createPortal(
    <div className='updateUserInfo'>
      <Overlay data={10001}></Overlay>
      <div className='updateUserInfo-title'>
        <h2>修改信息</h2>
        <div className='updateUserInfo-title__closed' onClick={closeThisPage}>
          <CloseOutlined />
        </div>
      </div>
      <div className='updateUserInfo-content'>
        <Input onChange={ChangeValue} value={inputValue} />
      </div>
      <div className='updateUserInfo-btn'>
        <Button onClick={sendUpdateInfo}>确定</Button>
      </div>
    </div>,
    document.body,
  )
}

export default UpdateUserInfo
