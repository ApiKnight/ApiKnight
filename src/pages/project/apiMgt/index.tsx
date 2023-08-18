import React from 'react'
import './index.less'
import { Link, Outlet } from 'react-router-dom'
import RenderTree from '@/components/RenderTree'
import { ArrayItem } from '@/types/arrayToTree'
import { FlatItem, FlatItemValue } from '@/types/mergeFlatArrays'
import { mergeFlatArrays } from '@/utils/mergeFlatArrays'
import Email from '@/components/Invite/email'
import { useLocation } from 'react-router-dom'
import './index.less'
import RightPage from '@/components/RightPage'
import { addData } from '@/store/modules/tabSlice'
import { useDispatch } from 'react-redux'
import { setValue } from '@/store/modules/rightSlice'
import Swagger from "@/components/Swagger";

const ApiMgt: React.FunctionComponent = () => {
  const dispatch = useDispatch()
  const state = useLocation().state
  const projectId = state.project_id
  function openTab() {
    dispatch(
      addData({
        key: projectId,
        title: '项目概览',
        type: 'gl',
      }),
    )
    dispatch(setValue('gl'))
  }
  return (
    <div className='project-api'>
      <div className='project-api__left'>
        <div onClick={openTab}>overview</div>
        {/* 不需要传data，内部都做好了 */}
        <RenderTree />
      </div>
      <RightPage />
    </div>
  )
}

export default ApiMgt
