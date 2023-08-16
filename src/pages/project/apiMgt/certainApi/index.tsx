import React, { useState, useEffect } from 'react'
import './index.less'
import { assign } from '@/store/modules/dirArraySlice.ts'
import { RootState } from '@/store/index.ts'
import { useSelector, useDispatch } from 'react-redux'
import InterfaceBlock from '@/components/interfaceBlock'
import RenderTree from '@/components/renderTree'
import { ArrayItem } from '@/types/arrayToTree.d.ts'
import { Outlet, Link } from 'react-router-dom'
import { FlatItem, FlatItemValue } from '@/types/mergeFlatArrays'
import { mergeFlatArrays } from '@/utils/mergeFlatArrays'
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
