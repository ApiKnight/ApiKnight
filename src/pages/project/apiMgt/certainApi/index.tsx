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
import request from '@/api/request'
import CreateFile from '@/components/createFile'
import Tab from "@/components/Tab";

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
      <RenderTree />
        <Tab/>
    </>
  )
}

export default CertainApi
