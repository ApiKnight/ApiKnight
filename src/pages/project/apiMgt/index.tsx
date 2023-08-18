import React from 'react'
import './index.less'
import { Link, Outlet } from 'react-router-dom'
import RenderTree from '@/components/RenderTree'
import { ArrayItem } from '@/types/arrayToTree'
import { FlatItem, FlatItemValue } from '@/types/mergeFlatArrays'
import { mergeFlatArrays } from '@/utils/mergeFlatArrays'
import Email from '@/components/Invite/email'
import { useLocation } from 'react-router-dom'
import Tabs from '@/components/Tabs'
import Tab from '@/components/Tab'
import RightPage from '@/components/RightPage'

const ApiMgt: React.FunctionComponent = () => {
  const state = useLocation().state
  return (
    <div className='project-api'>
      
      <div className="top">
        <div className='top-tile'>
          Api管理
      </div>
      </div>

      <div className="bottom">
      <div className='left-nav'>
        <ul>
          <li className='title'>
            <Link to='/project/apiMgt/overview' state={state}>
              项目概览
            </Link>
          </li>
          <li>
            {/* <Link to='/project/apiMgt/certainApi' state={state}> */}
            <RenderTree project_id={state.project_id}/>
            {/* </Link> */}
          </li>
        </ul>
      </div>
      <div className='right-content'>
        <Outlet />
      </div>
      </div>
      {/* 不需要传data，内部都做好了 */}
      
      {/* <RightPage /> */}
    </div>
  )
}

export default ApiMgt
