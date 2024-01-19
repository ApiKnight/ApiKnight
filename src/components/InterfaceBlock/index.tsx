import React, { useState } from 'react'
import './index.less'
import AddBtn from './addBtn.tsx'
import DelBtn from './delBtn.tsx'
import type { AddData } from '@/types/treeComponents'
import MethodList from '@/components/MethodList'
import Menu from '@/components/InterfaceBlock/menu.tsx'
import { addData } from '@/store/modules/tabSlice.ts'
import { useDispatch } from 'react-redux'
import { setValue } from '@/store/modules/rightSlice'
import { ArrayItem, delProps } from '@/types/arrayToTree'
import { changeCurrentKeyAction } from '@/store/modules/tabSlice'

const InterfaceBlock: React.FunctionComponent<{ data: ArrayItem }> = (
  props,
) => {
  const [show, setShowState] = useState(false)
  function changeBtnState(e: React.MouseEvent): void {
    setShowState(!show)
    e.stopPropagation()
  }
  const data = props.data.title as ArrayItem
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
      dispatch(addData(d))
      dispatch(setValue(data.key))
      dispatch(changeCurrentKeyAction(data.key))
    }
  }
  return (
    <div
      className='InterfaceBlock'
      onMouseEnter={changeBtnState}
      onMouseLeave={changeBtnState}
      onDoubleClick={openTab}>
      <div className='interface-type'>
        <MethodList value={data.type} />
      </div>
      <div className='InterfaceBlock-title'>{String(data.title)}</div>
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
