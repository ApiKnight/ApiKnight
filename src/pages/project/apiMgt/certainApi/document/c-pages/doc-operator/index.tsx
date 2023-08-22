import React, { memo, useState } from 'react'
import { Button } from 'antd'
import type { ApiOptReqOptType } from '@/types/components'
import './index.less'
import ApiOperator from '@/components/ApiOperator'
import { shallowEqualApp, useAppDispatch, useAppSelector } from '@/store'
import {
  changeMethodAction,
  changePrefixAction,
  changePathAction,
} from '@/store/modules/document'

const DocOperator: React.FunctionComponent = memo(() => {
  const dispatch = useAppDispatch()
  const { baseInfo, apiData } = useAppSelector(
    (state) => ({
      baseInfo: state.document.apiData.apiInfo.base,
      apiData: state.document.apiData,
    }),
    shallowEqualApp,
  )

  // 由于组件需要额外冗余增加一个属性，需要保持与userReqInfo中的method一致
  const [method, setMethod] = useState<ApiOptReqOptType>({
    label: 'GET',
    value: 'GET',
  })

  // 请求方式改变事件
  const handleMethodChange = (methodOpt: ApiOptReqOptType): void => {
    setMethod(methodOpt)
    dispatch(changeMethodAction(methodOpt.value))
  }

  // 输入框改变事件
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: 'prefix' | 'path',
  ): void => {
    // 拿到最新的值
    const newVal = e.target.value
    if (type === 'prefix') {
      dispatch(changePrefixAction(newVal))
    } else {
      dispatch(changePathAction(newVal))
    }
  }

  // 保存信息
  const handleSaveInfo = () => {
    console.log({ baseInfo, apiData })
  }

  // 删除信息
  const handleDelInfo = () => {
    console.log('删除接口')
    console.log({ baseInfo })
  }

  return (
    <div className='doc-operator'>
      <ApiOperator
        methodValue={method}
        onOptionChange={(m) => handleMethodChange(m)}
        onPrefixInputChange={(e) => handleInputChange(e, 'prefix')}
        onInputChange={(e) => handleInputChange(e, 'path')}
        urlPrefixValue={baseInfo.prefix}
        inputValue={baseInfo.path}>
        <Button className='btn' type='primary' onClick={handleSaveInfo}>
          保存
        </Button>
        <Button className='btn' onClick={handleDelInfo}>
          删除
        </Button>
      </ApiOperator>
    </div>
  )
})

export default DocOperator
