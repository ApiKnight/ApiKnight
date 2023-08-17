import React, { useState } from 'react'
import './index.less'
import AddBtn from './addBtn.tsx'
import DelBtn from './delBtn.tsx'
import { createJsErrorMonitor } from '../../../sdk/createJsErrorMonitor'
import { createResourceErrorMonitor } from '../../../sdk/createResourceErrorMonitor'
import { createPromiseErrorMonitor } from '../../../sdk/createPromiseErrorMonitor'
import { createXhrMonitor } from '../../../sdk/createXhrMonitor'
import { TitleNode, Props, AddData } from '@/types/treeComponents'
import MethodList from '@/components/MethodList'
import Menu from '@/components/InterfaceBlock/menu'
import {addData, assign} from "@/store/modules/tabSlice.ts";
import {useDispatch} from "react-redux";
import {setValue} from "@/store/modules/rightSlice";

function startMonitor() {
  createJsErrorMonitor('renderTree').start()
  createResourceErrorMonitor('renderTree').start()
  createPromiseErrorMonitor('renderTree').start()
  createXhrMonitor('renderTree').start()
}

const InterfaceBlock: React.FunctionComponent<{ data: TitleNode }> = (
  props: Props,
) => {
  //startMonitor()
  const [show, setShowState] = useState(false)
  function changeBtnState(): void {
    setShowState(!show)
  }
  const { data } = props
  const addDatas: AddData = { key: data.key, pid: data.pid, type: data.type }
  const menuData: AddData = { key: data.key, pid: data.pid, type: data.type }
  const delData = { key: data.key, type: data.type }
  const dispatch = useDispatch()
  function openTab():void {
    if (data.type !== "FILE") {
      dispatch(addData({
        key: data.key,
        title: data.title,
        type: data.type
      }))
      dispatch(setValue(data.key))
    }
  }
  return (
    <div
      className='InterfaceBlock'
      onMouseEnter={changeBtnState}
      onMouseLeave={changeBtnState}
      onClick={openTab}
    >
      <div>
        <MethodList value={data.type} />
      </div>
      <div className='InterfaceBlock-title'>{data.title}</div>
      <div className='btn'>
        {show && (
          <div style={{ display: 'flex' }}>
            <DelBtn data={delData} />
            {data.type === 'FILE' && (
              <div>
                <AddBtn data={addDatas} />
              </div>
            )}
          </div>
        )}
        <Menu data={menuData} />
      </div>
    </div>
  )
}

export default InterfaceBlock
