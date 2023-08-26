import React, { useState } from 'react'
import type { MenuProps } from 'antd'
import { createFetchTemplate } from '@/template/fetchTemplate'
import { createAxiosTemplate } from '@/template/axiosTemplate'
import { createJQueryTemplate } from '@/template/jqueryTemplate'
import { createRequestTemplate } from '@/template/requestTemplate'
import { createXHRTemplate } from '@/template/xhrTemplate'
import { Menu } from 'antd'
import CodeEditor from '../CodeEditor'

const JSCodeContent: React.FC = () => {
  const items: MenuProps['items'] = [
    {
      label: 'fetch',
      key: '1',
    },
    {
      label: 'axios',
      key: '2',
    },
    {
      label: 'jquery',
      key: '3',
    },
    {
      label: 'request',
      key: '4',
    },
    {
      label: 'XHR',
      key: '5',
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
          current === '1' ? (
            <CodeEditor defaultValue={
              createFetchTemplate(
                'http://127.0.0.1/xxx',
                'GET',
                "'User-Agent': 'Apifox/1.0.0 (https://apifox.com)'",
                'follow',
              )
          } lang='javascript' height='360px' width='435px'/>
          ) : current === '2' ? (
            <CodeEditor defaultValue={
              createAxiosTemplate(
                'http://127.0.0.1/xxx',
                'GET',
                "'User-Agent': 'Apifox/1.0.0 (https://apifox.com)'"
              )
          } lang='javascript' height='360px' width='435px'/>
          ) : current === '3' ? (
            <CodeEditor defaultValue={
              createJQueryTemplate(
                'http://127.0.0.1/xxx',
                'GET',
                "'User-Agent': 'Apifox/1.0.0 (https://apifox.com)'",
              )
          } lang='javascript' height='360px' width='435px'/>
          ) : current === '4' ? (
            <CodeEditor defaultValue={
              createFetchTemplate(
                'http://127.0.0.1/xxx',
                'GET',
                "'User-Agent': 'Apifox/1.0.0 (https://apifox.com)'",
                'follow',
              )
          } lang='javascript' height='360px' width='435px'/>
          ) : (
            <CodeEditor defaultValue={
              createXHRTemplate(
                'http://127.0.0.1/xxx',
                'GET',
                "'User-Agent': 'Apifox/1.0.0 (https://apifox.com)'",
              )
            }/>
          )
        }
      </div>
    </div>
  )
}

export default JSCodeContent
