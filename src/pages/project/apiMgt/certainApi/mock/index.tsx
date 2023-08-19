import React, { useEffect, useState } from 'react'
import './index.less'
import MockReqParams from './c-pages/mock-req-params'
import MockResponse from './c-pages/mock-response'
import MockUrl from './c-pages/mock-url'
import { useAppDispatch } from '@/store'
import { changeMockModeAction, fetchApiDataAction } from '@/store/modules/mock'
import { IMockProps } from './type'

const Mock: React.FunctionComponent<IMockProps> = (props) => {
  const { mode } = props //run为运行,mock为mock

  const dispatch = useAppDispatch()
  dispatch(changeMockModeAction(mode))

  useEffect(() => {
    // 获取接口信息
    dispatch(fetchApiDataAction())
  }, [dispatch])

  return (
    <div className='mock-page'>
      <MockUrl />
      <MockReqParams />
      <MockResponse />
    </div>
  )
}

export default Mock
