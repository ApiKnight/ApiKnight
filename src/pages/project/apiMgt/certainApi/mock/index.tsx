import React, { useEffect } from 'react'
import './index.less'
import MockReqParams from './c-pages/mock-req-params'
import MockResponse from './c-pages/mock-response'
import MockUrl from './c-pages/mock-url'
import { useAppDispatch, useAppSelector } from '@/store'
import {
  changeMockModeAction,
  forceFetchApiDataAction,
} from '@/store/modules/mock'
import { IMockProps } from './type'
import ModeContext from './mode-context'

const Mock: React.FunctionComponent<IMockProps> = (props) => {
  const { mode, project_id } = props //run为运行,mock为mock
  console.log(project_id)
  const { apiId } = useAppSelector((state) => ({
    apiId: state.rightSlice.value,
  }))
  const dispatch = useAppDispatch()
  useEffect(() => {
    if (apiId !== 'gl') {
      dispatch(changeMockModeAction(mode))
      // 根据接口id获取接口信息
      dispatch(forceFetchApiDataAction(apiId))
    }
  }, [dispatch, apiId])

  return (
    <div>
      <div className='mock-page'>
        <ModeContext.Provider value={{ ...props }}>
          <MockUrl mode={mode} />
          <MockReqParams mode='run' />
          <MockResponse mode={mode} />
        </ModeContext.Provider>
      </div>
    </div>
  )
}

export default Mock
