import React, { memo } from 'react'
import { Input, Space } from 'antd'

import type { ApiOptProps } from '@/types/components'
import './index.less'
import MethodSelect from '../MethodSelect'

const ApiOperator: React.FunctionComponent<ApiOptProps> = memo((props) => {
  const { urlPrefixValue, inputValue } = props
  const [prefix, setPrefix] = React.useState(urlPrefixValue)
  const [path, setPath] = React.useState(inputValue)

  // 前缀输入框长度
  const [prefixInputWidth, setPrefixInputWidth] = React.useState(0)

  // path输入框改变事件
  function onPathInputChange(e: React.ChangeEvent<HTMLInputElement>): void {
    const value = e.target.value
    setPath(value)
    if (props.onInputChange) props.onInputChange(e)
  }

  // url前缀输入框改变事件
  function onPrefixInputChange(e: React.ChangeEvent<HTMLInputElement>): void {
    const value = e.target.value
    // 获取元素的字体大小
    const fontSize = window.getComputedStyle(e.target).fontSize
    setPrefixInputWidth(value.length * Number(fontSize.slice(0, -2)) + 10)

    setPrefix(value)
    if (props.onPrefixInputChange) props.onPrefixInputChange(e)
  }

  return (
    <div className='api-operator'>
      <div
        className={['left-info', props.methodValue?.colorClassName].join(' ')}>
        <Space.Compact block>
          <MethodSelect
            defaultMethod={props.defaultMethod}
            methodValue={props.methodValue}
            methodOptions={props.methodOptions}
            popupMatchSelectWidth={props.popupMatchSelectWidth}
            onOptionChange={props.onOptionChange}
            disabled={props.disablePrefix}
          />
          {props.showPrefix && (
            <>
              <Input
                style={{
                  width: prefixInputWidth + 'px',
                  minWidth: '160px',
                  maxWidth: '220px',
                  borderRight: 'none',
                }}
                disabled={props.disablePrefix}
                value={prefix}
                onChange={(e) => onPrefixInputChange(e)}
                placeholder={props.urlPrefixPlaceholder}
              />
              <div className='split'>
                <span>/</span>
              </div>
            </>
          )}
          <Input
            style={{ borderLeft: 'none' }}
            value={path}
            onChange={(e) => onPathInputChange(e)}
            placeholder={props.placeholder}
          />
        </Space.Compact>
      </div>
      <div className='right-warp' style={{ width: props.rightWidth }}>
        {props.children}
      </div>
    </div>
  )
})

ApiOperator.defaultProps = {
  rightWidth: '225px',
  placeholder: '接口地址',
  inputValue: '',
  urlPrefixValue: '',
  urlPrefixPlaceholder: 'http://localhost:3000',
  disablePrefix: false,
  showPrefix: true,
}

export default ApiOperator
