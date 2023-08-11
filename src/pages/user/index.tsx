import React, { useEffect, useState } from 'react'
import './index.less'
import HeaderNav from '@/components/HeaderNav'
import getUserInfo from '@/api/getUserInfo'

const User = () => {
  const [userInfo, setUserInfo] = useState({})
  useEffect(() => {
    getUserInfo(localStorage.getItem('user_id')).then((res) => {
      let data = res.data.data
      setUserInfo(data)
    })
  }, [])
  return (
    <div className='user'>
      个人中心
      <div className='user_id'>用户id：{userInfo.id}</div>
      <div className='username'>用户名：{userInfo.username}</div>
      <div className='avatar'>头像路径：{userInfo.avatar_url}</div>
      <div className='phone'>手机号：{userInfo.phone}</div>
      <div className='phone'>邮箱：{userInfo.email}</div>
    </div>
  )
}

export default User
