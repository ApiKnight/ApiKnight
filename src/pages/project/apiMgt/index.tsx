import React from 'react'
import './index.less'
import { Link, Outlet } from 'react-router-dom'
import RenderTree from '@/components/RenderTree'
import { ArrayItem } from '@/types/arrayToTree'
import { FlatItem, FlatItemValue } from '@/types/mergeFlatArrays'
import { mergeFlatArrays } from '@/utils/mergeFlatArrays'
import Email from "@/components/Invite/email";
import Invite from "@/components/Invite";
const ApiMgt: React.FunctionComponent = () => {
  return (
    <>
        <div>
            <Invite></Invite>
        </div>
      <div>ApiMgt</div>
      <ul>
        <li>
          <Link to='/project/apiMgt/overview'>Overview</Link>
        </li>
        <li>
          <Link to='/project/apiMgt/certainApi'>CertainApi</Link>
        </li>
      </ul>
      <div>
        <Outlet />
      </div>

    </>
  )
}

export default ApiMgt
