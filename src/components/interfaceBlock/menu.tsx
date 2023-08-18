import React, { useEffect, useState } from 'react'
import { UnorderedListOutlined } from '@ant-design/icons'
import { Button, Popover, Space } from 'antd'
import { increment } from '@/store/modules/watchDir'
import { AddData } from '@/types/treeComponents'
import { useDispatch, useSelector } from 'react-redux'
import { setTrue } from '@/store/modules/createFileState'
import CreateFile from '@/components/createFile'
import Overlay from '@/components/overlay'
import { useLocation } from 'react-router-dom'
import './menu.less'
import { RootState } from '@/store'

const Menu: React.FunctionComponent<{ data: AddData }> = (props) => {
  const { data } = props
  const dispatch = useDispatch()
  function addChildDir(e: any): void {
    dispatch(setTrue())
    setShow(true)
    e.stopPropagation()
  }
  useEffect(() => {
    setPData({
      project_id: proId,
      parent_id: data.key,
    })
  }, [])
  console.log(data.key)
  const content = (
    <div>
      <p>
        {data.type === 'FILE' ? (
          <Button block onClick={addChildDir}>
            添加子目录
          </Button>
        ) : (
          <div style={{ display: 'none' }}></div>
        )}
      </p>
      <p>
        <Button block>导出</Button>
      </p>
    </div>
  )
  const state = useLocation().state
  const proId = state.project_id
  const [show, setShow] = useState(false)
  const [pData, setPData] = useState({
    project_id: proId,
    parent_id: data.key,
  })
  const handleDataFromChild = (data: boolean): void => {
    setShow(data)
  }
  return (
    <span>
      <Popover content={content} title='' trigger='click'>
        <UnorderedListOutlined />
      </Popover>
      {show && <CreateFile handleClick={handleDataFromChild} data={pData} />}
      {show && <Overlay />}
    </span>
  )
}

export default Menu
