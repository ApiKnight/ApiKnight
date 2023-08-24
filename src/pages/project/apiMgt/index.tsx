import React from 'react'
import './index.less'
import RenderTree from '@/components/RenderTree'
import { useLocation } from 'react-router-dom'
import './index.less'
import RightPage from '@/components/RightPage'
import { addData } from '@/store/modules/tabSlice'
import { useDispatch } from 'react-redux'
import { setValue } from '@/store/modules/rightSlice'
import './index.less'

const ApiMgt: React.FunctionComponent = () => {
  const dispatch = useDispatch()
  const state = useLocation().state
  const project_id = state.project_id
  function openTab(): void {
    const adata: any = {
      key: project_id,
      title: '项目概览',
      type: 'gl',
    }
    dispatch(addData(adata))
    dispatch(setValue('gl'))
  }
  return (
    <div className='project-api'>
      <div className='project-api__left'>
        <div onClick={openTab}>overview</div>
        {/* 不需要传data，内部都做好了 */}
        <RenderTree />
      </div>
      <div className='project-api__right'>
        <RightPage />
      </div>
    </div>
  )
}

export default ApiMgt
