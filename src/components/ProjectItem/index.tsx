import React, { useEffect } from 'react'
import { Card, Image } from 'antd'
import { useNavigate } from 'react-router-dom'
const ProjectItem = (params: ProjectItemType) => {
  const navigate = useNavigate()
  // useEffect(() => {}, [])
  const toProject = () => {
    console.log('toProject')
    navigate('/project', { state: { project_id: params.project_id } })
  }
  return (
    <div onClick={toProject}>
      <Card title={params.name} style={{ width: 300 }}>
        <Image
          src={params.project_img ? params.project_img : null}
          preview={false}
          alt='项目图片'
        />
        <div>{params.dec}</div>
      </Card>
    </div>
  )
}
export default ProjectItem
