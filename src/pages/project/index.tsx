import React from 'react'
import './index.less'
import { Outlet, Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/index.ts'
import ProjectNav from '@/components/ProjectNav'
const Project: React.FunctionComponent = () => {
  // const {project_id} =useLocation().state
  // console.log('State:project_id',project_id);
  
  const project_id = useSelector((state: RootState) => state.project.project_id)
  console.log('redux-project_id:', project_id)
  return (
    <>
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
      <Outlet />
    </>
  )
}

export default Project
