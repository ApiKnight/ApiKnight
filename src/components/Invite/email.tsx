import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Button, Input, notification } from 'antd'
import './email.less'
import type { NotificationPlacement } from 'antd/es/notification/interface'
import { E } from '@/types/base'
import { searchUsersByEmail, sendEamil } from '@/api/invite'

const Email: React.FunctionComponent<{ project_id: string | number }> = (
  props,
) => {
  const [userEmail, setUserEmail] = useState('')
  const [listData, setListData] = useState([])
  async function handleChange(e: E) {
    setUserEmail(e.target.value)
  }
  const [info, setInfo] = useState('')
  console.log(info)
  const [api, contextHolder] = notification.useNotification()
  const sendInfo = useCallback(async (): Promise<void> => {
    const resp = await sendEamil(userEmail, Number(props.project_id))
    setInfo(resp.message)
    const openNotification = (placement: NotificationPlacement) => {
      api.info({
        message: <p>{resp.message}</p>,
        description: <p></p>,
        placement,
      })
    }
    openNotification('topLeft')
  }, [api, props.project_id, userEmail])
  const newArray = useMemo(() => {
    return []
  }, [])
  useEffect(() => {
    const func = async () => {
      const res = await searchUsersByEmail(userEmail)
      res.data.map((item) => {
        newArray.push({
          key: item.id,
          email: item.email,
        })
        setListData(newArray)
      })
    }
    func()
  }, [newArray, userEmail])

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
