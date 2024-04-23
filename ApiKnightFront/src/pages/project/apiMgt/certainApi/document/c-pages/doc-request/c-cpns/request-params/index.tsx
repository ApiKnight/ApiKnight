// 第三方库
import React, { memo } from 'react'

// 其他模块的类型
import { NavType } from '@/types/enum'
// 其他模块的内容：存储
import { useAppDispatch, useAppSelector } from '@/store'
import {
  changeNormalParamsAction,
  changeParamsItemOptAction,
} from '@/store/modules/document/document'
// 其他模块的内容：组件
import NormalParamTable from '@/components/NormalParamTable'

// 自己模块的内容
import './index.less'

// eslint-disable-next-line react-refresh/only-export-components
const RequestParams: React.FunctionComponent = () => {
  const dispatch = useAppDispatch()
  const { params } = useAppSelector((state) => ({
    params: state.document.apiData.apiInfo.request.params,
  }))

  // 参数项增减事件
  const handleParamsItemOptAction = (isInsert: boolean, index: number) => {
    if (isInsert) {
      // 增加参数项
      dispatch(
        changeParamsItemOptAction({
          isInsert: true,
          removeIndex: -1,
          paramType: NavType.Params,
        }),
      )
    } else {
      // 删除参数项
      dispatch(
        changeParamsItemOptAction({
          isInsert: false,
          removeIndex: index,
          paramType: NavType.Params,
        }),
      )
    }
  }

  // 参数的key或者value编辑事件
  const onParamInfoChange = (
    value: string,
    type: 'paramName' | 'value',
    index: number,
  ) => {
    dispatch(
      changeNormalParamsAction({
        key: type,
        value: value,
        index: index,
        paramType: NavType.Params,
      }),
    )
  }

  return (
    <NormalParamTable
      dataSource={params}
      onParamDelClick={(index) => handleParamsItemOptAction(false, index)}
      onParamAddClick={() => handleParamsItemOptAction(true, -1)}
      onParamInfoChange={onParamInfoChange}
    />
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export default memo(RequestParams)
