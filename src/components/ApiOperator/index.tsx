import React, { memo, useState } from 'react'
import { Button, Input, Select, Space } from 'antd'

import type { ApiOptReqOptType, ApiOptProps } from './type'
import './index.less'

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

const ApiOperator: React.FunctionComponent<ApiOptProps> = memo((props) => {
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
					<Select
						open={selectVisible}
						onDropdownVisibleChange={(visible) => setSelectVisible(visible)}
						defaultValue={props.defaultMethod}
						value={props.methodValue}
						options={props.methodOptions}
						popupMatchSelectWidth={props.popupMatchSelectWidth}
						dropdownRender={getDropDownEle}
						onSelect={(e) => console.log(e)}
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
	methodOptions: methodOptions,
	defaultMethod: methodOptions[0],
	methodValue: methodOptions[0],
	popupMatchSelectWidth: 100,
	inputValue: ''
}

export default ApiOperator
