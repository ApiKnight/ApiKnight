import React from 'react'
import './addBtn.less'
import { useDispatch } from 'react-redux'
import { increment } from '@/store/modules/watchDir.ts'
import type { AddData } from '@/types/treeComponents.js'
import { PlusOutlined } from '@ant-design/icons'
import { useLocation } from 'react-router-dom'
import { notification } from 'antd'
import { createApi } from '@/api'
import { getUserId } from '@/utils/storage/storage'

const AddBtn: React.FunctionComponent<{ data: AddData }> = (props) => {
  const dispatch = useDispatch()
  const { data } = props
  const state = useLocation().state
  const projectId = state.project_id
  // eslint-disable-next-line
  const [api, contextHolder] = notification.useNotification()
  return (
    <span
      style={{ display: 'inline' }}
      onClick={() => {
        createApi(projectId, data.key, getUserId()).then((_res) => {
          dispatch(increment())
        })
      }}>
      <PlusOutlined />
      {contextHolder}
    </span>
  )
}

export default AddBtn
