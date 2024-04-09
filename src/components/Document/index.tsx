import React, { useCallback, useEffect, useState } from 'react'
import { Button, notification, Spin, Tag } from 'antd'
import type { NotificationPlacement } from 'antd/es/notification/interface'
import './index.less'
import MethodList from '@/components/MethodList'
import request from '@/api/request'
import type { DocumentTypes } from '@/types/document'
import { AxiosResponse } from 'axios'
import { Result } from '@/api/request.type'
import { ApiType, CreateUser } from '@/types/response.type'

const Document: React.FunctionComponent<{ data: string }> = (props) => {
  const { data } = props
  const [api, contextHolder] = notification.useNotification()
  const [showLoading, setShowLoading] = useState(false)
  // url这里正常应该包含在rquest_data中，这里未定结构，暂时写死
  const [url] = useState('/example')
  const [createUser, SetCreateUser] = useState('')
  const [changeUser, SetChangeUser] = useState('')
  const [apiName, setApiName] = useState('ApiName')
  const [floderName, setFolderName] = useState('根目录')
  const openNotification = useCallback(
    (placement: NotificationPlacement) => {
      api.info({
        message: <p>复制成功</p>,
        description: <p></p>,
        placement,
      })
    },
    [api],
  )
  const copy = useCallback(() => {
    navigator.clipboard
      .writeText(url)
      .then(() => {
        openNotification('topRight')
      })
      .catch((error) => {
        console.log(error)
      })
  }, [openNotification, url])
  const getFolderName = useCallback((folderId: string): void => {
    request
      .post(
        '/v1/folder/queryname',
        {
          folder_id: folderId,
        },
        {},
      )
      .then((resp: AxiosResponse<Result<string>>) => {
        if (resp.data.code == 200) {
          setFolderName(resp.data.data)
        }
      })
  }, [])
  const getCreateUser = useCallback((userId: string): void => {
    request
      .post(
        '/v1/user/query',
        {
          user_id: userId,
        },
        {},
      )
      .then((resp: AxiosResponse<Result<CreateUser>>) => {
        SetCreateUser(resp.data.data.username)
      })
  }, [])
  const getChangeUser = useCallback((userId: string): void => {
    setShowLoading(true)
    request
      .post(
        '/v1/user/query',
        {
          user_id: userId,
        },
        {},
      )
      .then((resp: AxiosResponse<Result<CreateUser>>) => {
        if (resp.data.code == 200) {
          SetChangeUser(resp.data.data.username)
          setShowLoading(false)
        }
      })
  }, [])
  const [allValue, setAllValue] = useState<DocumentTypes>({
    id: '',
    folder_id: '',
    create_user: '',
    create_time: '',
    operate_time: '',
    operate_user: '',
    request_data: '',
    response_data: '',
    project_id: 0,
    description: '',
    name: '',
  })
  type ApiTypeDoc = Required<
    Omit<ApiType, 'creat_user'> & { create_user: string }
  >
  useEffect(() => {
    request
      .post(
        '/v1/apis/query',
        {
          apis_id: data,
        },
        {},
      )
      .then((resp: AxiosResponse<Result<ApiTypeDoc>>) => {
        setAllValue(resp.data.data)
        getCreateUser(resp.data.data.create_user as string)
        getChangeUser(resp.data.data.operate_user)
        setApiName(resp.data.data.name)
        getFolderName(resp.data.data.folder_id)
      })
  }, [data, getChangeUser, getCreateUser, getFolderName, props])

  return (
    <div className='document'>
      {showLoading && (
        <Spin tip='Loading' size='large'>
          <div className='content' />
        </Spin>
      )}
      {contextHolder}
      <div className='document--title'>
        <div className='document--title__left'>
          <h3>{apiName}</h3>
          <span onClick={copy}>
            <Tag color='gold'>
              <MethodList value={'POST'}></MethodList>
            </Tag>
            {url}
          </span>
          <span>开发中</span>
        </div>
        <div className='document--title__right'>
          <Button size='large'>运行</Button>
        </div>
      </div>
      <div className='document--info'>
        <ul>
          <li>创建时间 {allValue.create_time}</li>
          <li>修改时间 {allValue.operate_time}</li>
          <li>修改者 {changeUser}</li>
          <li>创建者 {createUser}</li>
          <li>目录 {floderName}</li>
        </ul>
      </div>
      <div className='document-mock'>
        <h3>MOCK (不知道该加啥)</h3>
      </div>
      <div className='document-request'>
        <h3>
          {/* 同URL一样是包含在request_data中，这里暂时写死 */}
          请求参数: 无
        </h3>
      </div>
      <div className='document-running'>
        <h3>返回响应（这边可能可以复用运行那边的组件，待定）</h3>
      </div>
    </div>
  )
}

export default Document
