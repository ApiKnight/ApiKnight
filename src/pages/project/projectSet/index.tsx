import React, { useState, useEffect } from 'react'
import { Button, Form, Input } from 'antd'
import './index.less'
import getProjectBase from '@/api/getProjectBase'
import updateProject from '@/api/updateProject'
import type { RootState } from '@/store/index.ts'
import { useSelector } from 'react-redux'
import { message } from 'antd'
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
  const [messageApi, contextHolder] = message.useMessage()
  const project_id = useSelector((state: RootState) => state.project.project_id)
  const [projectInfo, setProjectInfo] = useState({})

  const onFinish = (values: any) => {
    values.projectid = project_id
    console.log(values)
    updateProject(values).then((res) => {
      res.data.code === 200
        ? messageApi.info('修改成功')
        : messageApi.info('修改失败')
    })
  }

  const onFinishFailed = (errorInfo: any) => {
    // closeModal()
  }
  useEffect(() => {
    getProjectBase(project_id).then((res) => {
      console.log(res.data.data)
      setProjectInfo(res.data.data)
      // res.data.code === 200 ? setProjectInfo(res.data.data) : ''
    })
  }, [])
  return (
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
  )
}

export default ProjectSet
