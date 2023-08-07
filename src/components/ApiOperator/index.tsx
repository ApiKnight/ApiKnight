import React, { memo } from 'react'
import { Input, Space } from 'antd'

import type { ApiOptProps } from '@/types/components'
import './index.less'
import MethodSelect from '../MethodSelect'

const ApiOperator: React.FunctionComponent<ApiOptProps> = memo((props) => {
  // 输入框改变事件
  function onInputChange(e: React.ChangeEvent<HTMLInputElement>): void {
    if (props.onInputChange) props.onInputChange(e)
  }

  return (
    <div className="api-operator">
      <div
        className={['left-info', props.methodValue?.colorClassName].join(' ')}
      >
        <Space.Compact block>
          <MethodSelect
            defaultMethod={props.defaultMethod}
            methodValue={props.methodValue}
            methodOptions={props.methodOptions}
            popupMatchSelectWidth={props.popupMatchSelectWidth}
            onOptionChange={props.onOptionChange}
          />
          <Input
            value={props.inputValue}
            onChange={(e) => onInputChange(e)}
            placeholder={props.placeholder}
          />
        </Space.Compact>
      </div>
      <div className="right-warp" style={{ width: props.rightWidth }}>
        {props.children}
      </div>
    </div>
  )
})

ApiOperator.defaultProps = {
  rightWidth: '225px',
  placeholder: '接口地址',
  inputValue: ''
}

export default ApiOperator
