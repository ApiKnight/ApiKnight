import React, { useState } from 'react'
import { MailOutlined, SettingOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { Menu, Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { reversal, setFalse } from '@/store/modules/stateFlag'
import Invite from '@/components/Invite'

type MenuItem = Required<MenuProps>['items'][number]

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem
}

const items: MenuProps['items'] = [
  getItem('接口管理', '1', <MailOutlined />),
  getItem('成员/权限管理', '2', <MailOutlined />),
  getItem('项目管理', '3', <MailOutlined />),
  getItem('邀请成员', '4', <MailOutlined />),

  // { type: 'divider' },

  // getItem('Navigation Three', 'sub4', <SettingOutlined />, [
  //   getItem('接口管理', '9'),
  //   getItem('Option 10', '10'),
  //   getItem('Option 11', '11'),
  //   getItem('Option 12', '12'),
  // ]),

  // getItem('Group', 'grp', null, [getItem('Option 13', '13'), getItem('Option 14', '14')], 'group'),
]

const ProjectNav: React.FC = (props) => {
  console.log('props', props)

  const dispatch = useDispatch()
  function show(): void {
    dispatch(reversal())
  }
  const navigate = useNavigate()
  const onClick: MenuProps['onClick'] = (e) => {
    switch (e.key) {
      case '1':
        navigate('/project/apiMgt', { state: props })
        dispatch(setFalse())
        break
      case '2':
        navigate('/project/memberMgt', { state: props })
        dispatch(setFalse())
        break
      case '3':
        navigate('/project/projectSet', { state: props })
        dispatch(setFalse())
        break
      case '4':
        show()
        break
      default:
        ''
    }
  }
  return (
    <>
      <div>
        <Invite project_id={props.project_id}></Invite>
      </div>
      <Menu
        onClick={onClick}
        style={{ width: 256 }}
        // defaultSelectedKeys={['1']}
        mode='inline'
        items={items}
      />
    </>
    // <ul>
    //       <li>
    //         <Link to={`/project/apiMgt`}>接口管理</Link>
    //       </li>
    //       <li>
    //         <Link to={`/project/memberMgt`}>成员/权限管理</Link>
    //       </li>
    //       <li>
    //         <Link to={`/project/projectSet`}>项目管理</Link>
    //       </li>
    //     </ul>
  )
}

export default ProjectNav
