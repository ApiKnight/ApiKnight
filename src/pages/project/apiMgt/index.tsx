import React from 'react'
import './index.less'
import { Link, Outlet } from 'react-router-dom'
const ApiMgt: React.FunctionComponent = () => {
  return (
    <>
      <div>ApiMgt</div>
      <ul>
        <li>
          <Link to="/project/apiMgt/overview">Overview</Link>
        </li>
        <li>
          <Link to="/project/apiMgt/certainApi">CertainApi</Link>
        </li>
      </ul>
      <div>
        <Outlet />
      </div>
    </>
  )
}

export default ApiMgt
