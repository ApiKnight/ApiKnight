import React, { useCallback, useState } from 'react'
import { Button, Input } from 'antd'
import { CloseOutlined } from '@ant-design/icons'
import './index.less'
import ReactDOM from 'react-dom'
import { useDispatch } from 'react-redux'
import { AddDir } from '@/types/arrayToTree'
import { setFalse } from '@/store/modules/createFileState'
import { increment } from '@/store/modules/watchDir'
import { notification } from 'antd'
import type { NotificationPlacement } from 'antd/es/notification/interface'
import { E } from '@/types/base'
import { createFolder, updataFolder } from '@/api/folder'

const CreateFile: React.FunctionComponent<{
  handleClick: (data: boolean) => void
  data: AddDir
  title: string
}> = (props) => {
  const [api, contextHolder] = notification.useNotification()
  const dispatch = useDispatch()
  const [dirName, setDirName] = useState('')
  const change = useCallback((e: E): void => {
    e.stopPropagation()
    setDirName(e.target.value)
  }, [])
  const closeThis = useCallback((): void => {
    props.handleClick(false)
    dispatch(setFalse())
  }, [dispatch, props])
  const alertTip = useCallback(
    (alertData: string): void => {
      const openNotification = (placement: NotificationPlacement) => {
        api.info({
          message: `错误提示`,
          description: alertData,
          placement,
        })
      }
      openNotification('topRight')
    },
    [api],
  )
  const addChildDir = useCallback(
    async (e: React.MouseEvent): Promise<void> => {
      e.stopPropagation()
      if (props.title === '添加子目录') {
        const res = await createFolder(
          props.data.project_id,
          props.data.parent_id,
          dirName,
        )
        if (res.code == 200) {
          dispatch(increment())
        } else {
          alertTip(res.message)
        }
      } else {
        const res = await updataFolder(
          props.data.parent_id,
          props.data.pid,
          dirName,
        )
        if (res.code == 200) {
          dispatch(increment())
        } else {
          alert(res.message)
        }
      }
      dispatch(setFalse())
      props.handleClick(false)
    },
    [alertTip, dirName, dispatch, props],
  )
  return ReactDOM.createPortal(
    <div
      className='createFile'
      onClick={(e: React.MouseEvent): void => {
        e.stopPropagation()
      }}>
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
