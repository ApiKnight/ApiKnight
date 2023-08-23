import React, { memo, useState } from 'react'
import { Button, App, Modal, Input } from 'antd'
import type { ApiOptReqOptType } from '@/types/components'
import './index.less'
import ApiOperator from '@/components/ApiOperator'
import { shallowEqualApp, useAppDispatch, useAppSelector } from '@/store'
import {
  changeMethodAction,
  changePrefixAction,
  changePathAction,
  changeUpdateStatusAction,
  updateDocumentApiAction,
} from '@/store/modules/document/document'
import { deleteApi } from '@/api'
import { increment } from '@/store/modules/watchDir'
import { removeData } from '@/store/modules/tabSlice'
import { setValue } from '@/store/modules/rightSlice'

const DocOperator: React.FunctionComponent = memo(() => {
  const { message, modal } = App.useApp()
  const dispatch = useAppDispatch()
  const { baseInfo, apiId, onUpdating, onUploading } = useAppSelector(
    (state) => ({
      baseInfo: state.document.apiData.apiInfo.base,
      apiId: state.document.apiId,
      onUpdating: state.document.onUpdating,
      onUploading: state.document.onUploading,
    }),
    shallowEqualApp,
  )
  // 保存接口备注
  const [saveRemark, setSaveRemark] = useState<string>('')

  // 由于组件需要额外冗余增加一个属性，需要保持与userReqInfo中的method一致
  const [method, setMethod] = useState<ApiOptReqOptType>({
    label: 'GET',
    value: 'GET',
  })

  // 请求方式改变事件
  const handleMethodChange = (methodOpt: ApiOptReqOptType): void => {
    setMethod(methodOpt)
    dispatch(changeMethodAction(methodOpt.value))
  }

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

  // 确认保存信息
  const handleConfimSave = () => {
    dispatch(updateDocumentApiAction(saveRemark))
  }

  // 删除信息
  const handleDelInfo = () => {
    modal.confirm({
      title: '删除接口',
      content: '确定要删除该接口吗？删除后不可恢复',
      onOk: async () => {
        // 删除接口信息
        const res = await deleteApi(apiId)
        message.success(res.message)
        // 刷新页面
        dispatch(increment())
        dispatch(removeData(apiId))
        dispatch(setValue('gl'))
      },
      onCancel: () => {},
    })
  }

  return (
    <div className='doc-operator'>
      <ApiOperator
        methodValue={method}
        onOptionChange={(m) => handleMethodChange(m)}
        onPrefixInputChange={(e) => handleInputChange(e, 'prefix')}
        onInputChange={(e) => handleInputChange(e, 'path')}
        urlPrefixValue={baseInfo.prefix}
        inputValue={baseInfo.path}>
        <Button
          className='btn'
          type='primary'
          onClick={() =>
            dispatch(changeUpdateStatusAction({ onUpdating: true }))
          }>
          保存
        </Button>
        <Button className='btn' onClick={handleDelInfo}>
          删除
        </Button>
      </ApiOperator>

      {/* 确认保存对话框 */}
      <Modal
        title='保存接口信息'
        open={onUpdating}
        confirmLoading={onUploading}
        onOk={handleConfimSave}
        onCancel={(e) =>
          dispatch(changeUpdateStatusAction({ onUpdating: false }))
        }>
        <Input
          style={{ marginTop: '15px' }}
          placeholder='接口修改备注'
          value={saveRemark}
          onChange={(e) => setSaveRemark(e.target.value)}
        />
      </Modal>
    </div>
  )
})

export default DocOperator
