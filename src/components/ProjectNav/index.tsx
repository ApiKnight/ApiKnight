import React from 'react';
import { MailOutlined, SettingOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import {Link} from 'react-router-dom'

type MenuItem = Required<MenuProps>['items'][number];

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
  } as MenuItem;
}

const items: MenuProps['items'] = [
  getItem('Navigation One', 'sub1', <MailOutlined />, [
    getItem('Item 1', 'g1', null, [getItem('Option 1', '1'), getItem('Option 2', '2')], 'group'),
    getItem('Item 2', 'g2', null, [getItem('Option 3', '3'), getItem('Option 4', '4')], 'group'),
  ]),


  { type: 'divider' },

  getItem('Navigation Three', 'sub4', <SettingOutlined />, [
    getItem('Option 9', '9'),
    getItem('Option 10', '10'),
    getItem('Option 11', '11'),
    getItem('Option 12', '12'),
  ]),

  getItem('Group', 'grp', null, [getItem('Option 13', '13'), getItem('Option 14', '14')], 'group'),
];

const ProjectNav: React.FC = () => {
  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
  };

  return (
    // <Menu
    //   onClick={onClick}
    //   style={{ width: 256 }}
    //   defaultSelectedKeys={['1']}
    //   defaultOpenKeys={['sub1']}
    //   mode="inline"
    //   items={items}
    // />
    <ul>
          <li>
            <Link to={`/project/apiMgt`}>接口管理</Link>
          </li>
          <li>
            <Link to={`/project/memberMgt`}>成员/权限管理</Link>
          </li>
          <li>
            <Link to={`/project/projectMgt`}>项目管理</Link>
          </li>
        </ul>
  );
};

export default ProjectNav;