import React, { useEffect, useState } from 'react'
import { Button, Input, notification } from 'antd'
import request from '@/api/request'
import './email.less'
import type { NotificationPlacement } from 'antd/es/notification/interface'

const Email: React.FunctionComponent<any> = (props) => {
  const [userEmail, setUserEmail] = useState('')
  const [listData, setListData] = useState([])
  async function handleChange(e: any) {
    setUserEmail(e.target.value)
  }
  const [info, setInfo] = useState('')
  console.log(info)
  const [api, contextHolder] = notification.useNotification()
  function sendInfo(): void {
    request
      .post(
        '/v1/invite/sending',
        { email: userEmail, projectid: Number(props.project_id) },
        {},
      )
      .then((resp) => {
        if (
          (resp as any).data.code !== 403 ||
          (resp as any).data.data.code !== 500
        ) {
          setInfo((resp as any).data.message)
          const openNotification = (placement: NotificationPlacement) => {
            api.info({
              message: <p>{(resp as any).data.message}</p>,
              description: <p></p>,
              placement,
            })
          }
          openNotification('topLeft')
        }
      })
  }
  const newArray = []
  useEffect(() => {
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

  return (
    <div className='email'>
      {contextHolder}
      <div className='email-input'>
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
          onClick={sendInfo}>
          发送邀请
        </Button>
      </div>
    </div>
  )
}

export default Email
