import React, { useState } from 'react'
import { Button, Checkbox, Form, Input, Modal } from 'antd'
import './index.less'
import request from '@/api/request'
import randomNum from '@/utils/randomNum'
import type { childProps } from './type'

const UpdateProject: React.FC<childProps> = (props) => {
  const { isModalOpen, closeModal, updateUserInfo, user_id } = props

  const onFinish = (values: any) => {
    values.project_img = `${window.location.origin}/images/project${randomNum(
      1,
      10,
    )}.jpg`
    request.post('v1/project/create', values, {}).then(() => {
      updateUserInfo(user_id)
      closeModal()
    })
  }

  const onFinishFailed = (errorInfo: any) => {}
  return (
    <Modal
      title='创建新项目'
      open={isModalOpen}
      onCancel={() => {
        props.closeModal()
      }}
      footer={null}>
      <Form
        name='basic'
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
        className='create-project-form'
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete='off'>
        <Form.Item<any>
          label='项目名称'
          name='projectname'
          style={{ width: '100%' }}
          rules={[{ required: true, message: '请输入项目名称!' }]}>
          <Input />
        </Form.Item>

        <Form.Item<any>
          label='项目描述'
          name='description'
          style={{ width: '100%' }}
          labelAlign='left'
          rules={[{ required: true, message: '请输入项目描述!' }]}>
          <Input />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button
            type='primary'
            htmlType='submit'
            style={{ marginRight: '10px' }}>
            确定
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default UpdateProject
