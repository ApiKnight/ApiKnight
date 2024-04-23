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
import type { delProps } from '@/types/arrayToTree'
import { notification } from 'antd'
import type { NotificationPlacement } from 'antd/es/notification/interface'

const DelBtn: React.FunctionComponent<{ data: delProps }> = (props) => {
  const state = useLocation().state
  const projectId = state.project_id
  const dispatch = useDispatch()
  const { data } = props
  const ReachableContext = createContext<string | null>(null)
  const [showLoading, setShowLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const [confirmLoading, setConfirmLoading] = useState(false)
  const [modalText, setModalText] =
    useState('确定要删除该节点吗？该操作不可逆!')
  const [api, contextHolder] = notification.useNotification()
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
      } else {
        const openNotification = (placement: NotificationPlacement) => {
          api.info({
            message: `错误提示`,
            description: res.data.message,
            placement,
          })
        }
        openNotification('topRight')
        setTimeout(() => {
          setOpen(false)
        }, 1500)
      }
    })
    dispatch(setValue('gl'))
  }

  const handleCancel = (e: React.MouseEvent): void => {
    setOpen(false)
    e.stopPropagation()
  }
  function delFunction() {
    showModal()
  }
  return (
    <span style={{ display: 'inline' }} onClick={delFunction}>
      <MinusOutlined />
      <Modal
        title='删除该节点'
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}>
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
          {showLoading && (
            <Spin tip='Loading' size='large'>
              <div className='content' />
              {contextHolder}
            </Spin>
          )}
        </div>,
        document.body,
      )}
    </span>
  )
}

export default DelBtn
