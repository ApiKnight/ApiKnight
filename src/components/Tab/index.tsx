import React, { useEffect, useState } from 'react'
import MethodList from '@/components/MethodList'
import './index.less'
import { CloseOutlined } from '@ant-design/icons'
import { Props } from '@/types/tabs'
import { useDispatch, useSelector } from 'react-redux'
import { removeData } from '@/store/modules/tabSlice'
import RightPage from '../RightPage'
import { setValue } from '@/store/modules/rightSlice'
import { RootState } from '@/store'
import { reversal } from '@/store/modules/showRightMenu'

const Tab: React.FunctionComponent<Props> = (props) => {
  const [show, setShow] = useState(false)
  const dispatch = useDispatch()
  function changeShowState(): void {
    setShow(!show)
  }
  function closeThisPage(e: any): void {
    dispatch(setValue('0'))
    dispatch(removeData(props.data.key))
    dispatch(reversal())
    e.stopPropagation()
  }
  function openTab(): void {
    if (props.data.type !== 'gl') {
      dispatch(setValue(props.data.key))
    } else {
      dispatch(setValue('gl'))
    }
  }
  useEffect(()=>{
    if (props.data.type === 'gl') {
      dispatch(setValue('gl'))
    }
  },[])
  return (
    <div
      className='tab'
      onMouseEnter={changeShowState}
      onMouseLeave={changeShowState}
      onClick={openTab}
    >
      <div className='tab-title'>
        <span style={{ marginRight: '7px' }}>
          <MethodList value={props.data.type} />
        </span>
      </div>
      <div className='tab-content'>
        <span>{props.data.title}</span>
      </div>
      <div className='tab-closed'>
        {show && <CloseOutlined onClick={closeThisPage} />}
      </div>
    </div>
  )
}

export default Tab
