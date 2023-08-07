import React from 'react'
import { Card, Image } from 'antd'
import { Link } from 'react-router-dom'

const ProjectItem = (params: ProjectItemType) => {
  return (
    <Link to={`/project/${params.id}`}>
      <Card title={params.name} style={{ width: 300}}>
        <Image
          width={200}
          src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
          preview={false}
        />
      </Card>
    </Link>
  )
}
export default ProjectItem
