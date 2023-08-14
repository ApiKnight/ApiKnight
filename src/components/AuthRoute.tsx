import { Navigate } from 'react-router-dom'
import { useAuth } from '../utils/useAuth'

import { ReactNode,useState,useEffect } from 'react'

interface AuthRouteProps {
  children: ReactNode
}
const AuthRoute = ({ children }: AuthRouteProps) => {
  const auth = useAuth()
  const [isLogin,setIsLogin] = useState(false)
  useEffect(()=>{
    console.log(auth);
    if(auth === false){
      setIsLogin(false)
    }else{
      auth.then(res=>{
        console.log('auth',res);
        setIsLogin(true)
        // res ? setIsLogin(true) : setIsLogin(false)
        res ? console.log('成功') : console.log('失败');
        
        
      })
    }
  },[])
  useEffect(()=>{
    console.log('state')
  })
  console.log('isLogin',isLogin);
  return isLogin ? children : <Navigate to="/user/login" state={{user_id:localStorage.getItem('user_id')}}/>
}

export default AuthRoute
