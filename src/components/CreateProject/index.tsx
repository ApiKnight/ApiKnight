import React, { useState } from 'react'
import { Button, Checkbox, Form, Input, Modal } from 'antd'
import './index.less'
import request from '@/api/request'

type FieldType = {
  username?: string
  password?: string
  remember?: string
}

interface childProps {
  isModalOpen: boolean
  closeModal: Function
  getUserInfo: Function
}

const UpdateProject: React.FC<childProps> = (props) => {
  const { isModalOpen, closeModal, getUserInfo } = props
  const onFinish = (values: any) => {
    request.post('v1/project/create', values, {}).then(() => {
      getUserInfo()
      closeModal()
    })
  }

  const onFinishFailed = (errorInfo: any) => {
    // closeModal()
  }

  // const showModal = () => {
  //   setIsModalOpen(true);
  // };

  // const handleOk = () => {
  //   setIsModalOpen(false);
  // };

  // const handleCancel = () => {
  //   setIsModalOpen(false);
  // };
  return (
    // onOk={handleOk} onCancel={handleCancel}
    <Modal
      title='创建新项目'
      open={isModalOpen}
      onCancel={() => {
        props.closeModal()
      }}
      footer={null}
    >
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
        <Form.Item<FieldType>
          label='项目名称'
          name='projectname'
          rules={[{ required: true, message: '请输入项目名称!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label='项目描述'
          name='description'
          rules={[{ required: true, message: '请输入项目描述!' }]}
        >
          <Input />
        </Form.Item>

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
    </Modal>
  )
}

export default UpdateProject
