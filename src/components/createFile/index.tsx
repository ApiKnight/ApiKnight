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

const CreateFile: React.FunctionComponent<{ data: AddDir }> = (props) => {
  const flag = useSelector((state: RootState) => state.createFileState.value)
  const dispatch = useDispatch()
  const [dirName, setDirName] = useState('')
  function change(e: any): void {
    setDirName(e.target.value)
  }
  function closeThis(): void {
    dispatch(setFalse())
  }
  function addChildDir() {
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
    dispatch(setFalse())
  }
  if (flag) {
    return ReactDOM.createPortal(
      <div className='createFile'>
        <div className='createFile-title'>
          <span>
            <h3>新建子目录</h3>
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
        {flag && <Overlay />}
      </div>,
      document.body,
    )
  } else {
    return <div style={{ display: 'none' }}></div>
  }
}

export default CreateFile
