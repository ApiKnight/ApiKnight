import React from 'react'
import { MailOutlined } from '@ant-design/icons'
import './index.less'
import Invite from '@/components/Invite'
import { ProjectNavChildType } from '@/types/projectNavChild'
import ProjectNavChild from '../ProjectNavChild'

const ProjectNav: React.FC<any> = (props) => {
  const items: Array<ProjectNavChildType> = [
    {
      key: '1',
      avatar: <MailOutlined />,
      content: '接口管理',
      props: props,
    },
    {
      key: '2',
      avatar: <MailOutlined />,
      content: '成员/权限管理',
      props: props,
    },
    {
      key: '3',
      avatar: <MailOutlined />,
      content: '项目管理',
      props: props,
    },
    {
      key: '4',
      avatar: <MailOutlined />,
      content: '邀请成员',
      props: props,
    },
  ]

  return (
    <>
      <div>
        <Invite project_id={(props as any).project_id}></Invite>
      </div>
      <div className='ProjectNavMenu'>
        {items.map((item) => {
          return <ProjectNavChild key={item.key} data={item}></ProjectNavChild>
        })}
      </div>
    </>
  )
}

export default ProjectNav
