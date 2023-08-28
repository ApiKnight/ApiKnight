import React, { useEffect, useState } from 'react'
import { UnorderedListOutlined } from '@ant-design/icons'
import { Button, Popover } from 'antd'
import { AddData } from '@/types/treeComponents'
import { useDispatch } from 'react-redux'
import { setTrue } from '@/store/modules/createFileState'
import CreateFile from '@/components/createFile'
import Overlay from '@/components/overlay'
import { useLocation } from 'react-router-dom'
import './menu.less'

const Menu: React.FunctionComponent<{ data: AddData }> = (props) => {
  const { data } = props
  const dispatch = useDispatch()
  function addChildDir(e: any): void {
    dispatch(setTrue())
    setShow(true)
    e.stopPropagation()
    setTitleInfo('添加子目录')
  }
  function updateChildDir(e: any): void {
    dispatch(setTrue())
    setShow(true)
    e.stopPropagation()
    setTitleInfo('修改文件夹名称')
  }
  useEffect(() => {
    setPData({
      project_id: proId,
      parent_id: data.key,
      pid: data.pid,
    })
  }, [])

  function handleShare(): void {
    console.log('导出')
  }
  const content = (
    <div>
      <div>
        {data.type === 'FILE' ? (
          <div>
            <Button block onClick={addChildDir}>
              添加子目录
            </Button>
            <Button block onClick={updateChildDir}>
              更改文件夹名
            </Button>
          </div>
        ) : (
          <div style={{ display: 'none' }}></div>
        )}
      </div>
      <div>
        <Button block onClick={handleShare}>
          导出
        </Button>
      </div>
    </div>
  )
  const state = useLocation().state
  const proId = state.project_id
  const [show, setShow] = useState(false)
  const [pData, setPData] = useState({
    project_id: proId,
    parent_id: data.key,
    pid: data.pid,
  })
  const handleDataFromChild = (data: boolean): void => {
    setShow(data)
  }
  const [titleInfo, setTitleInfo] = useState('添加子目录')
  return (
    <span>
      <Popover content={content} title='' trigger='click'>
        <UnorderedListOutlined />
      </Popover>
      {show && (
        <CreateFile
          handleClick={handleDataFromChild}
          data={pData}
          title={titleInfo}
        />
      )}
      {show && <Overlay data={10000} />}
    </span>
  )
}

export default Menu
