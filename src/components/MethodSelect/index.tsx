import React, { memo, useState } from 'react'
import { Select } from 'antd'
import classNames from 'classnames'

import './index.less'
import { MethodSelectProps, ApiOptReqOptType } from './type'

function getColorClassName(methodInfo: ApiOptReqOptType | undefined): string {
  if (!methodInfo) return 'color-others'
  // 用户定义新类则使用用户定义的类
  if (methodInfo?.colorClassName) return methodInfo.colorClassName
  // 用户未定义则使用默认类
  const isNormalMethod = [
    'GET',
    'POST',
    'PUT',
    'DELETE',
    'OPTIONS',
    'HEAD',
    'PATCH',
    'TRACE',
  ].includes(methodInfo.value.toUpperCase())
  if (isNormalMethod) return `color-${methodInfo.value.toLowerCase()}`
  return 'color-others'
}

const MethodSelect: React.FunctionComponent<MethodSelectProps> = memo(
  (props) => {
    const [selectVisible, setSelectVisible] = useState(false)

    // 手动渲染请求方式下拉列表
    function getDropDownEle(): React.ReactElement {
      return (
        <ul className='method-select'>
          {methodOptions.map((item, index) => (
            <li
              className={classNames('method-item', getColorClassName(item))}
              onClick={() => onReqMethodChange(item)}
              key={index}
            >
              {item.label}
            </li>
          ))}
        </ul>
      )
    }

    // 选择请求方式点击事件
    function onReqMethodChange(req: ApiOptReqOptType): void {
      setSelectVisible(false)
      if (props.onOptionChange) props.onOptionChange(req)
    }

    return (
      <div className='select-wrap'>
        <div className={getColorClassName(props.methodValue)}>
          <Select
            open={selectVisible}
            onDropdownVisibleChange={(visible) => setSelectVisible(visible)}
            defaultValue={props.defaultMethod}
            value={props.methodValue}
            options={props.methodOptions}
            popupMatchSelectWidth={props.popupMatchSelectWidth}
            dropdownRender={getDropDownEle}
            onSelect={(e) => props?.onOptionChange?.(e)}
            disabled={props.disabled}
          />
        </div>
      </div>
    )
  },
)

// 默认请求类型信息
const methodOptions: ApiOptReqOptType[] = [
  { label: 'GET', value: 'GET' },
  { label: 'POST', value: 'POST' },
  { label: 'PUT', value: 'PUT' },
  { label: 'DELETE', value: 'DELETE' },
  { label: 'OPTIONS', value: 'OPTIONS' },
  { label: 'HEAD', value: 'HEAD' },
  { label: 'PATCH', value: 'PATCH' },
]

MethodSelect.defaultProps = {
  methodOptions: methodOptions,
  defaultMethod: methodOptions[0],
  methodValue: methodOptions[0],
  popupMatchSelectWidth: 100,
  disabled: false,
}

export default MethodSelect
