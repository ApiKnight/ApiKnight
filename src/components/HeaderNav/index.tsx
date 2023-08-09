import { UserOutlined, GithubOutlined } from '@ant-design/icons'
import React from 'react'
import { Avatar } from 'antd'
import { Link } from 'react-router-dom'
import './index.less'

const HeaderNav: React.FC = () => {
  return (
    <div className='headerNav'>
      <a href='https://github.com/ApiKnight' target='_blank'>
        <Avatar
          size={54}
          style={{ backgroundColor: 'black' }}
          icon={<GithubOutlined />}
        />
      </a>
      <Link to='/user'>
        <Avatar
          size={54}
          style={{ backgroundColor: 'black', marginLeft: '10px' }}
          icon={<UserOutlined />}
        />
      </Link>
    </div>
  )
}
export default HeaderNav
