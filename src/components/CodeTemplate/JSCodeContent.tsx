import React, { useState } from 'react'
import type { MenuProps } from 'antd'
import { createFetchTemplate } from '@/template/fetchTemplate'
import { createAxiosTemplate } from '@/template/axiosTemplate'
import { createJQueryTemplate } from '@/template/jqueryTemplate'
import { createRequestTemplate } from '@/template/requestTemplate'
import { createXHRTemplate } from '@/template/xhrTemplate'
import { Menu } from 'antd'

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
          //  这里做条件渲染，文档，运行，mock等做成条件渲染，比如if e等于多少的时候渲染文档，等于多少的时候渲染运行
          current === '1' ? (
            <code>
              {createFetchTemplate(
                'http://127.0.0.1/xxx',
                'GET',
                "'User-Agent': 'Apifox/1.0.0 (https://apifox.com)'",
                'follow',
              )}
            </code>
          ) : current === '2' ? (
            <code>
              {createAxiosTemplate(
                'http://127.0.0.1/xxx',
                'GET',
                "'User-Agent': 'Apifox/1.0.0 (https://apifox.com)'",
              )}
            </code>
          ) : current === '3' ? (
            <code>
              {createJQueryTemplate(
                'http://127.0.0.1/xxx',
                'GET',
                "'User-Agent': 'Apifox/1.0.0 (https://apifox.com)'",
              )}
            </code>
          ) : current === '4' ? (
            <code>
              {createRequestTemplate(
                'http://127.0.0.1/xxx',
                'GET',
                "'User-Agent': 'Apifox/1.0.0 (https://apifox.com)'",
              )}
            </code>
          ) : (
            <code>
              {createXHRTemplate(
                'http://127.0.0.1/xxx',
                'GET',
                "'User-Agent': 'Apifox/1.0.0 (https://apifox.com)'",
              )}
            </code>
          )
        }
      </div>
    </div>
  )
}

export default JSCodeContent
