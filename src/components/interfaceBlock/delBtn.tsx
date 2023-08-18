import { Modal, Spin } from 'antd'
import React, { useState, createContext } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { MinusOutlined } from '@ant-design/icons'
import { increment } from '@/store/modules/watchDir'
import request from '@/api/request'
import { removeData } from '@/store/modules/tabSlice'
import { setValue } from '@/store/modules/rightSlice'
import ReactDOM from 'react-dom'

interface Props {
  key: string
  type: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'OPTIONS' | 'HEAD' | 'PATCH'
}

const DelBtn: React.FunctionComponent<{ data: Props }> = (props) => {
  const state = useLocation().state
  const projectId = state.project_id
  const dispatch = useDispatch()
  const { data } = props
  const ReachableContext = createContext<string | null>(null)
  const [showLoading,setShowLoading] = useState(false)
  // const UnreachableContext = createContext<string | null>(null);
  const [open, setOpen] = useState(false)
  const [confirmLoading, setConfirmLoading] = useState(false)
  const [modalText, setModalText] =
    useState('确定要删除该节点吗？该操作不可逆!')

  const showModal = () => {
    setOpen(true)
  }
  const delDataJson =
    data.type == 'FILE'
      ? {
          project_id: projectId,
          folder_id: data.key,
        }
      : {
          apis_id: data.key,
        }
  const handleOk = () => {
    setModalText('节点正在删除中')
    setConfirmLoading(true)
    setOpen(false)
    setConfirmLoading(false)
    // dispatch(remove(data))
    const url = data.type === 'FILE' ? '/v1/folder/delete' : '/v1/apis/delete'
    setShowLoading(true)
    request.post(url, delDataJson, {}).then((res) => {
      // 在这里处理返回的数据
      if (res.data.code == 200) {
        setShowLoading(true)
        dispatch(increment())
        if (data.type !== 'FILE') {
          dispatch(removeData(data.key))
        }
      }
    })
    dispatch(setValue('gl'))
  }

  const handleCancel = (e: any): void => {
    setOpen(false)
    e.stopPropagation()
  }
  function delFunction() {
    showModal()
  }
  return (
    <span style={{ display: 'inline' }} onClick={delFunction}>
      {/* <svg className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4418" width="24.5" height="24.5"><path d="M512 42.667C771.2 42.667 981.333 252.8 981.333 512S771.2 981.333 512 981.333 42.667 771.2 42.667 512 252.8 42.667 512 42.667z m0 64c-223.85 0-405.333 181.482-405.333 405.333S288.149 917.333 512 917.333 917.333 735.851 917.333 512 735.851 106.667 512 106.667z m183.467 362.666c4.693 0 8.533 3.84 8.533 8.534V524.8a8.533 8.533 0 0 1-8.533 8.533h-345.6a8.533 8.533 0 0 1-8.534-8.533v-46.933c0-4.694 3.84-8.534 8.534-8.534h345.6z" fill="#333333" p-id="4419"></path></svg> */}
      <MinusOutlined />
      <Modal
        title='删除该节点'
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        {
          <div>
            <ReachableContext.Consumer>
              {() => modalText}
            </ReachableContext.Consumer>
          </div>
        }
      </Modal>
      {ReactDOM.createPortal(
        <div>
          {showLoading &&
              <Spin tip='Loading' size='large'>
                <div className='content'/>
              </Spin>}
        </div>,
        document.body,
      )}
    </span>
  )
}

export default DelBtn
