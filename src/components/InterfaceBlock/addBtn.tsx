import React, { useMemo, useState } from 'react'
import './addBtn.less'
import { useDispatch } from 'react-redux'
import { increment } from '@/store/modules/watchDir.ts'
import type { AddData } from '@/types/treeComponents.js'
import { PlusOutlined } from '@ant-design/icons'
import request from '@/api/request'
import { useLocation } from 'react-router-dom'
import { notification } from 'antd'
import type { NotificationPlacement } from 'antd/es/notification/interface'
import { createApi } from '@/api'
import { getUserId } from '@/utils/storage/storage'

const Context = React.createContext({ name: 'Default' })

const AddBtn: React.FunctionComponent<{ data: AddData }> = (props) => {
  const dispatch = useDispatch()
  const { data } = props
  const state = useLocation().state
  const projectId = state.project_id
  const [api, contextHolder] = notification.useNotification()
  const contextValue = useMemo(() => ({ name: '错误提示' }), [])
  return (
    <span
      style={{ display: 'inline' }}
      onClick={() => {
        createApi(projectId, data.key, getUserId()).then((res) => {
          dispatch(increment())
        })
      }}
    >
      <PlusOutlined />
      {contextHolder}
    </span>
  )
}

export default AddBtn
