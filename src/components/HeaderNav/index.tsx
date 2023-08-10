import { UserOutlined, GithubOutlined } from '@ant-design/icons'
import React from 'react'
import { Avatar } from 'antd'
import { Link } from 'react-router-dom'
import './index.less'

interface Props{
  ifHideUser?:boolean,
  userInfo?:Object
}
const HeaderNav: React.FC<Props> = (props) => {
  // localStorage.setItem('token','')
  // localStorage.setItem('user_id','')
  let {ifHideUser,userInfo}=props

  // 默认值
  ifHideUser?'':ifHideUser=false
  userInfo?'':userInfo={}
  return (
    // left
    <div className="header-nav">
      <div className="left">
        <div className="title">
          <i>ApiKnight</i>
        </div>
      </div>

      {/* right */}
      <div className="right">
        <div className="github">
          <div className="url">
        <a href="https://github.com/ApiKnight" target="_blank">
          <Avatar
            size={54}
            style={{ backgroundColor: 'black' }}
            icon={<GithubOutlined />}
            // src={userInfo.avatar_url}
          />
        </a>
        </div>
        </div>
        {
          ifHideUser
          ?
          ''
          :
          (
            <div className="user">
            <Link to="/user">
            <Avatar
              size={54}
              style={{ backgroundColor: 'black', marginLeft: '10px' }}
              icon={userInfo.avatar_url?'':<UserOutlined />}
              src={userInfo.avatar_url?userInfo.avatar_url:null}
            />
        <div className='username'>{userInfo.username?userInfo.username:null}</div>
          </Link>
          </div>
            )
        }
      </div>
    </div>
  )
}
export default HeaderNav
