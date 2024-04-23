import React, { useCallback, useState } from 'react'
import './index.less'
import ReactDOM from 'react-dom'
import { CloseOutlined } from '@ant-design/icons'
import Overlay from '../overlay'
import { Button, Input } from 'antd'
import { useDispatch } from 'react-redux'
import { setIValue } from '@/store/modules/updateUserInfoSlice'
import { SendProps } from '@/types/userInfo'
import { increment } from '@/store/modules/isUpdateSlice'
import { SendData } from './type'
import { E } from '@/types/base'
import { updateUser } from '@/api'

const UpdateUserInfo: React.FunctionComponent<{ data: SendProps }> = (
  props,
) => {
  const [inputValue, setInputValue] = useState('')
  const ChangeValue = useCallback((e: E): void => {
    setInputValue(e.target.value)
  }, [])
  const dispatch = useDispatch()
  const closeThisPage = useCallback((): void => {
    dispatch(setIValue(false))
  }, [dispatch])
  const sendUpdateInfo = useCallback(async () => {
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
    const resp = await updateUser(sendData)
    if (resp.code == 200) {
      dispatch(increment())
    }
    closeThisPage()
  }, [closeThisPage, dispatch, inputValue, props.data.sendType])
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
