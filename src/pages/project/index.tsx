import React, { useEffect } from 'react'
import './index.less'
import { Outlet, Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import ProjectNav from '@/components/ProjectNav'
import { Navigate, useNavigate } from 'react-router-dom'
import getCurrentRole from '@/api/getCurrentRole'
import ApiTab from '@/components/ApiTab'
import './index.less'
import getSelfInfo from '@/api/getSelfInfo'

const Project: React.FunctionComponent = () => {
  const navigate = useNavigate()
  let project_id
  const state = useLocation().state
  if (!state) {
    return <Navigate to='/' />
  } else {
    project_id = state.project_id ? state.project_id : ''
  }
  useEffect(() => {
    async function useAuth() {
      console.log(
        'token',
        localStorage.getItem('token'),
        'userid',
        localStorage.getItem('user_id'),
      )
      var { data } = await getSelfInfo()

      data.code === 200
        ? ''
        : (localStorage.setItem('token', ''),
          localStorage.setItem('user_id', ''))
      console.log('datacode', data.code === 200)

      return data.code === 200
    }

    useAuth().then((res) => {
      res === false
        ? navigate('/user/login')
        : getCurrentRole(project_id).then((res: any) => {
            navigate('/project/apiMgt', { state: { project_id: project_id } })
          })
    })

    // console.log('当前project_id', project_id)
    // getCurrentRole(project_id).then((res: any) => {
    //   navigate('/project/apiMgt', { state: { project_id: project_id } })
    // })
  }, [])

  return (
    <div className='project-wrap'>
      <ApiTab />
      <div className='project'>
        <div className='left'>
          <ProjectNav project_id={project_id ? project_id : ''} />
        </div>
        <div className='right'>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Project
