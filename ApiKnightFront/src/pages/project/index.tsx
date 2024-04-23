/* eslint-disable */

import React, { useEffect } from 'react'
import './index.less'
import { Outlet } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import ProjectNav from '@/components/ProjectNav'
import { Navigate, useNavigate } from 'react-router-dom'
import getCurrentRole from '@/api/getCurrentRole'
import ApiTab from '@/components/ApiTab'
import getSelfInfo from '@/api/getSelfInfo'
import { useAppDispatch } from '@/store'
import { fetchProjectInfoAction } from '@/store/modules/project'
import { createAllMonitor } from '@/utils/monitor'

const Project: React.FunctionComponent = () => {
  const navigate = useNavigate()
  createAllMonitor().start()
  let project_id: number | string
  const state = useLocation().state
  // 获取project_id后更新projectReducer，统一存储
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(fetchProjectInfoAction(state.project_id))
  }, [dispatch])

  if (!state) {
    return <Navigate to='/' />
  } else {
    project_id = state.project_id ? state.project_id : ''
  }
  useEffect(() => {
    async function isAuth() {
      console.log(
        'token',
        localStorage.getItem('token'),
        'userid',
        localStorage.getItem('user_id'),
      )
      const { data } = await getSelfInfo()

      data.code === 200
        ? ''
        : (localStorage.setItem('token', ''),
          localStorage.setItem('user_id', ''))
      console.log('datacode', data.code === 200)

      return data.code === 200
    }

    isAuth().then((res) => {
      res === false
        ? navigate('/user/login')
        : getCurrentRole(project_id).then((res) => {
            console.log(res)
            navigate('/project/apiMgt', { state: { project_id: project_id } })
          })
    })
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
