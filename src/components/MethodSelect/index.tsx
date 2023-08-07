import React, { memo, useState } from 'react'
import { Select } from 'antd'
import { MethodSelectProps } from './type'
import classNames from 'classnames'
import './index.less'

import { ApiOptReqOptType } from './type'

const MethodSelect: React.FunctionComponent<MethodSelectProps> = memo(
  (props) => {
    const [selectVisible, setSelectVisible] = useState(false)

    // 手动渲染请求方式下拉列表
    function getDropDownEle(): React.ReactElement {
      return (
        <ul className="method-select">
          {methodOptions.map((item, index) => (
            <li
              className={['method-item', item.colorClassName].join(' ')}
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
      <div className="select-wrap">
        <div className={props.methodValue?.colorClassName}>
          <Select
            open={selectVisible}
            onDropdownVisibleChange={(visible) => setSelectVisible(visible)}
            defaultValue={props.defaultMethod}
            value={props.methodValue}
            options={props.methodOptions}
            popupMatchSelectWidth={props.popupMatchSelectWidth}
            dropdownRender={getDropDownEle}
            onSelect={(e) => props?.onOptionChange?.(e)}
          />
        </div>
      </div>
    )
  }
)

// 默认请求类型信息
const methodOptions: ApiOptReqOptType[] = [
  { label: 'GET', value: 'GET', colorClassName: 'color-get' },
  {
    label: 'POST',
    value: 'POST',
    colorClassName: 'color-post'
  },
  { label: 'PUT', value: 'PUT', colorClassName: 'color-put' },
  { label: 'DELETE', value: 'DELETE', colorClassName: 'color-delete' },
  { label: 'OPTIONS', value: 'OPTIONS', colorClassName: 'color-options' },
  { label: 'HEAD', value: 'HEAD', colorClassName: 'color-head' },
  { label: 'PATCH', value: 'PATCH', colorClassName: 'color-patch' }
]

MethodSelect.defaultProps = {
  methodOptions: methodOptions,
  defaultMethod: methodOptions[0],
  methodValue: methodOptions[0],
  popupMatchSelectWidth: 100
}

export default MethodSelect
