// // Login
// import React, { useRef } from 'react'
// import { useNavigate } from 'react-router-dom'

// const Login: React.FC = () => {
//   const navigate = useNavigate()
//   const usernameRef = useRef(null)

//   const login = () => {
//     if (usernameRef.current) {
//       localStorage.setItem('login_token', usernameRef.current.value)
//       navigate('/user', { replace: true })
//     } else {
//       alert('请输入用户名')
//     }
//   }
//   return (
//     <div>
//       <input type='text' name='username' id='username' ref={usernameRef} />
//       <button onClick={login}>登录</button>
//     </div>
//   )
// }

// export default Login
import React, { useState } from 'react'
import { Button, Checkbox, Form, Input, Layout } from 'antd'
import HeaderNav from '@/components/HeaderNav'
import { Menu, message } from 'antd'
import type { MenuProps } from 'antd'
import request from '@/api/request'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import login from '@/api/login'

const { Header, Content } = Layout

type LoginType = {
  usernameOrEmail: string
  password: string
  remember: string
}
interface RegisterType {
  username: string
  password: string
  email: string
  phone: string
  avatar_url: string
}
const items: MenuProps['items'] = [
  {
    label: '注册',
    key: 'register',
    // icon: <MailOutlined />,
  },
  {
    label: '登录',
    key: 'login',
    // icon: <AppstoreOutlined />,
  },
]

const Login: React.FC = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [current, setCurrent] = useState('login')

  const onClick: MenuProps['onClick'] = (e) => {
    setCurrent(e.key)
  }
  const onFinish = (values: any) => {
    let loginData: LoginType
    let registerData: RegisterType
    current === 'login'
      ? ((loginData = {
          usernameOrEmail: values.log_username,
          password: values.log_password,
          remember: values.remember,
        }),
        login(loginData).then(
          (res) => {
            res.data.code === 200
              ? (messageApi.info('登录成功!'),
                localStorage.setItem('token', res.data.data.token),
                localStorage.setItem('user_id', res.data.data.user.id),
                setTimeout(() => {
                  navigate('/')
                }, 1200))
              : messageApi.info('登录失败')
          },
          (err) => {
            messageApi.info('请求失败', err)
          },
        ))
      : ((registerData = {
          username: values.reg_username,
          password: values.reg_password,
          avatar_url: 'https://avatars.githubusercontent.com/u/19998011?v=4',
          email: values.email,
          phone: values.phone,
        }),
        request.post('v1/user/checkExist', registerData, {}).then((res) => {
          if (res.data.code === 200) {
            request.post('v1/user/register', registerData, {}).then((res1) => {
              res1.data.code === 200 ? messageApi.info('注册成功') : ''
            })
          } else {
            messageApi.info('用户名或邮箱已被注册')
          }
        }))
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  const [messageApi, contextHolder] = message.useMessage()
  return (
    <>
      {contextHolder}
      <Header style={{ backgroundColor: '#ffffff' }}>
        <HeaderNav ifHideUser={false} />
      </Header>
      <Content style={{ backgroundColor: '#fbf7ff' }}>
        <Menu
          onClick={onClick}
          style={{
            width: '100%',
            backgroundColor: '#fbf7ff',
            justifyContent: 'center',
            marginBottom: '20px',
          }}
          selectedKeys={[current]}
          mode='horizontal'
          items={items}
        />
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
          <Form.Item<LoginType>
            label={current === 'login' ? '用户名或邮箱' : '用户名'}
            name={current === 'login' ? 'log_username' : 'reg_username'}
            rules={[
              {
                required: true,
                message:
                  current === 'login' ? '输入用户名或邮箱!' : '输入用户名!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item<LoginType>
            label='密码'
            name={current === 'login' ? 'log_password' : 'reg_password'}
            rules={[{ required: true, message: '输入密码!' }]}
          >
            <Input.Password />
          </Form.Item>

          {current === 'login' ? (
            <Form.Item<LoginType>
              name='remember'
              valuePropName='checked'
              wrapperCol={{ offset: 8, span: 16 }}
            >
              <Checkbox>下次自动登录</Checkbox>
            </Form.Item>
          ) : (
            <>
              <Form.Item<LoginType>
                label='邮箱'
                name='email'
                rules={[{ required: true, message: '输入邮箱!' }]}
              >
                <Input />
              </Form.Item>
              <Form.Item<LoginType>
                label='手机号'
                name='phone'
                rules={[{ required: true, message: '输入手机号码!' }]}
              >
                <Input />
              </Form.Item>
            </>
          )}

          <Form.Item wrapperCol={{ offset: 14, span: 16 }}>
            <Button type='primary' htmlType='submit'>
              {/* {current==='login'?'登录':'注册'} */}
              提交
            </Button>
          </Form.Item>
        </Form>
      </Content>
    </>
  )
}

export default Login
