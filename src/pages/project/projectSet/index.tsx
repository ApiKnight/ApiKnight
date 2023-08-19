import React, { useState, useEffect } from 'react'
import { Button, Form, Input, message, Popconfirm } from 'antd'
import './index.less'
import getProjectBase from '@/api/getProjectBase'
import updateProject from '@/api/updateProject'
import type { RootState } from '@/store/index.ts'
import { useSelector } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'
import delProject from '@/api/delProject'

type FieldType = {
  username?: string
  password?: string
  remember?: string
}

interface childProps {
  isModalOpen: boolean
  closeModal: Function
  getUserInfo: Function
  user_id: string
}

const ProjectSet: React.FC<childProps> = () => {
  const navigate = useNavigate()
  // const project_id = useSelector((state: RootState) => state.project.project_id)
  const { project_id } = useLocation().state
  const [projectInfo, setProjectInfo] = useState({})

  const onFinish = (values: any) => {
    values.projectid = project_id
    console.log(values)
    updateProject(values).then((res) => {
      res.data.code === 200
        ? message.success('修改成功')
        : message.error('修改失败')
    })
  }

  const onFinishFailed = (errorInfo: any) => {
    // closeModal()
  }

  const deleteProject = () => {
    delProject(project_id).then((res) => {
      res.data.code === 200
        ? (message.success('删除成功'),
          navigate('/user', {
            state: { user_id: localStorage.getItem('user_id') },
          }))
        : message.error('删除失败')
    })
  }
  const confirm = (e: React.MouseEvent<HTMLElement>) => {
    deleteProject()
  }

  const cancel = (e: React.MouseEvent<HTMLElement>) => {}

  useEffect(() => {
    getProjectBase(project_id).then((res) => {
      res.data.code === 200 ? setProjectInfo(res.data.data) : ''
    })
  }, [])

  return (
    <div className='project-set'>
      <div className='form'>
        <Form
          name='basic'
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete='off'
        >
          {projectInfo.description ? (
            <Form.Item<FieldType>
              label='项目名称'
              name='projectname'
              rules={[{ required: true, message: '请输入项目名称!' }]}
              initialValue={projectInfo.projectname}
            >
              <Input />
            </Form.Item>
          ) : (
            ''
          )}

          {projectInfo.description ? (
            <Form.Item<FieldType>
              label='项目描述'
              name='description'
              rules={[{ required: true, message: '请输入项目描述!' }]}
              initialValue={projectInfo.description}
            >
              <Input />
            </Form.Item>
          ) : (
            ''
          )}

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button
              type='primary'
              htmlType='submit'
              style={{ marginRight: '10px' }}
            >
              确定
            </Button>
          </Form.Item>
        </Form>
        <div className='delete'>
          <Popconfirm
            title='谨慎操作！'
            description='确定删除本项目吗?'
            onConfirm={confirm}
            onCancel={cancel}
            okText='确定'
            cancelText='取消'
          >
            <Button danger>删除项目</Button>
          </Popconfirm>
        </div>
      </div>
    </div>
  )
}

export default ProjectSet
