import React, { memo, useState } from 'react'
import { Input, Select } from 'antd'
const { TextArea } = Input
import './index.less'

type SelectType = 'status' | 'owner' | 'tag'
type InputType = 'name' | 'desc'

enum StatusValue {
  RELEASE = 1,
  TESTING = 2,
  DEPRECATE = 3,
  DEVELOPING = 4,
}

type DevStatus = { label: string; value: StatusValue }

// 开发状态
const allDevStatus: DevStatus[] = [
  { label: '已发布', value: StatusValue.RELEASE },
  { label: '测试中', value: StatusValue.TESTING },
  { label: '将废弃', value: StatusValue.DEPRECATE },
  { label: '开发中', value: StatusValue.DEVELOPING },
]

type Owner = { label: string; value: any }
// 候选负责人
const directors: Owner[] = [{ label: '张三(@张三)', value: 1 }]

const DocInfo: React.FunctionComponent = memo(() => {
  // 状态
  const [devStatus, setDevStatus] = useState(allDevStatus[0])
  // 责任人
  const [owner, setOwner] = useState(directors[0])
  // 接口名称
  const [apiName, setApiName] = useState('')
  // 接口描述
  const [apiDesc, setApiDesc] = useState('')

  // 下拉框选择事件
  const handleSelectChange = (value: any, type: SelectType) => {
    switch (type) {
      case 'status':
        setDevStatus(value)
        break
      case 'owner':
        setOwner(value)
        break
      case 'tag':
        break
    }
  }

  // 输入框输入事件
  const handleInputChange = (value: string, type: InputType) => {
    switch (type) {
      case 'name':
        setApiName(value)
        break
      case 'desc':
        setApiDesc(value)
        break
    }
  }

  return (
    <div className='doc-info'>
      {/* 接口名称 */}
      <div className='api-name'>
        <Input
          placeholder='未命名接口'
          value={apiName}
          onChange={(e) => handleInputChange(e.target.value, 'name')}
        />
      </div>
      {/* 接口状态 */}
      <div className='api-status'>
        <div className='status-item'>
          <div className='label'>状态</div>
          <Select
            value={devStatus}
            style={{ width: '90%' }}
            onChange={(value) => handleSelectChange(value, 'status')}
            options={allDevStatus}
          />
        </div>
        <div className='status-item'>
          <div className='label'>责任人</div>
          <Select
            value={owner}
            style={{ width: '90%' }}
            onChange={(value) => handleSelectChange(value, 'owner')}
            options={directors}
          />
        </div>

        <div className='status-item'>
          <div className='label'>标签</div>
          <Select
            defaultValue='不确定是否需要加，暂时留空'
            style={{ width: '90%' }}
            onChange={(value) => handleSelectChange(value, 'tag')}
            options={[
              {
                value: '不确定是否需要加，暂时留空',
                label: '不确定是否需要加，暂时留空',
              },
            ]}
          />
        </div>
      </div>
      {/* 接口说明 */}
      <div className='api-desc'>
        <div className='label'>说明</div>
        <TextArea
          placeholder='接口说明信息'
          rows={3}
          onChange={(e) => handleInputChange(e.target.value, 'desc')}
        />
      </div>
    </div>
  )
})

export default DocInfo
