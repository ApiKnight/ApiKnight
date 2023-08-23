import { Navigate } from 'react-router-dom'
import { useAuth } from '@/utils/useAuth'
import { Spin } from 'antd'
import { ReactNode, useState, useEffect, useLayoutEffect } from 'react'
import ReactDOM from 'react-dom';
import "./AuthRoute.less"

interface AuthRouteProps {
  children: ReactNode
}
const AuthRoute = ({ children }: AuthRouteProps) => {
  const [isLogin, setIsLogin] = useState<any>(
        <div className='Spin-Style'>
          <Spin tip='Loading' size='large'>
                <div className='content' />
          </Spin>
        </div>
  )
  useEffect(() => {
    useAuth().then((result) => {
      console.log('result',result);
      
      return setIsLogin(result ? children : <Navigate to='/user/login' />)
    })
  }, [])
  return <div>{isLogin}</div>
}

export default AuthRoute
