import React, { memo, useCallback, useEffect, useState } from 'react'
import { Button, App, Modal, Input } from 'antd'
import type { ApiOptReqOptType } from '@/types/components'
import './index.less'
import ApiOperator from '@/components/ApiOperator'
import { useAppDispatch, useAppSelector } from '@/store'
import {
  changeMethodAction,
  changePrefixAction,
  changePathAction,
  changeUpdateStatusAction,
  updateDocumentApiAction,
} from '@/store/modules/document/document'
import { deleteApi } from '@/api'
import { increment } from '@/store/modules/watchDir'
import { removeData, upData } from '@/store/modules/tabSlice'
import { setValue } from '@/store/modules/rightSlice'
import { usePrevious } from '@/hooks/usePrevious'
import { forceFetchApiDataAction } from '@/store/modules/mock'

// eslint-disable-next-line react-refresh/only-export-components
const DocOperator: React.FunctionComponent = () => {
  const { message, modal } = App.useApp()
  const dispatch = useAppDispatch()
  const { baseInfo, apiId, apiName, onUpdating, onUploading } = useAppSelector(
    (state) => ({
      baseInfo: state.document.apiData.apiInfo.base,
      apiId: state.document.apiId,
      onUpdating: state.document.onUpdating,
      onUploading: state.document.onUploading,
      apiName: state.document.apiName,
    }),
  )

  // 通知其他redux等更新数据
  const updateOthers = useCallback(() => {
    // 通知接口目录
    dispatch(increment())
    // 通知运行和mock
    dispatch(forceFetchApiDataAction(apiId))
    console.log(apiName)
  }, [apiId, apiName, dispatch])

  // 保存上一次的更新状态
  const previousOnloading = usePrevious(onUploading)
  useEffect(() => {
    // 如果此次onloading从true变为false，说明此次上传已经完成
    if (previousOnloading && !onUploading) {
      updateOthers()
    }
  }, [onUploading, previousOnloading, updateOthers])

  // 保存接口备注
  const [saveRemark, setSaveRemark] = useState<string>('')

  // 由于组件需要额外冗余增加一个属性，需要保持与userReqInfo中的method一致
  const [method, setMethod] = useState<ApiOptReqOptType>({
    label: 'GET',
    value: 'GET',
  })

  useEffect(() => {
    setMethod({ label: baseInfo.method, value: baseInfo.method })
  }, [baseInfo])

  // 请求方式改变事件
  const handleMethodChange = useCallback(
    (methodOpt: ApiOptReqOptType): void => {
      setMethod(methodOpt)
      dispatch(changeMethodAction(methodOpt.value))
    },
    [dispatch],
  )

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
  const [isEmpty, setIsEmpty] = useState<'' | 'error' | 'warning'>('')
  // 确认保存信息
  const handleConfimSave = () => {
    if (saveRemark === '') {
      setIsEmpty('error')
    } else {
      dispatch(updateDocumentApiAction(saveRemark))
      dispatch(
        upData({
          key: apiId,
          type: method,
          title: apiName,
        }),
      )
    }
  }

  // 删除信息
  const handleDelInfo = useCallback(() => {
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
  }, [apiId, dispatch, message, modal])

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
        onCancel={(_e) =>
          dispatch(changeUpdateStatusAction({ onUpdating: false }))
        }>
        <Input
          style={{ marginTop: '15px' }}
          status={isEmpty}
          placeholder='接口修改备注'
          value={saveRemark}
          onChange={(e) => setSaveRemark(e.target.value)}
        />
        {isEmpty === 'error' && (
          <div style={{ color: 'red' }}>输入框信息不能为空</div>
        )}
      </Modal>
    </div>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export default memo(DocOperator)
