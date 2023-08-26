import React, { useState } from 'react'
import type { MenuProps } from 'antd'
import { Menu } from 'antd'
import { createNativeTemplate } from '@/template/nativeTemplate'
import CodeEditor from '../CodeEditor'

const GoCodeContent: React.FC = () => {
  const items: MenuProps['items'] = [
    {
      label: 'Native',
      key: '1',
    },
  ]
  const [current, setCurrent] = useState('1')

  const onClick: MenuProps['onClick'] = (e: any) => {
    setCurrent(e.key)
  }

  return (
    <div className='codeTemplate-content'>
      <Menu
        onClick={onClick}
        selectedKeys={[current]}
        mode='horizontal'
        items={items}
      />
      <div className='codeTemplate-content__codeBlock'>
        {
          <CodeEditor defaultValue={
            createNativeTemplate(
              'http://127.0.0.1/xxx',
              'GET',
              "'User-Agent': 'Apifox/1.0.0 (https://apifox.com)'",
              'follow',
            )
        } lang='go' height='360px' width='435px'/>
        }
      </div>
    </div>
  )
}

export default GoCodeContent
