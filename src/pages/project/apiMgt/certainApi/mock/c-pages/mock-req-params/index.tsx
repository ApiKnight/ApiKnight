import React, { memo, useEffect, useState } from 'react'
import classNames from 'classnames'
import { cloneDeep, isEqual, clone } from 'lodash'
import { Input, Table } from 'antd'
const { TextArea } = Input

import { type ReqParamsPropsType, NavType, type NavItem } from './type'
import type { NormalParamsType } from '@/store/modules/document'

import './index.less'
import { useAppSelector, shallowEqualApp } from '@/store'

const NavItems: NavItem[] = [
  { label: 'Params', value: NavType.Params },
  { label: 'Body', value: NavType.Body },
  { label: 'Cookie', value: NavType.Cookie },
  { label: 'Header', value: NavType.Header },
]

const MockReqParams: React.FunctionComponent<ReqParamsPropsType> = (props) => {
  let { reqData } = useAppSelector(
    (state) => ({
      reqData: state.document.apiInfo.request,
    }),
    shallowEqualApp,
  )
  // 深拷贝一份，避免修改原数据
  const [requestInfo, setRequestInfo] = useState(cloneDeep(reqData))
  // 当前选择的项
  const [currentNav, setCurrentNav] = useState(NavType.Params)

  useEffect(() => {
    // 内容修改了通知父组件
    if (!isEqual(reqData, requestInfo)) {
      if (props.onInfoChange) {
        props.onInfoChange(requestInfo, 'request')
      }
    }
  }, [requestInfo])

  // 表格列信息
  const columns = [
    {
      title: '参数名',
      dataIndex: 'paramName',
      width: 150,
      render: (text: string, _: any, index: number) => (
        <Input
          placeholder='参数名'
          value={text}
          onChange={(e) =>
            handleNormalParamsChange(e.target.value, 'paramName', index)
          }
        />
      ),
    },
    {
      title: '参数值',
      dataIndex: 'value',
      render: (text: string, _: any, index: number) => (
        <Input
          placeholder='参数值'
          value={text}
          onChange={(e) =>
            handleNormalParamsChange(e.target.value, 'value', index)
          }
        />
      ),
    },
  ]

  // 键值对参数内容编辑事件
  const handleNormalParamsChange = (
    value: string,
    type: 'paramName' | 'value',
    index: number,
  ): void => {
    let newInfo = clone(requestInfo)
    switch (currentNav) {
      case NavType.Params:
        newInfo.params[index][type] = value
        break
      case NavType.Header:
        newInfo.headers[index][type] = value
        break
      case NavType.Cookie:
        newInfo.cookie[index][type] = value
        break
    }
    setRequestInfo(newInfo)
  }

  const getTableData = (): NormalParamsType[] => {
    switch (currentNav) {
      case NavType.Params:
        return requestInfo.params
      case NavType.Header:
        return requestInfo.headers
      case NavType.Cookie:
        return requestInfo.cookie
      default:
        return []
    }
  }

  // 获取表格数据
  const handleBodyChange = (value: string): void => {
    const newInfo = clone(requestInfo)
    newInfo.body = value
    setRequestInfo(newInfo)
  }

  // 请求参数内容渲染
  const renderContent = (): JSX.Element => {
    if (currentNav === NavType.Body) {
      return (
        <TextArea
          rows={6}
          placeholder='请求体内容'
          value={requestInfo.body}
          onChange={(e) => handleBodyChange(e.target.value)}
        />
      )
    } else {
      return (
        <Table
          dataSource={getTableData()}
          columns={columns}
          rowKey='paramName'
          pagination={false}
          bordered
          size='small'
        />
      )
    }
  }
  return (
    <div className='mock-request'>
      <div className='section-title'>请求参数</div>
      {/* 请求设置导航：Params、Body、Cookie、Header、Auth */}
      <div className='req-nav'>
        {NavItems.map((item) => (
          <div
            className={classNames('nav-item', {
              active: currentNav === item.value,
            })}
            key={item.value}
            onClick={() => setCurrentNav(item.value)}>
            {item.label}
          </div>
        ))}
      </div>
      {/* 请求设置内容 */}
      <div className='content'>{renderContent()}</div>
    </div>
  )
}

export default memo(MockReqParams)
