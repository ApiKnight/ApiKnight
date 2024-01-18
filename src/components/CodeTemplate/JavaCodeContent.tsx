import React, { useState } from 'react'
import type { MenuProps } from 'antd'
import { Menu } from 'antd'
import { createUnirestTemplate } from '@/template/unirestTemplate'
import { createOkHttpTemplate } from '@/template/pkHttpTemplate'
import CodeEditor from '../CodeEditor'
import { itemsJavaCode } from './constant'
import { useAppSelector } from '@/store'
import { ArrayItemType } from '@/types/arrayToTree'

const JavaCodeContent: React.FC = () => {
  const [current, setCurrent] = useState('1')
  const onClick: MenuProps['onClick'] = (e: any) => {
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
        items={itemsJavaCode}
      />
      <div className='codeTemplate-content__codeBlock'>
        {
          //  这里做条件渲染
          current === '1' ? (
            <CodeEditor
              defaultValue={createUnirestTemplate(
                `http://127.0.0.1/${baseInfo.path}`,
                baseInfo.method as ArrayItemType,
                "'User-Agent': 'Apifox/1.0.0 (https://lyyfsq.club/ApiKnight)'",
                'follow',
              )}
              lang='java'
              height='360px'
              width='435px'
            />
          ) : (
            <CodeEditor
              defaultValue={createOkHttpTemplate(
                `http://127.0.0.1/${baseInfo.path}`,
                baseInfo.method as ArrayItemType,
                "'User-Agent': 'Apifox/1.0.0 (https://lyyfsq.club/ApiKnight)'",
                'follow',
              )}
              lang='java'
              height='360px'
              width='435px'
            />
          )
        }
      </div>
    </div>
  )
}

export default JavaCodeContent
