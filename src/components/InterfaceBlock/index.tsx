import React, { useState } from 'react'
import './index.less'
import AddBtn from './addBtn.tsx'
import DelBtn from './delBtn.tsx'
import { createJsErrorMonitor } from '../../../sdk/createJsErrorMonitor.ts'
import { createResourceErrorMonitor } from '../../../sdk/createResourceErrorMonitor.ts'
import { createPromiseErrorMonitor } from '../../../sdk/createPromiseErrorMonitor.ts'
import { createXhrMonitor } from '../../../sdk/createXhrMonitor.ts'
import type { TitleNode, Props, AddData } from '@/types/treeComponents'
import MethodList from '@/components/MethodList'
import Menu from '@/components/InterfaceBlock/menu.tsx'
import { addData, assign } from '@/store/modules/tabSlice.ts'
import { useDispatch } from 'react-redux'
import { setValue } from '@/store/modules/rightSlice'
import { useNavigate } from 'react-router-dom'
import { delProps } from '@/types/arrayToTree'
import { changeCurrentKeyAction } from '@/store/modules/tabSlice'

function startMonitor() {
  createJsErrorMonitor('renderTree').start()
  createResourceErrorMonitor('renderTree').start()
  createPromiseErrorMonitor('renderTree').start()
  createXhrMonitor('renderTree').start()
}

const InterfaceBlock: React.FunctionComponent<{ data: TitleNode }> = (
  props: Props,
) => {
  const [show, setShowState] = useState(false)
  function changeBtnState(e: any): void {
    setShowState(!show)
    e.stopPropagation()
  }
  const { title: data } = props.data
  const addDatas: AddData = { key: data.key, pid: data.pid, type: data.type }
  const menuData: AddData = { key: data.key, pid: data.pid, type: data.type }
  const delData: delProps = { key: data.key, type: data.type }
  const dispatch = useDispatch()
  function openTab(): void {
    if (data.type !== 'FILE') {
      const d = {
        key: data.key,
        title: data.title,
        type: data.type,
      }
      dispatch(addData(d as any))
      dispatch(setValue(data.key))
      dispatch(changeCurrentKeyAction(data.key))
    }
  }
  return (
    <div
      className='InterfaceBlock'
      onMouseEnter={changeBtnState}
      onMouseLeave={changeBtnState}
      onDoubleClick={openTab}
    >
      <div className='interface-type'>
        <MethodList value={data.type} />
      </div>
      <div className='InterfaceBlock-title'>{data.title}</div>
      <div className='btn'>
        {show && (
          <div style={{ display: 'flex' }}>
            {data.pid !== null && <DelBtn data={delData} />}
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

export default React.memo(InterfaceBlock)
