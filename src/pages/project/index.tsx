import React from 'react'
import './index.less'
import { Outlet, Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/index.ts'
import ProjectNav from '@/components/ProjectNav'
const Project: React.FunctionComponent = () => {
  // const {projectId} =useLocation().state
  // console.log('State:projectId',projectId);
  
  const projectId = useSelector((state: RootState) => state.project.projectId)
  console.log('redux-projectId:', projectId)
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
