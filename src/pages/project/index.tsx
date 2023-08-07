import React from 'react'
import './index.less'
import { Outlet, Link } from 'react-router-dom'
import RenderTree from '@/components/RenderTree'
const Project: React.FunctionComponent = () => {
  // eval()
  const data = [
    { key: 1, title: { key: 1, title: "接口目录1", pid: 0 , type: "file" } , type: "file", pid: 0 },
    { key: 2, title: { key: 2, title: "接口目录2", pid: 1 , type: "file" }, type: "file", pid: 1 },
  ];
  return (
    <>
      <div>
        <div>具体项目</div>
        <ul>
          <li>
            <Link to='/project/apiMgt'>接口管理</Link>
          </li>
          <li>
            <Link to='/project/memberMgt'>成员/权限管理</Link>
          </li>
          <li>
            <Link to='/project/memberMgt'>项目管理</Link>
          </li>
        </ul>
        <Outlet />
        <RenderTree data={data}></RenderTree>
      </div>
    </>
  )
}

export default Project
