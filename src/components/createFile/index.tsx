import React, { useEffect, useState } from 'react'
import { Button, Input } from 'antd'
import { CloseOutlined } from '@ant-design/icons'
import './index.less'
import ReactDOM from 'react-dom'
import { RootState } from '@/store'
import { useDispatch, useSelector } from 'react-redux'
import { AddDir } from '@/types/arrayToTree'
import { setFalse, setTrue } from '@/store/modules/createFileState'
import { increment } from '@/store/modules/watchDir'
import Overlay from '@/components/overlay'
import request from '../../api/request'

const CreateFile: React.FunctionComponent<{
  handleClick: any
  data: AddDir,
  title: string
}> = (props) => {
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
  function addChildDir(e: any): void {
    e.stopPropagation()
    if (props.title === "添加子目录") {
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
            }
          })
    }
    else {
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
