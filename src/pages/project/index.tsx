import React, { useEffect } from 'react'
import './index.less'
import { Outlet, Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { updateProjectId } from '@/store/modules/projectSlice'
import { RootState } from '@/store/index.ts'
import ProjectNav from '@/components/ProjectNav'
import { useNavigate } from 'react-router-dom'
import UserInfo from '@/components/UserInfo'
import { Button } from 'antd'
import { setValue } from '@/store/modules/userInfoSlice'

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
  const dispatch = useDispatch()
  const userInfoSlice = useSelector(
    (state: RootState) => state.userInfoSlice.value,
  )
  function showUserInfo() {
    dispatch(setValue(true))
  }
  return (
    <div className='project'>
      <Button onClick={showUserInfo}>个人</Button>
      {userInfoSlice && <UserInfo />}
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
