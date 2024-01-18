import React, { useEffect, useState } from 'react'
import { UnorderedListOutlined } from '@ant-design/icons'
import { Button, Popover, App } from 'antd'
import { AddData } from '@/types/treeComponents'
import { useDispatch } from 'react-redux'
import { setTrue } from '@/store/modules/createFileState'
import CreateFile from '@/components/createFile'
import Overlay from '@/components/overlay'
import { useLocation } from 'react-router-dom'
import './menu.less'
import { shareApi } from '@/api'
import { useAppSelector } from '@/store'

const Menu: React.FunctionComponent<{ data: AddData }> = (props) => {
  const { data } = props
  const { modal } = App.useApp()
  const dispatch = useDispatch()
  const { prijectInfo } = useAppSelector((state) => ({
    prijectInfo: state.project.projectInfo,
  }))
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

  /**
   * 导出api
   */
  async function handleShare() {
    setShow(false)
    const shareURL = await shareApi(prijectInfo.api_list, prijectInfo.id)
    // 复制链接到剪切板
    navigator.clipboard.writeText(shareURL)
    modal.success({
      title: '分享成功',
      content: (
        <div>
          <p>分享链接已经复制到剪切板</p>
          <p style={{ color: '#1677ff' }}>{shareURL}</p>
        </div>
      ),
    })
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
