import React from 'react'
import { Button, Card, Image } from 'antd'
const { Meta } = Card
import { useNavigate } from 'react-router-dom'
import { DeleteOutlined } from '@ant-design/icons'
import './index.less'
import delProject from '@/api/delProject'

interface ParamsType {
  project_id: string
  project_img: string
  dec: string
  name: string
  updateUserInfo: () => void
}
const ProjectItem: React.FC<ParamsType> = (params) => {
  async function deleteProject(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation()
    await delProject(params.project_id)
    params.updateUserInfo()
  }
  const navigate = useNavigate()
  const toProject = () => {
    console.log('toProject')
    navigate('/project', { state: { project_id: params.project_id } })
  }
  return (
    <div className='project-item' onClick={toProject}>
      <Card
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
        }>
        <div className='project-item__title'>
          <Meta title={params.name} description={params.dec} />
          <Button
            data-testid={params.name}
            icon={<DeleteOutlined style={{ fontSize: '20px', color: 'red' }} />}
            className='menu'
            onClick={deleteProject}
          />
        </div>
      </Card>
    </div>
  )
}
export default ProjectItem
