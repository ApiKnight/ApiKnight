import React from 'react'
import classNames from 'classnames'
import Tabs from '@/components/Tabs'
import RightComponent from '@/components/RightComponent'
import { RootState } from '../../store'
import { useSelector } from 'react-redux'
import './index.less'

const RightPage: React.FC<{ project_id: string }> = (props) => {
  const tabContent = useSelector((state: RootState) => state.rightSlice.value)
  return (
    <div className={classNames('cpn-right-page full-height')}>
      <div
        className={classNames('tabs-wrap', {
          hidden: tabContent === 'blank',
        })}>
        <Tabs />
      </div>
      <div className={classNames('other-wrap')}>
        <RightComponent project_id={props.project_id} />
      </div>
    </div>
  )
}

export default React.memo(RightPage)
