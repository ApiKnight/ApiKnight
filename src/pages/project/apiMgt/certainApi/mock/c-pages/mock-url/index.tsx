import React, { memo, useState } from 'react'
import { Button } from 'antd'

import type { ApiOptReqOptType } from '@/types/components'
import ApiOperator from '@/components/ApiOperator'
import './index.less'
import { useAppSelector, shallowEqualApp, useAppDispatch } from '@/store'
import {
  changeBodyAction,
  changeMethodAction,
  changePathAction,
  changePrefixAction,
} from '@/store/modules/mock'
import { BaseInfoType, IAPIInfo, RequestParamsType } from '@/types/api'
import withMode from '../with-mode'

type MockUrlProps = {
  mode: 'run' | 'mock'
  mockPrefix?: string
}

const MockUrl: React.FunctionComponent<MockUrlProps> = (props) => {
  const dispatch = useAppDispatch()
  // 根据模式，获取对应的数据
  const { userReqInfo, reqParams } = useAppSelector((state) => {
    let res = {} as { userReqInfo: BaseInfoType; reqParams: RequestParamsType }
    if (props.mode === 'mock') {
      res.userReqInfo = state.mock.mockData.apiInfo.base
      res.reqParams = state.mock.mockData.apiInfo.request
    } else {
      res.userReqInfo = state.mock.runData.apiInfo.base
      res.reqParams = state.mock.runData.apiInfo.request
    }
    return res
  }, shallowEqualApp)

  // 由于组件需要额外冗余增加一个属性，需要保持与userReqInfo中的method一致
  const [userMethod, setUserMethod] = useState<ApiOptReqOptType>({
    label: 'GET',
    value: 'GET',
  })

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
  // 请求方式改变事件
  const handleMethodChange = (methodOpt: ApiOptReqOptType): void => {
    setUserMethod(methodOpt)
    dispatch(changeMethodAction(methodOpt.value))
  }

  // 发送按钮点击事件
  const handleSendBtnClick = (): void => {
    const { prefix, path, method } = userReqInfo
    const { params, headers, cookie, body } = reqParams
    console.log(userReqInfo)

    console.log({
      prefix,
      path,
      method: method,
      params,
      headers,
      cookie,
      body,
    })

    // 假如这是响应内容
    const responseExample = JSON.stringify({ name: 'LuoKing' })
    // 设置响应内容
    dispatch(changeBodyAction(responseExample))
  }

  return (
    <div className='doc-operator'>
      <ApiOperator
        methodValue={userMethod}
        onOptionChange={(m) => handleMethodChange(m)}
        onPrefixInputChange={(e) => handleInputChange(e, 'prefix')}
        onInputChange={(e) => handleInputChange(e, 'path')}
        inputValue={userReqInfo.path}
        urlPrefixValue={
          props.mode === 'run' ? userReqInfo.prefix : props.mockPrefix
        }
        disablePrefix={props.mode === 'mock'}>
        <Button className='btn' type='primary' onClick={handleSendBtnClick}>
          发送
        </Button>
      </ApiOperator>
    </div>
  )
}

export default memo(withMode(MockUrl))
