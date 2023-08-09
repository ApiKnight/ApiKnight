import './index.less'
import React from 'react'
import type { MethodTypes } from '@/types/methodTypes'
import { FolderOutlined } from '@ant-design/icons'

const MethodList: React.FunctionComponent<MethodTypes> = (props) => {
  return (
    <div>
      {props.value !== 'FILE' ? (
        <div className={`color-${props.value}`}>
          <div className='ant-select-selection-item'>{props.value}</div>
        </div>
      ) : (
        <div>
          <FolderOutlined />
        </div>
      )}
    </div>
  )
}
export default MethodList
