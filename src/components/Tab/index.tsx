import React, { useState } from 'react'
import classNames from 'classnames'
import MethodList from '@/components/MethodList'
import './index.less'
import { CloseOutlined } from '@ant-design/icons'
import { Props } from '@/types/tabs'

const Tab: React.FunctionComponent<Props> = (props) => {
  const { active, onRemoveTab, onSelected, index } = props
  const [show, setShow] = useState(false)
  function changeShowState(): void {
    setShow(!show)
  }
  function handleClose(e: React.MouseEvent) {
    e.stopPropagation()
    onRemoveTab?.(index)
  }
  return (
    <div
      className={classNames('tab', { 'tab-active': active })}
      onMouseEnter={changeShowState}
      onMouseLeave={changeShowState}
      onClick={(_e) => onSelected(index)}>
      <div className='tab-title'>
        <span style={{ marginRight: '7px' }}>
          <MethodList value={props.data.type} />
        </span>
      </div>
      <div className='tab-content'>
        <span>{props.data.title}</span>
      </div>
      <div className='tab-closed'>
        {show && <CloseOutlined onClick={handleClose} />}
      </div>
    </div>
  )
}

export default Tab
