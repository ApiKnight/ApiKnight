import { Navigate } from 'react-router-dom'
import { isAuth } from '@/utils/isAuth'
import { LoadingOutlined } from '@ant-design/icons'
import { Spin } from 'antd'
import { ReactNode, useState, useEffect } from 'react'
import './AuthRoute.less'

interface AuthRouteProps {
  children: ReactNode
}
const AuthRoute = ({ children }: AuthRouteProps) => {
  const [loginResult, setLoginResult] = useState<ReactNode>(
    <div className='Spin-Style'>
      <Spin
        indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
        // tip='Loading'
        size='large'>
        <div className='block-box'>Loading</div>
      </Spin>
    </div>,
  )
  useEffect(() => {
    isAuth().then((result) => {
      return setLoginResult(result ? children : <Navigate to='/user/login' />)
    })
  }, [])
  return <div className='Router-Cpn'>{loginResult}</div>
}

export default AuthRoute
