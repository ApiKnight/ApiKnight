import React, { useEffect, useState } from 'react'
import { Button, Input } from 'antd'
import { CloseOutlined } from '@ant-design/icons'
import './index.less'
import ReactDOM from 'react-dom'
import { useDispatch, useSelector } from 'react-redux'
import { AddDir } from '@/types/arrayToTree'
import { setFalse } from '@/store/modules/createFileState'
import { increment } from '@/store/modules/watchDir'
import request from '../../api/request'
import { notification } from 'antd'
import type { NotificationPlacement } from 'antd/es/notification/interface'

const CreateFile: React.FunctionComponent<{
  handleClick: any
  data: AddDir
  title: string
}> = (props) => {
  const [api, contextHolder] = notification.useNotification()
  const dispatch = useDispatch()
  const [dirName, setDirName] = useState('')
  function change(e: any): void {
    e.stopPropagation()
    setDirName(e.target.value)
  }
  function closeThis(): void {
    props.handleClick(false)
    dispatch(setFalse())
  }
  function alertTip(alertData: string): void {
    const openNotification = (placement: NotificationPlacement) => {
      api.info({
        message: `错误提示`,
        description: alertData,
        placement,
      })
    }
    openNotification('topRight')
  }
  function addChildDir(e: any): void {
    e.stopPropagation()
    if (props.title === '添加子目录') {
      request
        .post(
          '/v1/folder/create',
          {
            project_id: props.data.project_id,
            parent_id: props.data.parent_id,
            name: dirName,
          },
          {},
        )
        .then((res) => {
          // 在这里处理返回的数据
          if (res.data.code == 200) {
            dispatch(increment())
          } else {
            alertTip(res.data.message)
          }
        })
    } else {
      request
        .post(
          '/v1/folder/update',
          {
            folder_id: props.data.parent_id,
            parent_id: props.data.pid,
            name: dirName,
          },
          {},
        )
        .then((res) => {
          // 在这里处理返回的数据
          if (res.data.code == 200) {
            dispatch(increment())
          } else {
            alert(res.data.message)
          }
        })
    }
    dispatch(setFalse())
    props.handleClick(false)
  }
  return ReactDOM.createPortal(
    <div
      className='createFile'
      onClick={(e: any): void => {
        e.stopPropagation()
      }}
    >
      {contextHolder}
      <div className='createFile-title'>
        <span>
          <h3>{props.title}</h3>
        </span>
        <span className='createFile-title__icon' onClick={closeThis}>
          <CloseOutlined />
        </span>
      </div>
      <div className='createFile-content'>
        <Input
          placeholder='请输入要创建的文件夹名字'
          value={dirName}
          onChange={change}
        />
      </div>
      <div className='createFile-btn'>
        <Button size='large' onClick={addChildDir}>
          创建
        </Button>
      </div>
    </div>,
    document.body,
  )
}

export default CreateFile
