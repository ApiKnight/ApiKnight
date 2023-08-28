import React, { useEffect, useState } from 'react'
import './index.less'
import MockReqParams from './c-pages/mock-req-params'
import MockResponse from './c-pages/mock-response'
import MockUrl from './c-pages/mock-url'
import { useAppDispatch } from '@/store'
import { changeMockModeAction, fetchApiDataAction } from '@/store/modules/mock'
import { IMockProps } from './type'
import ModeContext from './mode-context'
import getMockList from '@/api/getMockList'

const Mock: React.FunctionComponent<IMockProps> = (props) => {
  const { mode, data, project_id } = props //run为运行,mock为mock

  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(changeMockModeAction(mode))
    // 根据接口id获取接口信息
    dispatch(fetchApiDataAction(data))
  }, [dispatch])

  return (
    <div>
      <div className='mock-page'>
        <ModeContext.Provider value={{ ...props }}>
          <MockUrl project_id={project_id} mode={{ mode }} />
          <MockReqParams />
          <MockResponse />
        </ModeContext.Provider>
      </div>
    </div>
  )
}

export default Mock
