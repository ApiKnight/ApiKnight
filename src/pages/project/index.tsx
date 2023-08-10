import React from 'react'
import './index.less'
import { Outlet, Link } from 'react-router-dom'
import {useLocation} from 'react-router-dom'
import {useSelector} from 'react-redux'
import { RootState } from '@/store/index.ts'
import ProjectNav from '@/components/ProjectNav'
const Project: React.FunctionComponent = () => {
  // const {projectId} =useLocation().state
  // console.log('State:projectId',projectId);
  
  const projectId = useSelector((state: RootState) => state.project.projectId)
  console.log('redux-projectId:',projectId);
  return (
    <>
    <ProjectNav />
        
        <Outlet />
    </>
  )
}

export default Project
