import React, { useEffect } from 'react'
import './index.less'
import { Outlet, Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { updateProjectId } from '@/store/modules/projectSlice'
import { RootState } from '@/store/index.ts'
import ProjectNav from '@/components/ProjectNav'
import { useNavigate } from 'react-router-dom'
import getCurrentRole from '@/api/getCurrentRole'
// import { setRole } from '@/store/modules/roleSlice'

const Project: React.FunctionComponent = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const state = useLocation().state
  const project_id = state.project_id?state.project_id:''

  useEffect(() => {
    console.log('当前project_id', project_id)
    getCurrentRole(project_id).then((res:any)=>{
      // res.data.code === 200 ? (dispatch(setRole(res.data.data.role)),navigate('/project/apiMgt', { state: { project_id: project_id } })) :  ''
    })
    
  }, [])
  return (
    <div className='project'>
      <div className='left'>
        <ProjectNav project_id={project_id} />
      </div>
      <div className='right'>
        <Outlet />
      </div>
    </div>
  )
}

export default Project
