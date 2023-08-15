import { UserOutlined, GithubOutlined } from '@ant-design/icons'
import React from 'react'
import { Avatar } from 'antd'
import { Link } from 'react-router-dom'
import './index.less'

interface Props {
  ifHideUser?: boolean
  user_info?: Object
}
const HeaderNav: React.FC<Props> = (props) => {
  // localStorage.setItem('token','')
  // localStorage.setItem('user_id','')
  let { ifHideUser, user_info } = props

  // 默认值
  ifHideUser ? '' : (ifHideUser = false)
  user_info ? '' : (user_info = {})
  return (
    // left
    <div className='header-nav'>
      <div className='left'>
        <div className='title'>
          <i>ApiKnight</i>
        </div>
      </div>

      {/* right */}
      <div className='right'>
        <div className='github'>
          <div className='url'>
            <a href='https://github.com/ApiKnight' target='_blank'>
              <Avatar
                size={54}
                style={{ backgroundColor: 'black' }}
                icon={<GithubOutlined />}
                // src={user_info.avatar_url}
              />
            </a>
          </div>
        </div>
        {ifHideUser ? (
          ''
        ) : (
          <div className='user'>
            <Link
              to='/user'
              state={{ user_id: localStorage.getItem('user_id') }}
            >
              <Avatar
                size={54}
                style={{ backgroundColor: 'black', marginLeft: '10px' }}
                icon={user_info.avatar_url ? '' : <UserOutlined />}
                src={user_info.avatar_url ? user_info.avatar_url : null}
              />
              <div className='username'>
                {user_info.username ? user_info.username : null}
              </div>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
export default HeaderNav
