import React, { memo } from 'react'
import type { ReactNode } from 'react'
import { Card, Tag } from 'antd'
import './index.less'
import { useAppSelector } from '@/store'
import { NormalParamsType } from '@/types/api'
import CodeEditor from '@/components/CodeEditor'

const IntroRequest: React.FunctionComponent = memo(() => {
  const { requestInfo } = useAppSelector((state) => ({
    requestInfo: state.document.apiData.apiInfo.request,
  }))

  function getParamOptItem(paramType: string): ReactNode {
    if (paramType === 'body') {
      return (
        <Card
          size='small'
          title={paramType.slice(0, 1).toUpperCase() + paramType.slice(1)}
          style={{ width: '100%' }}>
          <div className='code-card-body-info'>
            <span className='body-title'>示例值</span>
            <div className='body-content'>
              <CodeEditor
                height='250px'
                lang='json'
                readOnly
                withBorder
                defaultValue={requestInfo[paramType]}
              />
            </div>
          </div>
        </Card>
      )
    } else {
      return (
        <Card
          size='small'
          title={paramType.slice(0, 1).toUpperCase() + paramType.slice(1)}
          // extra={<a href='#'>生成代码</a>}
          style={{ width: '100%' }}>
          {requestInfo[paramType].map((paramItem: NormalParamsType) => {
            return getNormalParamItem(paramItem)
          })}
        </Card>
      )
    }
  }

  function getNormalParamItem(paramItem: NormalParamsType): ReactNode {
    return (
      <div className='param-kv' key={paramItem.id}>
        <div className='type'>
          <div className='param-name label'>
            <Tag color='cyan'>{paramItem.paramName}</Tag>
          </div>
          <div className='param-type'>{paramItem.type}</div>
          <div className='require'>
            <Tag color='default'>{paramItem.required ? '必选' : '可选'}</Tag>
          </div>
        </div>
        <div className='example'>
          <div className='label'>示例值</div>
          <div className='val'>
            <div className='example-tag'>
              {paramItem.value ? paramItem.value : '无'}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='intro-req'>
      <div className='setction-title'>请求参数</div>
      <div className='req-content'>
        {Object.keys(requestInfo).map((item) => {
          return (
            <div className='param-item' key={item}>
              {getParamOptItem(item)}
            </div>
          )
        })}
      </div>
    </div>
  )
})

export default IntroRequest
