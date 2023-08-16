import React from 'react'
import './index.less'
import { Link, Outlet } from 'react-router-dom'
import RenderTree from '@/components/RenderTree'
import { ArrayItem } from '@/types/arrayToTree'
import { FlatItem, FlatItemValue } from '@/types/mergeFlatArrays'
import { mergeFlatArrays } from '@/utils/mergeFlatArrays'
import Email from '@/components/Invite/email'
import { useLocation } from 'react-router-dom'
import Tabs from "@/components/Tabs";
import Tab from "@/components/Tab";

const ApiMgt: React.FunctionComponent = () => {
  const state = useLocation().state
  return (
    <div className='project-api'>
      <div className='header'>Api管理</div>
      <div className='content'>
        <ul>
          <li>
            <Link to='/project/apiMgt/overview' state={state}>
              Overview
            </Link>
          </li>
          <li>
            <Link to='/project/apiMgt/certainApi' state={state}>
              CertainApi
            </Link>
          </li>
        </ul>
      </div>
      <div className='child'>
        <Outlet />
      </div>
      {/* 不需要传data，内部都做好了 */}
      {/*<RenderTree />*/}
        <Tabs/>
    </div>
  )
}

export default ApiMgt
