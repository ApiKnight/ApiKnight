import React, { memo, useState, useEffect } from 'react'
import { Button, message } from 'antd'

import type { ApiOptReqOptType } from '@/types/components'
import ApiOperator from '@/components/ApiOperator'
import './index.less'
import { useAppSelector, useAppDispatch } from '@/store'
import {
  changeResponseBodyAction,
  changeMethodAction,
  changePathAction,
  changePrefixAction,
} from '@/store/modules/mock'
import {
  BaseInfoType,
  IAPIInfo,
  MetaInfo,
  RequestParamsType,
} from '@/types/api'
import withMode from '../../with-mode'
import { requestByServerProxy } from '@/api/service'
import { createMock } from '@/api'

type MockUrlProps = {
  mode: 'run' | 'mock'
  mockPrefix?: string
}
const MockUrl: React.FunctionComponent<MockUrlProps> = (props) => {
  const { mode } = props
  const [mockPrefix, setMockPrefix] = useState(
    'https://lyyfsq.club:7000/api/v1/mock/project_id',
  )
  const dispatch = useAppDispatch()
  // 根据模式，获取对应的数据
  const { userReqInfo, reqParams, projectId, metaInfo, apiData } =
    useAppSelector((state) => {
      const res = {} as {
        userReqInfo: BaseInfoType
        reqParams: RequestParamsType
        metaInfo: MetaInfo
        apiData: IAPIInfo
      }
      if (mode === 'mock') {
        res.userReqInfo = state.mock.mockData.apiInfo.base
        res.reqParams = state.mock.mockData.apiInfo.request
        res.metaInfo = state.mock.mockData.meta_info
        res.apiData = state.mock.mockData
      } else {
        res.userReqInfo = state.mock.runData.apiInfo.base
        res.reqParams = state.mock.runData.apiInfo.request
        res.metaInfo = state.mock.runData.meta_info
        res.apiData = state.mock.runData
      }
      return { ...res, projectId: state.project.projectInfo.id }
    })

  useEffect(
    () => setMockPrefix(`https://lyyfsq.club:7000/api/v1/mock/${projectId}`),
    [projectId],
  )

  // 由于组件需要额外冗余增加一个属性，需要保持与userReqInfo中的method一致
  const [userMethod, setUserMethod] = useState<ApiOptReqOptType>({
    label: 'GET',
    value: 'GET',
  })

  useEffect(() => {
    setUserMethod({ label: userReqInfo.method, value: userReqInfo.method })
  }, [userReqInfo])

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

  // 普通的发送请求按钮，与运行页面功能一致当是mock时，改为发送mock请求
  const handleSend = async () => {
    // 将ApiKnight文档中的参数格式转换成发送请求的格式
    const headers = {}
    const queries = {}
    let cookies = ''
    // 组织headers和cookies
    reqParams.params.forEach((item) => (headers[item.paramName] = item.value))
    reqParams.cookie.forEach(
      (item) => (cookies += `${item.paramName}=${item.value}; `),
    )
    headers['Cookie'] = cookies
    // 组织queries
    reqParams.params.forEach((item) => (queries[item.paramName] = item.value))

    let url = `${userReqInfo.prefix}/${userReqInfo.path}`
    if (mode === 'mock') {
      url = `https://lyyfsq.club:7000/api/v1/mock/${projectId}/${userReqInfo.path}`
    }
    const { data } = await requestByServerProxy({
      url: url,
      method: userReqInfo.method,
      headers,
      data: reqParams.body,
    })
    try {
      const jsonResBody = JSON.stringify(data)
      dispatch(changeResponseBodyAction(jsonResBody))
    } catch (err) {
      console.log('response body translate to json failed')
      dispatch(changeResponseBodyAction(data + ''))
    }
  }

  // 创建Mock服务
  const handleCreateMock = async () => {
    // 将ApiKnight文档中的参数格式转换成发送请求的格式
    const headers = {}
    const queries = {}
    let cookies = ''
    // 组织headers和cookies
    reqParams.params.forEach((item) => (headers[item.paramName] = item.value))
    reqParams.cookie.forEach(
      (item) => (cookies += `${item.paramName}=${item.value}; `),
    )
    headers['Cookie'] = cookies
    // 组织queries
    reqParams.params.forEach((item) => (queries[item.paramName] = item.value))

    const res = await createMock({
      project_id: projectId,
      url: '/' + userReqInfo.path,
      method: userReqInfo.method.toLowerCase(),
      apis_id: metaInfo.api_id,
      name: metaInfo.name,
      headers: JSON.stringify(headers),
      params: JSON.stringify(queries),
      response: getMockNeedResponse(apiData.apiInfo.response.body),
      data: apiData.apiInfo.response.body,
    })
    if (res.code === 200) {
      message.success('创建成功')
    }
  }

  // 对用户对response进行处理
  const getMockNeedResponse = (body: string) => {
    let res = {}
    try {
      const respObj = JSON.parse(body)
      res = {
        example: respObj,
      }
    } catch (error) {
      res = {
        example: { data: body },
      }
    }
    console.log(JSON.stringify(res))

    return JSON.stringify(res)
  }

  return (
    <div className='doc-operator'>
      <ApiOperator
        methodValue={userMethod}
        onOptionChange={(m) => handleMethodChange(m)}
        onPrefixInputChange={(e) => handleInputChange(e, 'prefix')}
        onInputChange={(e) => handleInputChange(e, 'path')}
        inputValue={userReqInfo.path}
        urlPrefixValue={mode === 'run' ? userReqInfo.prefix : mockPrefix}
        disablePrefix={mode === 'mock'}
        rightWidth={mode === 'mock' ? '250px' : '150px'}
      >
        {/* 运行的发送由handleSendBtnClick控制，mock的发送和创建由handleMock控制 */}
        <Button className='btn' type='primary' onClick={handleSend}>
          发送
        </Button>

        {mode === 'mock' && (
          <Button
            type='primary'
            style={{ marginLeft: '10px' }}
            onClick={handleCreateMock}
          >
            创建Mock
          </Button>
        )}
      </ApiOperator>
    </div>
  )
}

export default memo(withMode(MockUrl))
