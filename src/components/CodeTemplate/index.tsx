import React, { useState } from 'react'
import './index.less'
import JSCodeContent from './JSCodeContent'
import type { MenuProps } from 'antd'
import { Menu } from 'antd'
import JavaCodeContent from './JavaCodeContent'
import GoCodeContent from './GoCodeContent'
import { itemsIndex } from './constant'

const CodeTemplate: React.FC = () => {
  const [current, setCurrent] = useState('1')
  const onClick: MenuProps['onClick'] = (e: any) => {
    setCurrent(e.key)
  }
  return (
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
          {
            //  这里做条件渲染
            current === '1' ? (
              <JSCodeContent />
            ) : current === '2' ? (
              <JavaCodeContent />
            ) : (
              <GoCodeContent />
            )
          }
        </div>
    </div>
  )
}

export default CodeTemplate
