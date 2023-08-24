import React, { memo } from 'react'
import { Card } from 'antd'
import './index.less'
import { useSelector } from 'react-redux'
import { useAppSelector } from '@/store'
import CodeEditor from '@/components/CodeEditor'

const IntroResponse: React.FunctionComponent = memo(() => {
  const { responseInfo } = useAppSelector((state) => ({
    responseInfo: state.document.apiData.apiInfo.response,
  }))
  return (
    <div className='intro-response'>
      <div className='setction-title'>返回响应</div>
      <div className='content'>
        <Card
          size='small'
          title='响应示例'
          extra={<a href='#'>生成代码</a>}
          style={{ width: '100%' }}>
          <div className='content-value'>
            <div className='code-card-body-info'>
              <span className='body-title'>示例值</span>
              <div className='body-content'>
                <CodeEditor
                  height='250px'
                  lang='json'
                  readOnly
                  withBorder
                  defaultValue={responseInfo.body}
                />
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
})

export default IntroResponse
