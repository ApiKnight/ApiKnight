import React from 'react'
import './index.less'

const User: React.FunctionComponent = () => {
  const username = localStorage.getItem('login_token')
  return <div>{username}的用户中心</div>
}

export default User
