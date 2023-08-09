import { Modal } from 'antd'
import React, { useState, createContext } from 'react'
import { useDispatch } from 'react-redux'
import { remove } from '@/store/modules/dirArraySlice.ts'
import { MinusOutlined } from '@ant-design/icons'

const DelBtn: React.FunctionComponent<{ data: string }> = (props) => {
  const dispatch = useDispatch()
  const { data } = props
  const ReachableContext = createContext<string | null>(null)
  // const UnreachableContext = createContext<string | null>(null);
  const [open, setOpen] = useState(false)
  const [confirmLoading, setConfirmLoading] = useState(false)
  const [modalText, setModalText] =
    useState('确定要删除该节点吗？该操作不可逆!')

  const showModal = () => {
    setOpen(true)
  }

  const handleOk = () => {
    setModalText('节点将在2s后被删除(模拟异步操作)')
    setConfirmLoading(true)
    setTimeout(() => {
      setOpen(false)
      setConfirmLoading(false)
      dispatch(remove(data))
    }, 2000)
  }

  const handleCancel = () => {
    // console.log('Clicked cancel button');
    setOpen(false)
  }
  function delFunction() {
    console.log('删除按钮')
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
    </span>
  )
}

export default DelBtn
