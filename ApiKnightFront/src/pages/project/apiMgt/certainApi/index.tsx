import React from 'react'
import { Outlet, Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

const CertainApi: React.FunctionComponent = () => {
  const state = useLocation().state
  return (
    <>
      <div>具体某个Api</div>
      <ul>
        <li>
          <Link to='/project/apiMgt/certainApi/document' state={state}>
            document
          </Link>
        </li>
        <li>
          <Link to='/project/apiMgt/certainApi/test' state={state}>
            test
          </Link>
        </li>
        <li>
          <Link to='/project/apiMgt/certainApi/mock' state={state}>
            mock
          </Link>
        </li>
      </ul>
      <Outlet />
    </>
  )
}

export default CertainApi
