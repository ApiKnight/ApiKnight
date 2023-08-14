import React from 'react'
import { Button, Input, notification } from 'antd'
import './link.less'
import type { NotificationPlacement } from 'antd/es/notification/interface'
import {useSelector} from "react-redux";
import {RootState} from "../../store";

const Link: React.FunctionComponent = () => {
  const [api, contextHolder] = notification.useNotification()
  const projectId = useSelector((state: RootState) => state.project.project_id)
  // 示例链接
  const link = `http://127.0.0.1:5173/receive?projectid=${Number(projectId)}`
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
      <Input value={link} rereadOnly={true} className='link-Input' />
      <div className='link-btn'>
        <Button type='primary' block style={{ marginTop: '5%' }} onClick={copy}>
          复制链接
        </Button>
      </div>
    </div>
  )
}

export default Link
