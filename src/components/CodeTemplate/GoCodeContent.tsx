import React, { useState } from 'react'
import type { MenuProps } from 'antd'
import { Menu } from 'antd'
import { createNativeTemplate } from '@/template/nativeTemplate'
import CodeEditor from '../CodeEditor'
import { itemsGoCode } from './constant'

const GoCodeContent: React.FC = () => {
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
        items={itemsGoCode}
      />
      <div className='codeTemplate-content__codeBlock'>
        {
          <CodeEditor
            defaultValue={createNativeTemplate(
              'http://127.0.0.1/xxx',
              'GET',
              "'User-Agent': 'Apifox/1.0.0 (https://apiknight.nice)'",
              'follow',
            )}
            lang='go'
            height='360px'
            width='435px'
          />
        }
      </div>
    </div>
  )
}

export default GoCodeContent
