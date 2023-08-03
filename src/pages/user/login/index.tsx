// Login
import React, { useRef } from 'react'
import { useNavigate } from 'react-router-dom'

const Login: React.FC = () => {
  const navigate = useNavigate()
  const usernameRef = useRef(null)

  const login = () => {
    if (usernameRef.current) {
      localStorage.setItem('login_token', usernameRef.current.value)
      navigate('/user', { replace: true })
    } else {
      alert('请输入用户名')
    }
  }
  return (
    <div>
      <input type='text' name='username' id='username' ref={usernameRef} />
      <button onClick={login}>登录</button>
    </div>
  )
}

export default Login
