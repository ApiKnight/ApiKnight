import { Navigate } from 'react-router-dom'
import { useAuth } from '@/utils/useAuth'

import {ReactNode, useState, useEffect, useLayoutEffect} from 'react'

interface AuthRouteProps {
  children: ReactNode
}
const AuthRoute = ({ children }: AuthRouteProps) => {
  async function run() {
    const auth = await useAuth().then((result)=>{
      return result;
    })
    if(auth === false){
      return false;
    }else{
      return true;
    }
  }
  console.log(run().then((result)=>{
    console.log(result)
  }))
  const [isLogin,setIsLogin] = useState(<div>Loading</div>);
  run().then((res)=>{
    return setIsLogin(res ? children : <Navigate to="/user/login" state={{user_id:localStorage.getItem('user_id')}}/>)
  })
  return <div>
    { isLogin }
  </div>
}

export default AuthRoute
