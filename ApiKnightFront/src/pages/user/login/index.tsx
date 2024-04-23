import React, { useState, useEffect } from 'react'
import { Layout, App } from 'antd'
import HeaderNav from '@/components/HeaderNav'
import { message } from 'antd'
import request from '@/api/request'
import { useNavigate } from 'react-router-dom'
import login from '@/api/login'
import randomNum from '@/utils/randomNum'
const { Content } = Layout
import './index.less'
import type { LoginType } from '@/api/loginType'
import { E } from '@/types/base'

interface RegisterType {
  username: string
  password: string
  email: string
  phone: string
  avatar_url: string
}
type LoginState = 'Login' | 'Regist'

const Login: React.FC = () => {
  const navigate = useNavigate()
  /**
   * 生成[min,max)区间的随机整数
   * @param min 最小值
   * @param max 最大值
   * @returns
   */
  const [loginState, setLoginState] = useState<LoginState>('Login')
  const [loginUserName, setLoginUsername] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [registUserName, setRegistUserNamed] = useState('')
  const [registPassword, setRegistPassword] = useState('')
  const [registEmail, setRegistEmail] = useState('')
  const [registPhone, setRegistPhone] = useState('')
  function changeSetLoginUsername(e: E): void {
    setLoginUsername(e.target.value)
  }
  function changeSetLoginPassword(e: E): void {
    setLoginPassword(e.target.value)
  }
  function changeSetRegistUserNamed(e: E): void {
    setRegistUserNamed(e.target.value)
  }
  function changeSetRegistPassword(e: E): void {
    setRegistPassword(e.target.value)
  }
  function changeSetRegistEmail(e: E): void {
    setRegistEmail(e.target.value)
  }
  function changeSetRegistPhone(e: E): void {
    setRegistPhone(e.target.value)
  }
  const onFinish = () => {
    let loginData: LoginType
    let registerData: RegisterType
    loginState === 'Login'
      ? ((loginData = {
          usernameOrEmail: loginUserName,
          password: loginPassword,
        }),
        login(loginData).then(
          (res) => {
            res.data.code === 200
              ? (message.success('登录成功'),
                localStorage.setItem('token', res.data.data.token),
                localStorage.setItem('user_id', res.data.data.user.id),
                setTimeout(() => {
                  navigate('/')
                }, 1200))
              : message.error('登录失败')
          },
          (err) => {
            message.error('请求失败', err)
          },
        ))
      : ((registerData = {
          username: registUserName,
          password: registPassword,
          avatar_url: `${window.location.origin}/images/avatar${randomNum(
            1,
            6,
          )}.jpg`,
          email: registEmail,
          phone: registPhone,
        }),
        request.post('v1/user/checkExist', registerData, {}).then((res) => {
          if (res.data.code === 200) {
            request.post('v1/user/register', registerData, {}).then((res1) => {
              res1.data.code === 200 ? message.success('注册成功') : ''
            })
          } else {
            message.error('用户名或邮箱已被注册')
          }
        }))
  }

  const handleSignUpClick = () => {
    onFinish()
  }

  useEffect(() => {
    const container = document.getElementsByClassName('container')[0]
    const signIn = document.getElementById('sign-in')
    const signUp = document.getElementById('sign-up')

    signUp.onclick = function () {
      container.classList.add('active')
      setLoginState('Regist')
    }
    signIn.onclick = function () {
      container.classList.remove('active')
      setLoginState('Login')
    }
  }, [])

  return (
    <App>
      <HeaderNav ifHideUser={false} />
      <Content style={{ height: '89vh', width: '96vw' }}>
        <div className='login'>
          <div className='container'>
            <div className='form-container sign-up-container'>
              <div className='form'>
                <h2>sign up</h2>
                <input
                  type='text'
                  name='username'
                  placeholder='用户名'
                  data-testid='sign-up-username'
                  value={registUserName}
                  onChange={changeSetRegistUserNamed}
                />
                <input
                  type='password'
                  name='password'
                  data-testid='sign-up-password'
                  placeholder='密码'
                  value={registPassword}
                  onChange={changeSetRegistPassword}
                />
                <input
                  type='email'
                  name='email'
                  placeholder='邮箱'
                  data-testid='sign-up-email'
                  value={registEmail}
                  onChange={changeSetRegistEmail}
                />
                <input
                  type='phone'
                  name='phone'
                  placeholder='手机号'
                  data-testid='sign-up-phone'
                  value={registPhone}
                  onChange={changeSetRegistPhone}
                />
                <button
                  className='signUp'
                  onClick={handleSignUpClick}
                  data-testid='signUp'>
                  注册
                </button>
              </div>
            </div>
            <div className='form-container sign-in-container'>
              <div className='form'>
                <h2>sign in</h2>
                <input
                  type='email'
                  name='email'
                  placeholder='邮箱/手机号/用户名'
                  value={loginUserName}
                  onChange={changeSetLoginUsername}
                />
                <input
                  type='password'
                  name='password'
                  placeholder='密码'
                  data-testid='sign-in-password'
                  value={loginPassword}
                  onChange={changeSetLoginPassword}
                />
                <button
                  className='signIn'
                  onClick={handleSignUpClick}
                  data-testid='signIn'>
                  登录
                </button>
              </div>
            </div>
            <div className='overlay_container'>
              <div className='overlay'>
                <div className='overlay_panel overlay_left_container'>
                  <h2>welcome back!</h2>
                  <p>你还没有新账号呢？注册一个吧！</p>
                  <button id='sign-in'>登录</button>
                </div>
                <div className='overlay_panel overlay_right_container'>
                  <h2>hello friend!</h2>
                  <p>加入我们一起参加ApiKnight的体验吧</p>
                  <button id='sign-up'>注册</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Content>
    </App>
  )
}

export default Login
