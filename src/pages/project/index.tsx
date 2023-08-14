import React,{useEffect} from 'react'
import './index.less'
import { Outlet, Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux'
import { updateProjectId } from '@/store/modules/projectSlice'
import { RootState } from '@/store/index.ts'
import ProjectNav from '@/components/ProjectNav'
const Project: React.FunctionComponent = () => {
  const dispatch = useDispatch()
  const state = useLocation().state
  
  useEffect(()=>{
    if(state && state.project_id){
      let project_id=state.project_id
      console.log('当前project_id',project_id);
      dispatch(updateProjectId({ project_id: project_id }))
    }
  },[])
  return (
    <>
      <ProjectNav />
      <Outlet />
    </>
  )
}

export default Project
