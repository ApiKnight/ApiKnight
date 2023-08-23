import React, { useEffect } from 'react'
import './index.less'
import { Outlet, Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import ProjectNav from '@/components/ProjectNav'
import { useNavigate } from 'react-router-dom'
import getCurrentRole from '@/api/getCurrentRole'
// import { setRole } from '@/store/modules/roleSlice'
import ApiTab from '@/components/ApiTab'
import './index.less'

const Project: React.FunctionComponent = () => {
  const navigate = useNavigate()
  const state = useLocation().state
  const project_id = state.project_id ? state.project_id : ''

  useEffect(() => {
    console.log('当前project_id', project_id)
    getCurrentRole(project_id).then((res: any) => {
      res.data.code === 200 ? navigate('/project/apiMgt', { state: { project_id: project_id } }) : ''
      // res.data.code === 200 ? (dispatch(setRole(res.data.data.role)),navigate('/project/apiMgt', { state: { project_id: project_id } })) :  ''
    })
  }, [])

  return (
    <div className='project-wrap'>
      <ApiTab />
      <div className='project'>
        <div className='left'>
          <ProjectNav project_id={project_id} />
        </div>
        <div className='right'>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Project
