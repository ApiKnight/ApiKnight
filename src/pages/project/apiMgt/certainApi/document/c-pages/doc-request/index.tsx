import React, { memo, useState } from 'react'
import classNames from 'classnames'

import RequestParams from './c-cpns/request-params'
import RequestBody from './c-cpns/request-body'
import RequestCookie from './c-cpns/request-cookie'
import RequestHeader from './c-cpns/request-header'
import RequestAuth from './c-cpns/request-auth'

import './index.less'

enum NavType {
  Params = 'Params',
  Body = 'Body',
  Cookie = 'Cookie',
  Header = 'Header',
  Auth = 'Auth',
}

type NavItem = {
  label: string
  value: NavType
}

const NavItems: NavItem[] = [
  { label: 'Params', value: NavType.Params },
  { label: 'Body', value: NavType.Body },
  { label: 'Cookie', value: NavType.Cookie },
  { label: 'Header', value: NavType.Header },
  { label: 'Auth', value: NavType.Auth },
]

const DocRequest: React.FunctionComponent = memo(() => {
  // 当前选择的项
  const [currentNav, setCurrentNav] = useState<NavType>(NavType.Params)
  return (
    <div className='doc-request'>
      <div className='section-title'>请求参数</div>
      {/* 请求设置导航：Params、Body、Cookie、Header、Auth */}
      <div className='req-nav'>
        {NavItems.map((item) => (
          <div
            className={classNames('nav-item', {
              active: currentNav === item.value,
            })}
            key={item.value}
            onClick={() => setCurrentNav(item.value)}
          >
            {item.label}
          </div>
        ))}
      </div>
      {/* 请求设置内容 */}
      <div className='content'>
        {currentNav === NavType.Params && <RequestParams />}
        {currentNav === NavType.Body && <RequestBody />}
        {currentNav === NavType.Cookie && <RequestCookie />}
        {currentNav === NavType.Header && <RequestHeader />}
        {currentNav === NavType.Auth && <RequestAuth />}
      </div>
    </div>
  )
})

export default DocRequest
