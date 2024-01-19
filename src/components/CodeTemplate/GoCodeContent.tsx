import React, { useState } from 'react'
import type { MenuProps } from 'antd'
import { Menu } from 'antd'
import { createNativeTemplate } from '@/template/nativeTemplate'
import CodeEditor from '../CodeEditor'
import { itemsGoCode } from './constant'
import { useAppSelector } from '@/store'
import { ArrayItemType } from '@/types/arrayToTree'

const GoCodeContent: React.FC = () => {
  const [current, setCurrent] = useState('1')
  const onClick: MenuProps['onClick'] = (e) => {
    setCurrent(e.key)
  }
  const { baseInfo } = useAppSelector((state) => ({
    baseInfo: state.document.apiData.apiInfo.base,
  }))
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
              `http://127.0.0.1/${baseInfo.path}`,
              baseInfo.method as ArrayItemType,
              "'User-Agent', 'Apifox/1.0.0 (https://lyyfsq.club/ApiKnight)'",
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
