import React, { memo } from 'react'
import { App, Button } from 'antd'
import classNames from 'classnames'

import { useAppDispatch, useAppSelector } from '@/store'
import './index.less'
import { formatTime } from '@/utils/math'
import { deleteApi } from '@/api'
import { increment } from '@/store/modules/watchDir'
import { removeData } from '@/store/modules/tabSlice'
import { setValue } from '@/store/modules/rightSlice'

const IntroInfo: React.FunctionComponent = memo(() => {
  const { message, modal } = App.useApp()
  const dispatch = useAppDispatch()
  const { metaInfo, ownerInfo, folderName, apiId, baseInfo } = useAppSelector(
    (state) => ({
      metaInfo: state.document.apiData.meta_info,
      ownerInfo: state.document.ownerUser,
      folderName: state.document.folderName,
      apiId: state.document.apiId,
      baseInfo: state.document.apiData.apiInfo.base,
    }),
  )

  // 删除接口按钮点击事件
  function handleDel() {
    // 删除接口成功事件
    const okEvent = async () => {
      // 删除接口信息
      const res = await deleteApi(apiId)
      if (res.code === 200) {
        message.success(res.message)
      } else {
        message.error(res.message)
      }

      // 刷新页面
      dispatch(increment())
      dispatch(removeData(apiId))
      dispatch(setValue('gl'))
    }

    modal.confirm({
      title: '删除接口',
      content: '确定要删除该接口吗？删除后不可恢复',
      onOk: okEvent,
      onCancel: () => {},
    })
  }

  return (
    <div className='intro-request'>
      <div className='name-wrap'>
        <div
          className={classNames(
            'method',
            'method-' + baseInfo.method.toLowerCase(),
          )}>
          {baseInfo.method}
        </div>
        <div className='title'>{metaInfo.name}</div>
        <div className='opt-wrap'>
          <Button type='primary'>生成代码</Button>
          <Button
            style={{ marginLeft: '10px', marginRight: '20px' }}
            onClick={handleDel}>
            删除
          </Button>
        </div>
      </div>
      <div className='meta-info'>
        <div className='meta-item'>
          <span className='title'>创建时间</span>
          <span className='val'>{formatTime(metaInfo.created)}</span>
        </div>
        <div className='meta-item'>
          <span className='title'>创建者</span>
          <span className='val'>{ownerInfo.username}</span>
        </div>
        <div className='meta-item'>
          <span className='title'>所在目录</span>
          <span className='val'>{folderName}</span>
        </div>
      </div>
    </div>
  )
})

export default IntroInfo
