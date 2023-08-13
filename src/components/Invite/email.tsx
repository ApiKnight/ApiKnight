import React, { useEffect, useState, useMemo } from 'react'
import { Button, Input, message, notification } from 'antd'
import request from '@/api/request'
import './email.less'
const { TextArea } = Input
import type { NotificationPlacement } from 'antd/es/notification/interface'

const Context = React.createContext({ name: 'Default' })
const Email: React.FunctionComponent = () => {
  const [userEmail, setUserEmail] = useState('')
  const [listData, setListData] = useState([])
  async function handleChange(e: any) {
    await setUserEmail(e.target.value)
  }
  const [info, setInfo] = useState('')
  function sendInfo(): void {
    request
      .post('/v1/invite/sending', { email: userEmail, projectid: 1063 }, {})
      .then((resp) => {
        if (
          (resp as any).data.code !== 403 ||
          (resp as any).data.data.code !== 500
        ) {
          openNotification('topLeft')
          console.log(typeof (resp as any).data.message)
          setInfo((resp as any).data.message)
        }
      })
  }
  const newArray = []
  useEffect(() => {
    const data = {
      projectid: 1063,
      email: userEmail,
    }
    request
      .post('/v1/user/searchUsersByEmail', { email: userEmail }, {})
      .then((res) => {
        ;(res as any).data.data.map((item) => {
          newArray.push({
            key: item.id,
            email: item.email,
          })
          setListData(newArray)
        })
      })
  }, [userEmail])
  const [api, contextHolder] = notification.useNotification()

  const openNotification = (placement: NotificationPlacement) => {
    api.info({
      message: <p>{info}</p>,
      description: <p></p>,
      placement,
    })
  }

  const contextValue = useMemo(() => ({ name: 'Ant Design' }), [])
  return (
    <div className='email'>
      {contextHolder}
      <div className='email-input'>
        {/*<TextArea rows={4} placeholder="请输入被邀请者的邮箱" value={userEmail} onChange={handleChange} list="opts"/>*/}
        <Input
          placeholder='请输入被邀请者的邮箱'
          value={userEmail}
          onChange={handleChange}
          list='opts'
          allowClear
          style={{ marginTop: '2%' }}
        />
        <datalist id='opts'>
          {listData.map((item) => {
            return <option key={item.key}>{item.email}</option>
          })}
        </datalist>
        <p style={{ marginTop: '2%' }}>链接将在七天后过期</p>
      </div>
      <div className='email-btn'>
        <Button
          type='primary'
          block
          style={{ marginTop: '5%' }}
          onClick={sendInfo}
        >
          发送邀请
        </Button>
      </div>
    </div>
  )
}

export default Email