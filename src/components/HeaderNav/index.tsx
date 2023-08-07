import { UserOutlined, GithubOutlined } from '@ant-design/icons'
import React from 'react'
import { Avatar } from 'antd'
import { Link } from 'react-router-dom'
import './index.less'

interface Props{
  ifHideUser?:boolean
}
const HeaderNav: React.FC<Props> = (props) => {
  // 默认值
  const {ifHideUser}=props
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
        <a href="https://github.com/ApiKnight" target="_blank">
          <Avatar
            size={54}
            style={{ backgroundColor: 'black' }}
            icon={<GithubOutlined />}
          />
        </a>
        {
          ifHideUser
          ?
          ''
          :
          (
            <Link to="/user">
            <Avatar
              size={54}
              style={{ backgroundColor: 'black', marginLeft: '10px' }}
              icon={<UserOutlined />}
            />
          </Link>
            )
        }
      </div>
    </div>
  )
}
export default HeaderNav
