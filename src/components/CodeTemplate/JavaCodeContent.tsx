import React, { useState } from 'react'
import type { MenuProps } from 'antd'
import { Menu } from 'antd'
import { createUnirestTemplate } from '@/template/unirestTemplate'
import { createOkHttpTemplate } from '@/template/pkHttpTemplate'
import CodeEditor from '../CodeEditor'

const JavaCodeContent: React.FC = () => {
  const items: MenuProps['items'] = [
    {
      label: 'Unirest',
      key: '1',
    },
    {
      label: 'OkHttp',
      key: '2',
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
          //  这里做条件渲染，文档，运行，mock等做成条件渲染，比如if e等于多少的时候渲染文档，等于多少的时候渲染运行
          current === '1' ? (
            <CodeEditor defaultValue={
              createUnirestTemplate(
                'http://127.0.0.1/xxx',
                'GET',
                "'User-Agent': 'Apifox/1.0.0 (https://apifox.com)'",
                'follow',
              )
          } lang='javascript' height='360px' width='435px'/>
          ) : (
            <CodeEditor defaultValue={
              createOkHttpTemplate(
                'http://127.0.0.1/xxx',
                'GET',
                "'User-Agent': 'Apifox/1.0.0 (https://apifox.com)'",
              )
          } lang='javascript' height='360px' width='435px'/>
          )
        }
      </div>
    </div>
  )
}

export default JavaCodeContent
