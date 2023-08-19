import React, { memo, useEffect, useMemo, useState } from 'react'
import { Button } from 'antd'
import { isEqual, clone, cloneDeep } from 'lodash'

import type { MockUrlProps } from './type'
import type { ApiOptReqOptType } from '@/types/components'
import ApiOperator from '@/components/ApiOperator'
import './index.less'
import { useAppSelector, shallowEqualApp } from '@/store'

const MockUrl: React.FunctionComponent<MockUrlProps> = memo((props) => {
  // 从redux中获取基本信息
  const { baseInfo } = useAppSelector(
    (state) => ({
      baseInfo: state.document.apiInfo.base,
    }),
    shallowEqualApp,
  )
  // 深拷贝一份，避免修改原数据
  const [userReqInfo, setUserReqInfo] = useState(cloneDeep(baseInfo))
  // 由于组件需要额外冗余增加一个属性，需要保持与userReqInfo中的method一致
  const [userMethod, setUserMethod] = useState<ApiOptReqOptType>({
    label: 'GET',
    value: 'GET',
  })

  useEffect(() => {
    // 内容修改了通知父组件
    if (!isEqual(baseInfo, userReqInfo)) {
      props.onInfoChange &&
        props.onInfoChange(
          {
            method: userReqInfo.method,
            path: userReqInfo.path,
          },
          'base',
        )
    }
  }, [userReqInfo])

  // url输入框改变事件
  const handleUrlInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    const newInfo = clone(userReqInfo)
    // 拿到最新的值
    newInfo.path = e.target.value
    setUserReqInfo(newInfo)
  }
  // 请求方式改变事件
  const handleMethodChange = (methodOpt: ApiOptReqOptType): void => {
    setUserMethod(methodOpt)
    const newInfo = clone(userReqInfo)
    newInfo.method = methodOpt.value
    setUserReqInfo(newInfo)
  }

  return (
    <div className='doc-operator'>
      <ApiOperator
        methodValue={userMethod}
        onOptionChange={(m) => handleMethodChange(m)}
        onInputChange={(e) => handleUrlInputChange(e)}
        inputValue={userReqInfo.path}>
        <Button
          className='btn'
          type='primary'
          onClick={(e) => props.onSend(false)}>
          发送
        </Button>
      </ApiOperator>
    </div>
  )
})

export default MockUrl
