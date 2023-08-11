import React, { useEffect } from 'react'
import { Card, Image } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { updateProjectId } from '@/store/modules/projectSlice'

const ProjectItem = (params: ProjectItemType) => {
  const dispatch = useDispatch()
  useEffect(() => {}, [])
  const navigate = useNavigate()
  const toProject = () => {
    console.log(params.projectId)
    dispatch(updateProjectId({ projectId: params.projectId }))
    navigate('/project', { state: { projectId: params.projectId } })
  }

  return (
    <div onClick={toProject}>
      <Card title={params.name} style={{ width: 300 }}>
        <Image
          width={200}
          src='https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
          preview={false}
        />
        <div>{params.dec}</div>
      </Card>
    </div>
  )
}
export default ProjectItem
