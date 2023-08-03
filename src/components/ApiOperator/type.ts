export type Method =
	| 'GET'
	| 'POST'
	| 'PUT'
	| 'DELETE'
	| 'OPTIONS'
	| 'HEAD'
	| 'PATCH'

export interface ApiOptReqOptType {
	label: string
	value: Method
	colorClassName?: string
}

// 组件属性描述
export type ApiOptProps = {
	// 子元素
	children?: React.ReactNode
	// 自定义右侧内容宽度（默认为225px）
	rightWidth?: string
	// 输入框placeholder
	placeholder?: string
	// 接口选项信息
	methodOptions?: ApiOptReqOptType[]
	// 默认展示的接口信息
	defaultMethod?: ApiOptReqOptType
	// 接口信息值
	methodValue?: ApiOptReqOptType
	// 输入框值
	inputValue?: string
	// 下拉菜单和选择器同宽。默认将设置 min-width，当值小于选择框宽度时会被忽略。
	popupMatchSelectWidth?: number
	// 左侧选项改变事件
	onOptionChange?: (value: ApiOptReqOptType) => void
	// 输入框内容改变事件
	onInputChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}
