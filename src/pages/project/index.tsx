import React from 'react'
import './index.less'
import { Outlet, Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'

const Project: React.FunctionComponent = () => {
  const { id } = useParams()
  return (
    <>
      <ul>
        <li>
          <Link to={`/project/${id}/apiMgt`}>接口管理</Link>
        </li>
        <li>
          <Link to={`/project/${id}/memberMgt`}>成员/权限管理</Link>
        </li>
        <li>
          <Link to={`/project/${id}/projectMgt`}>项目管理</Link>
        </li>
      </ul>
      <Outlet />
    </>
  )
}

export default Project
