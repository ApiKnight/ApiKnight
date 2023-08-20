import React, { memo, useState } from 'react'
import { Button } from 'antd'

import type { ApiOptReqOptType } from '@/types/components'
import ApiOperator from '@/components/ApiOperator'
import './index.less'
import { useAppSelector, shallowEqualApp, useAppDispatch } from '@/store'
import {
  changeMethodAction,
  changePathAction,
  changePrefixAction,
} from '@/store/modules/mock'
import { BaseInfoType } from '@/types/api'
import withMode from '../with-mode'

type MockUrlProps = {
  mode: 'run' | 'mock'
  mockPrefix?: string
}

const MockUrl: React.FunctionComponent<MockUrlProps> = (props) => {
  console.log(props)

  const dispatch = useAppDispatch()
  // 根据模式，获取对应的数据
  const { userReqInfo } = useAppSelector((state) => {
    let res = {} as BaseInfoType
    if (props.mode === 'mock') {
      res = state.mock.mockData.apiInfo.base
    } else {
      res = state.mock.runData.apiInfo.base
    }
    return { userReqInfo: res }
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
    console.log('发送请求')
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
