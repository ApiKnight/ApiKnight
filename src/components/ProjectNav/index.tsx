import React from 'react'
import classNames from 'classnames'
import {
  ControlFilled,
  FireFilled,
  ApiFilled,
  NotificationFilled,
} from '@ant-design/icons'
import './index.less'
import Invite from '@/components/Invite'
import { ProjectNavChildType } from '@/types/projectNavChild'
import ProjectNavChild from '../ProjectNavChild'

const ProjectNav: React.FC<any> = (props) => {
  const items: Array<ProjectNavChildType> = [
    {
      key: '1',
      avatar: <ApiFilled className='func-icon func-icon-active' />,
      content: '接口管理',
      props: props,
    },
    {
      key: '2',
      avatar: <FireFilled className='func-icon' />,
      content: '成员管理',
      props: props,
    },
    {
      key: '3',
      avatar: <ControlFilled className='func-icon' />,
      content: '项目管理',
      props: props,
    },
    {
      key: '4',
      avatar: <NotificationFilled className='func-icon' />,
      content: '邀请成员',
      props: props,
    },
  ]

  return (
    <div className='menu-wrap'>
      <div>
        <Invite project_id={(props as any).project_id}></Invite>
      </div>
      <div className={classNames('project-nav-menu')}>
        {items.map((item) => {
          return <ProjectNavChild key={item.key} data={item}></ProjectNavChild>
        })}
      </div>
    </div>
  )
}

export default ProjectNav
