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
import Overlay from "@/components/overlay";

const CreateFile: React.FunctionComponent<{ data: AddDir }> = (props) => {
  const flag = useSelector((state: RootState) => state.createFileState.value)
  const dispatch = useDispatch()
  const [dirName, setDirName] = useState('')
  console.log(props)
  console.log(props.data)
  function change(e: any): void {
    setDirName(e.target.value)
  }
  function closeThis():void {
    dispatch(setFalse())
  }
  function addChildDir() {
    fetch('http://47.112.108.202:7002/api/v1/folder/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: ('Bearer ' + localStorage.getItem('token')) as string,
      },
      body: JSON.stringify({
        project_id: props.data.project_id,
        parent_id: props.data.parent_id,
        name: dirName,
      }),
    })
      .then((response) => response.json())
      .then((res) => {
        // 在这里处理返回的数据
        if (res.code == 200) {
          dispatch(increment())
        }
      })
      .catch((error) => {
        // 在这里处理错误
        console.error(error)
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
        {
            flag && <Overlay/>
        }
      </div>,
      document.body,
    )
  } else {
    return <div style={{ display: 'none' }}></div>
  }
}

export default CreateFile
