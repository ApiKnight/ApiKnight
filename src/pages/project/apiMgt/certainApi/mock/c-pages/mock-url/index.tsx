import React, { memo, useState } from 'react'
import { Button, message } from 'antd'

import type { ApiOptReqOptType } from '@/types/components'
import ApiOperator from '@/components/ApiOperator'
import './index.less'
import { useAppSelector, shallowEqualApp, useAppDispatch } from '@/store'
import {
  changeResponseBodyAction,
  changeMethodAction,
  changePathAction,
  changePrefixAction,
  changeRequestBodyAction,
} from '@/store/modules/mock'
import { BaseInfoType, IAPIInfo, RequestParamsType } from '@/types/api'
import withMode from '../../with-mode'
import testApi from '@/api/testApi'
import mockReq from '@/api/mockReq'
import runMock from '@/api/runMock'

type MockUrlProps = {
  mode: 'run' | 'mock'
  mockPrefix?: string
  project_id: string
}
const MockUrl: React.FunctionComponent<MockUrlProps> = (props) => {
  const { mode, project_id } = props
  const api_id = ''
  const dispatch = useAppDispatch()
  // 根据模式，获取对应的数据
  const { userReqInfo, reqParams } = useAppSelector((state) => {
    let res = {} as { userReqInfo: BaseInfoType; reqParams: RequestParamsType }
    if (mode === 'mock') {
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
    const { params, headers: header, cookie, body } = reqParams
    const paramsObj = {}
    if (params.length) {
      params.forEach((v) => {
        console.log(v)
        paramsObj[v.paramName] = v.value
      })
    }
    const url = mode === 'mock' ? path : prefix + (path ? '/' + path : '')
    const requestObj: any = {
      url,
      method,
      params: paramsObj,
      header,
      cookie,
      data: body,
    }

    console.log(requestObj)
    testApi(requestObj).then((res) => {
      console.log(res.data)

      res.status === 200
        ? dispatch(changeResponseBodyAction(JSON.stringify(res.data)))
        : ''
    })
    // // 假如这是响应内容
    // const responseExample = JSON.stringify({ name: 'LuoKing' })
    // // 设置响应内容
    // dispatch(changeRequestBodyAction(responseExample))
  }

  /**
   * mock的创建和执行，通过参数区分
   * @param mockMode
   */
  const handleMock = (mockMode) => {
    const { prefix, path, method } = userReqInfo
    const { params, headers: header, cookie, body } = reqParams
    const paramsObj = {}
    if (params.length) {
      params.forEach((v) => {
        console.log(v)
        paramsObj[v.paramName] = v.value
      })
    }
    const url = path
    const requestObj: any = {
      url,
      method,
      params: paramsObj,
      header,
      cookie,
      data: body,
    }
    requestObj.project_id = project_id
    requestObj.api_id = api_id
    requestObj.response = {}
    console.log(requestObj)

    // 创建mock服务
    if (mockMode === 'create') {
      mockReq(requestObj).then((res: any) => {
        res.data.code === 200
          ? message.success('创建成功')
          : message.error('创建失败')
      })
      // 执行mock
    } else if (mockMode === 'execute') {
      runMock(requestObj).then((res: any) => {
        res.status === 200
          ? // 将执行mock的响应数据放到响应栏
            dispatch(changeResponseBodyAction(JSON.stringify(res.data)))
          : ''
      })
    }
  }

  return (
    <div className='doc-operator'>
      <ApiOperator
        methodValue={userMethod}
        onOptionChange={(m) => handleMethodChange(m)}
        onPrefixInputChange={(e) => handleInputChange(e, 'prefix')}
        onInputChange={(e) => handleInputChange(e, 'path')}
        inputValue={userReqInfo.path}
        urlPrefixValue={mode === 'run' ? userReqInfo.prefix : props.mockPrefix}
        disablePrefix={mode === 'mock'}
      >
        {/* 运行的发送由handleSendBtnClick控制，mock的发送和创建由handleMock控制 */}
        <Button
          className='btn'
          type='primary'
          onClick={
            mode === 'run' ? handleSendBtnClick : () => handleMock('execute')
          }
        >
          发送
        </Button>

        {mode === 'mock' ? (
          <Button
            type='primary'
            style={{ marginLeft: '10px' }}
            onClick={() => {
              handleMock('create')
            }}
          >
            创建mock服务
          </Button>
        ) : (
          ''
        )}
      </ApiOperator>
    </div>
  )
}

export default memo(withMode(MockUrl))
