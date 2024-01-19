import React, { memo, useMemo } from 'react'
import { Input, Select, message } from 'antd'
const { TextArea } = Input

import { StatusValue } from '@/types/enum'
import './index.less'
import { useAppDispatch, useAppSelector } from '@/store'
import { IUserInfo } from '@/api/user/type'
import {
  changeApiDescAction,
  changeApiNameAction,
  changeDevStatusAction,
  changeTagsAction,
} from '@/store/modules/document/document'
import tagRender from './tag-render'

type SelectType = 'status' | 'owner' | 'tag'
type InputType = 'name' | 'desc'

type DevStatus = { label: string; value: StatusValue }
type TagType = { label: string; value: string }

// 全部开发状态
const allDevStatus: DevStatus[] = [
  { label: '已发布', value: StatusValue.RELEASE },
  { label: '测试中', value: StatusValue.TESTING },
  { label: '将废弃', value: StatusValue.DEPRECATE },
  { label: '开发中', value: StatusValue.DEVELOPING },
]

const tagsColor = {
  默认标签: '#1697ff',
  查询: '#1677ff',
  机密: '#f5222d',
  内部: '#fa541c',
  外部: '#7cb305',
  未发布: '#13c2c2',
  已发布: '#52c41a',
}

const allTags: TagType[] = [
  '默认标签',
  '查询',
  '机密',
  '内部',
  '外部',
  '未发布',
  '已发布',
].map((item) => ({ label: item, value: tagsColor[item] }))

/**
 *
 * @param value value值
 * @returns 索引
 */
const getItemByVal: <T>(arr: T[], value: T) => T = (list, value) => {
  const index = allDevStatus.findIndex((item) => item.value === value)
  return list[index]
}

type Owner = { label: string; value: string }

const DocInfo: React.FunctionComponent = () => {
  const dispatch = useAppDispatch()
  const { metaInfo, ownerUser } = useAppSelector((state) => ({
    metaInfo: state.document.apiData.meta_info,
    ownerUser: state.document.ownerUser,
  }))
  // 开发状态信息
  const devStatus = useMemo(() => {
    return getItemByVal(allDevStatus, metaInfo.status as unknown as DevStatus)
  }, [metaInfo.status])

  // 标签信息
  const tags = useMemo(() => {
    const values = metaInfo.tags.map((item) => ({
      label: item,
      value: tagsColor[item],
    }))

    return values
  }, [metaInfo.tags])
  // 候选负责人列表
  const directors: Owner[] = [
    {
      label: '@' + ownerUser.username,
      value: ownerUser.id,
    },
  ]
  // 责任人信息
  const owner = useMemo(() => {
    return directors[0]
  }, [ownerUser])
  type Value = StatusValue | IUserInfo | TagType[] | DevStatus | Owner
  // 下拉框选择事件
  const handleSelectChange = (value: Value, type: SelectType) => {
    switch (type) {
      case 'status':
        dispatch(changeDevStatusAction(value as StatusValue))
        break
      case 'owner':
        handleChangeOwnerInfo(value as IUserInfo)
        break
      case 'tag':
        handleTagChange(value as TagType[])
        break
    }
  }

  // 改变用户信息
  const handleChangeOwnerInfo = (_ownerInfo: IUserInfo) => {
    // 暂无处理逻辑
    console.log(owner)
  }
  // 标签改变事件
  const handleTagChange = (value: TagType[]) => {
    if (value.length > 4) {
      message.error('最多选择4个标签')
      return
    }
    const tagValues = value.map((item) => item.label)
    dispatch(changeTagsAction(tagValues))
  }

  // 输入框输入事件
  const handleInputChange = (value: string, type: InputType) => {
    switch (type) {
      case 'name':
        dispatch(changeApiNameAction(value))
        break
      case 'desc':
        dispatch(changeApiDescAction(value))
        break
    }
  }

  return (
    <div className='doc-info'>
      {/* 接口名称 */}
      <div className='api-name'>
        <Input
          placeholder='未命名接口'
          value={metaInfo.name}
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
            value={tags}
            tagRender={tagRender}
            mode='multiple'
            key='label'
            style={{ width: '90%' }}
            onChange={(_, option) => handleSelectChange(option, 'tag')}
            options={allTags}
          />
        </div>
      </div>
      {/* 接口说明 */}
      <div className='api-desc'>
        <div className='label'>说明</div>
        <TextArea
          placeholder='接口说明信息'
          rows={3}
          value={metaInfo.desc}
          onChange={(e) => handleInputChange(e.target.value, 'desc')}
        />
      </div>
    </div>
  )
}

export default memo(DocInfo)
