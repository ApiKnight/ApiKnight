import React from 'react'
import { Button, Input, notification } from 'antd'
import './link.less'
import type { NotificationPlacement } from 'antd/es/notification/interface'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { RootState } from '../../store'

const Link: React.FunctionComponent<any> = (props) => {
  console.log(props)

  const [api, contextHolder] = notification.useNotification()
  // 示例链接
  const link = `http://polaris.lyyfsq.club/receive?projectid=${Number(
    props.project_id,
  )}`
  const openNotification = (placement: NotificationPlacement) => {
    api.info({
      message: <p>复制成功</p>,
      description: <p></p>,
      placement,
    })
  }
  function copy(e) {
    navigator.clipboard
      .writeText(link)
      .then(() => {
        openNotification('topLeft')
      })
      .catch((error) => {
        console.log(error)
      })
  }
  return (
    <div className='link'>
      {contextHolder}
      <Input value={link} readOnly={true} className='link-Input' />
      <div className='link-btn'>
        <Button type='primary' block style={{ marginTop: '5%' }} onClick={copy}>
          复制链接
        </Button>
      </div>
    </div>
  )
}

export default Link
