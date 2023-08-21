import { NormalParamsType } from '@/types/api'

export interface ParamsProps {
  // 请求信息数据源
  dataSource: NormalParamsType[]
  /**
   * 删除参数按钮点击事件
   * @param index 需要删除的参数在参数列表中的索引
   * @param param 被删除的参数信息
   * @returns void
   */
  onParamDelClick: (index: number, param: NormalParamsType) => void
  /**
   * 增加参数按钮点击事件
   * @returns void
   */
  onParamAddClick: () => void
  /**
   * 用户参数信息输入框修改事件
   * @param value 用户输入的值
   * @param type 更改的类型（参数的key或者参数的value）
   * @param index 更改的参数在参数列表中的索引
   * @returns void
   */
  onParamInfoChange: (
    value: string,
    type: 'paramName' | 'value',
    index: number,
  ) => void
}
