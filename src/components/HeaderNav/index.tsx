import { UserOutlined, GithubOutlined } from '@ant-design/icons'
import React from 'react'
import { Avatar } from 'antd'
import { Link } from 'react-router-dom'
import './index.less'

interface Props{
  ifHideUser?:boolean,
  userInfo:Object
}
const HeaderNav: React.FC<Props> = (props) => {
  // 默认值
  const {ifHideUser,userInfo}=props
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
        <div className='username'>{userInfo.username}</div>
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
              // icon={<UserOutlined />}
              src={userInfo.avatar_url}
            />
          </Link>
          </div>
            )
        }
      </div>
    </div>
  )
}
export default HeaderNav
