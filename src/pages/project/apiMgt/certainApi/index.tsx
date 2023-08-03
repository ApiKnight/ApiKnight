import React from 'react'
import './index.less'
import { Outlet, Link } from 'react-router-dom'
const CertainApi: React.FunctionComponent = () => {
  return (
    <>
      <div>CertainApi</div>
      <ul>
        <li>
          <Link to='/project/apiMgt/certainApi/document'>document</Link>
        </li>
        <li>
          <Link to='/project/apiMgt/certainApi/test'>test</Link>
        </li>
        <li>
          <Link to='/project/apiMgt/certainApi/mock'>mock</Link>
        </li>
      </ul>
      <Outlet />
    </>
  )
}

export default CertainApi
