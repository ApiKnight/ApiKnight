import React, { useEffect } from 'react'
import { Card, Image } from 'antd'
const { Meta } = Card
import { useNavigate } from 'react-router-dom'
const ProjectItem: React.FC<any> = (params) => {
  const navigate = useNavigate()
  const toProject = () => {
    console.log('toProject')
    navigate('/project', { state: { project_id: params.project_id } })
  }
  return (
    <div className='project-item' onClick={toProject}>
      <Card
        // title={params.name}
        className='project-item-card'
        style={{ width: 300 }}
        bodyStyle={{
          padding: '15px',
        }}
        cover={
          <Image
            src={params.project_img ? params.project_img : null}
            preview={false}
            width={'100%'}
            height={150}
            style={{ objectFit: 'cover', borderRadius: '8px' }}
            alt='项目图片'
          />
        }
      >
        <Meta title={params.name} description={params.dec} />
        {/* <div>{params.dec}</div> */}
      </Card>
    </div>
  )
}
export default ProjectItem
