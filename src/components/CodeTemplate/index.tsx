import React, { useState } from 'react'
import './index.less'
import type { MenuProps } from 'antd'
import { Menu } from 'antd'
import { itemsIndex } from './constant'

const CodeTemplate: React.FC = () => {
  const [current, setCurrent] = useState('1')
  const onClick: MenuProps['onClick'] = (e: any) => {
    setCurrent(e.key)
  }
  let CodeContent = null
  CodeContent =
    current === '1'
      ? React.lazy(() => import('./JSCodeContent'))
      : current === '2'
        ? React.lazy(() => import('./JavaCodeContent'))
        : React.lazy(() => import('./GoCodeContent'))
  console.log(CodeContent)
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <div className='codeTemplate'>
        <div className='codeTemplate-body'>
          <Menu
            onClick={onClick}
            style={{ width: 120 }}
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            mode='inline'
            items={itemsIndex}
          />
          <CodeContent />
        </div>
      </div>
    </React.Suspense>
  )
}

export default CodeTemplate
