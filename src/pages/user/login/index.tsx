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
import React,{useState} from 'react'
import { Button, Checkbox, Form, Input, Layout } from 'antd'
import HeaderNav from '@/components/HeaderNav'
import { Menu,message  } from 'antd';
import type { MenuProps } from 'antd';
import request from '@/api/request'

const { Header, Content } = Layout


type FieldType = {
  username?: string
  password?: string
  remember?: string
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
  const [current, setCurrent] = useState('login');

  const onClick: MenuProps['onClick'] = (e) => {
    setCurrent(e.key);
  }
  const onFinish = (values: any) => {
    
    current==='login'
    ?
    request.post('v1/user/login',{},values).then(res=>{
      res.data.code===200?messageApi.info('登录成功!'):messageApi.info('登录失败');
    })
    :
    (
    values.avatar_url='https://avatars.githubusercontent.com/u/19998011?v=4',
    request.post('v1/user/register',{},values).then(res=>{
      res.data.code===200?messageApi.info('注册成功!'):messageApi.info('注册失败');
    })
    )

  }
  
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  const [messageApi, contextHolder] = message.useMessage();
return(
  <>
    {contextHolder}
    <Header style={{backgroundColor:'#ffffff'}}>
      <HeaderNav ifHideUser={false}/>
    </Header>
    <Content style={{backgroundColor:'#fbf7ff'}}>
    <Menu
      onClick={onClick}
      style={{ width: '100%',backgroundColor:'#fbf7ff',justifyContent:'center' ,marginBottom:'20px'}}
      selectedKeys={[current]}
      mode="horizontal"
      items={items}
    />
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
          <Form.Item<FieldType>
          label="Username"
          name={current === 'login'?'log-username':'reg-username'}
          rules={[{ required: true, message: current === 'login'?'输入用户名或邮箱!':''}]}
        >
          <Input />
        </Form.Item>
        

        <Form.Item<FieldType>
          label="Password"
          name={current === 'login'?'log-password':'reg-password'}
          rules={[{ required: true, message: '输入密码!' }]}
        >
          <Input.Password />
        </Form.Item>
        
        {
          current === 'login'
          ?
          <Form.Item<FieldType>
          name="remember"
          valuePropName="checked"
          wrapperCol={{ offset: 8, span: 16 }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>
          :
          <>
          <Form.Item<FieldType>
          label="Email"
          name="email"
          rules={[{ required: true, message: '输入邮箱!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item<FieldType>
          label="Phone"
          name="phone"
          rules={[{ required: true, message: '输入手机号码!' }]}
        >
          <Input />
        </Form.Item>
        </>
        }
        

        <Form.Item wrapperCol={{ offset: 14, span: 16 }}>
          <Button type="primary" htmlType="submit">
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
