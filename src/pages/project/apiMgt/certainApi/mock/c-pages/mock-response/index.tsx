import React, { memo } from 'react'

import './index.less'
import { useAppDispatch, useAppSelector } from '@/store'
import { ResponseType } from '@/types/api'
import withMode from '../../with-mode'
import CodeEditor from '@/components/CodeEditor'
import { changeResponseBodyAction } from '@/store/modules/mock'

// eslint-disable-next-line react-refresh/only-export-components
const MockResponse: React.FunctionComponent<{ mode: 'run' | 'mock' }> = (
  props,
) => {
  const dispatch = useAppDispatch()

  const { responseInfo } = useAppSelector((state) => {
    const res = {} as { responseInfo: ResponseType }
    if (props.mode === 'mock') {
      res.responseInfo = state.mock.mockData.apiInfo.response
    } else {
      res.responseInfo = state.mock.runData.apiInfo.response
    }
    return res
  })

  return (
    <div className='response-page'>
      <div className='section-title'>返回响应</div>
      <div className='content'>
        <CodeEditor
          defaultValue={responseInfo.body}
          height='200px'
          withBorder
          onChange={(value) =>
            props.mode === 'run' && dispatch(changeResponseBodyAction(value))
          }
          readOnly={props.mode === 'mock'}
        />
      </div>
    </div>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export default memo(withMode(MockResponse))
