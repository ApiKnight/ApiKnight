import React from 'react'
import { Button } from 'antd'
import classNames from 'classnames'
import { ClusterOutlined } from '@ant-design/icons'
import './index.less'
import RenderTree from '@/components/RenderTree'
import { useLocation } from 'react-router-dom'
import './index.less'
import RightPage from '@/components/RightPage'
import {
  addDataItemAction,
  changeCurrentKeyAction,
} from '@/store/modules/tabSlice'
import { useDispatch } from 'react-redux'
import { setValue } from '@/store/modules/rightSlice'
import './index.less'
import { useAppSelector } from '@/store'

const ApiMgt: React.FunctionComponent = () => {
  const dispatch = useDispatch()
  const { currentKey } = useAppSelector((state) => ({
    currentKey: state.tabSlice.currentKey,
  }))
  const state = useLocation().state
  const project_id = state.project_id
  function handleOverviewClick() {
    const overviewData = {
      key: 'project-summary',
      title: '项目概览',
      type: 'gl',
    }

    dispatch(addDataItemAction({ item: overviewData, index: 0 }))
    dispatch(changeCurrentKeyAction('project-summary'))
    dispatch(setValue('gl'))
  }
  return (
    <div className='project-api'>
      <div className='project-api-left'>
        <Button
          type='dashed'
          className={classNames('opt-item', {
            'opt-item-active': currentKey === 'project-summary',
          })}
          icon={<ClusterOutlined />}
          onClick={handleOverviewClick}>
          项目概览
        </Button>
        <Button
          type='dashed'
          className={classNames('opt-item', {
            'opt-item-active': currentKey !== 'project-summary',
          })}
          icon={<ClusterOutlined />}
          onClick={handleOverviewClick}>
          接口
        </Button>
        <div className='api-dir'>
          <RenderTree />
        </div>
      </div>
      <div className='project-api-right'>
        <RightPage project_id={project_id} />
      </div>
    </div>
  )
}

export default ApiMgt
