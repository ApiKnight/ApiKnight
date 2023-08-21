import React, { useEffect } from 'react'
import './index.less'
import { Outlet, Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import ProjectNav from '@/components/ProjectNav'
import { useNavigate } from 'react-router-dom'
import ApiTab from '@/components/ApiTab'

const Project: React.FunctionComponent = () => {
  const navigate = useNavigate()
  // const dispatch = useDispatch()
  const state = useLocation().state
  const project_id = state.project_id
  useEffect(() => {
    if (state && state.project_id) {
      console.log('当前project_id', project_id)
      // dispatch(updateProjectId({ project_id: project_id }))
    }
    navigate('/project/apiMgt', { state: { project_id: project_id } })
  }, [])
  
  return (
    <>
      <ApiTab/>
      <div className='project'>
      <div className='left'>
        <ProjectNav project_id={project_id} />
      </div>
      <div className='right'>
        <Outlet />
      </div>
    </div>
    </>
  )
}

export default Project
