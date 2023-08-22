import { Navigate } from 'react-router-dom'
import { useAuth } from '@/utils/useAuth'

import { ReactNode, useState, useEffect, useLayoutEffect } from 'react'

interface AuthRouteProps {
  children: ReactNode
}
const AuthRoute = ({ children }: AuthRouteProps) => {
  const [isLogin, setIsLogin] = useState<any>(<div>Loading</div>)
  useEffect(() => {
    useAuth().then((result) => {
      console.log('result',result);
      
      return setIsLogin(result ? children : <Navigate to='/user/login' />)
    })
  }, [])
  return <div>{isLogin}</div>
}

export default AuthRoute
