import { Navigate } from 'react-router-dom'
import { useAuth } from '@/utils/useAuth'
import { LoadingOutlined } from '@ant-design/icons'
import { Spin } from 'antd'
import { ReactNode, useState, useEffect } from 'react'
import './AuthRoute.less'

interface AuthRouteProps {
  children: ReactNode
}
const AuthRoute = ({ children }: AuthRouteProps) => {
  const [isLogin, setIsLogin] = useState<any>(
    <div className='Spin-Style'>
      <Spin
        indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
        // tip='Loading'
        size='large'
      >
        <div className='block-box'>Loading</div>
      </Spin>
    </div>,
  )
  useEffect(() => {
    useAuth().then((result) => {
      return setIsLogin(result ? children : <Navigate to='/user/login' />)
    })
  }, [])
  return <div className='Router-Cpn'>{isLogin}</div>
}

export default AuthRoute
